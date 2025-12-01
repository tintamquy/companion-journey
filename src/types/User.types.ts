import { Timestamp } from 'firebase/firestore'

export interface User {
  uid: string
  displayName: string
  email: string
  createdAt: Timestamp
  currentStreak: number
  longestStreak: number
  level: number
  xp: number
  language: string
  badges: string[]
  lastCheckinDate?: Timestamp
}

export interface UserProfile extends Omit<User, 'createdAt'> {
  createdAt: Date
}

