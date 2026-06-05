import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Compass, Calendar, Sparkles } from 'lucide-react';
import { Language, Page } from './types';
import { HERO_TEXT } from './data';
import Preloader from './components/Preloader';
import InteractiveBubbles from './components/InteractiveBubbles';
import ArtistView from './components/ArtistView';
import AboutView from './components/AboutView';

export default function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Close mobile menu on page changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

  return (
    <div className="relative min-h-screen bg-[#121212] text-[#F8F8F8] font-sans selection:bg-[#D4AF37]/30 selection:text-[#F8F8F8] overflow-hidden flex flex-col justify-between" id="ae-main-app-shell">
      {/* 1. High-Fidelity Entrance Preloader */}
      <AnimatePresence>
        {loading && (
          <Preloader onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* 2. Architectural Overlay Layout Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none z-0" 
        id="background-fine-art-grid"
      />
      
      {/* Vignette dark shadowing around edges */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#121212_100%)] pointer-events-none z-0" />

      {/* 3. Ambient Physics Bubble canvas */}
      {!loading && <InteractiveBubbles />}

      {/* 4. Elegant Minimal Header Navigation */}
      {!loading && (
        <motion.header 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full px-6 md:px-12 py-8 z-40 transition-all duration-300"
          id="ae-brand-header"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Header Brand Logo (Left on desktop/mobile) */}
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-3.5 group cursor-pointer focus:outline-none"
              aria-label="Return back to Home page"
              id="header-brand-trigger"
            >
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/20 group-hover:border-[#D4AF37]/50 transition-all duration-500 transform group-hover:scale-105">
                <span className="font-serif text-sm font-light text-[#F8F8F8] select-none tracking-tight group-hover:text-[#D4AF37] transition-all duration-300">ae</span>
              </div>
              <span className="font-serif text-base font-light tracking-[0.3em] pl-0.5 text-[#F8F8F8] group-hover:opacity-100 transition-opacity duration-500 uppercase select-none">
                ae label
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-12" id="desktop-routing-bar">
              <button 
                onClick={() => setCurrentPage('artist')}
                className={`relative py-1 text-[11px] font-mono tracking-[0.3em] font-light transition-all duration-500 hover:text-[#F8F8F8] cursor-pointer focus:outline-none ${
                  currentPage === 'artist' ? 'text-[#D4AF37]' : 'text-[#8E8E93]'
                }`}
              >
                ARTIST
                {currentPage === 'artist' && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37]" 
                  />
                )}
              </button>

              <button 
                onClick={() => setCurrentPage('about')}
                className={`relative py-1 text-[11px] font-mono tracking-[0.3em] font-light transition-all duration-500 hover:text-[#F8F8F8] cursor-pointer focus:outline-none ${
                  currentPage === 'about' ? 'text-[#D4AF37]' : 'text-[#8E8E93]'
                }`}
              >
                ABOUT
                {currentPage === 'about' && (
                  <motion.div 
                    layoutId="activeUnderline" 
                    className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#D4AF37]" 
                  />
                )}
              </button>
            </nav>

            {/* Language & Menu Controls */}
            <div className="flex items-center gap-6 z-40">
              {/* Language Switch: EN / VN */}
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8E8E93] bg-black/15 border border-white/5 py-1 px-3 rounded-full" id="lang-switcher">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`transition-colors duration-300 font-medium ${
                    language === 'en' ? 'text-[#F8F8F8]' : 'hover:text-[#F8F8F8] text-[#8E8E93]/60'
                  }`}
                  aria-label="Set language to English"
                >
                  EN
                </button>
                <span className="text-white/10">|</span>
                <button 
                  onClick={() => setLanguage('vn')}
                  className={`transition-colors duration-300 font-medium ${
                    language === 'vn' ? 'text-[#F8F8F8]' : 'hover:text-[#F8F8F8] text-[#8E8E93]/60'
                  }`}
                  aria-label="Set language to Vietnamese"
                >
                  VN
                </button>
              </div>

              {/* Mobile Hamburger menu Button */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#F8F8F8]/80 hover:text-white bg-black/25 rounded-md border border-white/5 cursor-pointer focus:outline-none"
                aria-label="Open navigation menu"
                id="mobile-hamburger-trigger"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.header>
      )}

      {/* 5. Mobile Drawer Overlay Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 w-4/5 max-w-sm bg-[#161618] border-l border-white/10 z-[45] flex flex-col justify-between p-8 pt-28 shadow-2xl md:hidden"
            id="mobile-navigation-drawer"
          >
            {/* Top decorative line */}
            <div className="absolute top-24 left-8 right-8 h-[1px] bg-white/5" />

            {/* Menu Links */}
            <nav className="flex flex-col gap-8 pl-4">
              <button 
                onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
                className={`text-left font-serif text-3xl font-light tracking-widest uppercase transition-all duration-300 ${
                  currentPage === 'home' ? 'text-[#D4AF37]' : 'text-[#8E8E93]'
                }`}
              >
                HOME
              </button>
              
              <button 
                onClick={() => { setCurrentPage('artist'); setMobileMenuOpen(false); }}
                className={`text-left font-serif text-3xl font-light tracking-widest uppercase transition-all duration-300 ${
                  currentPage === 'artist' ? 'text-[#D4AF37]' : 'text-[#8E8E93]'
                }`}
              >
                ARTIST
              </button>

              <button 
                onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
                className={`text-left font-serif text-3xl font-light tracking-widest uppercase transition-all duration-300 ${
                  currentPage === 'about' ? 'text-[#D4AF37]' : 'text-[#8E8E93]'
                }`}
              >
                ABOUT
              </button>
            </nav>

            {/* Bottom metadata tags */}
            <div className="border-t border-white/5 pt-8 pl-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#8E8E93] uppercase block mb-2">
                Ecosystem
              </span>
              <p className="text-xs font-serif text-[#F8F8F8]/90 tracking-wide font-light">
                {language === 'en' ? "Where sound finds its home." : "Nơi âm thanh tìm thấy ngôi nhà chính mình."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background dimmer for active mobile drawers */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-[44] bg-black/70 backdrop-blur-sm md:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* 6. Main Interactive Views Portal */}
      <main className="relative flex-grow flex items-center justify-center w-full z-20 overflow-hidden" id="ae-content-portal">
        <AnimatePresence mode="wait">
          {/* A. Hero Screen */}
          {currentPage === 'home' && !loading && (
            <motion.div 
              key="hero-panel"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-4xl mx-auto px-6 text-center select-none flex flex-col items-center justify-center py-20"
              id="hero-view-container"
            >
              {/* Luxury Geometric Title Sigil */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-20 h-20 rounded-full border border-[#D4AF37]/35 flex items-center justify-center relative mb-10 group cursor-pointer focus:outline-none"
                onClick={() => {
                  // Re-pulse bubbles trigger of some sort
                  const customEv = new MouseEvent('mousedown', {
                    clientX: window.innerWidth / 2,
                    clientY: window.innerHeight / 2
                  });
                  document.getElementById('bubbles-interactive-layer')?.dispatchEvent(customEv);
                }}
              >
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#D4AF37]/15 group-hover:rotate-45 transition-transform duration-[4s] ease-out" />
                <span className="font-serif text-3xl font-light tracking-wide text-[#F8F8F8] group-hover:text-[#D4AF37] transition-all duration-500">ae</span>
              </motion.div>

              {/* Title Header */}
              <motion.h1
                initial={{ opacity: 0, letterSpacing: '0.25em' }}
                animate={{ opacity: 1, letterSpacing: '0.45em' }}
                transition={{ duration: 1.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.45em] text-[#F8F8F8] uppercase mb-8 leading-none pl-[0.45em]"
              >
                ae label
              </motion.h1>

              {/* Sub-Text (Bilingual Words) */}
              <motion.div
                key={`bilingual-fade-${language}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 0.85, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="mb-12 max-w-xl"
              >
                <p className="font-serif text-xl sm:text-2xl font-light tracking-wider leading-relaxed text-[#F8F8F8] italic">
                  "{HERO_TEXT[language]}"
                </p>
              </motion.div>

              {/* Visual guidance action prompts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                className="flex items-center gap-2.5 px-5 py-2.5 border border-white/5 bg-white/[0.02] rounded-full text-[10px] font-mono uppercase tracking-[0.2em] text-[#8E8E93] hover:opacity-100 hover:border-white/10 transition-all duration-300"
              >
                <Sparkles className="w-3 h-3 text-[#D4AF37] animate-pulse" />
                <span>
                  {language === 'en' ? "tap floating spheres to release sparks" : "chạm vào các bong bóng để giải phóng tia lửa"}
                </span>
              </motion.div>

              {/* Call to action links leading inside pages */}
              <div className="flex items-center gap-8 mt-14" id="hero-mini-menu">
                <button 
                  onClick={() => setCurrentPage('artist')}
                  className="group flex items-center gap-2 text-xs font-mono text-[#D4AF37] hover:text-[#F8F8F8] tracking-widest uppercase transition-colors duration-300 focus:outline-none"
                >
                  <span>{language === 'en' ? "ENTER ARTIST" : "XEM NGHỆ SĨ"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
                <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="group flex items-center gap-2 text-xs font-mono text-[#8E8E93] hover:text-[#F8F8F8] tracking-widest uppercase transition-colors duration-300 focus:outline-none"
                >
                  <span>{language === 'en' ? "VIEW ABOUT" : "VỀ CHÚNG TÔI"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          )}

          {/* B. Artist Screen */}
          {currentPage === 'artist' && !loading && (
            <motion.div 
              key="artist-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative min-h-screen pt-12"
            >
              <ArtistView language={language} />
            </motion.div>
          )}

          {/* C. About Screen */}
          {currentPage === 'about' && !loading && (
            <motion.div 
              key="about-panel"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="w-full relative min-h-screen pt-12"
            >
              <AboutView language={language} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 7. Ambient Static Fixed Footer */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="fixed bottom-6 left-6 md:bottom-8 md:left-12 z-40 hidden sm:block"
          id="ae-fixed-legal-footer"
        >
          <p className="text-[9px] font-mono tracking-[0.3em] text-[#8E8E93]/60 uppercase select-none">
            © 2026 ae Label. All rights reserved.
          </p>
        </motion.div>
      )}

      {/* 8. Mobile Legal Footer (When view stretches, render static footer on bottom) */}
      {!loading && (
        <div className="w-full text-center py-6 sm:hidden z-30 opacity-50 relative border-t border-white/[0.02]" id="ae-mobile-static-footer">
          <p className="text-[9px] font-mono tracking-[0.2em] text-[#8E8E93] uppercase">
            © 2026 ae Label. All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
}
