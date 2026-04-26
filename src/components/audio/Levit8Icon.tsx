'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Levit8IconProps {
  isListening: boolean;
  className?: string;
}

export const Levit8Icon: React.FC<Levit8IconProps> = ({ isListening, className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Outer Glow */}
      {isListening && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute w-full h-full rounded-full bg-electric-cyan blur-xl"
        />
      )}

      {/* The '8' Icon */}
      <motion.div
        animate={isListening ? {
          scale: [1, 1.1, 1],
          filter: [
            'drop-shadow(0 0 10px rgba(0, 243, 255, 0.5))',
            'drop-shadow(0 0 25px rgba(0, 243, 255, 0.8))',
            'drop-shadow(0 0 10px rgba(0, 243, 255, 0.5))'
          ]
        } : {}}
        transition={{ duration: 1, repeat: Infinity }}
        className="relative z-10 text-7xl font-black text-electric-cyan tracking-tighter select-none"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        8
      </motion.div>

      {/* Orbital Ring */}
      <motion.div
        animate={isListening ? { rotate: 360 } : {}}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-32 h-32 border-2 border-proton-purple/30 rounded-full border-t-electric-cyan"
      />
    </div>
  );
};
