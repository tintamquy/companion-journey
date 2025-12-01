import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, getDocs, Timestamp } from 'firebase/firestore'
import { User } from '../types/User.types'
import { Checkin } from '../types/Checkin.types'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

// User Profile Functions
export const createUserProfile = async (uid: string, userData: Omit<User, 'uid'>): Promise<void> => {
  const userRef = doc(db, 'users', uid)
  await setDoc(userRef, {
    ...userData,
    createdAt: Timestamp.now(),
  })
}

export const getUserProfile = async (uid: string): Promise<User> => {
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  
  if (!userSnap.exists()) {
    throw new Error('User profile not found')
  }
  
  return {
    uid,
    ...userSnap.data(),
  } as User
}

export const updateUserProfile = async (uid: string, updates: Partial<User>): Promise<void> => {
  const userRef = doc(db, 'users', uid)
  await updateDoc(userRef, updates as any)
}

// Check-in Functions
export const createCheckin = async (uid: string, checkinData: Omit<Checkin, 'timestamp'>): Promise<void> => {
  const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD
  const checkinRef = doc(db, 'users', uid, 'checkins', today)
  
  await setDoc(checkinRef, {
    ...checkinData,
    timestamp: Timestamp.now(),
  })
}

export const checkCheckinExists = async (uid: string, date: string): Promise<boolean> => {
  const checkinRef = doc(db, 'users', uid, 'checkins', date)
  const checkinSnap = await getDoc(checkinRef)
  return checkinSnap.exists()
}

export const getUserCheckins = async (uid: string, limit: number = 30): Promise<Checkin[]> => {
  const checkinsRef = collection(db, 'users', uid, 'checkins')
  const q = query(checkinsRef)
  const querySnapshot = await getDocs(q)
  
  const checkins: Checkin[] = []
  querySnapshot.forEach((doc) => {
    checkins.push(doc.data() as Checkin)
  })
  
  // Sort by timestamp descending and limit
  return checkins
    .sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis())
    .slice(0, limit)
}

// Badge Functions
export const awardBadge = async (uid: string, badgeId: string, rarity: string): Promise<void> => {
  const badgeRef = doc(db, 'users', uid, 'badges', badgeId)
  await setDoc(badgeRef, {
    earnedAt: Timestamp.now(),
    rarity,
  })
  
  // Update user's badges array
  const userRef = doc(db, 'users', uid)
  const userSnap = await getDoc(userRef)
  if (userSnap.exists()) {
    const currentBadges = userSnap.data().badges || []
    if (!currentBadges.includes(badgeId)) {
      await updateDoc(userRef, {
        badges: [...currentBadges, badgeId],
      })
    }
  }
}

