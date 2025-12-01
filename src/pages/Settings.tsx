import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { useLanguageStore } from '../store/languageStore'
import { ProtectedRoute } from '../components/auth/ProtectedRoute'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { LanguageSelector } from '../components/common/LanguageSelector'
import { motion } from 'framer-motion'
import { updateUserProfile } from '../services/firebase'

const SettingsContent = () => {
  const { t } = useTranslation()
  const { user, userProfile, setUser } = useAuthStore()
  const { currentLanguage } = useLanguageStore()
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      await updateUserProfile(user.uid, {
        displayName,
        language: currentLanguage,
      })
      
      // Refresh user profile
      await setUser(user)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert(t('settings.saveError') || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              {t('settings.title') || 'Settings'}
            </h1>
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              {t('common.back') || 'Back'}
            </Button>
          </div>

          {/* Profile Settings */}
          <div className="glass p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('settings.profile') || 'Profile Settings'}
            </h2>
            
            <div className="space-y-4">
              <Input
                label={t('auth.displayName') || 'Display Name'}
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="bg-white/10 border-white/20 text-white"
              />

              <div>
                <label className="block text-white/90 mb-2 font-medium">
                  {t('settings.language') || 'Language'}
                </label>
                <LanguageSelector />
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  onClick={handleSave}
                  isLoading={saving}
                >
                  {saved ? (t('settings.saved') || 'Saved!') : (t('settings.save') || 'Save Changes')}
                </Button>
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="glass p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('settings.account') || 'Account Information'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white/70 text-sm mb-1">
                  {t('auth.email') || 'Email'}
                </label>
                <div className="text-white font-medium">{userProfile?.email}</div>
              </div>

              <div>
                <label className="block text-white/70 text-sm mb-1">
                  {t('settings.memberSince') || 'Member Since'}
                </label>
                <div className="text-white font-medium">
                  {userProfile?.createdAt
                    ? new Date(userProfile.createdAt.toDate()).toLocaleDateString()
                    : 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="glass p-6 md:p-8 rounded-3xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {t('settings.stats') || 'Your Stats'}
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userProfile?.currentStreak || 0}
                </div>
                <div className="text-white/70 text-sm">{t('dashboard.streak')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userProfile?.level || 1}
                </div>
                <div className="text-white/70 text-sm">{t('dashboard.level')}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userProfile?.xp || 0}
                </div>
                <div className="text-white/70 text-sm">{t('gamification.xp') || 'XP'}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">
                  {userProfile?.badges?.length || 0}
                </div>
                <div className="text-white/70 text-sm">{t('dashboard.badges')}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export const Settings = () => {
  return (
    <ProtectedRoute>
      <SettingsContent />
    </ProtectedRoute>
  )
}

