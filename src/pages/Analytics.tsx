import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Button } from '../components/common/Button'
import { LoadingSpinner } from '../components/common/LoadingSpinner'
import { getUserCheckins } from '../services/firebase'
import { Checkin } from '../types/Checkin.types'
import { motion } from 'framer-motion'
import { EMOTIONS } from '../config/constants'

const AnalyticsContent = () => {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d')

  useEffect(() => {
    const loadCheckins = async () => {
      if (!user) return
      
      setLoading(true)
      try {
        const data = await getUserCheckins(user.uid, 1000)
        setCheckins(data)
      } catch (error) {
        console.error('Failed to load checkins:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCheckins()
  }, [user])

  const filteredCheckins = checkins.filter(checkin => {
    if (timeRange === 'all') return true
    
    const checkinDate = checkin.timestamp.toDate()
    const now = new Date()
    const daysAgo = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const cutoffDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000)
    
    return checkinDate >= cutoffDate
  })

  // Calculate statistics
  const totalCheckins = filteredCheckins.length
  const totalXP = filteredCheckins.reduce((sum, c) => sum + (c.xpEarned || 0), 0)
  
  const emotionCounts = filteredCheckins.reduce((acc, checkin) => {
    acc[checkin.emotion] = (acc[checkin.emotion] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const avgIntensity = filteredCheckins.length > 0
    ? filteredCheckins.reduce((sum, c) => sum + c.intensity, 0) / filteredCheckins.length
    : 0

  const mostCommonEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {t('analytics.title') || 'Analytics & Insights'}
            </h1>
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              {t('common.back') || 'Back'}
            </Button>
          </div>

          {/* Time Range Selector */}
          <div className="glass p-4 rounded-2xl">
            <div className="flex gap-2 flex-wrap">
              {(['7d', '30d', '90d', 'all'] as const).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                >
                  {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : range === '90d' ? '90 Days' : 'All Time'}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="text-3xl font-bold text-white mb-2">{totalCheckins}</div>
              <div className="text-white/70 text-sm">{t('analytics.totalCheckins') || 'Total Check-ins'}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="text-3xl font-bold text-white mb-2">{totalXP}</div>
              <div className="text-white/70 text-sm">{t('analytics.totalXP') || 'Total XP Earned'}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="text-3xl font-bold text-white mb-2">{avgIntensity.toFixed(1)}</div>
              <div className="text-white/70 text-sm">{t('analytics.avgIntensity') || 'Avg Intensity'}</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-strong p-6 rounded-2xl"
            >
              <div className="text-3xl font-bold text-white mb-2">
                {mostCommonEmotion ? EMOTIONS.find(e => e.id === mostCommonEmotion)?.icon : '📊'}
              </div>
              <div className="text-white/70 text-sm">{t('analytics.mostCommon') || 'Most Common'}</div>
            </motion.div>
          </div>

          {/* Emotion Distribution */}
          <div className="glass p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('analytics.emotionDistribution') || 'Emotion Distribution'}
            </h2>
            <div className="space-y-4">
              {EMOTIONS.map((emotion) => {
                const count = emotionCounts[emotion.id] || 0
                const percentage = totalCheckins > 0 ? (count / totalCheckins) * 100 : 0
                
                return (
                  <div key={emotion.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{emotion.icon}</span>
                        <span className="text-white font-medium">{t(emotion.label)}</span>
                      </div>
                      <div className="text-white/70 text-sm">
                        {count} ({percentage.toFixed(1)}%)
                      </div>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Check-ins */}
          <div className="glass p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('analytics.recentCheckins') || 'Recent Check-ins'}
            </h2>
            <div className="space-y-3">
              {filteredCheckins.slice(0, 10).map((checkin, index) => {
                const emotion = EMOTIONS.find(e => e.id === checkin.emotion)
                const date = checkin.timestamp.toDate()
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-strong p-4 rounded-xl flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{emotion?.icon}</span>
                      <div>
                        <div className="text-white font-medium">
                          {t(emotion?.label || '')} - {checkin.intensity}/10
                        </div>
                        <div className="text-white/60 text-sm">
                          {date.toLocaleDateString()} {date.toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-white/70 text-sm">+{checkin.xpEarned} XP</div>
                  </motion.div>
                )
              })}
              {filteredCheckins.length === 0 && (
                <div className="text-center py-8 text-white/60">
                  {t('analytics.noCheckins') || 'No check-ins found for this period'}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export const Analytics = () => {
  return (
    <ProtectedRoute>
      <AnalyticsContent />
    </ProtectedRoute>
  )
}

