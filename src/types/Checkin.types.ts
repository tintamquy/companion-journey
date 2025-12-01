import { Timestamp } from 'firebase/firestore'

export interface Checkin {
  emotion: string
  intensity: number // 1-10
  trigger?: string
  aiResponse: string
  timestamp: Timestamp
  xpEarned: number
}

export interface CheckinData extends Omit<Checkin, 'timestamp'> {
  timestamp: Date
}

