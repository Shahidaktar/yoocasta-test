import React, { useState } from 'react';
import { Sparkles, MessageSquare, Plus, Flame, ShieldAlert, CheckCircle2, Menu, X } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  onPostCastingClick: () => void;
  onCreateProfileClick: () => void;
  onPremiumClick: () => void;
  onLoginClick: () => void;
  registeredTalentsCount: number;
  openCastingsCount: number;
}

export default function Header({
  onSearchClick,
  onPostCastingClick,
  onCreateProfileClick,
  onPremiumClick,
  onLoginClick,
  registeredTalentsCount,
  openCastingsCount,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/50 bg-white/90 backdrop-blur-md shadow-sm">
      {/* Marquee Banner */}
      <div className="w-full bg-amber-500 py-3 overflow-hidden select-none relative z-20 border-b border-white/10">
        <div className="flex whitespace-nowrap animate-marquee gap-12 text-[10px] uppercase font-mono font-black tracking-[0.2em] text-neutral-400">
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white">✦ LIVE AUDITIONS OPEN: DUBAI DESIGN DISTRICT</span>
            <span className="text-black">★ CO-LEAD COMMERCIAL ROLES BY EMIRATES</span>
            <span className="text-white">✦ RIYADH FASHION WEEK CASTING NOW ACTIVE</span>
            <span className="text-black">★ AED 12,500 WEEKEND GALA HOSTESS SLOTS</span>
            <span className="text-white">✦ FEATURE FILM BACKSTAGE DIRECTORS SCOUTING</span>
            <span className="text-black">★ 100% ESCROW PROTECTED COMMISSIONS</span>
          </div>
          <div className="flex items-center gap-12 shrink-0">
            <span className="text-white">✦ LIVE AUDITIONS OPEN: DUBAI DESIGN DISTRICT</span>
            <span className="text-black">★ CO-LEAD COMMERCIAL ROLES BY EMIRATES</span>
            <span className="text-white">✦ RIYADH FASHION WEEK CASTING NOW ACTIVE</span>
            <span className="text-black">★ AED 12,500 WEEKEND GALA HOSTESS SLOTS</span>
            <span className="text-white">✦ FEATURE FILM BACKSTAGE DIRECTORS SCOUTING</span>
            <span className="text-black">★ 100% ESCROW PROTECTED COMMISSIONS</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center">
          <a href="#" className="flex items-center group">
            <img 
              src="https://yoocasta.com/assets/images/logo-black.png" 
              alt="Yoocasta Logo" 
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <a href="#" className="hover:text-amber-600 transition-colors">
            Talent Pool
            <span className="ml-1.5 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </a>
           <a href="#" className="hover:text-amber-600 transition-colors">Casting Calls</a>
          <a href="#" className="hover:text-amber-600 transition-colors">Our Work</a>
          <a href="#" className="hover:text-amber-600 transition-colors">Success Stories</a>
          <a href="#" className="hover:text-amber-600 transition-colors">FAQ</a>
        </nav>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLoginClick}
            className="text-xs font-mono tracking-wider font-bold text-neutral-500 hover:text-neutral-900 px-3 py-2 cursor-pointer transition-colors"
          >
            LOG IN
          </button>

          <button
            onClick={onCreateProfileClick}
            className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900 hover:border-neutral-400 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            <span>Join Talent</span>
          </button>

          <button
            onClick={onPostCastingClick}
            className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-neutral-950 hover:bg-amber-500 transition-all hover:scale-[1.02] shadow-md shadow-amber-400/10 cursor-pointer"
          >
            <span>Post Casting</span>
          </button>
        </div>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onPostCastingClick}
            className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1.5 text-[10px] font-bold text-neutral-950 hover:bg-amber-500 transition-all shadow-sm cursor-pointer"
          >
            <span>Post Casting</span>
          </button>
          
          <button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none z-50 relative"
          >
            {isMenuOpen ? <X className="h-6 w-6 text-neutral-950" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Full-Screen Solid Orange Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 h-screen w-screen z-40 bg-amber-500 transition-all duration-300 ease-out md:hidden flex flex-col justify-between p-8 pt-32 ${
          isMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 pointer-events-none invisible'
        }`}
      >
        {/* Navigation Links */}
        <nav className="flex flex-col gap-6 text-xl font-black uppercase font-mono tracking-wider text-neutral-950">
          <a 
            href="#" 
            onClick={toggleMenu}
            className="flex items-center justify-between border-b-2 border-neutral-950/10 pb-4 hover:text-white transition-colors"
          >
            <span>Talent Pool</span>
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          </a>
         
          <a 
            href="#directors-board" 
            onClick={toggleMenu}
            className="flex items-center justify-between border-b-2 border-neutral-950/10 pb-4 hover:text-white transition-colors"
          >
            <span>Casting Calls</span>
            {/* <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span> */}
          </a>
          <a 
            href="#milestones" 
            onClick={toggleMenu}
            className="border-b-2 border-neutral-950/10 pb-4 hover:text-white transition-colors"
          >
            Our Work
          </a>
          <a 
            href="#testimonials" 
            onClick={toggleMenu}
            className="border-b-2 border-neutral-950/10 pb-4 hover:text-white transition-colors"
          >
            Success Stories
          </a>
          <a 
            href="#faq" 
            onClick={toggleMenu}
            className="border-b-2 border-neutral-950/10 pb-4 hover:text-white transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Action Buttons Footer */}
        <div className="flex flex-col gap-4 mt-auto mb-8">
          <button
            onClick={() => { toggleMenu(); onCreateProfileClick(); }}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 py-4 text-sm font-bold text-amber-400 hover:bg-neutral-900 shadow-xl transition-all"
          >
            <Plus className="h-4 w-4 text-amber-400" />
            <span>Join Talent</span>
          </button>

          <button
            onClick={() => { toggleMenu(); onLoginClick(); }}
            className="w-full py-4 text-center text-sm font-mono tracking-wider font-black text-neutral-950 border-2 border-neutral-950 hover:bg-neutral-950 hover:text-white rounded-full transition-all"
          >
            LOG IN
          </button>
        </div>
      </div>
    </header>
  );
}