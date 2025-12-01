import { create } from 'zustand'
import { User as FirebaseUser } from 'firebase/auth'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut as firebaseSignOut, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../services/firebase'
import { createUserProfile, getUserProfile } from '../services/firebase'
import { User } from '../types/User.types'

interface AuthState {
  user: FirebaseUser | null
  userProfile: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, displayName: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  setUser: (user: FirebaseUser | null) => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  userProfile: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const profile = await getUserProfile(userCredential.user.uid)
      set({ 
        user: userCredential.user, 
        userProfile: profile,
        loading: false,
        error: null 
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      set({ loading: false, error: errorMessage })
      throw error
    }
  },

  signup: async (email: string, password: string, displayName: string) => {
    set({ loading: true, error: null })
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      
      // Create user profile in Firestore
      const userData: Omit<User, 'uid'> = {
        displayName,
        email,
        createdAt: new Date() as any, // Will be converted to Timestamp in service
        currentStreak: 0,
        longestStreak: 0,
        level: 1,
        xp: 0,
        language: 'en',
        badges: [],
      }
      
      await createUserProfile(userCredential.user.uid, userData)
      const profile = await getUserProfile(userCredential.user.uid)
      
      set({ 
        user: userCredential.user,
        userProfile: profile,
        loading: false,
        error: null 
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      set({ loading: false, error: errorMessage })
      throw error
    }
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null })
    try {
      const provider = new GoogleAuthProvider()
      const userCredential = await signInWithPopup(auth, provider)
      
      // Check if profile exists, create if not
      let profile = await getUserProfile(userCredential.user.uid).catch(() => null)
      
      if (!profile) {
        const userData: Omit<User, 'uid'> = {
          displayName: userCredential.user.displayName || 'User',
          email: userCredential.user.email || '',
          createdAt: new Date() as any,
          currentStreak: 0,
          longestStreak: 0,
          level: 1,
          xp: 0,
          language: 'en',
          badges: [],
        }
        await createUserProfile(userCredential.user.uid, userData)
        profile = await getUserProfile(userCredential.user.uid)
      }
      
      set({ 
        user: userCredential.user,
        userProfile: profile,
        loading: false,
        error: null 
      })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      set({ loading: false, error: errorMessage })
      throw error
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      await firebaseSignOut(auth)
      set({ user: null, userProfile: null, loading: false, error: null })
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      set({ loading: false, error: errorMessage })
    }
  },

  setUser: async (user: FirebaseUser | null) => {
    if (user) {
      const profile = await getUserProfile(user.uid).catch(() => null)
      set({ user, userProfile: profile })
    } else {
      set({ user: null, userProfile: null })
    }
  },

  clearError: () => set({ error: null }),
}))

