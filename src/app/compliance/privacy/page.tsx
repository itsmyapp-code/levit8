import ComplianceLayout from '@/components/layout/ComplianceLayout';

export default function PrivacyPolicy() {
  return (
    <ComplianceLayout 
      title="Privacy Policy"
      content={
        <>
          <p className="mb-4">Last Updated: April 2026</p>
          <h2 className="text-2xl text-white mt-6 mb-4">1. Audio Recording Consent</h2>
          <p className="mb-4">
            By using LEVIT8, you explicitly consent to the app accessing your device microphone. 
            The audio data is processed <strong>locally on your device</strong> for real-time frequency analysis (BPM and Key detection). 
            We do not transmit raw audio data to our servers.
          </p>
          <h2 className="text-2xl text-white mt-6 mb-4">2. Data Collection</h2>
          <p className="mb-4">
            We collect basic account information if you sign in, and a history of identified songs to provide you with a personalized experience.
          </p>
          <h2 className="text-2xl text-white mt-6 mb-4">3. Security</h2>
          <p>
            Your song history is stored securely in Firebase Firestore and is only accessible by you.
          </p>
        </>
      }
    />
  );
}
