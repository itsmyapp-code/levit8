'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useAudioProcessor } from '@/hooks/useAudioProcessor';
import { AudioAnalyzer } from '@/components/AudioAnalyzer';
import { Levit8Icon } from '@/components/audio/Levit8Icon';
import { Mic, MicOff, Activity, Music, Timer } from 'lucide-react';

export default function AnalyzePage() {
  const { isRecording, stats, startRecording, stopRecording } = useAudioProcessor();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-background overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-proton-purple/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-2xl flex flex-col items-center space-y-12 relative z-10">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center"
          >
            <Image 
              src="/levit8.png" 
              alt="LEVIT8" 
              width={240} 
              height={80} 
              className="h-16 w-auto object-contain"
            />
          </motion.div>
          <p className="text-gray-400 font-mono text-xs uppercase tracking-[0.3em]">
            Core Engine V1.0 // Antigravity
          </p>
        </div>

        {/* Central Engine Area */}
        <div className="relative group cursor-pointer" onClick={isRecording ? stopRecording : startRecording}>
          <Levit8Icon isListening={isRecording} className="w-64 h-64" />
          
          <motion.div 
            initial={false}
            animate={{ opacity: isRecording ? 0 : 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest">
              Tap to Analyze
            </div>
          </motion.div>
        </div>

        {/* Real-time Stats Grid */}
        <div className="grid grid-cols-2 gap-6 w-full">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-2"
          >
            <div className="flex items-center space-x-2 text-electric-cyan/60">
              <Timer size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Tempo</span>
            </div>
            <div className="text-4xl font-black text-white">
              {stats.bpm ? stats.bpm : '--'} <span className="text-sm font-normal text-gray-500">BPM</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="glass p-6 rounded-3xl border border-white/5 flex flex-col items-center justify-center space-y-2"
          >
            <div className="flex items-center space-x-2 text-proton-purple/60">
              <Music size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Key</span>
            </div>
            <div className="text-4xl font-black text-white">
              {stats.musicalKey ? stats.musicalKey : '--'}
            </div>
          </motion.div>
        </div>

        {/* Visualizer Area */}
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-2 text-electric-cyan">
              <Activity size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Signal Visualizer</span>
            </div>
            <div className="text-[10px] font-mono text-gray-500">
              {isRecording ? 'STATUS: ANALYZING' : 'STATUS: STANDBY'}
            </div>
          </div>
          <AudioAnalyzer frequencies={stats.frequencies} isRecording={isRecording} />
        </div>

        {/* Identification Footer */}
        <motion.div 
          animate={isRecording ? { opacity: 1 } : { opacity: 0.5 }}
          className="w-full glass p-6 rounded-3xl border border-white/5 text-center"
        >
          <p className="text-sm text-gray-400">
            {isRecording ? 'Listening for musical fingerprint...' : 'Start analysis to identify song metadata.'}
          </p>
        </motion.div>
      </div>

      {/* Control FAB */}
      <button 
        onClick={isRecording ? stopRecording : startRecording}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${
          isRecording 
          ? 'bg-red-500 hover:bg-red-600 shadow-red-500/40' 
          : 'bg-electric-cyan hover:bg-cyan-400 shadow-electric-cyan/40'
        }`}
      >
        {isRecording ? <MicOff className="text-white" /> : <Mic className="text-deep-space-purple" />}
      </button>
    </main>
  );
}
