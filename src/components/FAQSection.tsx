import React, { useState } from 'react';
import { FAQS } from '../data';
import { HelpCircle, ChevronDown, Sparkles, Mail, Phone, MessageSquare, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div id="faq" className="w-full bg-white py-32 border-b border-[#f2f2f2] relative overflow-hidden">
      
      {/* Light Radial Luxury Ambient Details */}
      <div className="absolute right-[-10%] top-1/4 h-96 w-96 rounded-full bg-[#C6007E]/[0.03] filter blur-[100px] pointer-events-none" />
      <div className="absolute left-[-5%] bottom-10 h-80 w-80 rounded-full bg-[#3835A4]/[0.02] filter blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Premium Title & Contact Card */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-neutral-800 font-mono font-black">
                <span className="h-1.5 w-1.5 rounded-full bg-[#3835A4] animate-pulse" />
                HELP & DOCUMENTATION
              </div>
              <h2 className="font-display text-4xl font-black text-neutral-900 sm:text-5xl tracking-tight leading-none">
                Got questions? <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C6007E] to-[#3835A4]">We have answers.</span>
              </h2>
              <p className="text-sm text-neutral-500 leading-relaxed font-medium max-w-md">
                Everything you need to know about GCC auditions, portfolio setups, premium memberships, and zero-fee corporate talent booking workflows.
              </p>
            </div>

            {/* Premium Support Information Card */}
            <div className="p-7 rounded-[2rem] bg-neutral-50 border border-neutral-200/80 relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 h-28 w-28 rounded-full bg-[#C6007E]/[0.04] filter blur-xl group-hover:bg-[#C6007E]/[0.08] transition-all duration-500" />
              
              <div className="flex items-center gap-3.5 mb-5">
                <div className="h-10 w-10 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-[#3835A4] shadow-xs">
                  <MessageSquare className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-black uppercase text-neutral-400 tracking-wider">BOOKING DESK</h4>
                  <p className="text-sm font-bold text-neutral-900">Direct Live Inquiries</p>
                </div>
              </div>

              <p className="text-xs text-neutral-500 leading-relaxed font-medium mb-5">
                Can’t find the specific answers to your campaign? Speak directly with our Middle East booking coordinators:
              </p>

              <div className="space-y-2.5 pt-4 border-t border-neutral-200/60">
                <a 
                  href="mailto:management@yoocasta.com" 
                  className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-[#C6007E] font-bold transition-colors"
                >
                  <Mail className="h-4 w-4 text-neutral-400" />
                  <span>management@yoocasta.com</span>
                </a>
                <a 
                  href="tel:+971582224178" 
                  className="flex items-center gap-2.5 text-xs text-neutral-700 hover:text-[#3835A4] font-bold transition-colors"
                >
                  <Phone className="h-4 w-4 text-neutral-400" />
                  <span>+971 58 2224178</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Framer Motion Accordion Deck */}
          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen 
                      ? 'bg-gradient-to-r from-[#C6007E]/3 to-[#3835A4]/3 border-[#3835A4]/30 shadow-md' 
                      : 'bg-white border-neutral-200 hover:border-[#3835A4]/35'
                  }`}
                >
                  {/* Accordion header button */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      {/* Stylized custom numbering */}
                      <span className={`text-xs font-mono font-black ${isOpen ? 'text-[#C6007E]' : 'text-neutral-400'}`}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      
                      <span className="font-display font-black text-sm sm:text-base text-neutral-900 tracking-tight">
                        {faq.question}
                      </span>
                    </div>

                    <div className={`p-1.5 rounded-lg border transition-all duration-300 shrink-0 ${
                      isOpen ? 'bg-gradient-to-br from-[#C6007E] to-[#3835A4] text-white border-transparent rotate-180' : 'bg-neutral-50 text-neutral-500 border-neutral-200'
                    }`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {/* Accordion expand/collapse with physical motion */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                      >
                        <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-neutral-505 leading-relaxed border-t border-neutral-200/50 font-medium">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
