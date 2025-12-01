import { GoogleGenerativeAI } from '@google/generative-ai'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { db } from './firebase'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY || '')
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' })

// Rate limiting: 15 requests per minute
let requestCount = 0
let resetTime = Date.now() + 60000 // Reset after 1 minute

const checkRateLimit = async (): Promise<void> => {
  const now = Date.now()
  if (now > resetTime) {
    requestCount = 0
    resetTime = now + 60000
  }
  
  if (requestCount >= 15) {
    const waitTime = resetTime - now
    await new Promise((resolve) => setTimeout(resolve, waitTime))
    requestCount = 0
    resetTime = Date.now() + 60000
  }
  
  requestCount++
}

// Exponential backoff retry
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn()
    } catch (error: unknown) {
      if (i === maxRetries - 1) throw error
      const delay = baseDelay * Math.pow(2, i)
      await new Promise((resolve) => setTimeout(resolve, delay))
    }
  }
  throw new Error('Max retries exceeded')
}

// Generate cache key
const generateCacheKey = (emotion: string, intensity: number, trigger?: string): string => {
  const triggerHash = trigger ? trigger.substring(0, 50).replace(/\s/g, '') : ''
  return `${emotion}_${intensity}_${triggerHash}`
}

// Get coach prompt based on language
const getCoachPrompt = (
  emotion: string,
  intensity: number,
  trigger: string | undefined,
  language: string
): string => {
  const emotionMap: Record<string, Record<string, string>> = {
    en: {
      happy: 'happy',
      sad: 'sad',
      angry: 'angry',
      anxious: 'anxious',
      lonely: 'lonely',
      grateful: 'grateful',
      hopeful: 'hopeful',
      struggling: 'struggling',
    },
    vi: {
      happy: 'vui vẻ',
      sad: 'buồn',
      angry: 'tức giận',
      anxious: 'lo lắng',
      lonely: 'cô đơn',
      grateful: 'biết ơn',
      hopeful: 'hy vọng',
      struggling: 'đang gặp khó khăn',
    },
    es: {
      happy: 'feliz',
      sad: 'triste',
      angry: 'enojado',
      anxious: 'ansioso',
      lonely: 'solo',
      grateful: 'agradecido',
      hopeful: 'esperanzado',
      struggling: 'luchando',
    },
    pt: {
      happy: 'feliz',
      sad: 'triste',
      angry: 'bravo',
      anxious: 'ansioso',
      lonely: 'solitário',
      grateful: 'grato',
      hopeful: 'esperançoso',
      struggling: 'lutando',
    },
    ar: {
      happy: 'سعيد',
      sad: 'حزين',
      angry: 'غاضب',
      anxious: 'قلق',
      lonely: 'وحيد',
      grateful: 'ممتن',
      hopeful: 'متفائل',
      struggling: 'يكافح',
    },
  }

  const emotionText = emotionMap[language]?.[emotion] || emotion
  const triggerText = trigger ? ` triggered by: ${trigger}` : ''

  const prompts: Record<string, string> = {
    en: `You're feeling ${emotionText} at intensity ${intensity}/10${triggerText}. Acknowledge this emotion with empathy. Praise the user for checking in - that takes courage! Offer 1-2 micro-actions (under 5 minutes) that might help right now. Respond in 2-3 sentences. Use 1-2 emojis naturally. Be warm and encouraging.`,
    vi: `Bạn đang cảm thấy ${emotionText} ở cường độ ${intensity}/10${triggerText}. Hãy thừa nhận cảm xúc này với sự đồng cảm. Khen ngợi người dùng vì đã kiểm tra - điều đó cần can đảm! Đề xuất 1-2 hành động nhỏ (dưới 5 phút) có thể giúp ngay bây giờ. Trả lời trong 2-3 câu. Sử dụng 1-2 emoji một cách tự nhiên. Hãy ấm áp và khuyến khích.`,
    es: `Te sientes ${emotionText} con intensidad ${intensity}/10${triggerText}. Reconoce esta emoción con empatía. Elogia al usuario por registrarse - ¡eso requiere valentía! Ofrece 1-2 micro-acciones (menos de 5 minutos) que podrían ayudar ahora mismo. Responde en 2-3 oraciones. Usa 1-2 emojis de forma natural. Sé cálido y alentador.`,
    pt: `Você está se sentindo ${emotionText} com intensidade ${intensity}/10${triggerText}. Reconheça essa emoção com empatia. Elogie o usuário por se registrar - isso requer coragem! Ofereça 1-2 micro-ações (menos de 5 minutos) que podem ajudar agora. Responda em 2-3 frases. Use 1-2 emojis naturalmente. Seja caloroso e encorajador.`,
    ar: `أنت تشعر بـ ${emotionText} بكثافة ${intensity}/10${triggerText}. اعترف بهذه المشاعر بتعاطف. امدح المستخدم على تسجيله - هذا يتطلب شجاعة! قدم 1-2 إجراءات صغيرة (أقل من 5 دقائق) قد تساعد الآن. أجب في 2-3 جمل. استخدم 1-2 رموز تعبيرية بشكل طبيعي. كن دافئاً ومشجعاً.`,
  }

  return prompts[language] || prompts.en
}

// Check cache
const getCachedResponse = async (uid: string, cacheKey: string): Promise<string | null> => {
  try {
    const cacheRef = doc(db, 'users', uid, 'aiCache', cacheKey)
    const cacheSnap = await getDoc(cacheRef)
    
    if (cacheSnap.exists()) {
      const data = cacheSnap.data()
      const cachedAt = data.cachedAt.toMillis()
      const now = Date.now()
      const ttl = 24 * 60 * 60 * 1000 // 24 hours
      
      if (now - cachedAt < ttl) {
        return data.response
      }
    }
  } catch (error) {
    console.error('Error checking cache:', error)
  }
  
  return null
}

// Save to cache
const saveToCache = async (uid: string, cacheKey: string, response: string): Promise<void> => {
  try {
    const cacheRef = doc(db, 'users', uid, 'aiCache', cacheKey)
    await setDoc(cacheRef, {
      response,
      cachedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Error saving to cache:', error)
  }
}

// Main function to get AI coach response
export const getCoachResponse = async (
  uid: string,
  emotion: string,
  intensity: number,
  trigger: string | undefined,
  language: string = 'en'
): Promise<string> => {
  // Check cache first
  const cacheKey = generateCacheKey(emotion, intensity, trigger)
  const cachedResponse = await getCachedResponse(uid, cacheKey)
  if (cachedResponse) {
    return cachedResponse
  }

  // Check rate limit
  await checkRateLimit()

  // Generate prompt
  const prompt = getCoachPrompt(emotion, intensity, trigger, language)

  // Get AI response with retry
  const getAIResponse = async (): Promise<string> => {
    try {
      const result = await model.generateContent(prompt)
      const response = result.response
      const text = response.text()
      
      // Save to cache
      await saveToCache(uid, cacheKey, text)
      
      return text
    } catch (error: unknown) {
      // Fallback responses if API fails
      const fallbacks: Record<string, Record<string, string>> = {
        en: {
          happy: "I'm so glad you're feeling good! Keep up the positive energy. 💪",
          sad: "I'm here with you. Take a deep breath. You're stronger than you know. 🌟",
          struggling: "You're not alone. This moment will pass. You've got this. 💙",
        },
        vi: {
          happy: "Tôi rất vui khi bạn cảm thấy tốt! Hãy giữ năng lượng tích cực. 💪",
          sad: "Tôi ở đây với bạn. Hãy hít thở sâu. Bạn mạnh mẽ hơn bạn nghĩ. 🌟",
          struggling: "Bạn không cô đơn. Khoảnh khắc này sẽ qua. Bạn làm được. 💙",
        },
      }
      
      const fallback = fallbacks[language]?.[emotion] || fallbacks.en.struggling
      return fallback
    }
  }

  return retryWithBackoff(getAIResponse)
}

