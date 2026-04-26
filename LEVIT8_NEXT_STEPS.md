# LEVIT8: Next Steps Implementation Guide

This guide outlines the critical steps required to move the LEVIT8 Core Engine from scaffold to a fully functional production application.

## 1. Backend Infrastructure (High Priority)
- [ ] **Firebase Project**: Create a project at [Firebase Console](https://console.firebase.google.com/).
    - Enable **Authentication** (Email/Password).
    - Enable **Cloud Firestore** (Database).
- [ ] **Stripe Dashboard**: Create an account at [Stripe](https://stripe.com).
    - Create a "Pro Tier" Subscription Product.
    - Retrieve **Publishable** and **Secret** keys.

## 2. Environment Variables (.env.local)
Create a `.env.local` file in your root directory and populate it with your keys:
```bash
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx

# Stripe Config
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx
STRIPE_SECRET_KEY=sk_test_xxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxx
NEXT_PUBLIC_STRIPE_PRO_PRICE_ID=price_xxxx
```

## 3. Audio Identification Integration
- [ ] **Sign up for AudD**: Get an API key at [AudD.io](https://audd.io/).
- [ ] **Update Proxy**: Implement the logic in `src/app/api/fingerprint/route.ts` to relay audio data to AudD for song identification.

## 4. Legal & Compliance
- [ ] **Business Details**: Update `src/app/compliance/` files with your actual business entity name and contact details.
- [ ] **Final Review**: Ensure all legal pages reflect the "Zero-Server" privacy model accurately.

## 5. Build & Deployment
- [ ] **Fix Turbopack/Webpack Conflict**: Ensure `next.config.ts` includes `turbopack: {}` to allow `next-pwa` (which requires Webpack) to build correctly on Vercel.
- [ ] **Vercel Env Vars**: Add all keys from your `.env.local` to the Vercel project settings.

## 6. Real-World Testing
- [ ] **BPM Calibration**: Test the engine against different BPMs (slow jazz vs high-tempo house) and adjust the `useAudioProcessor` sensitivity.
- [ ] **PWA Audit**: Use Chrome DevTools (Lighthouse) to verify the PWA score is 100%.
