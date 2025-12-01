# Companion Journey - AI-Powered Addiction Recovery PWA

A Progressive Web App helping people overcome addiction through AI coaching, gamification, and community support.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)
- Firebase project with Authentication and Firestore enabled
- Google Gemini API key

### Installation

1. **Install Node.js** (if not already installed)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version` and `npm --version`

2. **Install Dependencies**
   ```bash
   cd companion-journey
   npm install
   ```

3. **Setup Environment Variables**
   - Copy `.env.example` to `.env`
   - Fill in your Firebase configuration:
     - Go to Firebase Console → Project Settings → General
     - Copy your web app configuration
   - Add your Gemini API key:
     - Get from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Setup Firebase**
   - Enable Email/Password authentication in Firebase Console
   - Enable Google Sign-in provider
   - Deploy Firestore security rules:
     ```bash
     firebase deploy --only firestore:rules
     ```
   - Or manually copy `firestore.rules` content to Firebase Console → Firestore → Rules

5. **Run Development Server**
   ```bash
   npm run dev
   ```

6. **Open in Browser**
   - Navigate to `http://localhost:5173`

## 📁 Project Structure

```
companion-journey/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route pages
│   ├── services/       # Firebase, Gemini AI services
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types
│   ├── config/         # Constants and config
│   ├── i18n/           # i18n configuration
│   └── store/          # Zustand stores
├── public/
│   └── locales/        # Translation files
└── firestore.rules     # Firestore security rules
```

## 🌍 Supported Languages

- English (en)
- Tiếng Việt (vi)
- Español (es)
- Português (pt)
- العربية (ar)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (with code splitting)
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 PWA Features

- ✅ Installable as Progressive Web App
- ✅ Offline support with service worker
- ✅ App manifest for native-like experience
- ✅ Responsive design for all devices

## ✨ Features

### Phase 1 - Foundation ✅
- ✅ Project setup with React + Vite + TypeScript
- ✅ Tailwind CSS with mobile-first design
- ✅ Multi-language support (5 languages)
- ✅ Firebase Authentication (Email/Password + Google)
- ✅ Firestore database with security rules
- ✅ Gemini AI service with rate limiting
- ✅ Beautiful authentication pages
- ✅ Protected routes
- ✅ Language selector

### Phase 2 - Core Features ✅
- ✅ Emotion check-in system with AI coaching
- ✅ Gamification engine (XP, levels, streaks)
- ✅ Badge system (30+ badges)
- ✅ Full dashboard with stats and visualizations
- ✅ Real-time progress tracking

### Phase 3 - Advanced Features ✅
- ✅ Analytics & Insights page
- ✅ Settings page with profile management
- ✅ Error boundaries for better UX
- ✅ PWA support (manifest, service worker)
- ✅ Code splitting for optimal performance
- ✅ Lazy loading for faster initial load

## 🚀 Deployment

### Deploy to Cloudflare Pages

1. **Push code to GitHub:**
   ```bash
   git add .
   git commit -m "feat: ready for deployment"
   git push origin main
   ```

2. **Setup Cloudflare Pages:**
   - Connect GitHub repository
   - Build command: `npm run build`
   - Build output: `dist`
   - Add environment variables (see `.env.example`)

3. **Configure Firebase:**
   - Add Cloudflare Pages domain to Firebase Authorized domains
   - Update OAuth redirect URLs if needed

📖 **Chi tiết:** Xem [HUONG_DAN_DEPLOY.md](./HUONG_DAN_DEPLOY.md)

## 🔐 Security

- Firestore security rules prevent unauthorized access
- User data is isolated per user ID
- API keys stored in environment variables (not in code)
- `.env` file is gitignored
- Rate limiting on Gemini API calls

## 📄 License

MIT

## 🤝 Contributing

This is a private project. For questions or issues, please contact the development team.

