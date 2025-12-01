import { awardBadge, getUserCheckins, getUserProfile } from './firebase'

/**
 * Check and award badges based on user progress
 */
export const checkAndAwardBadges = async (uid: string): Promise<string[]> => {
  const userProfile = await getUserProfile(uid)
  const checkins = await getUserCheckins(uid, 1000) // Get all checkins
  
  const newBadges: string[] = []
  
  // Check consistency badges
  if (userProfile.currentStreak >= 3 && !userProfile.badges.includes('streak_3')) {
    await awardBadge(uid, 'streak_3', 'common')
    newBadges.push('streak_3')
  }
  if (userProfile.currentStreak >= 7 && !userProfile.badges.includes('streak_7')) {
    await awardBadge(uid, 'streak_7', 'rare')
    newBadges.push('streak_7')
  }
  if (userProfile.currentStreak >= 30 && !userProfile.badges.includes('streak_30')) {
    await awardBadge(uid, 'streak_30', 'epic')
    newBadges.push('streak_30')
  }
  if (userProfile.currentStreak >= 90 && !userProfile.badges.includes('streak_90')) {
    await awardBadge(uid, 'streak_90', 'legendary')
    newBadges.push('streak_90')
  }
  if (userProfile.currentStreak >= 180 && !userProfile.badges.includes('streak_180')) {
    await awardBadge(uid, 'streak_180', 'mythic')
    newBadges.push('streak_180')
  }
  if (userProfile.currentStreak >= 365 && !userProfile.badges.includes('streak_365')) {
    await awardBadge(uid, 'streak_365', 'mythic')
    newBadges.push('streak_365')
  }
  
  // Check check-in count badges
  const checkinCount = checkins.length
  if (checkinCount >= 10 && !userProfile.badges.includes('checkin_10')) {
    await awardBadge(uid, 'checkin_10', 'common')
    newBadges.push('checkin_10')
  }
  if (checkinCount >= 50 && !userProfile.badges.includes('checkin_50')) {
    await awardBadge(uid, 'checkin_50', 'rare')
    newBadges.push('checkin_50')
  }
  if (checkinCount >= 100 && !userProfile.badges.includes('checkin_100')) {
    await awardBadge(uid, 'checkin_100', 'epic')
    newBadges.push('checkin_100')
  }
  if (checkinCount >= 500 && !userProfile.badges.includes('checkin_500')) {
    await awardBadge(uid, 'checkin_500', 'legendary')
    newBadges.push('checkin_500')
  }
  if (checkinCount >= 1000 && !userProfile.badges.includes('checkin_1000')) {
    await awardBadge(uid, 'checkin_1000', 'mythic')
    newBadges.push('checkin_1000')
  }
  
  // Check level badges
  if (userProfile.level >= 5 && !userProfile.badges.includes('level_5')) {
    await awardBadge(uid, 'level_5', 'common')
    newBadges.push('level_5')
  }
  if (userProfile.level >= 10 && !userProfile.badges.includes('level_10')) {
    await awardBadge(uid, 'level_10', 'rare')
    newBadges.push('level_10')
  }
  if (userProfile.level >= 20 && !userProfile.badges.includes('level_20')) {
    await awardBadge(uid, 'level_20', 'epic')
    newBadges.push('level_20')
  }
  if (userProfile.level >= 50 && !userProfile.badges.includes('level_50')) {
    await awardBadge(uid, 'level_50', 'legendary')
    newBadges.push('level_50')
  }
  
  // Check XP badges
  if (userProfile.xp >= 1000 && !userProfile.badges.includes('xp_1000')) {
    await awardBadge(uid, 'xp_1000', 'common')
    newBadges.push('xp_1000')
  }
  if (userProfile.xp >= 10000 && !userProfile.badges.includes('xp_10000')) {
    await awardBadge(uid, 'xp_10000', 'epic')
    newBadges.push('xp_10000')
  }
  if (userProfile.xp >= 100000 && !userProfile.badges.includes('xp_100000')) {
    await awardBadge(uid, 'xp_100000', 'mythic')
    newBadges.push('xp_100000')
  }
  
  // Check emotion badges
  const emotionCounts: Record<string, number> = {}
  checkins.forEach(checkin => {
    emotionCounts[checkin.emotion] = (emotionCounts[checkin.emotion] || 0) + 1
  })
  
  if (emotionCounts.happy >= 10 && !userProfile.badges.includes('emotion_happy_10')) {
    await awardBadge(uid, 'emotion_happy_10', 'common')
    newBadges.push('emotion_happy_10')
  }
  if (emotionCounts.grateful >= 10 && !userProfile.badges.includes('emotion_grateful_10')) {
    await awardBadge(uid, 'emotion_grateful_10', 'rare')
    newBadges.push('emotion_grateful_10')
  }
  if (emotionCounts.hopeful >= 10 && !userProfile.badges.includes('emotion_hopeful_10')) {
    await awardBadge(uid, 'emotion_hopeful_10', 'rare')
    newBadges.push('emotion_hopeful_10')
  }
  
  // Check all emotions badge
  const allEmotions = ['happy', 'sad', 'angry', 'anxious', 'lonely', 'grateful', 'hopeful', 'struggling']
  const hasAllEmotions = allEmotions.every(emotion => emotionCounts[emotion] > 0)
  if (hasAllEmotions && !userProfile.badges.includes('all_emotions')) {
    await awardBadge(uid, 'all_emotions', 'epic')
    newBadges.push('all_emotions')
  }
  
  // Check trigger badges
  const triggerCount = checkins.filter(c => c.trigger).length
  if (triggerCount >= 10 && !userProfile.badges.includes('trigger_10')) {
    await awardBadge(uid, 'trigger_10', 'rare')
    newBadges.push('trigger_10')
  }
  if (triggerCount >= 50 && !userProfile.badges.includes('trigger_50')) {
    await awardBadge(uid, 'trigger_50', 'epic')
    newBadges.push('trigger_50')
  }
  
  // First check-in badge
  if (checkinCount === 1 && !userProfile.badges.includes('first_checkin')) {
    await awardBadge(uid, 'first_checkin', 'common')
    newBadges.push('first_checkin')
  }
  
  return newBadges
}

