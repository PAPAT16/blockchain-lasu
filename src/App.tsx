/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  Users, 
  Award, 
  MapPin, 
  Activity, 
  Check, 
  ExternalLink, 
  Menu, 
  X, 
  Mail, 
  BookOpen, 
  Sparkles, 
  Globe, 
  Building2, 
  Smartphone, 
  Send, 
  MessageSquare,
  Clock,
  Instagram,
  Linkedin,
  MessageCircle,
  ChevronRight,
  Sparkle,
  GraduationCap,
  Handshake,
  Terminal,
  Trophy,
  Megaphone,
  Link,
  Camera
} from 'lucide-react';
import { STATS, WHAT_WE_DO, EVENTS, GALLERY_ITEMS, TEAM_MEMBERS, PARTNER_LOGOS, DETAILED_PARTNERS } from './data.ts';
import { JoinFormInput, InviteFormInput } from './types.ts';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  // Navigation states
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form states and success states
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinData, setJoinData] = useState<JoinFormInput>({
    fullName: '',
    studentId: '',
    facultyDept: '',
    level: '100',
    email: '',
    phoneNumber: '',
    priorKnowledge: 'None',
    reason: ''
  });

  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteData, setInviteData] = useState<InviteFormInput>({
    eventName: '',
    eventDate: '',
    eventType: 'Conference',
    contactNameOrg: '',
    contactEmail: '',
    description: ''
  });

  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Refs for tracking form coordinates
  const membershipRef = useRef<HTMLDivElement>(null);
  const invitationRef = useRef<HTMLDivElement>(null);

  // Initialize GLightbox
  useEffect(() => {
    const timer = setTimeout(() => {
      // @ts-ignore
      if (typeof GLightbox !== 'undefined') {
        try {
          // @ts-ignore
          const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
          });
          return () => {
            lightbox.destroy();
          };
        } catch (e) {
          console.error("GLightbox failed to initialize", e);
        }
      }
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // IntersectionObserver for active section mapping
  useEffect(() => {
    const sections = ['home', 'about', 'events', 'gallery', 'team', 'partners', 'membership', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        });
      }, {
        rootMargin: '-50% 0px -50% 0px' 
      });

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  // Scroll Fade-up Observer Setup
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-up-element');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 56;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  };

  // Actions
  const handleJoinNow = () => {
    handleScrollTo('membership');
    setTimeout(() => {
      const nameInput = document.getElementById('join-full-name');
      if (nameInput) nameInput.focus();
    }, 800);
  };

  const handleBecomePartner = () => {
    handleScrollTo('contact');
    setTimeout(() => {
      const eventNameInput = document.getElementById('invite-event-name');
      if (eventNameInput) eventNameInput.focus();
    }, 800);
  };

  // Form Submissions
  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoinLoading(true);
    
    /* TODO: wire form to Formspree */
    setTimeout(() => {
      setJoinLoading(false);
      setJoinSuccess(true);
    }, 1200);
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInviteLoading(true);

    /* TODO: wire form to Formspree */
    setTimeout(() => {
      setInviteLoading(false);
      setInviteSuccess(true);
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubmitted(true);
    setTimeout(() => {
      setNewsletterEmail('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans antialiased selection:bg-[#E8001D] selection:text-white">
      
      {/* 1. NAVBAR - Elevated & Soft Glazed Snow White */}
      <nav id="app-navbar" className="fixed top-0 left-0 right-0 h-14 bg-[#0A0A0A]/85 backdrop-blur-md border-b border-[#2A2A2A] z-50 transition-colors duration-200">
        <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
          
          <button 
            onClick={() => handleScrollTo('home')} 
            className="flex items-center gap-2 font-[700] text-white hover:text-[#E8001D] transition-colors focus:outline-none text-[16px] tracking-tight text-left"
            aria-label="BlockchainLASU Home"
          >
            <Link size={18} className="text-[#E8001D] rotate-45" />
            <span>BlockchainLASU</span>
          </button>

          {/* Center Links - Inline navigation controls */}
          <div className="hidden lg:flex items-center gap-6">
            {['home', 'about', 'events', 'gallery', 'team', 'partners', 'membership', 'contact'].map((sectionId) => (
              <button 
                key={sectionId}
                onClick={() => handleScrollTo(sectionId)}
                className={`text-[13px] font-[500] transition-all capitalize py-1 relative focus:outline-none ${
                  activeSection === sectionId 
                    ? 'text-white font-[700]' 
                    : 'text-[#AAAAAA] hover:text-white'
                }`}
              >
                {sectionId}
                {activeSection === sectionId && (
                  <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-[#E8001D] shadow-[0_0_10px_#E8001D] rounded-full animate-fade-in"></span>
                )}
              </button>
            ))}
          </div>

          {/* Primary Pill Button - Tactile Rounded Pill */}
          <div className="hidden lg:flex items-center">
            <button 
              id="nav-join-btn"
              onClick={handleJoinNow}
              className="bg-[#E8001D] text-white text-[13px] font-[500] px-5 py-2 rounded-full hover:bg-[#FF3344] hover:shadow-[0_0_15px_rgba(232,0,29,0.5)] transition-all cursor-pointer shadow-[0_4px_12px_rgba(232,0,29,0.3)]"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Action Indicator */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-1.5 text-[#AAAAAA] hover:text-white focus:outline-none transition-colors rounded-full hover:bg-[#111111]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 1.1 Mobile Nav Dropdown Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden absolute top-14 left-0 right-0 bg-[#111111] border-b border-[#2A2A2A] py-5 px-6 shadow-2xl z-40 overflow-hidden"
            >
              <div className="grid grid-cols-2 gap-y-4">
                {['home', 'about', 'events', 'gallery', 'team', 'partners', 'membership', 'contact'].map((sect) => (
                  <button 
                    key={sect}
                    onClick={() => handleScrollTo(sect)}
                    className="text-left text-[14px] font-[500] py-1 text-[#AAAAAA] hover:text-white capitalize"
                  >
                    {sect}
                  </button>
                ))}
                <div className="col-span-2 pt-3 border-t border-[#2A2A2A]">
                  <button 
                    onClick={handleJoinNow}
                    className="w-full bg-[#E8001D] text-white text-[14px] font-[500] py-2.5 rounded-full text-center hover:bg-[#FF3344] transition-all cursor-pointer shadow-[0_4px_12px_rgba(232,0,29,0.3)]"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

        {/* 2. HERO - Clean minimalist split perspective layout */}
        <section id="home" className="min-h-0 lg:min-h-[calc(100vh-120px)] flex flex-col justify-center pt-24 pb-12 relative">
          <div className="max-w-[1200px] mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-6 lg:mt-0">
            
            {/* Left Hero Main Block */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Announcement Strip */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1, duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
                className="inline-flex items-center gap-2 bg-[#111111] px-4 py-1.5 rounded-full border border-[#2A2A2A] shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-[#E8001D] animate-pulse shadow-[0_0_8px_#E8001D]"></span>
                <span className="font-sans text-[12px] font-semibold tracking-normal text-[#AAAAAA]">
                  Student-led · Lagos State University · Est. 2020
                </span>
              </motion.div>

              <h1 
                className="text-[44px] md:text-[56px] lg:text-[64px] font-bold text-white leading-[1.08] tracking-tight font-sans"
              >
                The Future of <span className="text-[#E8001D] font-bold drop-shadow-[0_0_12px_rgba(232,0,29,0.4)]">Web3</span> Starts at LASU
              </h1>

              <p className="text-[16px] text-[#AAAAAA] leading-[1.6] max-w-[560px] font-normal">
                We educate, train, and connect Lagos State University students to careers in Blockchain Technology — building Africa's decentralized future.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleJoinNow}
                  className="bg-[#E8001D] text-white text-[14px] font-bold px-6 py-3 rounded-full hover:bg-[#FF3344] transition-all cursor-pointer shadow-[0_4px_14px_rgba(232,0,29,0.4)] hover:shadow-[0_0_18px_rgba(232,0,29,0.6)] animate-pulse"
                >
                  Join Now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleScrollTo('events')}
                  className="bg-transparent text-white border border-[#2A2A2A] text-[14px] font-[500] px-6 py-3 rounded-full hover:bg-[#111111] hover:border-[#E8001D] transition-all cursor-pointer"
                >
                  Explore Events
                </motion.button>
              </div>
            </motion.div>

            {/* Right Hero High Density Interactive capture panel */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="lg:col-span-5 bg-[#111111] p-8 rounded-[36px] border border-[#2A2A2A] hover:border-[#E8001D]/45 shadow-[0_0_20px_rgba(232,0,29,0.1)] transition-all duration-350 space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#E8001D]/20 text-[#FF3344] border border-[#E8001D]/30 text-[10px] font-bold px-2.5 py-1.5 rounded-full uppercase">
                  <Activity size={12} className="text-[#FF3344] animate-pulse" />
                  <span>Membership Intake Open</span>
                </div>
                <h3 className="text-[20px] font-bold text-white">Apply to the cohort</h3>
                <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                  Join 300+ students actively learning, coding, and deploying decentralized applications.
                </p>
              </div>

              {/* Quick contact input captures */}
              <div className="space-y-3">
                <motion.button 
                  whileHover={{ scale: 1.01, x: 2 }}
                  onClick={handleJoinNow}
                  className="w-full bg-[#151515] hover:bg-[#181818] border border-[#2A2A2A] p-3 rounded-[14px] text-left flex items-center justify-between text-[13px] text-white font-medium transition-all group hover:border-[#E8001D]/50"
                >
                  <span>Fill application workflow</span>
                  <ArrowRight size={14} className="text-[#AAAAAA] group-hover:text-[#E8001D] group-hover:translate-x-1.5 transition-all" />
                </motion.button>
              </div>

              <div className="pt-2 border-t border-[#2A2A2A] flex items-center justify-between font-mono text-[11px] text-[#AAAAAA]">
                <span>CAMPUS: Ojo Main Campus</span>
                <span>METADATA: COHORT-V</span>
              </div>
            </motion.div>

          </div>

          {/* Social metadata tags at baseline */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-12 lg:mt-14 flex items-center justify-between border-t border-[#2A2A2A] pt-6"
          >
            <span className="font-mono text-[11px] text-[#AAAAAA] tracking-tight">Ojo, Lagos // Nigeria // 6.4674° N, 3.1979° E</span>
            <a 
              href="https://x.com/BlockchainLASU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#AAAAAA] hover:text-white transition-colors inline-flex items-center gap-1.5 text-[13px] font-medium group"
              aria-label="X (formerly Twitter)"
            >
              X: <span className="text-white font-semibold group-hover:underline decoration-2 decoration-[#E8001D]">@BlockchainLASU</span>
              <ExternalLink size={12} className="text-[#AAAAAA]" />
            </a>
          </motion.div>
          </div>
        </section>

        {/* Separator line */}
        <hr className="border-[#2A2A2A]" />

        {/* 3. PARTNER LOGO STRIP - Floating text wordmarks */}
        <section className="py-12 overflow-hidden">
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-ticker flex whitespace-nowrap gap-16 items-center">
              {PARTNER_LOGOS.map((pt, idx) => (
                <span 
                  key={idx} 
                  className="text-[#AAAAAA] font-semibold text-[13px] uppercase tracking-widest select-none hover:text-[#E8001D] transition-colors"
                >
                  /* REPLACE: real partner logo */
                  {pt.name}
                </span>
              ))}
              {/* Duplicate loop for seamless ticker */}
              {PARTNER_LOGOS.map((pt, idx) => (
                <span 
                  key={`dup-${idx}`} 
                  className="text-[#AAAAAA] font-semibold text-[13px] uppercase tracking-widest select-none hover:text-[#E8001D] transition-colors"
                >
                  /* REPLACE: real partner logo */
                  {pt.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 4. ABOUT SECTION - Bento Grid Layout */}
        <section id="about" className="py-24 space-y-6 scroll-mt-14">
          <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Top-Left: Who We Are */}
            <div className="bg-[#111111] p-8 rounded-[36px] border border-[#2A2A2A] shadow-md flex flex-col justify-center">
              <h2 className="text-[32px] font-bold text-white mb-4 tracking-tight">Who We Are</h2>
              <p className="text-[16px] text-[#AAAAAA] leading-[1.6]">
                Blockchain Club LASU is one of Nigeria's most active campus blockchain communities — training the next generation of Web3 developers, designers, and founders at Lagos State University, Ojo, Lagos.
              </p>
            </div>

            {/* Top-Right: What We Do */}
            <div className="bg-[#111111] p-8 rounded-[36px] border border-[#2A2A2A] shadow-md">
              <h3 className="text-[20px] font-bold text-white mb-6 tracking-tight">Core Tracks</h3>
              <div className="grid grid-cols-2 gap-4">
                {WHAT_WE_DO.map((item, idx) => (
                  <div key={idx} className="bg-[#181818] p-4 rounded-2xl border border-[#2A2A2A]">
                    <h4 className="text-[14px] font-bold text-white">{item.title}</h4>
                    <p className="text-[12px] text-[#AAAAAA] mt-1 line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom-Left: Stats */}
            <div className="bg-[#111111] p-8 rounded-[36px] border border-[#2A2A2A] shadow-md flex justify-around items-center">
              {STATS.map((st, i) => (
                <div key={i} className="text-center">
                  <div className="text-[32px] font-bold text-white leading-none">{st.value}</div>
                  <div className="text-[12px] font-medium text-[#AAAAAA] mt-1">{st.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom-Right: Join/CTA */}
            <div className="bg-gradient-to-br from-[#E8001D] to-[#9B0011] p-8 rounded-[36px] shadow-lg flex flex-col justify-center items-center text-center">
              <h3 className="text-[22px] font-bold text-white mb-4">Ready to build?</h3>
              <p className="text-[14px] text-white/90 mb-6 max-w-[280px]">
                Join 300+ students actively learning, coding, and deploying decentralized applications.
              </p>
              <button 
                onClick={handleJoinNow}
                className="bg-white text-[#E8001D] font-bold px-6 py-3 rounded-full hover:bg-gray-100 transition-all shadow-md"
              >
                Join Now
              </button>
            </div>

          </div>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 5. EVENTS SECTION - Alternating card highlights with interactive panels */}
        <section id="events" className="py-24 space-y-12 scroll-mt-14">
          <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-4"
          >
            <div className="space-y-3">
              <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight">
                Events & Programs
              </h2>
              <p className="text-[16px] text-[#AAAAAA] max-w-[560px]">
                From IRL meetups to industry conferences — we stay active making real headway.
              </p>
            </div>
            <div>
              <button 
                onClick={() => handleScrollTo('contact')}
                className="bg-transparent border border-[#2A2A2A] text-white text-[13px] font-[500] px-5 py-2.5 rounded-full hover:bg-[#111111] hover:border-[#E8001D] transition-all cursor-pointer"
              >
                Invite Us to Your Event
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.map((evt, idx) => {
              // Standard vs Highly featured custom card with the ultimate Orchid Flash background overlay style!
              const isOrchidFeatured = evt.isFeatured;
              return (
                <motion.div 
                  key={evt.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.175, 0.885, 0.32, 1.275] }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`rounded-[36px] p-8 flex flex-col justify-between relative shadow-md transition-all duration-300 ${
                    isOrchidFeatured 
                      ? 'bg-gradient-to-tr from-[#9B0011] to-[#E8001D] text-white border border-[#E8001D]/40 shadow-[0_0_30px_rgba(232,0,29,0.25)] hover:shadow-[0_0_40px_rgba(232,0,29,0.45)]' 
                      : 'bg-[#111111] border border-[#2A2A2A] hover:border-[#E8001D]/50 text-white hover:shadow-[0_0_20px_rgba(232,0,29,0.1)]'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Badge Row */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full ${
                        isOrchidFeatured 
                          ? 'bg-white text-[#E8001D]' 
                          : 'bg-[#2A2A2A] text-[#AAAAAA] border border-[#333333]'
                      }`}>
                        {evt.status === 'UPCOMING' && <span className="w-1.5 h-1.5 rounded-full bg-[#E8001D] animate-pulse"></span>}
                        {evt.status} · {evt.category}
                      </span>
                      <span className={`font-mono text-[11px] font-semibold ${
                        isOrchidFeatured ? 'text-white/80' : 'text-[#AAAAAA]'
                      }`}>
                        {evt.id}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[22px] font-bold tracking-tight text-white">{evt.title}</h3>
                      <div className="flex items-center gap-2 font-mono text-[12px] opacity-90 text-[#AAAAAA]">
                        <MapPin size={13} className="opacity-75" />
                        <span>{evt.hostOrVenue}</span>
                      </div>
                    </div>

                    <p className={`text-[13px] leading-[1.6] ${
                      isOrchidFeatured ? 'text-white/90' : 'text-[#AAAAAA]'
                    }`}>
                      {evt.description}
                    </p>
                  </div>

                  {evt.isFeatured && (
                    <div className="pt-6 mt-6 border-t border-white/20">
                      <button 
                        onClick={handleJoinNow}
                        className="bg-white text-black text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-[#E8001D] hover:text-white transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
                      >
                        <span>Register Now</span>
                        <ArrowRight size={14} className="text-[#E8001D]" />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 6. GALLERY - White background section (full-width) */}
        <section id="gallery" className="py-24 space-y-12 scroll-mt-14 bg-white">
          <div className="space-y-3 max-w-[1200px] mx-auto px-6">
            <h2 className="text-[32px] md:text-[40px] font-bold text-gray-900 tracking-tight">
              Our Moments
            </h2>
            <p className="text-[16px] text-gray-500">
              Real events. Real people. Real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto px-6">
            {GALLERY_ITEMS.map((item, index) => (
              <a 
                href={item.imageUrl}
                key={item.id} 
                className="glightbox group bg-white rounded-[36px] p-4 border border-gray-200 overflow-hidden shadow-sm hover:border-[#E8001D] hover:shadow-md transition-all block"
                data-gallery="club-moments"
                data-description={item.caption}
              >
                {/* Image Wrap */}
                <div className="aspect-[3/2] overflow-hidden relative bg-gray-100 rounded-[24px]">
                  <img 
                    src={item.imageUrl} 
                    alt={item.caption} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-[1.02] transition-all duration-300" 
                  />
                  {/* Overlay camera prompt */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-lg border border-gray-200 shadow-sm flex items-center justify-center">
                    <Camera size={14} className="text-[#E8001D]" />
                  </div>
                </div>

                {/* Caption description */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-[13px] text-gray-900 font-bold">
                    {item.caption}
                  </span>
                  <span className="text-gray-400 text-xs font-mono">
                    [{index + 1}/{GALLERY_ITEMS.length}]
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-4 flex justify-start max-w-[1200px] mx-auto px-6">
            <a 
              href="https://x.com/BlockchainLASU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-2 group text-[13px] font-semibold"
            >
              Follow us on X for more <span className="group-hover:translate-x-1.5 transition-transform text-[#E8001D]">→</span>
            </a>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 7. TEAM SECTION - Redesigned Card Layout */}
        <section id="team" className="py-24 space-y-12 scroll-mt-14">
          <div className="max-w-[1200px] mx-auto px-6">
          <div className="space-y-4">
            <h2 className="text-[44px] font-bold text-white leading-tight max-w-2xl tracking-tight">
              A team who is not afraid to take risks and bet on themselves.
            </h2>
            <p className="text-[16px] text-[#AAAAAA] max-w-xl">
              Meet the creators, strategists, and makers who move our mission forward, combining design, code, and vision to achieve remarkable results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id} 
                className="bg-[#111111] p-4 rounded-[32px] border border-[#2A2A2A] hover:border-[#E8001D] transition-all duration-300 group"
              >
                {/* Image */}
                <div className="aspect-square rounded-[24px] overflow-hidden mb-6 bg-[#181818]">
                   <img 
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${member.seed}`} 
                    alt={member.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Details */}
                <div className="px-2">
                  <h3 className="text-[18px] font-bold text-white">{member.name}</h3>
                  <p className="text-[14px] text-[#E8001D] font-medium mb-4">{member.role}</p>
                  <div className="border-t border-[#2A2A2A] pt-4">
                    <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                      Passionate member driving our community forward through dedication, innovation, and leadership within the LASU Blockchain ecosystem.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 8. PARTNERS SECTION - Muted partner cards & Custom dashed join cards */}
        <section id="partners" className="py-24 space-y-12 scroll-mt-14">
          <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight">
              Partners & Collaborators
            </h2>
            <p className="text-[16px] text-[#AAAAAA]">
              Web3 organizations we've built with across Nigeria and beyond.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DETAILED_PARTNERS.map((partner, idx) => (
              <motion.div 
                key={partner.id} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: [0.175, 0.885, 0.32, 1.275] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="bg-[#111111] p-6 rounded-[28px] border border-[#2A2A2A] hover:border-[#E8001D] shadow-md flex flex-col justify-between transition-all duration-300"
              >
                <div className="space-y-2">
                  <h3 className="text-[15px] font-bold text-white">{partner.name}</h3>
                  <p className="text-[13px] text-[#AAAAAA] leading-relaxed">{partner.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Become a partner prompt with dashed border */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.01 }}
              className="bg-transparent border-2 border-dashed border-[#2A2A2A] hover:border-[#E8001D]/70 p-6 rounded-[28px] flex flex-col items-center justify-center text-center space-y-4 transition-all"
            >
              <span className="text-[13px] text-[#AAAAAA] font-medium">
                Interested in partnering?
              </span>
              <button 
                onClick={handleBecomePartner}
                className="bg-[#E8001D] text-white text-[13px] font-[510] px-4 py-2 rounded-full hover:bg-[#FF3344] hover:shadow-[0_0_15px_rgba(232,0,29,0.5)] transition-all cursor-pointer shadow-[0_4px_12px_rgba(232,0,29,0.3)]"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="pt-6 border-t border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <span className="text-[15px] text-[#AAAAAA] font-medium">
              Building something in Web3? Let's collaborate.
            </span>
            <button 
              onClick={handleBecomePartner}
              className="bg-transparent border border-[#2A2A2A] text-white text-[13px] font-[500] px-5 py-2 rounded-full hover:bg-[#111111] hover:border-[#E8001D] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Partner With Us
            </button>
          </motion.div>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 9. MEMBERSHIP SECTION - Rounded input elements & custom submission workflows */}
        <section id="membership" className="py-24 space-y-12 scroll-mt-14" ref={membershipRef}>
          <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight">
              Join the Movement
            </h2>
            <p className="text-[16px] text-[#AAAAAA]">
              Become part of Nigeria's most active campus Web3 community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT — Member Perks with Ember Dot indicator */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-white">Member Perks & Access</h3>
                <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                  Join a structured community focusing on education, development and networking. Being a member gives you first-row access to local and global resources.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  "Access to exclusive workshops and bootcamps",
                  "Mentorship from Web3 industry professionals",
                  "Priority access to hackathons and competitions",
                  "Network with blockchain clubs across Nigeria",
                  "Certificate of membership and participation",
                  "Exclusive merch and community perks"
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8001D] shadow-[0_0_8px_#E8001D] mt-2 flex-shrink-0"></span>
                    <span className="text-[15px] text-white font-medium leading-tight">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Registration form Snow White block */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="lg:col-span-7"
            >
              <div className="bg-[#111111] p-8 rounded-[36px] border border-[#2A2A2A] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                
                {joinSuccess ? (
                  /* Form execution receipt view */
                  <div className="border-l-[4px] border-[#E8001D] pl-6 py-2 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-[22px] font-bold text-white flex items-center gap-2">
                        <Sparkles size={22} className="text-[#E8001D] animate-pulse" />
                        <span>Application Received!</span>
                      </h3>
                      <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                        Thank you for applying to join the LASU Blockchain Club, <span className="text-white font-semibold">{joinData.fullName}</span>. We've logged your application details securely:
                      </p>
                    </div>

                    <div className="bg-[#181818] p-5 rounded-[14px] border border-[#2E2E2E] font-mono text-[12px] text-[#AAAAAA] space-y-2">
                      <div><span className="text-[#FF3344]">Applicant://</span> {joinData.fullName}</div>
                      <div><span className="text-[#FF3344]">Matric_No://</span> {joinData.studentId}</div>
                      <div><span className="text-[#FF3344]">Dept_Level://</span> {joinData.facultyDept} ([{joinData.level}L])</div>
                      <div><span className="text-[#FF3344]">Exp_Level://</span> {joinData.priorKnowledge}</div>
                      <div><span className="text-[#FF3344]">Status_Dot://</span> Active Processing</div>
                    </div>

                    <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                      We'll inspect your details and be in touch via email (<span className="text-[#E8001D] font-semibold">{joinData.email}</span>) within 48 hours with onboarding steps!
                    </p>

                    <button 
                      onClick={() => setJoinSuccess(false)}
                      className="text-[12px] font-semibold text-[#AAAAAA] hover:text-[#FF3344] underline"
                    >
                      Fill another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-full-name" className="block text-[11px] font-bold text-[#AAAAAA]">Full Name</label>
                        <input 
                          id="join-full-name"
                          type="text" 
                          required
                          value={joinData.fullName}
                          onChange={(e) => setJoinData({...joinData, fullName: e.target.value})}
                          placeholder="Felix Adebayo"
                          className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                        />
                      </div>

                      {/* Student ID */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-student-id" className="block text-[11px] font-bold text-[#AAAAAA]">
                          Student ID / Matric Number
                        </label>
                        <input 
                          id="join-student-id"
                          type="text" 
                          required
                          value={joinData.studentId}
                          onChange={(e) => setJoinData({...joinData, studentId: e.target.value})}
                          placeholder="240591001"
                          className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] font-mono transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Faculty Dept */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-faculty-dept" className="block text-[11px] font-bold text-[#AAAAAA]">Faculty & Department</label>
                        <input 
                          id="join-faculty-dept"
                          type="text" 
                          required
                          value={joinData.facultyDept}
                          onChange={(e) => setJoinData({...joinData, facultyDept: e.target.value})}
                          placeholder="Science / Computer Science"
                          className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                        />
                      </div>

                      {/* Level */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-level" className="block text-[11px] font-bold text-[#AAAAAA]">Level</label>
                        <select 
                          id="join-level"
                          value={joinData.level}
                          onChange={(e) => setJoinData({...joinData, level: e.target.value})}
                          className="w-full bg-[#151515] text-white border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] cursor-pointer transition-all appearance-none"
                        >
                          <option value="100" className="bg-[#111111] text-white">100 Level</option>
                          <option value="200" className="bg-[#111111] text-white">200 Level</option>
                          <option value="300" className="bg-[#111111] text-white">300 Level</option>
                          <option value="400" className="bg-[#111111] text-white">400 Level</option>
                          <option value="500" className="bg-[#111111] text-white">500 Level</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email address */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-email" className="block text-[11px] font-bold text-[#AAAAAA]">Email Address</label>
                        <input 
                          id="join-email"
                          type="email" 
                          required
                          value={joinData.email}
                          onChange={(e) => setJoinData({...joinData, email: e.target.value})}
                          placeholder="felix@student.lasu.edu.ng"
                          className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                        />
                      </div>

                      {/* Phone number */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-phone" className="block text-[11px] font-bold text-[#AAAAAA]">Phone Number</label>
                        <input 
                          id="join-phone"
                          type="tel" 
                          required
                          value={joinData.phoneNumber}
                          onChange={(e) => setJoinData({...joinData, phoneNumber: e.target.value})}
                          placeholder="+234 812 345 6789"
                          className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                        />
                      </div>
                    </div>

                    {/* Prior Knowledge */}
                    <div className="space-y-1.5">
                      <label htmlFor="join-prior-knowledge" className="block text-[11px] font-bold text-[#AAAAAA]">Prior blockchain knowledge?</label>
                      <select 
                        id="join-prior-knowledge"
                        value={joinData.priorKnowledge}
                        onChange={(e) => setJoinData({...joinData, priorKnowledge: e.target.value})}
                        className="w-full bg-[#151515] text-white border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] cursor-pointer transition-all appearance-none"
                      >
                        <option value="None" className="bg-[#111111] text-white">None (Interested to Learn)</option>
                        <option value="Beginner" className="bg-[#111111] text-white">Beginner (Know basic terminologies)</option>
                        <option value="Intermediate" className="bg-[#111111] text-white">Intermediate (Used wallets, understand mechanics)</option>
                        <option value="Advanced" className="bg-[#111111] text-white">Advanced (Develop smart contracts/build solutions)</option>
                      </select>
                    </div>

                    {/* Reason */}
                    <div className="space-y-1.5">
                      <label htmlFor="join-reason" className="block text-[11px] font-bold text-[#AAAAAA]">Why do you want to join?</label>
                      <textarea 
                        id="join-reason"
                        required
                        value={joinData.reason}
                        onChange={(e) => setJoinData({...joinData, reason: e.target.value})}
                        rows={4}
                        placeholder="State your expectations, goals, or technical interests in joining..."
                        className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] resize-none focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={joinLoading}
                      className="w-full bg-[#E8001D] h-12 text-white text-[14px] font-bold rounded-full hover:bg-[#FF3344] hover:shadow-[0_0_15px_rgba(232,0,29,0.5)] disabled:opacity-50 transition-all inline-flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(232,0,29,0.35)]"
                    >
                      {joinLoading ? 'Recording Application...' : 'Submit Application'}
                    </button>
                  </form>
                )}

              </div>
            </motion.div>
          </div>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 10. INVITATION SECTION  */}
        <section id="contact" className="py-24 space-y-12 scroll-mt-14" ref={invitationRef}>
          <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-[640px] mx-auto"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight">
              Invite Us to Your Event
            </h2>
            <p className="text-[16px] text-[#AAAAAA] leading-relaxed">
              Planning a conference, panel, or campus event? We bring Web3 expertise, energy, and a community of builders to maximize impact.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
            className="max-w-[560px] mx-auto"
          >
            <div className="bg-[#111111] p-8 rounded-[36px] border border-[#2A2A2A] shadow-lg">
              
              {inviteSuccess ? (
                /* Invitation Received view */
                <div className="border-l-[4px] border-[#E8001D] pl-6 py-2 space-y-4">
                  <h3 className="text-[18px] font-bold text-white flex items-center gap-2">
                    <Check className="text-[#E8001D]" size={18} />
                    <span>Invitation received.</span>
                  </h3>
                  <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                    We've received your coordination request for the event <span className="text-white font-semibold">"{inviteData.eventName}"</span>.
                  </p>
                  <p className="text-[13px] text-[#AAAAAA]">
                    The Secretariat will inspect the itinerary and reach back to <span className="text-[#E8001D] font-semibold">{inviteData.contactEmail}</span> inside 48 hours to confirm availability and discutir arrangements.
                  </p>
                  <button 
                    onClick={() => setInviteSuccess(false)}
                    className="text-[12px] font-semibold text-[#AAAAAA] hover:text-white underline"
                  >
                    Send another invitation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInviteSubmit} className="space-y-6">
                  {/* Event Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="invite-event-name" className="block text-[11px] font-bold text-[#AAAAAA]">Event Name</label>
                    <input 
                      id="invite-event-name"
                      type="text" 
                      required
                      value={inviteData.eventName}
                      onChange={(e) => setInviteData({...inviteData, eventName: e.target.value})}
                      placeholder="e.g. Lagos Tech Summit"
                      className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-event-date" className="block text-[11px] font-bold text-[#AAAAAA]">Event Date</label>
                      <input 
                        id="invite-event-date"
                        type="date" 
                        required
                        value={inviteData.eventDate}
                        onChange={(e) => setInviteData({...inviteData, eventDate: e.target.value})}
                        className="w-full bg-[#151515] text-white border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                      />
                    </div>

                    {/* Event Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-event-type" className="block text-[11px] font-bold text-[#AAAAAA]">Event Type</label>
                      <select 
                        id="invite-event-type"
                        value={inviteData.eventType}
                        onChange={(e) => setInviteData({...inviteData, eventType: e.target.value})}
                        className="w-full bg-[#151515] text-white border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] cursor-pointer transition-all appearance-none"
                      >
                        <option value="Conference" className="bg-[#111111] text-white">Conference</option>
                        <option value="Panel" className="bg-[#111111] text-white">Panel</option>
                        <option value="Workshop" className="bg-[#111111] text-white">Workshop</option>
                        <option value="Hackathon" className="bg-[#111111] text-white">Hackathon</option>
                        <option value="Other" className="bg-[#111111] text-white">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Coordinator Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-contact-name" className="block text-[11px] font-bold text-[#AAAAAA]">Your Name & Organization</label>
                      <input 
                        id="invite-contact-name"
                        type="text" 
                        required
                        value={inviteData.contactNameOrg}
                        onChange={(e) => setInviteData({...inviteData, contactNameOrg: e.target.value})}
                        placeholder="Emeka Okafor (Tech Lagos)"
                        className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                      />
                    </div>

                    {/* Coordinator Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-contact-email" className="block text-[11px] font-bold text-[#AAAAAA]">Contact Email</label>
                      <input 
                        id="invite-contact-email"
                        type="email" 
                        required
                        value={inviteData.contactEmail}
                        onChange={(e) => setInviteData({...inviteData, contactEmail: e.target.value})}
                        placeholder="speaker@techlagos.org"
                        className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label htmlFor="invite-description" className="block text-[11px] font-bold text-[#AAAAAA]">Brief Description</label>
                    <textarea 
                      id="invite-description"
                      required
                      value={inviteData.description}
                      onChange={(e) => setInviteData({...inviteData, description: e.target.value})}
                      rows={4}
                      placeholder="Outline speaking details, estimated delegation size, and how LASU Blockchain members can participate..."
                      className="w-full bg-[#151515] text-white placeholder-[#777777] border border-[#2A2A2A] text-sm p-3 rounded-[14px] resize-none focus:outline-none focus:ring-1 focus:ring-[#E8001D] focus:border-[#E8001D] transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={inviteLoading}
                    className="w-full bg-[#E8001D] h-12 text-white text-[14px] font-bold rounded-full hover:bg-[#FF3344] hover:shadow-[0_0_15px_rgba(232,0,29,0.5)] disabled:opacity-50 transition-all inline-flex items-center justify-center cursor-pointer shadow-[0_4px_12px_rgba(232,0,29,0.35)]"
                  >
                    {inviteLoading ? 'Sending Invitation...' : 'Send Invitation'}
                  </button>
                </form>
              )}

            </div>
          </motion.div>
          </div>
        </section>

        <hr className="border-[#2A2A2A]" />

        {/* 11. SOCIALS SECTION & High-contrast Newsletter capturing row */}
        <section className="py-24 space-y-16">
          <div className="max-w-[1200px] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            <h2 className="text-[32px] md:text-[40px] font-bold text-white tracking-tight">
              Stay in the Loop
            </h2>
            <p className="text-[16px] text-[#AAAAAA]">
              Never miss an event, workshop, or recruitment opportunity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left side discrete social cells */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "𝕏 Twitter/X", href: "https://x.com/BlockchainLASU" },
                { label: "Instagram", href: "https://instagram.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Telegram", href: "https://t.me" },
                { label: "WhatsApp", href: "https://whatsapp.com" }
              ].map((soc, idx) => (
                <motion.a 
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-[#111111] rounded-[28px] p-4 border border-[#2A2A2A] shadow-md hover:border-[#E8001D] hover:shadow-[0_0_15px_rgba(232,0,29,0.15)] transition-all text-center flex flex-col justify-center items-center h-24"
                >
                  <span className="text-[14px] font-bold text-white">{soc.label}</span>
                  <span className="text-[10px] text-[#AAAAAA] font-mono mt-1">/* REPLACE: social */</span>
                </motion.a>
              ))}
            </div>

            {/* Right side High-contrast Obsidian email capture banner */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="lg:col-span-6 bg-[#111111] border border-[#2A2A2A] text-white p-8 md:p-10 rounded-[36px] shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-[#222222] text-white text-[10px] font-bold px-2.5 py-1.5 rounded-full uppercase">
                  <Mail size={12} className="text-[#E8001D]" />
                  <span>Club Newsletter</span>
                </span>
                <h3 className="text-[20px] font-bold text-white">Consensus Bulletin</h3>
                <p className="text-[13px] text-[#AAAAAA] leading-relaxed">
                  Get occasional development recaps, Solidity tips, and job openings sent directly to your inbox.
                </p>
              </div>

              {newsletterSubmitted ? (
                <div className="bg-[#2A2A2A] p-4 rounded-[14px] border border-[#3A3A3A] text-[13px] text-[#E8001D] font-medium flex items-center gap-2">
                  <Sparkle size={14} className="text-[#E8001D] animate-pulse" />
                  <span>Swell! Thank you for subscribing. Check your mail soon!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter school email"
                    className="flex-grow bg-[#151515] border border-[#2A2A2A] text-white placeholder-[#777777] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#E8001D] transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-[#E8001D] text-white hover:bg-[#FF3344] hover:shadow-[0_0_15px_rgba(232,0,29,0.5)] text-[13px] font-bold px-6 py-3 rounded-full transition-all cursor-pointer shadow-md inline-flex items-center justify-center"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </motion.div>
          </div>
          </div>
        </section>

      {/* 12. FOOTER - White background */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => handleScrollTo('home')} 
              className="flex items-center gap-2 font-[700] text-gray-900 hover:text-[#E8001D] transition-colors focus:outline-none text-[16px] tracking-tight text-left"
            >
              <Link size={18} className="text-[#E8001D] rotate-45" />
              <span>BlockchainLASU</span>
            </button>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-[340px]">
              Educating, training, and connecting LASU students to the future of Web3 and decentralization.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-sans text-[11px] text-gray-500 font-bold tracking-wider uppercase">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['home', 'about', 'events', 'gallery', 'team', 'partners', 'membership', 'contact'].map((link) => (
                <button 
                  key={link}
                  onClick={() => handleScrollTo(link)} 
                  className="text-left text-[13px] text-gray-500 hover:text-[#E8001D] hover:underline decoration-[#E8001D] hover:font-bold transition-all focus:outline-none capitalize cursor-pointer"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Social list */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-sans text-[11px] text-gray-500 font-bold tracking-wider uppercase">Social Channels</h4>
            <div className="flex flex-col gap-2 text-[13px] text-gray-500">
              <a href="https://x.com/BlockchainLASU" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8001D] hover:underline decoration-[#E8001D] transition-colors">Twitter/X</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8001D] hover:underline decoration-[#E8001D] transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8001D] hover:underline decoration-[#E8001D] transition-colors">LinkedIn</a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8001D] hover:underline decoration-[#E8001D] transition-colors">Telegram</a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#E8001D] hover:underline decoration-[#E8001D] transition-colors">WhatsApp</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-[1200px] mx-auto px-6 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-gray-500">
            <span>© 2025 Blockchain Club, Lagos State University. All rights reserved.</span>
            <span>Built by the LASU Blockchain Community</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
