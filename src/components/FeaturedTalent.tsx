import React, { useState, useRef } from 'react';
import { Talent } from '../types';
import { Star, MapPin, Eye, Ruler, Sparkles, ChevronDown, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion/react';

interface FeaturedTalentProps {
  talents: Talent[];
  onTalentClick: (talent: Talent) => void;
  selectedCategory: string;
  selectedGender: string;
  selectedLocation: string;
  onGenderChange: (gender: string) => void;
  onLocationChange: (location: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function FeaturedTalent({
  talents,
  onTalentClick,
  selectedCategory,
  selectedGender,
  selectedLocation,
  onGenderChange,
  onLocationChange,
  onCategoryChange,
}: FeaturedTalentProps) {
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Creative custom locations with display label pairing
  const locationOptions = [
    { value: 'All Locations', label: 'All Gulf Regions' },
    { value: 'Dubai, UAE', label: 'Dubai, UAE' },
    { value: 'Sharjah, UAE', label: 'Sharjah, UAE' },
    { value: 'Abu Dhabi, UAE', label: 'Abu Dhabi, UAE' },
    { value: 'Riyadh, Saudi Arabia', label: 'Riyadh, Saudi' },
  ];

  const currentLocationLabel = locationOptions.find(opt => opt.value === selectedLocation)?.label || selectedLocation;

  // Track scroll position of the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Buttery-smooth spring motion to prevent any jitter and emulate fluid cinematic physics with high-inertia float
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 18,   // Lower stiffness for lazy, velvet-like floating motion
    damping: 14,     // Buttery control with elegant, sustained momentum
    mass: 0.5,       // Lightweight but physical feel
    restDelta: 0.0001
  });

  // Calculate dynamic range so smaller results sets look centered while full results scroll elegantly.
  // We translate left-to-right as user scrolls top-to-bottom.
  const totalCards = talents.length;
  const startX = totalCards <= 1 ? "0%" : totalCards <= 2 ? "-5%" : totalCards <= 3 ? "-10%" : "-30%";
  const endX = totalCards <= 1 ? "0%" : totalCards <= 2 ? "5%" : totalCards <= 3 ? "10%" : "8%";
  const xTranslate = useTransform(smoothProgress, [0.05, 0.95], [startX, endX]);

  return (
    <div 
      id="talents-anchor" 
      ref={containerRef}
      className="bg-neutral-50/50 py-24 border-b border-[#f2f2f2] relative overflow-hidden"
    >
      {/* Exquisite ambient lights */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[#3835A4]/[0.035] filter blur-[120px] pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 h-96 w-96 rounded-full bg-[#C6007E]/[0.025] filter blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Selection Filters Heading - Elite Editorial Style */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-16 gap-10 pb-10 border-b border-neutral-200/80">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-800 font-mono font-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3835A4] animate-ping" />
              CURATED ROSTER // ACTIVE AUDITIONS
            </div>
            <h2 className="font-display text-3xl font-black text-neutral-900 sm:text-5xl tracking-tight leading-none">
              Featured Talent Showroom
            </h2>
            <p className="text-sm text-neutral-500 leading-relaxed font-medium">
              Explore professional composite cards vetted for cinematic presence, runway posture, and regional versatility. Click any portfolio card to review digital portfolios, precise measurements, and verified bookers.
            </p>
          </div>

          {/* Luxury Filter Control Center */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-neutral-200/90">
            
            {/* Elegant Segmented Gender Controller with LayoutId sliding effect */}
            <div className="flex bg-neutral-100 p-1 rounded-xl relative">
              {['All', 'Female', 'Male'].map((genderOption) => {
                const isSelected = selectedGender === genderOption;
                return (
                  <button
                    key={genderOption}
                    onClick={() => onGenderChange(genderOption)}
                    className={`relative px-4 py-2 text-xs font-black tracking-wider uppercase transition-colors duration-300 z-10 cursor-pointer ${
                      isSelected ? 'text-white' : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeGenderPill"
                        className="absolute inset-0 bg-gradient-to-r from-[#C6007E] to-[#3835A4] rounded-lg -z-10 shadow-sm"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {genderOption}
                  </button>
                );
              })}
            </div>

            {/* Custom Luxury Location Dropdown Component */}
            <div className="relative">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="bg-white text-xs text-neutral-900 font-black px-4 py-3 rounded-xl border border-neutral-200 hover:border-neutral-300 focus:outline-none cursor-pointer flex items-center gap-2 shadow-xs min-w-[150px] justify-between transition-all"
              >
                <span className="flex items-center gap-1.5 text-neutral-700">
                  <MapPin className="h-3.5 w-3.5 text-neutral-500" />
                  {currentLocationLabel}
                </span>
                <ChevronDown className={`h-3 w-3 text-neutral-400 transition-transform duration-300 ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLocationOpen && (
                  <>
                    {/* Overlay to close the menu on clicking outside */}
                    <div className="fixed inset-0 z-40" onClick={() => setIsLocationOpen(false)} />
                    
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl p-2 z-50 overflow-hidden"
                    >
                      <div className="px-3 py-1.5 border-b border-neutral-100 mb-1">
                        <span className="text-[9px] uppercase font-mono font-bold tracking-widest text-neutral-400">Filter Location</span>
                      </div>
                      {locationOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            onLocationChange(opt.value);
                            setIsLocationOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                            selectedLocation === opt.value
                              ? 'bg-[#3835A4]/10 text-[#3835A4] font-black'
                              : 'text-neutral-700 hover:bg-neutral-50'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {selectedLocation === opt.value && <div className="h-1.5 w-1.5 rounded-full bg-[#3835A4]" />}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Reset Filters with micro animation */}
            {(selectedCategory !== 'all' || selectedGender !== 'All' || selectedLocation !== 'All Locations') && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  onCategoryChange('all');
                  onGenderChange('All');
                  onLocationChange('All Locations');
                }}
                className="text-xs text-neutral-900 hover:text-[#3835A4] transition-colors px-3 py-2.5 font-bold flex items-center gap-1.5 border border-dashed border-neutral-300 rounded-xl hover:border-[#3835A4] bg-neutral-50 cursor-pointer"
              >
                <RefreshCw className="h-3 w-3 animate-spin-slow text-[#3835A4]" />
                Reset Filters
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {/* Talent Grid / Showroom with gorgeous state management */}
      <AnimatePresence mode="wait">
        {talents.length === 0 ? (
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-24 bg-white border border-dashed border-neutral-200/80 rounded-[2rem] shadow-sm max-w-3xl mx-auto"
            >
              <div className="h-14 w-14 rounded-2xl bg-[#3835A4]/10 flex items-center justify-center mx-auto mb-6">
                <Star className="h-7 w-7 text-[#3835A4] animate-pulse" />
              </div>
              <h3 className="font-display text-xl font-black text-neutral-950">No talents found matching the criteria</h3>
              <p className="text-sm text-neutral-500 mt-2 max-w-md mx-auto leading-relaxed">
                We currently do not have matching rosters in this exact combination. Try resetting your physical location parameters or gender filters.
              </p>
              <button
                onClick={() => {
                  onCategoryChange('all');
                  onGenderChange('All');
                  onLocationChange('All Locations');
                }}
                className="mt-6 px-6 py-3 bg-neutral-950 text-white rounded-xl hover:bg-neutral-800 font-bold transition-all border border-neutral-850 cursor-pointer shadow-md inline-flex items-center gap-2 text-xs uppercase tracking-wider"
              >
                <Layers className="h-4 w-4" /> Reset Filters & Show Roster
              </button>
            </motion.div>
          </div>
        ) : (
          <div className="relative w-full overflow-hidden py-4">
            {/* Elegant side fading overlays to support an endless modular runway viewport */}
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-50/95 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-50/95 to-transparent z-20 pointer-events-none" />

            {/* Seamless 1-Row Horizontal Slider reacting perfectly to page scrolls */}
            <motion.div 
              style={{ x: xTranslate }}
              className="flex gap-8 px-6 sm:gap-10 pb-8 w-max select-none"
            >
              {talents.map((talent, index) => {
                return (
                  <motion.div
                    key={talent.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => onTalentClick(talent)}
                    className="group relative h-[520px] w-[290px] sm:w-[350px] md:w-[380px] shrink-0 rounded-[2.25rem] overflow-hidden cursor-pointer bg-neutral-950 border border-neutral-200/90 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out"
                    style={{ contentVisibility: 'auto' }}
                  >
                    {/* Hair-thin Luxury Card Frame Accent Overlay */}
                    <div className="absolute inset-3 border border-white/10 rounded-[1.75rem] pointer-events-none z-20 transition-all duration-500 group-hover:inset-2.5 group-hover:border-[#C6007E]/35" />

                    {/* Image with high fashion focal filter */}
                    <div className="absolute inset-0 h-full w-full">
                      <img
                        src={talent.profileImage}
                        alt={talent.name}
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out scale-100 group-hover:scale-105 filter brightness-95 group-hover:brightness-[0.82]"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      {/* Cinema scope vignette overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/45 to-transparent transition-all duration-500 group-hover:via-neutral-950/50" />
                      <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-neutral-950/80 to-transparent pointer-events-none" />
                    </div>

                    {/* Top metadata tags */}
                    <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
                      {talent.isPremium ? (
                        <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#C6007E] to-[#3835A4] text-white text-[9px] uppercase font-mono font-black tracking-[0.2em] px-3.5 py-1.5 rounded-xl shadow-lg shadow-[#3835A4]/20">
                          <Star className="h-3 w-3 fill-current text-white animate-pulse" />
                          <span>PREMIUM</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 bg-neutral-900/85 backdrop-blur-md text-neutral-200 text-[9px] uppercase font-mono tracking-[0.15em] px-3.5 py-1.5 rounded-xl border border-white/15">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <span>ACTIVE</span>
                        </div>
                      )}
                      
                      <div className="bg-neutral-950/80 backdrop-blur-md text-white/90 text-[10px] font-mono tracking-wider px-3.5 py-1.5 rounded-xl border border-white/10 flex items-center gap-1">
                        <Ruler className="h-3 w-3 text-neutral-400" />
                        <span>{talent.stats.height} CM</span>
                      </div>
                    </div>

                    {/* Bottom main information block */}
                    <div className="absolute inset-x-0 bottom-0 p-7 z-30 flex flex-col justify-end">
                      <div className="flex items-end justify-between gap-4">
                        <div className="space-y-2">
                          
                          {/* Talent Category tags */}
                          <div className="flex flex-wrap gap-1.5">
                            {talent.categories.slice(0, 2).map((cat, idx) => (
                              <span key={idx} className="text-[9px] uppercase font-mono tracking-widest font-black text-[#C6007E] px-2 py-0.5 bg-[#C6007E]/10 rounded-md border border-[#C6007E]/20">
                                {cat}
                              </span>
                            ))}
                          </div>

                          {/* Beautiful display heading */}
                          <h3 className="font-display text-2xl sm:text-3xl font-black text-white group-hover:text-[#C6007E] transition-colors tracking-tight leading-none">
                            {talent.name}
                          </h3>

                          {/* Map Pin */}
                          <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-bold tracking-wide">
                            <MapPin className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                            <span>{talent.location}</span>
                          </div>
                        </div>

                        {/* Interactive dynamic visual action circle */}
                        <div className="p-4 rounded-2xl bg-white text-neutral-900 group-hover:bg-[#3835A4] group-hover:text-white transition-all duration-300 shadow-xl scale-90 group-hover:scale-100 shrink-0 border border-neutral-100">
                          <Eye className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Expandable detailed card physical composite layout on Hover */}
                      <div className="h-0 opacity-0 overflow-hidden group-hover:h-16 group-hover:opacity-100 group-hover:mt-6 transition-all duration-500 ease-out border-t border-white/10 pt-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="space-y-0.5">
                            <p className="text-[8px] text-neutral-400 uppercase font-mono tracking-wider">Shoe Size</p>
                            <p className="text-xs font-black text-white font-mono">{talent.stats.shoeSize || 'N/A'} EU</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[8px] text-neutral-400 uppercase font-mono tracking-wider">Hair Color</p>
                            <p className="text-xs font-black text-white font-mono">{talent.stats.hairColor}</p>
                          </div>
                          <div className="space-y-0.5">
                            <p className="text-[8px] text-neutral-400 uppercase font-mono tracking-wider">Waistline</p>
                            <p className="text-xs font-black text-white font-mono">{talent.stats.waist || 'N/A'} CM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Subtle minimalist runway horizontal scroll tracking bar */}
            <div className="max-w-md mx-auto mt-6 px-4 flex flex-col items-center gap-2">
              <div className="w-full h-[2px] bg-neutral-200/60 rounded-full overflow-hidden relative">
                <motion.div 
                  style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                  className="absolute inset-y-0 left-0 right-0 bg-[#3835A4]"
                />
              </div>
              <span className="text-[9px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-black flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[#C6007E] animate-pulse" />
                Runway Scroll-Linked Parallax
              </span>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

