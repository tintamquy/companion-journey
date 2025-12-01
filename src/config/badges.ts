import { Badge } from '../types/Badge.types'

export const BADGE_DEFINITIONS: Badge[] = [
  // Consistency Badges
  { id: 'first_checkin', name: 'First Steps', description: 'Complete your first check-in', rarity: 'common', category: 'consistency', icon: '🌱' },
  { id: 'streak_3', name: 'Getting Started', description: '3 day streak', rarity: 'common', category: 'consistency', icon: '🔥' },
  { id: 'streak_7', name: 'Week Warrior', description: '7 day streak', rarity: 'rare', category: 'consistency', icon: '💪' },
  { id: 'streak_30', name: 'Monthly Master', description: '30 day streak', rarity: 'epic', category: 'consistency', icon: '👑' },
  { id: 'streak_90', name: 'Quarter Champion', description: '90 day streak', rarity: 'legendary', category: 'consistency', icon: '🏆' },
  { id: 'streak_180', name: 'Half Year Hero', description: '180 day streak', rarity: 'mythic', category: 'consistency', icon: '⭐' },
  { id: 'streak_365', name: 'Year Warrior', description: '365 day streak', rarity: 'mythic', category: 'consistency', icon: '🌟' },
  
  // Emotional Badges
  { id: 'emotion_happy_10', name: 'Joy Seeker', description: 'Check in happy 10 times', rarity: 'common', category: 'emotional', icon: '😊' },
  { id: 'emotion_grateful_10', name: 'Grateful Heart', description: 'Check in grateful 10 times', rarity: 'rare', category: 'emotional', icon: '🙏' },
  { id: 'emotion_hopeful_10', name: 'Hopeful Soul', description: 'Check in hopeful 10 times', rarity: 'rare', category: 'emotional', icon: '✨' },
  { id: 'all_emotions', name: 'Emotional Explorer', description: 'Experience all emotions', rarity: 'epic', category: 'emotional', icon: '🌈' },
  
  // Growth Badges
  { id: 'level_5', name: 'Rising Star', description: 'Reach level 5', rarity: 'common', category: 'growth', icon: '⭐' },
  { id: 'level_10', name: 'Shining Light', description: 'Reach level 10', rarity: 'rare', category: 'growth', icon: '💫' },
  { id: 'level_20', name: 'Bright Beacon', description: 'Reach level 20', rarity: 'epic', category: 'growth', icon: '🔆' },
  { id: 'level_50', name: 'Luminous Legend', description: 'Reach level 50', rarity: 'legendary', category: 'growth', icon: '☀️' },
  { id: 'xp_1000', name: 'XP Collector', description: 'Earn 1000 XP', rarity: 'common', category: 'growth', icon: '💎' },
  { id: 'xp_10000', name: 'XP Master', description: 'Earn 10000 XP', rarity: 'epic', category: 'growth', icon: '💍' },
  { id: 'xp_100000', name: 'XP Legend', description: 'Earn 100000 XP', rarity: 'mythic', category: 'growth', icon: '👑' },
  
  // Check-in Badges
  { id: 'checkin_10', name: 'Dedicated', description: 'Complete 10 check-ins', rarity: 'common', category: 'consistency', icon: '📝' },
  { id: 'checkin_50', name: 'Committed', description: 'Complete 50 check-ins', rarity: 'rare', category: 'consistency', icon: '📋' },
  { id: 'checkin_100', name: 'Devoted', description: 'Complete 100 check-ins', rarity: 'epic', category: 'consistency', icon: '📖' },
  { id: 'checkin_500', name: 'Unstoppable', description: 'Complete 500 check-ins', rarity: 'legendary', category: 'consistency', icon: '📚' },
  { id: 'checkin_1000', name: 'Immortal', description: 'Complete 1000 check-ins', rarity: 'mythic', category: 'consistency', icon: '📜' },
  
  // Trigger Badges
  { id: 'trigger_10', name: 'Self Aware', description: 'Add triggers 10 times', rarity: 'rare', category: 'growth', icon: '🧠' },
  { id: 'trigger_50', name: 'Mindful Master', description: 'Add triggers 50 times', rarity: 'epic', category: 'growth', icon: '🧘' },
  
  // Intensity Badges
  { id: 'intensity_high_10', name: 'Intense Explorer', description: 'Check in with high intensity 10 times', rarity: 'rare', category: 'emotional', icon: '⚡' },
  { id: 'intensity_low_10', name: 'Calm Navigator', description: 'Check in with low intensity 10 times', rarity: 'rare', category: 'emotional', icon: '🌊' },
  
  // Secret Badges
  { id: 'midnight_checkin', name: 'Night Owl', description: 'Check in at midnight', rarity: 'epic', category: 'secret', icon: '🦉' },
  { id: 'dawn_checkin', name: 'Early Bird', description: 'Check in at dawn', rarity: 'epic', category: 'secret', icon: '🐦' },
  { id: 'perfect_week', name: 'Perfect Week', description: 'Check in every day for a week', rarity: 'legendary', category: 'secret', icon: '🎯' },
  { id: 'comeback', name: 'Comeback Kid', description: 'Restart streak after breaking it', rarity: 'rare', category: 'secret', icon: '🔄' },
]

export const getBadgeById = (id: string): Badge | undefined => {
  return BADGE_DEFINITIONS.find(badge => badge.id === id)
}

export const getBadgesByCategory = (category: Badge['category']): Badge[] => {
  return BADGE_DEFINITIONS.filter(badge => badge.category === category)
}

export const getBadgesByRarity = (rarity: Badge['rarity']): Badge[] => {
  return BADGE_DEFINITIONS.filter(badge => badge.rarity === rarity)
}

