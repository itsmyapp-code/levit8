'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioAnalyzerProps {
  frequencies: Uint8Array;
  isRecording: boolean;
}

export const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({ frequencies, isRecording }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      
      ctx.clearRect(0, 0, width, height);
      
      if (!isRecording || frequencies.length === 0) {
        // Draw a flat line if not recording
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.strokeStyle = '#00F0FF33';
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      const barWidth = (width / frequencies.length) * 2.5;
      let x = 0;

      for (let i = 0; i < frequencies.length; i++) {
        const barHeight = (frequencies[i] / 255) * height;
        
        // Gradient for the bars
        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, '#1A0B2E');
        gradient.addColorStop(1, '#00F0FF');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  }, [frequencies, isRecording]);

  return (
    <div className="w-full h-48 glass rounded-2xl overflow-hidden neon-border p-4 relative">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={200} 
        className="w-full h-full"
      />
      {!isRecording && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-electric-cyan/50 font-mono text-sm tracking-widest uppercase">
            Waiting for Signal
          </p>
        </div>
      )}
    </div>
  );
};
