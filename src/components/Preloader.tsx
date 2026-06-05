import React from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 bg-[#121212] z-50 flex flex-col items-center justify-center overflow-hidden"
      id="ae-preloader-screen"
    >
      <div className="relative flex flex-col items-center">
        {/* Soft elegant background glow sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.12, scale: 1.2 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute w-80 h-80 rounded-full bg-white blur-3xl pointer-events-none"
        />

        {/* Minimal geometric circular sigil indicating luxury art division */}
        <motion.div
          initial={{ opacity: 0, rotate: -45, scale: 0.9 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center relative"
        >
          <div className="absolute inset-1 rounded-full border border-dashed border-white/10 animate-spin [animation-duration:40s]" />
          <span className="font-serif text-2xl tracking-normal text-[#F8F8F8] font-light">ae</span>
        </motion.div>

        {/* Brand name and line element */}
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl font-light text-[#F8F8F8] leading-none mb-3 uppercase pl-[0.4em]"
          >
            ae Label
          </motion.h1>
          
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 40, opacity: 0.4 }}
            transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-white mx-auto my-3"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#8E8E93]"
          >
            Artistic Acoustic Ecosystem
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
