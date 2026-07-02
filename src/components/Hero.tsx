import React, { useState, useEffect } from 'react';
import { Search, MapPin, Sparkles, SlidersHorizontal, Users, ArrowRight, Video, Flame, Camera, Sliders, Zap, RefreshCw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CATEGORIES, LOCATIONS } from '../data';

const HERO_BG_IMAGES = [
  "https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/profile/5bf6d6dbcbd22.png", // Runway fashion
  "https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/profile/5bef879f3baeb.png", // Production / Camera set
  "https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/profile/5bf6c1fd68985.png", // Studio model portrait
  "https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/profile/5bf7d06ba333c.png", // Male photoshoot
  "https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/profile/5bfe2e3659518.jpeg", // Film set / Directors board
];

const SLIDE_METADATA = [
  { tag: "EDITORIAL RUNWAY", title: "Ahmed Al Mansoori", location: "Dubai Design District", stats: "178 CM • Green Eyes • Auburn" },
  { tag: "CINEMATIC PRODUCTION", title: "Mariam Al Kaabi", location: "Riyadh Boulevard Studios", stats: "VIP Crew • High-Budget • 4K" },
  { tag: "STUDIO PORTRAIT", title: "Khalid Al Nuaimi", location: "Downtown Dubai", stats: "174 CM • Brown Eyes • Black" },
  { tag: "COMMERCIAL CAMPAIGN", title: "Fatima Al Shehhi", location: "Abu Dhabi Saadiyat", stats: "187 CM • Hazel Eyes • Dark Brown" },
  { tag: "FILM MASTERCLASS", title: "Aisha Al Marri", location: "Riyadh Media Hub", stats: "Lead Talent • Arabic Fluent" },
];

// Interactive Studio Preset Colors
const STUDIO_LIGHTS = [
  {
    id: 'warm-gold',
    name: 'Trendy Pink Key',
    accent: 'from-[#C6007E] via-[#3835A4] to-[#C6007E]',
    bgGlow: 'bg-[#C6007E]/[0.04]',
    spotlight: 'bg-[#C6007E]/[0.12]',
    ringColor: 'border-[#C6007E]/40',
    indicator: 'bg-[#C6007E]',
    textHighlight: 'text-[#C6007E]',
    pillBg: 'bg-[#C6007E]/10 text-[#C6007E] border-[#C6007E]/25',
    btnBg: 'bg-neutral-900 hover:bg-[#C6007E] text-white',
    hexColors: ['#C6007E', '#3835A4', '#880053', '#3835A4', '#C6007E', '#2c2982'],
  },
  {
    id: 'neon-runway',
    name: 'Runway Magenta',
    accent: 'from-[#C6007E] via-[#ffdeeb] to-[#3835A4]',
    bgGlow: 'bg-[#C6007E]/[0.04]',
    spotlight: 'bg-[#C6007E]/[0.12]',
    ringColor: 'border-[#C6007E]/40',
    indicator: 'bg-[#C6007E]',
    textHighlight: 'text-[#C6007E]',
    pillBg: 'bg-[#C6007E]/10 text-[#C6007E] border-[#C6007E]/25',
    btnBg: 'bg-neutral-900 hover:bg-[#C6007E] text-white',
    hexColors: ['#C6007E', '#a70068', '#880053', '#3835A4', '#2c2982', '#1b1959'],
  },
  {
    id: 'cinematic-teal',
    name: 'Teal Anamorphic',
    accent: 'from-emerald-500 via-teal-500 to-emerald-700',
    bgGlow: 'bg-emerald-500/[0.04]',
    spotlight: 'bg-emerald-400/[0.12]',
    ringColor: 'border-emerald-400/40',
    indicator: 'bg-emerald-400',
    textHighlight: 'text-emerald-400',
    pillBg: 'bg-emerald-400/10 text-emerald-700 border-emerald-400/25',
    btnBg: 'bg-neutral-900 hover:bg-emerald-600 text-white',
    hexColors: ['#10b981', '#14b8a6', '#2dd4bf', '#0d9488', '#047857', '#065f46'],
  },
  {
    id: 'sunset-editorial',
    name: 'Yoocasta Royal',
    accent: 'from-[#3835A4] via-[#C6007E] to-[#3835A4]',
    bgGlow: 'bg-[#3835A4]/[0.04]',
    spotlight: 'bg-[#3835A4]/[0.12]',
    ringColor: 'border-[#3835A4]/40',
    indicator: 'bg-[#3835A4]',
    textHighlight: 'text-[#3835A4]',
    pillBg: 'bg-[#3835A4]/10 text-[#3835A4] border-[#3835A4]/25',
    btnBg: 'bg-neutral-900 hover:bg-[#3835A4] text-white',
    hexColors: ['#3835A4', '#C6007E', '#3835A4', '#C6007E', '#3835A4', '#1b1959'],
  },
];

interface HeroProps {
  onSearch: (filters: { category: string; location: string; gender: string; keyword: string }) => void;
  registeredCount: number;
}

export default function Hero({ onSearch, registeredCount }: HeroProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedGender, setSelectedGender] = useState('All');
  const [keyword, setKeyword] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Out of the box controls: Automatic Light Cycle
  const [activeLightIndex, setActiveLightIndex] = useState(0);
  const activeLight = STUDIO_LIGHTS[activeLightIndex];
  const [zoomScale, setZoomScale] = useState(110); // Real-time image zoom percentage (100% - 150%)
  const [focusBlur, setFocusBlur] = useState(0);   // Real-time backdrop/ambient blur (0px - 8px)
  const [shutterFlash, setShutterFlash] = useState(false); // Shutter camera flash effect

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_BG_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lightInterval = setInterval(() => {
      setActiveLightIndex((prev) => (prev + 1) % STUDIO_LIGHTS.length);
    }, 4500); // cycle lights / color gradients every 4.5 seconds
    return () => clearInterval(lightInterval);
  }, []);

  const triggerShutterFlash = () => {
    setShutterFlash(true);
    setTimeout(() => {
      setShutterFlash(false);
    }, 250);
    // Cycle to next image
    setCurrentImageIndex((prev) => (prev + 1) % HERO_BG_IMAGES.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      category: selectedCategory,
      location: selectedLocation,
      gender: selectedGender,
      keyword,
    });
    
    // Smooth scroll to talent pool grid
    const target = document.getElementById('talents-anchor');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const meta = SLIDE_METADATA[currentImageIndex];

  return (
    <div className="relative min-h-[95vh] lg:min-h-[92vh] w-full overflow-hidden bg-white flex flex-col justify-between border-b border-neutral-100">
      
    

      {/* Main Hero Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex-grow flex items-center">
        
        {/* Background Ambient Studio Spots linked to chosen light preset */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Subtle high-key photography studio grid backdrop */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(0,0,0,0.012)_1.5px,transparent_1.5px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
          
          {/* Glowing spotlights which react in color to the selected preset */}
          <div className={`absolute -left-20 top-20 h-[500px] w-[500px] rounded-full ${activeLight.bgGlow} filter blur-[100px] transition-all duration-700`} />
          <div className={`absolute right-10 bottom-10 h-[600px] w-[600px] rounded-full ${activeLight.spotlight} filter blur-[120px] transition-all duration-700`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full relative z-10">
          
          {/* Left panel: Sophisticated brand typography & creative console */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-8">
            
            {/* Live Status Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-[9px] uppercase font-mono font-black tracking-widest text-neutral-800 shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>LIVE GULF SPOTLIGHT</span>
              <span className="text-neutral-300 font-normal">|</span>
              <span className={activeLight.textHighlight}>{registeredCount.toLocaleString()} VETTED TALENTS SECURED</span>
            </div>

            {/* Typography Masterpiece Title */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl sm:text-6xl xl:text-[4.5rem] font-black tracking-tight text-neutral-900 leading-[0.95]">
                SCOUT THE <br />
                <span className={`relative inline-block text-transparent bg-clip-text bg-gradient-to-r ${activeLight.accent} animate-gradient-sweep transition-all duration-[1500ms] ease-in-out`}>
                  PREMIUM FACES
                </span> <br />
                OF ARABIA.
              </h1>
              <p className="max-w-xl text-sm sm:text-base text-neutral-500 font-medium leading-relaxed">
                Middle East‘s leading digital casting platform for luxury runway models, cinematic lead actors, event hosts, and premium production crews. No middleman agency fees.
              </p>
            </div>

            {/* Dynamic Interactive Search Terminal (Mixing Console Design) */}
            <div className="w-full bg-neutral-50 rounded-3xl border border-neutral-200 p-5 sm:p-6 shadow-xl shadow-neutral-100">
              <h2 className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold mb-4 flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-neutral-800" />
                TACTILE ATTRIBUTES SEARCH
              </h2>
              
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  
                  {/* Category Selection */}
                  <div className="flex flex-col gap-1 bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs focus-within:border-neutral-400 transition-colors">
                    <label className="text-[9px] uppercase tracking-widest font-mono font-black text-neutral-400">Specialization</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-transparent text-xs text-neutral-900 font-black focus:outline-none cursor-pointer border-none p-0 mt-1"
                    >
                      <option value="all">Any Specialization</option>
                      {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location Selection */}
                  <div className="flex flex-col gap-1 bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs focus-within:border-neutral-400 transition-colors">
                    <label className="text-[9px] uppercase tracking-widest font-mono font-black text-neutral-400">Location Hub</label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full bg-transparent text-xs text-neutral-900 font-black focus:outline-none cursor-pointer border-none p-0 mt-1"
                    >
                      {LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                  </div>

                  {/* Gender Selection */}
                  <div className="flex flex-col gap-1 bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs focus-within:border-neutral-400 transition-colors">
                    <label className="text-[9px] uppercase tracking-widest font-mono font-black text-neutral-400">Gender Identity</label>
                    <select
                      value={selectedGender}
                      onChange={(e) => setSelectedGender(e.target.value)}
                      className="w-full bg-transparent text-xs text-neutral-900 font-black focus:outline-none cursor-pointer border-none p-0 mt-1"
                    >
                      <option value="All">All Genders</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Non-binary">Non-binary</option>
                    </select>
                  </div>

                  {/* Keywords Input */}
                  <div className="flex flex-col gap-1 bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs focus-within:border-neutral-400 transition-colors">
                    <label className="text-[9px] uppercase tracking-widest font-mono font-black text-neutral-400">Custom Keywords</label>
                    <div className="flex items-center gap-2 mt-1">
                      <Search className="h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      <input 
                        type="text"
                        placeholder="e.g. Height 180, Blonde, Bilingual..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="w-full bg-transparent text-xs text-neutral-900 font-bold focus:outline-none placeholder-neutral-400 p-0"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-neutral-200/50 mt-2">
                  <div className="flex items-center gap-3 text-[10px] text-neutral-400 font-mono">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Users className="h-3.5 w-3.5 text-neutral-500" />
                      AED 20 Entry
                    </span>
                    <span>•</span>
                    <span className="font-bold">Zero Agent Commisions</span>
                  </div>

                  <button
                    type="submit"
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl ${activeLight.btnBg} transition-all duration-300 px-7 py-3.5 text-xs font-black shadow-lg cursor-pointer uppercase tracking-wider group`}
                  >
                    <span>Instant Audition Search</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>

            {/* Tactile Quick Tag Filter Shortcuts */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-500">
              <span className="font-mono text-[9px] uppercase text-neutral-400 font-black tracking-widest">Curator Shortcuts:</span>
              <button 
                onClick={() => { setKeyword(''); onSearch({ category: 'Models', location: 'All Locations', gender: 'All', keyword: '' }); }}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all font-bold cursor-pointer"
              >
                Runway Models
              </button>
              <button 
                onClick={() => { setKeyword(''); onSearch({ category: 'Actors & Extras', location: 'All Locations', gender: 'All', keyword: '' }); }}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all font-bold cursor-pointer"
              >
                Lead Cast
              </button>
              <button 
                onClick={() => { setKeyword('Hostess'); onSearch({ category: 'Promoters & Hosts', location: 'All Locations', gender: 'All', keyword: 'Hostess' }); }}
                className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 transition-all font-bold cursor-pointer"
              >
                Bilingual Hostess
              </button>
            </div>
          </div>

          {/* Right panel: Floating viewport / High-fashion Studio camera Viewfinder */}
          <div className="lg:col-span-5 relative w-full flex flex-col items-center">
            
            {/* Background design accents */}
            <div className={`absolute -inset-4 rounded-[2.5rem] border ${activeLight.ringColor} border-dashed -rotate-2 scale-[0.98] pointer-events-none z-0 transition-all duration-700`} />
            
            {/* Camera Viewfinder Box */}
            <div className="relative z-10 w-full max-w-[390px] sm:max-w-[430px] bg-neutral-950 text-white p-4 pb-6 rounded-[2.25rem] border border-neutral-850 shadow-2xl overflow-hidden group">
              
              {/* Studio Camera Viewfinder Frame */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-950 mb-4 border border-white/5">
                
                {/* Images slide transitions with focus & zoom adjustments */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    className="absolute inset-0 h-full w-full"
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: zoomScale / 100 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <img 
                      src={HERO_BG_IMAGES[currentImageIndex]} 
                      alt="Yoocasta Studio Frame" 
                      className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none transition-all duration-300"
                      style={{ filter: `blur(${focusBlur}px) brightness(1.02)` }}
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Shutter flash screen (Out of the box transition) */}
                {shutterFlash && (
                  <div className="absolute inset-0 bg-white z-50 animate-flash pointer-events-none" />
                )}

                {/* Viewfinder crosshair overlay indicators */}
                <div className="absolute inset-4 border border-white/10 rounded-lg pointer-events-none flex flex-col justify-between p-3.5 z-20">
                  <div className="flex justify-between items-start text-[8px] font-mono text-white/50 tracking-widest font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                      REC L-STUDIO
                    </span>
                    <span>APERTURE F/1.8</span>
                  </div>
                  
                  {/* Studio Crosshair marker */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                    <div className="w-8 h-8 border border-white/40 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-[8px] font-mono text-white/50 tracking-widest font-bold">
                    <span>ZOOM {(zoomScale/100).toFixed(1)}X</span>
                    <span>FOCUS {(100 - focusBlur*12).toFixed(0)}%</span>
                  </div>
                </div>

                {/* Shutter Shoot Button (Awesome creative interactivity) */}
                <button
                  onClick={triggerShutterFlash}
                  title="Capture Portfolio (Cycle Image)"
                  className="absolute top-4 right-4 z-30 p-3.5 rounded-full bg-neutral-900/90 backdrop-blur-md border border-white/25 hover:bg-amber-400 hover:text-neutral-950 transition-all hover:scale-110 active:scale-95 shadow-xl text-amber-400 cursor-pointer"
                >
                  <Camera className="h-4.5 w-4.5 animate-pulse" />
                </button>

                {/* Left Live Pulse Icon */}
                <div className="absolute top-4 left-4 z-20 bg-neutral-950/85 backdrop-blur-md border border-white/15 px-2.5 py-1 rounded-lg text-[8px] font-mono text-white flex items-center gap-1.5 tracking-wider font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>ACTIVE RUNWAY CAM</span>
                </div>

                {/* Immersive Category Spec Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-neutral-950/85 backdrop-blur-lg border border-white/10 p-3.5 rounded-xl">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[8px] font-mono font-black tracking-widest uppercase px-2 py-0.5 rounded ${activeLight.pillBg}`}>
                      {meta.tag}
                    </span>
                    <span className="text-[8px] font-mono text-neutral-450 font-semibold flex items-center gap-0.5">
                      <MapPin className="h-2 w-2 text-[#fcbb00]" /> {meta.location}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-sm font-display font-black text-white">
                        {meta.title}
                      </h3>
                      <p className="text-[9px] font-mono text-neutral-400 mt-0.5 font-bold">
                        {meta.stats}
                      </p>
                    </div>
                    <span className="text-[9px] font-mono font-black text-[#fcbb00] flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded">
                      <Eye className="h-3 w-3" /> VERIFIED
                    </span>
                  </div>
                </div>
              </div>



              {/* Interactive Horizontal Filmstrip selector (Click to switch images) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <p className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest font-black">Interactive Filmstrip Reel</p>
                  <p className="text-[9px] font-mono text-neutral-400 font-bold">{currentImageIndex + 1} / {HERO_BG_IMAGES.length}</p>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {HERO_BG_IMAGES.map((img, idx) => {
                    const isSelected = currentImageIndex === idx;
                    const metaItem = SLIDE_METADATA[idx];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentImageIndex(idx);
                        }}
                        className={`relative aspect-[4/3] w-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all duration-300 cursor-pointer ${
                          isSelected ? 'border-amber-400 scale-102 ring-2 ring-amber-400/20' : 'border-neutral-800 opacity-60 hover:opacity-100'
                        }`}
                        title={metaItem.title}
                      >
                        <img 
                          src={img} 
                          alt="thumbnail" 
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-amber-400/10 flex items-center justify-center">
                            <span className="text-[8px] font-mono text-amber-400 font-black">LIVE</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Custom decorative float elements */}
            <div className="absolute -bottom-6 -right-6 z-20 hidden sm:flex flex-col bg-white border border-neutral-200 p-3.5 rounded-2xl shadow-xl w-36 rotate-3">
              <span className="text-[8px] uppercase tracking-wider font-mono text-neutral-400 font-black">SECURE CONTRACT</span>
              <span className="text-xs font-black text-neutral-900 mt-0.5">100% Escrow</span>
              <span className="text-[9px] text-neutral-500 font-medium mt-1 leading-tight">Brand payout held safely by Yoocasta escrow.</span>
            </div>

            <div className="absolute -top-6 -left-6 z-20 hidden sm:flex items-center gap-2 bg-neutral-950 text-white py-2.5 px-4 rounded-2xl shadow-xl border border-white/10 rotate-[-4deg]">
              <Flame className="h-4 w-4 fill-current text-[#fcbb00] animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-widest font-mono text-[#fcbb00]">AED 20/Mo Premium</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
