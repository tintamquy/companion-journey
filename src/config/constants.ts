// Emotion configurations
export const EMOTIONS = [
  { id: 'happy', label: 'emotions.happy', color: 'emotion-happy', icon: '😊' },
  { id: 'sad', label: 'emotions.sad', color: 'emotion-sad', icon: '😢' },
  { id: 'angry', label: 'emotions.angry', color: 'emotion-angry', icon: '😠' },
  { id: 'anxious', label: 'emotions.anxious', color: 'emotion-anxious', icon: '😰' },
  { id: 'lonely', label: 'emotions.lonely', color: 'emotion-lonely', icon: '😔' },
  { id: 'grateful', label: 'emotions.grateful', color: 'emotion-grateful', icon: '🙏' },
  { id: 'hopeful', label: 'emotions.hopeful', color: 'emotion-hopeful', icon: '✨' },
  { id: 'struggling', label: 'emotions.struggling', color: 'emotion-struggling', icon: '😣' },
] as const

// XP Rewards
export const XP_REWARDS = {
  DAILY_CHECKIN: 10,
  CHECKIN_WITH_TRIGGER: 50,
  COMMUNITY_SHARE: 30,
  SUPPORT_USER: 30,
  COMPLETE_CHALLENGE: 100,
} as const

// Level calculation: XP needed = level^2 * 100
export const calculateXPForLevel = (level: number): number => {
  return level * level * 100
}

// Streak multipliers
export const STREAK_MULTIPLIERS = {
  7: 1.5,
  30: 2,
  90: 3,
  180: 5,
} as const

// Supported languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
] as const

