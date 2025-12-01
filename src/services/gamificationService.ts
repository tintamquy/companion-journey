import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from './firebase'
import { calculateXPForLevel, STREAK_MULTIPLIERS } from '../config/constants'

export interface GamificationResult {
  newXP: number
  newLevel: number
  newStreak: number
  longestStreak: number
  levelUp: boolean
  xpGained: number
}

/**
 * Calculate new level based on XP
 */
export const calculateLevel = (xp: number): number => {
  let level = 1
  while (calculateXPForLevel(level + 1) <= xp) {
    level++
  }
  return level
}

/**
 * Calculate streak based on check-ins
 */
export const calculateStreak = async (uid: string): Promise<number> => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let streak = 0
  let currentDate = new Date(today)
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0]
    const checkinRef = doc(db, 'users', uid, 'checkins', dateStr)
    const checkinSnap = await getDoc(checkinRef)
    
    if (checkinSnap.exists()) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }
  
  return streak
}

/**
 * Add XP and update user stats
 */
export const addXP = async (
  uid: string,
  xpToAdd: number,
  currentStreak: number
): Promise<GamificationResult> => {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  
  if (!userSnap.exists()) {
    throw new Error('User not found')
  }
  
  const userData = userSnap.data()
  const currentXP = userData.xp || 0
  const currentLevel = userData.level || 1
  const longestStreak = userData.longestStreak || 0
  
  // Apply streak multiplier
  let multiplier = 1
  for (const [days, mult] of Object.entries(STREAK_MULTIPLIERS).reverse()) {
    if (currentStreak >= Number(days)) {
      multiplier = mult
      break
    }
  }
  
  const xpGained = Math.floor(xpToAdd * multiplier)
  const newXP = currentXP + xpGained
  const newLevel = calculateLevel(newXP)
  const levelUp = newLevel > currentLevel
  
  // Update streak
  const newStreak = currentStreak
  const newLongestStreak = Math.max(longestStreak, newStreak)
  
  // Update user document
  await updateDoc(userRef, {
    xp: newXP,
    level: newLevel,
    currentStreak: newStreak,
    longestStreak: newLongestStreak,
  })
  
  return {
    newXP,
    newLevel,
    newStreak,
    longestStreak: newLongestStreak,
    levelUp,
    xpGained,
  }
}

/**
 * Update streak after check-in
 */
export const updateStreakAfterCheckin = async (uid: string): Promise<number> => {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  
  if (!userSnap.exists()) {
    throw new Error('User not found')
  }
  
  const userData = userSnap.data()
  const lastCheckinDate = userData.lastCheckinDate
  const currentStreak = userData.currentStreak || 0
  const longestStreak = userData.longestStreak || 0
  
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  let newStreak = 1
  
  if (lastCheckinDate) {
    const lastDate = new Date(lastCheckinDate.toDate())
    lastDate.setHours(0, 0, 0, 0)
    const daysDiff = Math.floor((today.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysDiff === 1) {
      // Consecutive day
      newStreak = currentStreak + 1
    } else if (daysDiff > 1) {
      // Streak broken
      newStreak = 1
    } else {
      // Same day (shouldn't happen, but handle it)
      newStreak = currentStreak
    }
  }
  
  const newLongestStreak = Math.max(longestStreak, newStreak)
  
  await updateDoc(userRef, {
    currentStreak: newStreak,
    longestStreak: newLongestStreak,
    lastCheckinDate: Timestamp.now(),
  })
  
  return newStreak
}

