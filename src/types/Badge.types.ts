import { Timestamp } from 'firebase/firestore'

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary' | 'mythic'

export interface Badge {
  id: string
  name: string
  description: string
  rarity: BadgeRarity
  category: 'consistency' | 'emotional' | 'community' | 'growth' | 'secret'
  icon?: string
  earnedAt?: Timestamp
}

export interface BadgeData extends Omit<Badge, 'earnedAt'> {
  earnedAt?: Date
}

