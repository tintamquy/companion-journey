import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Button } from '../components/common/Button'
import { motion } from 'framer-motion'

const DashboardContent = () => {
  const { t } = useTranslation()
  const { userProfile } = useAuthStore()

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-6 md:p-8 rounded-3xl"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('dashboard.welcome')}, {userProfile?.displayName || 'User'}! 👋
          </h1>
          
          <p className="text-white/70 mb-8">
            This is your dashboard. Phase 2 features will be added here.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="glass-strong p-6 rounded-2xl">
              <div className="text-2xl font-bold text-white mb-2">
                {userProfile?.currentStreak || 0} 🔥
              </div>
              <div className="text-white/70 text-sm">{t('dashboard.streak')}</div>
            </div>
            
            <div className="glass-strong p-6 rounded-2xl">
              <div className="text-2xl font-bold text-white mb-2">
                {t('dashboard.level')} {userProfile?.level || 1}
              </div>
              <div className="text-white/70 text-sm">{userProfile?.xp || 0} {t('gamification.xp')}</div>
            </div>
            
            <div className="glass-strong p-6 rounded-2xl">
              <div className="text-2xl font-bold text-white mb-2">
                {userProfile?.badges?.length || 0} 🏆
              </div>
              <div className="text-white/70 text-sm">{t('dashboard.badges')}</div>
            </div>
          </div>

          <Button variant="primary" size="lg" fullWidth>
            {t('dashboard.checkIn')}
          </Button>
        </motion.div>
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

