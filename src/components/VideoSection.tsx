import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Tv, ArrowRight, ShieldCheck, Zap, Instagram, Film, Disc } from 'lucide-react';

interface VideoClip {
  id: string;
  title: string;
  talentName: string;
  category: string;
  location: string;
  videoUrl: string;
  posterUrl: string;
  views: string;
  tags: string[];
}

const VIDEO_CLIPS: VideoClip[] = [
  {
    id: '1',
    title: 'Cyber Couture Editorial Walk',
    talentName: 'Amira Al-Mansoori',
    category: 'High Fashion Runway',
    location: 'Dubai Design District',
    videoUrl: 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/casting_video/casting_video_10005.mp4',
    posterUrl: 'c2.PNG',
    views: '12.4K views',
    tags: ['Aesthetic Walk', 'Silver Metallic', 'Elite Model']
  },
  {
    id: '2',
    title: 'Neo-Glow Audition Reel',
    talentName: 'Zayd Al-Hassan',
    category: 'Commercial Screen Play',
    location: 'Riyadh Studio',
    videoUrl: 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/casting_video/casting_video_10158.mp4',
    posterUrl: 'v3.PNG',
    views: '8.9K views',
    tags: ['Neon Cinematic', 'GCC Commercial', 'Acting Lead']
  },
  {
    id: '3',
    title: 'Golden Hour Beauty Portfolio',
    talentName: 'Elena Rostova',
    category: 'Editorial Portrait Reel',
    location: 'Jumeirah Beach Coast',
    videoUrl: 'https://pub-9a6daccdd56649a4bb690162026e4c5d.r2.dev/casting_video/casting_video_10107.mp4',
    posterUrl: 'v1.PNG',
    views: '15.2K views',
    tags: ['Gloss Gold', 'Luxury Cosmetics', 'Face Model']
  }
];

export default function VideoSection() {
  const [activeClipId, setActiveClipId] = useState<string>(VIDEO_CLIPS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeClip = VIDEO_CLIPS.find(clip => clip.id === activeClipId) || VIDEO_CLIPS[0];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Fallback to paused if browser blocks autoPlay
          setIsPlaying(false);
        });
      }
    }
  }, [activeClipId]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="w-full bg-neutral-950 text-white py-24 border-b border-neutral-800 relative overflow-hidden">
      {/* Editorial Luxury Lighting Flares */}
      <div className="absolute right-[-10%] top-0 h-[500px] w-[500px] rounded-full bg-[#3835A4]/[0.15] filter blur-[150px] pointer-events-none" />
      <div className="absolute left-[-10%] bottom-0 h-[500px] w-[500px] rounded-full bg-[#C6007E]/[0.12] filter blur-[150px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(56,53,164,0.08)_1px,transparent_1px)] [background-size:32px_32px] opacity-60 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Headings */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10 pb-8 border-b border-neutral-800/80">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#C6007E] font-mono font-black">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6007E] animate-ping" />
              DIGITAL RUNWAY SHOWROOM // GEN-Z TRENDS
            </div>
            <h2 className="font-display text-3xl font-black text-white sm:text-5xl tracking-tight leading-none">
              High-Energy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6007E] to-[#3835A4]">Casting Reels</span>
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-medium">
              Witness our premier talents in motion. Immersive video audition files, lookbooks, and high fashion digital runway walks vetted by elite international casting curators.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-2.5 rounded-2xl">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#C6007E] animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-[#3835A4] animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
              </div>
              <span className="text-[10px] font-mono font-black text-neutral-300 uppercase tracking-widest">
                GCC AUDITION STUDIO
              </span>
            </div>
          </div>
        </div>

        {/* Large Layout Video Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Main Trendy Video Player (Takes 7 Cols on Large Screens) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-black/40 border border-neutral-800 shadow-2xl group flex flex-col justify-end">
              
              {/* Hair-thin visual premium lens flare frame */}
              <div className="absolute inset-4 border border-white/5 rounded-[2rem] pointer-events-none z-20" />
              
              {/* The Actual Autoplay Video Component */}
              <video
                ref={videoRef}
                key={activeClip.id}
                src={activeClip.videoUrl}
                poster={activeClip.posterUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
              />

              {/* Black Gradient Vignette for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 z-10 pointer-events-none" />

              {/* Status Ribbon & Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2">
                <div className="flex items-center gap-1.5 bg-[#C6007E]/95 text-white text-[9px] uppercase font-mono font-black tracking-widest px-3 py-1.5 rounded-xl shadow-lg">
                  <Film className="h-3 w-3 animate-spin-slow" />
                  <span>AUTOPLAY ACTIVE</span>
                </div>
                <div className="bg-neutral-900/80 backdrop-blur-md text-neutral-300 text-[9px] font-mono font-black tracking-widest px-3 py-1.5 rounded-xl border border-white/10">
                  {activeClip.location.toUpperCase()}
                </div>
              </div>

              {/* Interactive Player Controls floating overlay */}
              <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
                {/* Volume Toggle */}
                <button
                  onClick={toggleMute}
                  className="p-3 rounded-full bg-neutral-950/80 backdrop-blur-md hover:bg-neutral-900 border border-white/10 text-white transition-all scale-95 hover:scale-100 cursor-pointer hover:border-white/20"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="h-4.5 w-4.5 text-neutral-400" /> : <Volume2 className="h-4.5 w-4.5 text-[#C6007E]" />}
                </button>
                {/* Pause/Play Toggle */}
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-neutral-950/80 backdrop-blur-md hover:bg-neutral-900 border border-white/10 text-white transition-all scale-95 hover:scale-100 cursor-pointer hover:border-white/20"
                >
                  {isPlaying ? <Pause className="h-4.5 w-4.5 text-neutral-400" /> : <Play className="h-4.5 w-4.5 text-[#C6007E]" />}
                </button>
              </div>

              {/* Inside Metadata Overlay Details */}
              <div className="relative z-20 p-8 sm:p-10 pointer-events-none max-w-xl">
                <div className="flex flex-wrap gap-1.5 mb-3.5">
                  {activeClip.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-mono font-black uppercase tracking-widest px-2.5 py-1 bg-white/10 border border-white/15 rounded-lg text-neutral-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold tracking-wider text-[#C6007E] block">
                    {activeClip.category.toUpperCase()}
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                    {activeClip.title}
                  </h3>
                  
                  <div className="pt-4 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#C6007E] to-[#3835A4] p-[1.5px]">
                      <div className="h-full w-full rounded-full bg-neutral-900 flex items-center justify-center text-white text-[9px] font-black">
                        {activeClip.talentName.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-black text-white">{activeClip.talentName}</p>
                      <p className="text-[9px] font-mono text-neutral-400 font-bold">{activeClip.views} • GCC Audition File</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated Seek line */}
              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-900/60 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#C6007E] to-[#3835A4]"
                  initial={{ width: "0%" }}
                  animate={isPlaying ? { width: "100%" } : {}}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                />
              </div>

            </div>
          </div>

          {/* Sidebar Playlist - Right Panel (Takes 4 Cols on Large Screens) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-mono font-black uppercase tracking-[0.2em] text-neutral-400 flex items-center gap-2">
                  <Disc className="h-4 w-4 animate-spin-slow text-[#C6007E]" />
                  SELECT AUDITION REEL
                </h4>
                <span className="text-[9px] font-mono text-neutral-500 font-bold">3 REELS LOADED</span>
              </div>

              <div className="space-y-3.5">
                {VIDEO_CLIPS.map((clip) => {
                  const isActive = clip.id === activeClipId;
                  return (
                    <motion.button
                      key={clip.id}
                      onClick={() => {
                        setActiveClipId(clip.id);
                        setIsPlaying(true);
                      }}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left p-4 rounded-3xl border transition-all duration-300 flex items-center gap-4 relative overflow-hidden group cursor-pointer ${
                        isActive 
                          ? 'bg-neutral-900/90 border-[#3835A4] shadow-lg shadow-[#3835A4]/10' 
                          : 'bg-neutral-900/30 border-neutral-800/80 hover:bg-neutral-900/60 hover:border-neutral-700'
                      }`}
                    >
                      {/* Interactive glow effect */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-gradient-to-b from-[#C6007E] to-[#3835A4]" />
                      )}

                      {/* Poster Thumbnail */}
                      <div className="h-14 w-14 rounded-2xl overflow-hidden shrink-0 relative bg-neutral-800 border border-white/5">
                        <img 
                          src={clip.posterUrl} 
                          alt={clip.talentName} 
                          className="h-full w-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {isActive ? (
                          <div className="absolute inset-0 bg-neutral-950/60 flex items-center justify-center">
                            <span className="flex gap-1 items-end">
                              <span className="w-1 h-3 bg-[#C6007E] animate-pulse" />
                              <span className="w-1 h-4 bg-[#3835A4] animate-pulse [animation-delay:0.15s]" />
                              <span className="w-1 h-2 bg-white animate-pulse [animation-delay:0.3s]" />
                            </span>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-4 w-4 text-white fill-current" />
                          </div>
                        )}
                      </div>

                      {/* Info Metadata */}
                      <div className="space-y-0.5 min-w-0">
                        <span className={`text-[9px] font-mono uppercase font-black tracking-wider ${
                          isActive ? 'text-[#C6007E]' : 'text-neutral-500 group-hover:text-neutral-300'
                        }`}>
                          {clip.category}
                        </span>
                        <h5 className="font-display text-xs font-black text-white truncate">
                          {clip.title}
                        </h5>
                        <p className="text-[10px] text-neutral-400 font-bold">
                          {clip.talentName} • <span className="font-mono text-[9px]">{clip.location}</span>
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Premium CTA Prompt inside Video Section */}
            <div className="p-6 rounded-[2rem] bg-gradient-to-r from-[#C6007E]/10 to-[#3835A4]/10 border border-neutral-800/80 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400">
                  <Sparkles className="h-3.5 w-3.5 fill-current text-[#C6007E]" />
                </div>
                <span className="text-[10px] font-mono tracking-widest font-black text-white">PRO VIDEO SCOUTING</span>
              </div>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Want to feature your high fashion video reel on the active casting directory dashboard? Join as premium and get highlighted.
              </p>
              
              <div className="flex items-center justify-between pt-2 border-t border-neutral-800/60">
                <span className="text-[10px] font-mono text-neutral-400 font-bold">AED 20/MONTH ONLY</span>
                <a 
                  href="#faq"
                  className="inline-flex items-center gap-1.5 text-[10px] uppercase font-mono font-black text-[#C6007E] hover:text-[#3835A4] transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
