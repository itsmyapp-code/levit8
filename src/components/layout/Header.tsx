'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LayoutDashboard, Mic, ShieldCheck } from 'lucide-react';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between glass px-6 py-3 rounded-2xl border border-white/5">
        <Link href="/" className="text-2xl font-black tracking-tighter text-white">
          LEVIT<span className="text-electric-cyan">8</span>
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link href="/analyze" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-electric-cyan transition-colors flex items-center gap-2">
            <Mic size={14} />
            <span className="hidden sm:inline">Engine</span>
          </Link>
          <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-electric-cyan transition-colors flex items-center gap-2">
            <LayoutDashboard size={14} />
            <span className="hidden sm:inline">History</span>
          </Link>
          <Link href="/compliance/privacy" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-electric-cyan transition-colors flex items-center gap-2">
            <ShieldCheck size={14} />
            <span className="hidden sm:inline">Secure</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};
