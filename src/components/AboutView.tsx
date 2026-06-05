import React from 'react';
import { motion } from 'motion/react';
import { ABOUT_TEXT } from '../data';
import { Language } from '../types';
import { Layers, Globe, Palette, Shield } from 'lucide-react';

interface AboutViewProps {
  language: Language;
}

export default function AboutView({ language }: AboutViewProps) {
  // Map icons to the 3 services
  const icons = [Layers, Globe, Palette];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-20 pb-32" id="about-page-container">
      {/* Intro tag */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center mb-20"
      >
        <span className="text-[10px] font-mono tracking-[0.43em] text-[#D4AF37] uppercase mb-4 block">
          {language === 'en' ? "ART & ECHO ECOSYSTEM" : "HỆ SINH THÁI ÂM THANH & NGHỆ THUẬT"}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl font-light tracking-wide text-[#F8F8F8]">
          ae Label
        </h2>
        <div className="h-[1px] w-12 bg-white/10 mt-6" />
      </motion.div>

      {/* Grid of Content columns: Vision & Foundation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-24">
        {/* THE VISION section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col bg-[#161618] border border-white/5 rounded-lg p-8 md:p-10 shadow-lg relative overflow-hidden"
          id="vision-section"
        >
          {/* Faint luxury background visual numbering */}
          <span className="absolute right-6 top-4 font-serif text-8xl font-black text-white/[0.015] select-none">I</span>
          
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#8E8E93] uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            {ABOUT_TEXT.visionTitle[language]}
          </p>
          <h3 className="font-serif text-2xl font-light tracking-wide text-[#F8F8F8] mb-6 leading-relaxed">
            {language === 'en' ? "Bridging Artistic Freedom & Distribution" : "Kết Nối Bản Sắc Sáng Tạo Với Toàn Cầu"}
          </h3>
          <p className="font-sans font-light text-sm text-[#8E8E93] leading-relaxed">
            {ABOUT_TEXT.visionBody[language]}
          </p>
        </motion.div>

        {/* FOUNDATION section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col bg-[#161618] border border-white/5 rounded-lg p-8 md:p-10 shadow-lg relative overflow-hidden"
          id="foundation-section"
        >
          {/* Faint luxury background visual numbering */}
          <span className="absolute right-6 top-4 font-serif text-8xl font-black text-white/[0.015] select-none">II</span>

          <p className="text-[10px] font-mono tracking-[0.3em] text-[#8E8E93] uppercase mb-6 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            {ABOUT_TEXT.foundationTitle[language]}
          </p>
          <h3 className="font-serif text-2xl font-light tracking-wide text-[#F8F8F8] mb-6 leading-relaxed">
            {language === 'en' ? "Under the Aegis of AUDOR" : "Trực Thuộc AUDOR Co., Ltd."}
          </h3>
          <p className="font-sans font-light text-sm text-[#8E8E93] leading-relaxed">
            {ABOUT_TEXT.foundationBody[language]}
          </p>
        </motion.div>
      </div>

      {/* SERVICES Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="border-t border-white/5 pt-16"
        id="services-container"
      >
        <div className="mb-12">
          <p className="text-[10px] font-mono tracking-[0.43em] text-[#8E8E93] uppercase mb-2">CAPABILITIES</p>
          <h3 className="font-serif text-3xl font-light tracking-wide text-[#F8F8F8]">
            {ABOUT_TEXT.servicesTitle[language]}
          </h3>
        </div>

        {/* Dynamic Service Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ABOUT_TEXT.services.map((service, idx) => {
            const IconComponent = icons[idx];
            return (
              <div 
                key={idx}
                className="group border border-white/5 rounded-lg bg-[#161618] p-6 transition-all duration-500 hover:border-[#D4AF37]/30 hover:bg-[#1C1C1E] shadow-sm transform-gpu hover:-translate-y-1"
                id={`service-card-${idx}`}
              >
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#D4AF37]/10 transition-colors duration-300">
                  <IconComponent className="w-4 h-4 text-white/70 group-hover:text-[#D4AF37] transition-colors duration-300" />
                </div>
                
                <span className="font-mono text-xs text-[#8E8E93]/40 tracking-widest block mb-2">
                  0{idx + 1}
                </span>

                <h4 className="font-serif text-lg tracking-wider text-[#F8F8F8] group-hover:text-[#D4AF37] transition-all duration-300 mb-3">
                  {language === 'en' ? service.en : service.vn}
                </h4>

                <p className="text-xs text-[#8E8E93] leading-relaxed font-sans font-light">
                  {idx === 0 && (language === 'en' 
                    ? "Full catalog administration, career blueprint development, and elite resource strategic distribution for fine acoustic talents." 
                    : "Quản trị toàn diện danh mục tác phẩm, xây dựng lộ trình sự nghiệp và quản lý nguồn lực chiến lược dành cho các tài năng âm nhạc.")}
                  {idx === 1 && (language === 'en' 
                    ? "Direct digital ingestion across world-class digital service providers, global rights mapping, and royalty pipelines automation." 
                    : "Đưa tác phẩm trực tiếp lên các nền tảng streaming quốc tế lớn, tối ưu hóa bản quyền và tự động hóa hệ thống doanh thu.")}
                  {idx === 2 && (language === 'en' 
                    ? "Curator grade visual production, album identity drafting, brand positioning, and unique avant-garde artwork packaging." 
                    : "Sản xuất hình ảnh chuẩn nghệ thuật trưng bày, thiết kế bản sắc album, định vị thương hiệu và bao bì tác phẩm độc đáo.")}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
