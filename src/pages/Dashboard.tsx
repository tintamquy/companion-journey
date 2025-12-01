import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Button } from '../components/common/Button'
import { EmotionCheckin } from '../components/checkin/EmotionCheckin'
import { BadgeDisplay } from '../components/badges/BadgeDisplay'
import { LanguageSelector } from '../components/common/LanguageSelector'
import { motion, AnimatePresence } from 'framer-motion'
import { calculateXPForLevel } from '../config/constants'

const DashboardContent = () => {
  const { t } = useTranslation()
  const { userProfile, logout } = useAuthStore()
  const [showCheckin, setShowCheckin] = useState(false)
  const [showBadges, setShowBadges] = useState(false)

  const xpForNextLevel = userProfile ? calculateXPForLevel((userProfile.level || 1) + 1) : 100
  const xpProgress = userProfile ? ((userProfile.xp || 0) / xpForNextLevel) * 100 : 0

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            {t('dashboard.welcome')}, {userProfile?.displayName || 'User'}! 👋
          </h1>
          <div className="flex gap-3">
            <LanguageSelector />
            <Button variant="outline" size="sm" onClick={logout}>
              {t('auth.logout') || 'Logout'}
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!showCheckin && !showBadges ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-strong p-6 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {userProfile?.currentStreak || 0} 🔥
                  </div>
                  <div className="text-white/70 text-sm">{t('dashboard.streak')}</div>
                  {userProfile?.longestStreak && userProfile.longestStreak > 0 && (
                    <div className="text-white/50 text-xs mt-1">
                      Best: {userProfile.longestStreak}
                    </div>
                  )}
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-strong p-6 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {t('dashboard.level')} {userProfile?.level || 1}
                  </div>
                  <div className="text-white/70 text-sm mb-2">{userProfile?.xp || 0} / {xpForNextLevel} {t('gamification.xp') || 'XP'}</div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(xpProgress, 100)}%` }}
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass-strong p-6 rounded-2xl"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {userProfile?.badges?.length || 0} 🏆
                  </div>
                  <div className="text-white/70 text-sm">{t('dashboard.badges')}</div>
                </motion.div>
              </div>

              {/* Check-in Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass p-6 md:p-8 rounded-3xl"
              >
                <h2 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {t('dashboard.checkIn') || 'Daily Check-in'}
                </h2>
                <p className="text-white/70 mb-6">
                  {t('dashboard.checkInDesc') || 'Track your emotions and get personalized AI coaching'}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={() => setShowCheckin(true)}
                >
                  {t('dashboard.checkIn') || 'Start Check-in'}
                </Button>
              </motion.div>

              {/* Badges Preview */}
              {userProfile?.badges && userProfile.badges.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass p-6 md:p-8 rounded-3xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-white">
                      {t('dashboard.badges') || 'Your Badges'}
                    </h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowBadges(true)}
                    >
                      {t('dashboard.viewAllBadges') || 'View All'}
                    </Button>
                  </div>
                  <BadgeDisplay badgeIds={userProfile.badges} limit={4} />
                </motion.div>
              )}
            </motion.div>
          ) : showCheckin ? (
            <motion.div
              key="checkin"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCheckin(false)}
                className="mb-4"
              >
                ← {t('common.back') || 'Back to Dashboard'}
              </Button>
              <EmotionCheckin />
            </motion.div>
          ) : (
            <motion.div
              key="badges"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBadges(false)}
                className="mb-4"
              >
                ← {t('common.back') || 'Back to Dashboard'}
              </Button>
              <div className="glass p-6 md:p-8 rounded-3xl">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                  {t('dashboard.allBadges') || 'All Your Badges'}
                </h2>
                <BadgeDisplay badgeIds={userProfile?.badges || []} showAll />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}

