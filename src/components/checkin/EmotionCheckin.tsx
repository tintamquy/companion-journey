import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { EMOTIONS } from '../../config/constants'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { LoadingSpinner } from '../common/LoadingSpinner'
import { useAuthStore } from '../../store/authStore'
import { createCheckin, checkCheckinExists } from '../../services/firebase'
import { getCoachResponse } from '../../services/geminiService'
import { useLanguageStore } from '../../store/languageStore'
import { XP_REWARDS } from '../../config/constants'
import { addXP, updateStreakAfterCheckin } from '../../services/gamificationService'
import { checkAndAwardBadges } from '../../services/badgeService'
import confetti from 'canvas-confetti'

export const EmotionCheckin = () => {
  const { t } = useTranslation()
  const { user, setUser } = useAuthStore()
  const { currentLanguage } = useLanguageStore()
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null)
  const [intensity, setIntensity] = useState(5)
  const [trigger, setTrigger] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleEmotionSelect = (emotionId: string) => {
    setSelectedEmotion(emotionId)
    setAiResponse(null)
  }

  const handleSubmit = async () => {
    if (!selectedEmotion || !user) return

    setIsSubmitting(true)
    try {
      // Check if already checked in today
      const today = new Date().toISOString().split('T')[0]
      const exists = await checkCheckinExists(user.uid, today)
      
      if (exists) {
        alert(t('checkin.alreadyCheckedIn') || 'You have already checked in today!')
        setIsSubmitting(false)
        return
      }

      // Get AI coach response
      const response = await getCoachResponse(
        user.uid,
        selectedEmotion,
        intensity,
        trigger || undefined,
        currentLanguage
      )

      // Calculate XP
      let xpEarned = XP_REWARDS.DAILY_CHECKIN
      if (trigger) {
        xpEarned += XP_REWARDS.CHECKIN_WITH_TRIGGER
      }

      // Create checkin
      await createCheckin(user.uid, {
        emotion: selectedEmotion,
        intensity,
        trigger: trigger || undefined,
        aiResponse: response,
        xpEarned,
      })

      // Update streak
      const newStreak = await updateStreakAfterCheckin(user.uid)
      
      // Add XP and update level
      const gamificationResult = await addXP(user.uid, xpEarned, newStreak)
      
      // Check and award badges
      const newBadges = await checkAndAwardBadges(user.uid)
      
      setAiResponse(response)
      setShowSuccess(true)
      
      // Celebrate!
      if (gamificationResult.levelUp) {
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } })
      } else if (newBadges.length > 0) {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } })
      } else {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      }
      
      // Refresh user profile
      await setUser(user)
    } catch (error) {
      console.error('Check-in error:', error)
      alert(t('checkin.error') || 'Failed to submit check-in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setSelectedEmotion(null)
    setIntensity(5)
    setTrigger('')
    setAiResponse(null)
    setShowSuccess(false)
  }

  if (showSuccess && aiResponse) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-6 md:p-8 rounded-3xl"
      >
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {t('checkin.success') || 'Check-in Complete!'}
          </h2>
          <p className="text-white/70">
            {t('checkin.xpEarned') || 'XP Earned'}: +{XP_REWARDS.DAILY_CHECKIN + (trigger ? XP_REWARDS.CHECKIN_WITH_TRIGGER : 0)}
          </p>
        </div>

        <div className="glass-strong p-6 rounded-2xl mb-6">
          <h3 className="text-lg font-semibold text-white mb-3">
            {t('aiCoach.title') || 'Your AI Coach says:'}
          </h3>
          <p className="text-white/90 leading-relaxed">{aiResponse}</p>
        </div>

        <Button variant="primary" size="lg" fullWidth onClick={handleReset}>
          {t('checkin.done') || 'Done'}
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass p-6 md:p-8 rounded-3xl"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
        {t('dashboard.checkIn') || 'Daily Check-in'}
      </h2>

      {/* Emotion Selection */}
      <div className="mb-6">
        <label className="block text-white/90 mb-3 font-medium">
          {t('checkin.howAreYouFeeling') || 'How are you feeling today?'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {EMOTIONS.map((emotion) => (
            <motion.button
              key={emotion.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleEmotionSelect(emotion.id)}
              className={`
                p-4 rounded-xl transition-all
                ${selectedEmotion === emotion.id
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 ring-2 ring-white/50'
                  : 'bg-white/10 hover:bg-white/20'
                }
              `}
            >
              <div className="text-3xl mb-2">{emotion.icon}</div>
              <div className="text-white text-sm font-medium">
                {t(emotion.label)}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEmotion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Intensity Slider */}
            <div>
              <label className="block text-white/90 mb-2 font-medium">
                {t('emotions.intensity')}: {intensity}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-xs text-white/60 mt-1">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            {/* Trigger Input */}
            <div>
              <Input
                label={t('emotions.trigger') || 'What triggered this feeling?'}
                placeholder={t('emotions.optional') || 'Optional'}
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>

            {/* Submit Button */}
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleSubmit}
              isLoading={isSubmitting}
              disabled={!selectedEmotion || isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner size="sm" />
                  {t('aiCoach.thinking') || 'Thinking...'}
                </span>
              ) : (
                t('checkin.submit') || 'Submit Check-in'
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

