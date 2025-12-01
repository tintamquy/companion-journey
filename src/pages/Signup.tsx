import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { Button } from '../components/common/Button'
import { Input } from '../components/common/Input'
import { LanguageSelector } from '../components/common/LanguageSelector'
import { motion } from 'framer-motion'

export const Signup = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { signup, signInWithGoogle, loading, error, clearError } = useAuthStore()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [localError, setLocalError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLocalError('')
    clearError()

    // Validation
    if (!displayName || !email || !password) {
      setLocalError(t('auth.errors.invalidEmail'))
      return
    }

    if (password.length < 6) {
      setLocalError(t('auth.errors.weakPassword'))
      return
    }

    if (password !== confirmPassword) {
      setLocalError(t('auth.errors.passwordMismatch'))
      return
    }

    try {
      await signup(email, password, displayName)
      navigate('/dashboard')
    } catch (err) {
      console.error('Signup error:', err)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/dashboard')
    } catch (err) {
      console.error('Google sign in error:', err)
    }
  }

  const getErrorMessage = (errorMessage: string): string => {
    if (errorMessage.includes('email-already-in-use')) return t('auth.errors.emailInUse')
    if (errorMessage.includes('weak-password')) return t('auth.errors.weakPassword')
    if (errorMessage.includes('invalid-email')) return t('auth.errors.invalidEmail')
    if (errorMessage.includes('network')) return t('auth.errors.networkError')
    return t('auth.errors.unknownError')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="glass p-8 rounded-3xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Companion Journey</h1>
            <p className="text-white/70">Start your recovery journey</p>
          </div>

          {/* Language Selector */}
          <div className="flex justify-end mb-6">
            <LanguageSelector />
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="text"
              label={t('auth.displayName')}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your name"
              fullWidth
              required
            />

            <Input
              type="email"
              label={t('auth.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              fullWidth
              required
            />

            <Input
              type="password"
              label={t('auth.password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              fullWidth
              required
            />

            <Input
              type="password"
              label={t('auth.confirmPassword')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              fullWidth
              required
            />

            {(error || localError) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-200 text-sm"
              >
                {getErrorMessage(error || localError)}
              </motion.div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={loading}
              size="lg"
            >
              {t('auth.signup')}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-transparent text-white/60">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            fullWidth
            isLoading={loading}
            className="mb-6"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t('auth.googleSignIn')}
            </span>
          </Button>

          {/* Login Link */}
          <p className="text-center text-white/70 text-sm">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="text-purple-300 hover:text-purple-200 font-semibold">
              {t('auth.signInHere')}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

