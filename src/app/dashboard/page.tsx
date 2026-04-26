'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { History, Music, Calendar, Search } from 'lucide-react';

export default function DashboardPage() {
  const history = [
    { id: 1, title: 'Midnight City', artist: 'M83', bpm: 105, key: 'D Maj', date: '2026-04-26' },
    { id: 2, title: 'Starboy', artist: 'The Weeknd', bpm: 186, key: 'A min', date: '2026-04-25' },
    { id: 3, title: 'Get Lucky', artist: 'Daft Punk', bpm: 116, key: 'B min', date: '2026-04-25' },
  ];

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-white tracking-tight">Signal History</h1>
            <p className="text-gray-400 font-mono text-xs uppercase tracking-widest">User ID: ANTG-9283-X</p>
          </div>
          
          <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 w-full md:w-64">
            <Search size={18} className="text-gray-500 mr-2" />
            <input 
              type="text" 
              placeholder="Search fingerprints..." 
              className="bg-transparent border-none outline-none text-sm w-full py-1"
            />
          </div>
        </header>

        <section className="space-y-4">
          {history.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-6 rounded-3xl border border-white/5 flex flex-col md:flex-row items-center gap-6 group hover:border-electric-cyan/30 transition-all"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-electric-cyan/20 to-proton-purple/20 rounded-2xl flex items-center justify-center shrink-0">
                <Music size={24} className="text-electric-cyan" />
              </div>
              
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-white group-hover:text-electric-cyan transition-colors">{item.title}</h3>
                <p className="text-gray-400">{item.artist}</p>
              </div>

              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Tempo</div>
                  <div className="text-lg font-black text-white">{item.bpm}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Key</div>
                  <div className="text-lg font-black text-white">{item.key}</div>
                </div>
                <div className="hidden md:block text-right ml-4">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Identified</div>
                  <div className="text-sm text-gray-400 flex items-center gap-1 justify-end">
                    <Calendar size={12} />
                    {item.date}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4 border-2 border-dashed border-white/5 rounded-3xl">
            <History size={48} className="text-gray-700" />
            <p className="text-gray-500">No signals identified yet. Head to the engine to start.</p>
          </div>
        )}
      </div>
    </main>
  );
}
