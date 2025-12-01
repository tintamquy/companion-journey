import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useAuthStore } from '../store/authStore'

export const useAuth = () => {
  const { setUser, user, userProfile, loading } = useAuthStore()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      await setUser(firebaseUser)
    })

    return () => unsubscribe()
  }, [setUser])

  return {
    user,
    userProfile,
    loading,
    isAuthenticated: !!user,
  }
}

