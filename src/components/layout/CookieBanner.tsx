'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('levit8-cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('levit8-cookie-consent', accepted ? 'accepted' : 'rejected');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:max-w-md z-50"
        >
          <div className="glass p-6 rounded-2xl border border-electric-cyan/20">
            <h3 className="text-electric-cyan font-bold mb-2">Cookie Consent</h3>
            <p className="text-sm text-gray-300 mb-6">
              We use cookies to improve your signal analysis experience. Some are essential for the core engine to function.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => handleConsent(false)}
                className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-800 transition-colors text-sm"
              >
                Decline
              </button>
              <button 
                onClick={() => handleConsent(true)}
                className="px-4 py-2 rounded-lg bg-electric-cyan text-background font-bold hover:brightness-110 transition-all text-sm"
              >
                Accept All
              </button>
            </div>
            <div className="mt-4 text-center">
              <a href="/compliance/cookies" className="text-xs text-electric-cyan/50 hover:text-electric-cyan transition-colors">
                View Cookie Policy
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
