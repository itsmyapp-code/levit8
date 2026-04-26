'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, Music, Zap, Shield } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-electric-cyan selection:text-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-electric-cyan/10 blur-[150px] -z-10" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6 max-w-4xl"
        >
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <Zap size={14} className="text-electric-cyan" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Project Antigravity Live</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none">
            LEVIT<span className="text-electric-cyan">8</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium">
            The next-generation audio engine for musicians. 
            Identify song metadata, <span className="text-white">BPM</span>, and <span className="text-white">Musical Key</span> in real-time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12">
            <Link href="/analyze">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 bg-electric-cyan text-background font-black text-lg rounded-2xl flex items-center space-x-3 shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.5)] transition-all"
              >
                <span>Launch Engine</span>
                <ChevronRight size={20} />
              </motion.button>
            </Link>
            
            <Link href="/compliance/privacy">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
                className="px-10 py-5 border border-white/10 rounded-2xl text-lg font-bold transition-all"
              >
                Read Compliance
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-10 rounded-3xl border border-white/5 space-y-6">
          <div className="w-12 h-12 bg-electric-cyan/20 rounded-xl flex items-center justify-center text-electric-cyan">
            <Music size={24} />
          </div>
          <h3 className="text-2xl font-bold">Key Detection</h3>
          <p className="text-gray-400">Precision Chromagram mapping identifies root notes and scales with zero latency.</p>
        </div>

        <div className="glass p-10 rounded-3xl border border-white/5 space-y-6">
          <div className="w-12 h-12 bg-proton-purple/20 rounded-xl flex items-center justify-center text-proton-purple">
            <Zap size={24} />
          </div>
          <h3 className="text-2xl font-bold">Real-time BPM</h3>
          <p className="text-gray-400">Onset detection algorithms track transients to provide instant tempo analysis.</p>
        </div>

        <div className="glass p-10 rounded-3xl border border-white/5 space-y-6">
          <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-500">
            <Shield size={24} />
          </div>
          <h3 className="text-2xl font-bold">Zero-Server Privacy</h3>
          <p className="text-gray-400">All audio processing happens locally on your device. We never store your raw audio.</p>
        </div>
      </section>

      {/* Footer Branding */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-gray-500 font-mono text-xs uppercase tracking-widest">
          &copy; 2026 LEVIT8 // Scalebanana Implementation
        </p>
      </footer>
    </main>
  );
}
