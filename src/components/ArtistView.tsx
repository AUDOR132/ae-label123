import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Disc, Youtube, Music, ExternalLink, X, ArrowUpRight, Radio } from 'lucide-react';
import { Language, Album } from '../types';
import { ARTIST_INFO, ALBUMS } from '../data';

interface ArtistViewProps {
  language: Language;
}

export default function ArtistView({ language }: ArtistViewProps) {
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 py-20 pb-32" id="artist-page-container">
      {/* Bio / Portrait Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-24">
        {/* Left Side: Modern layout Fine-Art Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
          id="artist-avatar-container"
        >
          <div className="relative group w-full max-w-sm aspect-[3/4] overflow-hidden rounded bg-[#1C1C1E] border border-white/5 shadow-2xl">
            {/* Ambient Background glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
            
            <img 
              src={ARTIST_INFO.avatarUrl} 
              alt="D.Laughing Portrait" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-105"
            />
            
            <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
              <div>
                <p className="text-[10px] font-mono tracking-[0.3em] text-[#8E8E93] uppercase">Represented Artist</p>
                <h3 className="font-serif text-lg tracking-wider text-[#F8F8F8]">D.LAUGHING</h3>
              </div>
              <span className="text-[10px] font-mono text-[#D4AF37] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full uppercase tracking-widest">
                ROSTER
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Editorial bio */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center"
          id="artist-description-words"
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-[#D4AF37] uppercase mb-4 block">
            Featured Artist
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-wide text-[#F8F8F8] mb-8 leading-tight">
            {ARTIST_INFO.name}
          </h2>
          
          <div className="h-[1px] w-12 bg-[#D4AF37]/40 mb-8" />

          <p className="font-serif text-xl sm:text-2xl font-light leading-relaxed text-[#F8F8F8]/90 italic mb-10 pl-4 border-l border-white/10">
            "{ARTIST_INFO.bio[language]}"
          </p>

          <p className="text-sm font-sans font-light leading-relaxed text-[#8E8E93] max-w-lg">
            {language === 'en' 
              ? "Bridging acoustic philosophy and concrete structural forms, D.Laughing drafts continuous scores of contemporary ambience. His creations serve as architecture for the mind, crafted systematically under ae Label's boutique directorship."
              : "Kết nối triết học âm học và các định hình cấu trúc cụ thể, D.Laughing kiến tạo những dòng nhạc đương đại trường cửu. Những tác phẩm của anh đóng vai trò là kiến trúc cho tâm trí, được chế tác một cách có hệ thống dưới sự định hướng nghệ thuật của ae Label."
            }
          </p>
        </motion.div>
      </div>

      {/* Discography Section Header */}
      <div className="border-t border-white/5 pt-16 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="text-[10px] font-mono tracking-[0.4em] text-[#8E8E93] uppercase mb-2">DISCOGRAPHY</p>
            <h3 className="font-serif text-3xl font-light tracking-wide text-[#F8F8F8]">
              {language === 'en' ? "Curated Publications" : "Tác Phẩm Phát Hành"}
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8E8E93] tracking-widest uppercase">
            {ALBUMS.length} {language === 'en' ? "Releases Total" : "Ấn Bản Hiện Có"}
          </span>
        </div>
      </div>

      {/* Album Covers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="discography-album-grid">
        {ALBUMS.map((album, idx) => (
          <motion.div
            key={album.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedAlbum(album)}
            className="group cursor-pointer flex flex-col"
            id={`album-card-${album.id}`}
          >
            {/* Cover art with beautiful matte effect and subtle luxury borders */}
            <div className="relative aspect-square w-full rounded overflow-hidden bg-[#1E1E1E] border border-white/5 transition-all duration-500 shadow-lg group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)] group-hover:border-white/15">
              
              {/* Overlay elements showing up on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="rounded-full bg-[#F8F8F8] text-[#121212] p-4 flex items-center justify-center shadow-lg"
                >
                  <Disc className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
                </motion.div>
              </div>

              <img 
                src={album.coverUrl} 
                alt={album.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Year badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-mono tracking-widest rounded-full text-[#F8F8F8] border border-white/15">
                  {album.year}
                </span>
              </div>
            </div>

            {/* Title block */}
            <div className="mt-4 flex flex-col">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#8E8E93] mb-1">
                {language === 'en' ? 'Album Release' : 'Album Phát Hành'}
              </span>
              <h4 className="font-serif text-lg tracking-wider text-[#F8F8F8] transition-colors duration-300 group-hover:text-[#D4AF37]">
                {album.title}
              </h4>
              <p className="text-xs font-mono text-[#8E8E93]/60 mt-1 flex items-center gap-1.5">
                <span>D.LAUGHING</span> • <span>Digital Audio Gateways</span>
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Streaming details dialog overlay */}
      <AnimatePresence>
        {selectedAlbum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-hidden" id="album-modal-portal">
            {/* Backdrop with blur & smooth fade-in */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlbum(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body Container with modern scale transition */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl bg-[#18181A] rounded-lg border border-white/10 z-10 overflow-hidden shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors duration-300 z-30 bg-black/40 rounded-full p-2 hover:bg-black/60"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Cover visual pane */}
              <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full min-h-[300px] relative bg-neutral-900 border-b md:border-b-0 md:border-r border-white/5">
                <img 
                  src={selectedAlbum.coverUrl} 
                  alt={selectedAlbum.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="font-mono text-xs text-[#D4AF37] px-2 py-0.5 rounded border border-[#D4AF37]/30 uppercase bg-black/40">
                    {selectedAlbum.year}
                  </span>
                </div>
              </div>

              {/* Data & Gateways pane */}
              <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[9px] text-[#8E8E93] uppercase tracking-[0.35em] block mb-1">
                    {language === 'en' ? "ae Label Publication" : "Ấn Bản ae Label"}
                  </span>
                  
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F8F8F8] tracking-widest uppercase mb-4">
                    {selectedAlbum.title}
                  </h3>
                  
                  <p className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mb-6">
                    Artist: D.LAUGHING
                  </p>

                  <p className="text-xs text-[#8E8E93] leading-relaxed font-sans font-light mb-6">
                    {language === 'en' ? selectedAlbum.descriptionEn : selectedAlbum.descriptionVn}
                  </p>
                </div>

                {/* Gateways Buttons section */}
                <div className="space-y-3.5 mt-4">
                  <p className="text-[10px] font-mono tracking-[0.25em] text-[#8E8E93] uppercase mb-1">
                    {language === 'en' ? "Select Streaming Gateway" : "Chọn Cổng Phát Nhạc trực tuyến"}
                  </p>

                  {/* Spotify */}
                  <a
                    href={selectedAlbum.spotifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white/90 hover:text-white transition-all duration-300 text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <Radio className="w-4 h-4 text-[#1DB954]" />
                      <span className="tracking-wide">Spotify</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white" />
                  </a>

                  {/* Apple Music */}
                  <a
                    href={selectedAlbum.appleMusicUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white/90 hover:text-white transition-all duration-300 text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <Music className="w-4 h-4 text-[#FC3C44]" />
                      <span className="tracking-wide">Apple Music</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                  </a>

                  {/* YouTube */}
                  <a
                    href={selectedAlbum.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-4 py-3 rounded bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white/90 hover:text-white transition-all duration-300 text-xs font-mono"
                  >
                    <div className="flex items-center gap-3">
                      <Youtube className="w-4 h-4 text-[#FF0000]" />
                      <span className="tracking-wide">YouTube</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/40" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
