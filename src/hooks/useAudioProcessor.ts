'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export interface AudioStats {
  bpm: number | null;
  musicalKey: string | null;
  frequencies: Uint8Array;
}

export const useAudioProcessor = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [stats, setStats] = useState<AudioStats>({
    bpm: null,
    musicalKey: null,
    frequencies: new Uint8Array(0),
  });
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();
  
  // BPM Detection State
  const energyHistoryRef = useRef<number[]>([]);
  const lastPeakTimeRef = useRef<number>(0);
  const peaksRef = useRef<number[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const context = new AudioContextClass();
      audioContextRef.current = context;
      
      const source = context.createMediaStreamSource(stream);
      const analyser = context.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;
      
      setIsRecording(true);
      processAudio();
    } catch (err) {
      console.error('Error accessing microphone:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsRecording(false);
    setStats(prev => ({ ...prev, frequencies: new Uint8Array(0) }));
    peaksRef.current = [];
  }, []);

  const processAudio = useCallback(() => {
    if (!analyserRef.current) return;
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const analyze = () => {
      if (!analyserRef.current) return;
      analyserRef.current.getByteFrequencyData(dataArray);
      
      // 1. Calculate instant energy
      let energy = 0;
      for (let i = 0; i < dataArray.length; i++) {
        energy += dataArray[i];
      }
      energy /= dataArray.length;

      // 2. BPM: Onset Detection Logic
      // Compare current energy with average energy in recent history
      const avgEnergy = energyHistoryRef.current.length > 0 
        ? energyHistoryRef.current.reduce((a, b) => a + b) / energyHistoryRef.current.length 
        : 0;

      const now = performance.now();
      if (energy > avgEnergy * 1.5 && now - lastPeakTimeRef.current > 300) {
        peaksRef.current.push(now);
        lastPeakTimeRef.current = now;
        
        // Keep only peaks from the last 5 seconds
        peaksRef.current = peaksRef.current.filter(p => now - p < 5000);
      }

      energyHistoryRef.current.push(energy);
      if (energyHistoryRef.current.length > 50) energyHistoryRef.current.shift();

      const currentBpm = peaksRef.current.length > 1 
        ? Math.round((peaksRef.current.length / ( (now - peaksRef.current[0]) / 1000 )) * 60)
        : null;

      // 3. Key: Chromagram Mapping (simplified)
      const currentKey = detectKey(dataArray);
      
      setStats({
        bpm: currentBpm ? Math.min(Math.max(currentBpm, 60), 200) : null,
        musicalKey: currentKey,
        frequencies: new Uint8Array(dataArray),
      });
      
      animationFrameRef.current = requestAnimationFrame(analyze);
    };
    
    analyze();
  }, []);

  const detectKey = (data: Uint8Array): string | null => {
    // Map frequency bins to semitones (simplified Chromagram)
    // In a real app, this would use a more sophisticated pitch detection (like YIN or ACF)
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const binToNote = (bin: number) => {
      const freq = bin * (44100 / 2048);
      if (freq <= 0) return null;
      const midi = Math.round(12 * Math.log2(freq / 440) + 69);
      return notes[midi % 12];
    };

    const chroma = new Array(12).fill(0);
    for (let i = 10; i < data.length / 4; i++) { // Focus on lower-mid frequencies
      const noteIdx = notes.indexOf(binToNote(i) || '');
      if (noteIdx !== -1) {
        chroma[noteIdx] += data[i];
      }
    }

    const maxVal = Math.max(...chroma);
    const rootIdx = chroma.indexOf(maxVal);
    if (maxVal < 50) return null; // Noise threshold
    
    // Simple major/minor heuristic: check the third
    const isMinor = chroma[(rootIdx + 3) % 12] > chroma[(rootIdx + 4) % 12];
    return `${notes[rootIdx]} ${isMinor ? 'min' : 'Maj'}`;
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return {
    isRecording,
    stats,
    startRecording,
    stopRecording,
    analyser: analyserRef.current
  };
};
