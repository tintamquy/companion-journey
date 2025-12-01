/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Emotion colors
        emotion: {
          happy: '#FCD34D',
          sad: '#60A5FA',
          angry: '#F87171',
          anxious: '#A78BFA',
          lonely: '#9CA3AF',
          grateful: '#34D399',
          hopeful: '#67E8F9',
          struggling: '#FB923C',
        },
        // Gamification colors
        gamification: {
          xp: '#10B981',
          level: '#3B82F6',
          streak: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
}

