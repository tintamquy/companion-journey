import { motion } from 'framer-motion'
import { Badge } from '../../types/Badge.types'
import { getBadgeById } from '../../config/badges'

interface BadgeDisplayProps {
  badgeIds: string[]
  showAll?: boolean
  limit?: number
}

const rarityColors: Record<Badge['rarity'], string> = {
  common: 'from-gray-400 to-gray-600',
  rare: 'from-blue-400 to-blue-600',
  epic: 'from-purple-400 to-purple-600',
  legendary: 'from-yellow-400 to-orange-600',
  mythic: 'from-pink-400 to-red-600',
}

export const BadgeDisplay = ({ badgeIds, showAll = false, limit = 6 }: BadgeDisplayProps) => {
  const badges = badgeIds
    .map(id => getBadgeById(id))
    .filter((badge): badge is Badge => badge !== undefined)
    .slice(0, showAll ? undefined : limit)

  if (badges.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-white/60">No badges earned yet. Start checking in to earn your first badge! 🏆</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => (
        <motion.div
          key={badge.id}
          whileHover={{ scale: 1.05 }}
          className={`
            glass-strong p-4 rounded-xl text-center
            bg-gradient-to-br ${rarityColors[badge.rarity]}
          `}
        >
          <div className="text-4xl mb-2">{badge.icon || '🏆'}</div>
          <div className="text-white font-semibold text-sm mb-1">{badge.name}</div>
          <div className="text-white/80 text-xs">{badge.description}</div>
          <div className="mt-2 text-xs text-white/60 capitalize">{badge.rarity}</div>
        </motion.div>
      ))}
    </div>
  )
}

