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
  Sparkle
} from 'lucide-react';
import { STATS, WHAT_WE_DO, EVENTS, GALLERY_ITEMS, TEAM_MEMBERS, PARTNER_LOGOS, DETAILED_PARTNERS } from './data.ts';
import { JoinFormInput, InviteFormInput } from './types.ts';

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
    <div className="min-h-screen bg-[#f4f4f5] text-[#18181b] font-sans antialiased selection:bg-[#ff5a00] selection:text-white">
      
      {/* 1. NAVBAR - Elevated & Soft Glazed Snow White */}
      <nav id="app-navbar" className="fixed top-0 left-0 right-0 h-14 bg-white/90 backdrop-blur-md border-b border-[#ececee] z-50 transition-colors duration-200">
        <div className="max-w-[1200px] h-full mx-auto px-6 flex items-center justify-between">
          
          <button 
            onClick={() => handleScrollTo('home')} 
            className="flex items-center gap-2 font-[700] text-[#09090b] hover:text-[#ff5a00] transition-colors focus:outline-none text-[16px] tracking-tight text-left"
            aria-label="BlockchainLASU Home"
          >
            <span className="text-[#09090b] text-[18px]">⛓</span>
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
                    ? 'text-[#09090b] font-[700]' 
                    : 'text-[#71717a] hover:text-[#09090b]'
                }`}
              >
                {sectionId}
                {activeSection === sectionId && (
                  <span className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-[#09090b] rounded-full animate-fade-in"></span>
                )}
              </button>
            ))}
          </div>

          {/* Primary Pill Button - Tactile Rounded Pill */}
          <div className="hidden lg:flex items-center">
            <button 
              id="nav-join-btn"
              onClick={handleJoinNow}
              className="bg-[#09090b] text-white text-[13px] font-[500] px-5 py-2 rounded-full hover:bg-[#18181b] transition-all cursor-pointer shadow-[rgba(255,_255,_255,_0.5)_0px_0.5px_0px_0px_inset,_rgba(117,_123,_133,_0.4)_0px_9px_14px_-5px_inset,_rgb(44,_46,_52)_0px_0px_0px_1.5px,_rgba(0,_0,_0,_0.14)_0px_4px_6px_0px]"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Menu Action Indicator */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-1.5 text-[#71717a] hover:text-[#09090b] focus:outline-none transition-colors rounded-full hover:bg-[#ececee]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 1.1 Mobile Nav Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-14 left-0 right-0 bg-white border-b border-[#ececee] py-5 grid grid-cols-2 gap-y-4 px-6 shadow-xl z-40">
            {['home', 'about', 'events', 'gallery', 'team', 'partners', 'membership', 'contact'].map((sect) => (
              <button 
                key={sect}
                onClick={() => handleScrollTo(sect)}
                className="text-left text-[14px] font-[500] py-1 text-[#71717a] hover:text-[#09090b] capitalize"
              >
                {sect}
              </button>
            ))}
            <div className="col-span-2 pt-3 border-t border-[#ececee]">
              <button 
                onClick={handleJoinNow}
                className="w-full bg-[#09090b] text-white text-[14px] font-[500] py-2.5 rounded-full text-center hover:bg-[#18181b] transition-all cursor-pointer shadow-md"
              >
                Join Now
              </button>
            </div>
          </div>
        )}
      </nav>

      <div className="max-w-[1200px] mx-auto px-6">
        
        {/* 2. HERO - Clean minimalist split perspective layout */}
        <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-16 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-12 lg:mt-0">
            
            {/* Left Hero Main Block */}
            <div className="lg:col-span-7 space-y-8">
              {/* Announcement Strip */}
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#ececee] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#ff5a00] animate-pulse"></span>
                <span className="font-sans text-[12px] font-semibold tracking-normal text-[#71717a]">
                  Student-led · Lagos State University · Est. 2020
                </span>
              </div>

              <h1 
                className="text-[44px] md:text-[56px] lg:text-[64px] font-bold text-[#09090b] leading-[1.08] tracking-tight font-sans"
              >
                The Future of <span className="text-[#a1a1aa] font-normal">Web3</span> Starts at LASU
              </h1>

              <p className="text-[16px] text-[#52525b] leading-[1.6] max-w-[560px] font-normal">
                We educate, train, and connect Lagos State University students to careers in Blockchain Technology — building Africa's decentralized future.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={handleJoinNow}
                  className="bg-[#09090b] text-white text-[14px] font-[500] px-6 py-3 rounded-full hover:bg-[#18181b] transition-all cursor-pointer shadow-[rgba(255,_255,_255,_0.5)_0px_0.5px_0px_0px_inset,_rgba(117,_123,_133,_0.4)_0px_9px_14px_-5px_inset,_rgb(44,_46,_52)_0px_0px_0px_1.5px,_rgba(0,_0,_0,_0.14)_0px_4px_6px_0px]"
                >
                  Join Now
                </button>
                <button 
                  onClick={() => handleScrollTo('events')}
                  className="bg-white text-[#3f3f46] border border-[#3f3f46] text-[14px] font-[500] px-6 py-3 rounded-full hover:bg-[#f4f4f5] transition-all cursor-pointer shadow-sm"
                >
                  Explore Events
                </button>
              </div>
            </div>

            {/* Right Hero High Density Interactive capture panel */}
            <div className="lg:col-span-5 bg-white p-8 rounded-[36px] border border-[#ececee] shadow-lg space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-[#ececee] text-[#09090b] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  ⚡ Membership Intake Open
                </div>
                <h3 className="text-[20px] font-bold text-[#09090b]">Apply to the cohort</h3>
                <p className="text-[13px] text-[#71717a] leading-relaxed">
                  Join 300+ students actively learning, coding, and deploying decentralized applications.
                </p>
              </div>

              {/* Quick contact input captures */}
              <div className="space-y-3">
                <button 
                  onClick={handleJoinNow}
                  className="w-full bg-[#f4f4f5] hover:bg-[#ececee] border border-[#ececee] p-3 rounded-[14px] text-left flex items-center justify-between text-[13px] text-[#18181b] font-medium transition-all group"
                >
                  <span>Fill application workflow</span>
                  <ArrowRight size={14} className="text-[#a1a1aa] group-hover:text-[#09090b] group-hover:translate-x-1.5 transition-all" />
                </button>
              </div>

              <div className="pt-2 border-t border-[#ececee] flex items-center justify-between font-mono text-[11px] text-[#a1a1aa]">
                <span>CAMPUS: Ojo Main Campus</span>
                <span>METADATA: COHORT-V</span>
              </div>
            </div>

          </div>

          {/* Social metadata tags at baseline */}
          <div className="mt-20 flex items-center justify-between border-t border-[#ececee] pt-6">
            <span className="font-mono text-[11px] text-[#a1a1aa] tracking-tight">Ojo, Lagos // Nigeria // 6.4674° N, 3.1979° E</span>
            <a 
              href="https://x.com/BlockchainLASU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#71717a] hover:text-[#09090b] transition-colors inline-flex items-center gap-1.5 text-[13px] font-medium group"
              aria-label="X (formerly Twitter)"
            >
              X: <span className="text-[#09090b] font-semibold group-hover:underline decoration-2 decoration-[#ff5a00]">@BlockchainLASU</span>
              <ExternalLink size={12} className="text-[#71717a]" />
            </a>
          </div>
        </section>

        {/* Separator line */}
        <hr className="border-[#ececee]" />

        {/* 3. PARTNER LOGO STRIP - Floating text wordmarks */}
        <section className="py-12 overflow-hidden">
          <div className="relative w-full flex overflow-x-hidden">
            <div className="animate-ticker flex whitespace-nowrap gap-16 items-center">
              {PARTNER_LOGOS.map((pt, idx) => (
                <span 
                  key={idx} 
                  className="text-[#71717a] font-semibold text-[13px] uppercase tracking-widest select-none hover:text-[#09090b] transition-colors"
                >
                  /* REPLACE: real partner logo */
                  {pt.name}
                </span>
              ))}
              {/* Duplicate loop for seamless ticker */}
              {PARTNER_LOGOS.map((pt, idx) => (
                <span 
                  key={`dup-${idx}`} 
                  className="text-[#71717a] font-semibold text-[13px] uppercase tracking-widest select-none hover:text-[#09090b] transition-colors"
                >
                  /* REPLACE: real partner logo */
                  {pt.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 4. ABOUT SECTION - Rounded Snow White cards */}
        <section id="about" className="py-24 space-y-16 scroll-mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 fade-up-element opacity-0 translate-y-8 transition-all duration-700 ease-out">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] leading-tight tracking-tight">
                Who We Are
              </h2>
              <p className="text-[16px] text-[#52525b] leading-[1.6] max-w-[640px] font-normal">
                Blockchain Club LASU is one of Nigeria's most active campus blockchain communities — training the next generation of Web3 developers, designers, and founders at Lagos State University, Ojo, Lagos.
              </p>
              <p className="text-[14px] text-[#71717a] leading-relaxed">
                By bridging technical training with hands-on builders bootcamps, we support students in launching high-impact decentralized utilities, exploring consensus theories, and networking with global industry ecosystem stakeholders.
              </p>
            </div>

            {/* Stat row sits directly on canvas for raw typographic emphasis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:pl-12">
              {STATS.map((st, i) => (
                <div key={i} className="flex flex-col space-y-1">
                  <div className="text-[44px] md:text-[56px] font-bold text-[#09090b] leading-none">
                    {st.value}
                  </div>
                  <div className="text-[13px] font-medium text-[#71717a] tracking-tight">{st.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* What We Do - Beautiful light Snow grids, rounding 36px */}
          <div className="space-y-8">
            <div className="text-left">
              <h3 className="text-[18px] font-bold text-[#09090b] tracking-tight mb-1">Our Core Tracks</h3>
              <p className="text-[13px] text-[#71717a]">Programs we drive to promote developer proficiency on campus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {WHAT_WE_DO.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-8 rounded-[36px] border border-[#ececee] shadow-sm hover:translate-y-[-2px] transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <span className="text-3xl select-none" role="img" aria-label={item.title}>{item.icon}</span>
                    <h4 className="text-[18px] font-bold text-[#09090b] tracking-tight">{item.title}</h4>
                    <p className="text-[13px] text-[#71717a] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 5. EVENTS SECTION - Alternating card highlights with interactive panels */}
        <section id="events" className="py-24 space-y-12 scroll-mt-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
                Events & Programs
              </h2>
              <p className="text-[16px] text-[#71717a] max-w-[560px]">
                From IRL meetups to industry conferences — we stay active making real headway.
              </p>
            </div>
            <div>
              <button 
                onClick={() => handleScrollTo('contact')}
                className="bg-white border border-[#3f3f46] text-[#3f3f46] text-[13px] font-[500] px-5 py-2.5 rounded-full hover:bg-[#f4f4f5] transition-all cursor-pointer shadow-sm"
              >
                Invite Us to Your Event
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.map((evt) => {
              // Standard vs Highly featured custom card with the ultimate Orchid Flash background overlay style!
              const isOrchidFeatured = evt.isFeatured;
              return (
                <div 
                  key={evt.id} 
                  className={`rounded-[36px] p-8 flex flex-col justify-between relative shadow-md transition-all duration-300 hover:scale-[1.01] ${
                    isOrchidFeatured 
                      ? 'bg-gradient-to-tr from-[#fe45e2] to-[#ff5a00] text-white' 
                      : 'bg-white border border-[#ececee] text-[#18181b]'
                  }`}
                >
                  <div className="space-y-6">
                    {/* Badge Row */}
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full ${
                        isOrchidFeatured 
                          ? 'bg-white text-[#ff5a00]' 
                          : 'bg-[#ececee] text-[#3f3f46]'
                      }`}>
                        {evt.status === 'UPCOMING' && <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00]"></span>}
                        {evt.status} · {evt.category}
                      </span>
                      <span className={`font-mono text-[11px] font-semibold ${
                        isOrchidFeatured ? 'text-white' : 'text-[#a1a1aa]'
                      }`}>
                        {evt.id}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-[22px] font-bold tracking-tight">{evt.title}</h3>
                      <div className="flex items-center gap-2 font-mono text-[12px] opacity-90">
                        <MapPin size={13} className="opacity-75" />
                        <span>{evt.hostOrVenue}</span>
                      </div>
                    </div>

                    <p className={`text-[13px] leading-[1.6] ${
                      isOrchidFeatured ? 'text-white/90' : 'text-[#71717a]'
                    }`}>
                      {evt.description}
                    </p>
                  </div>

                  {evt.isFeatured && (
                    <div className="pt-6 mt-6 border-t border-white/20">
                      <button 
                        onClick={handleJoinNow}
                        className="bg-white text-[#09090b] text-[13px] font-bold px-5 py-2.5 rounded-full hover:bg-[#f4f4f5] transition-all cursor-pointer inline-flex items-center gap-2 shadow-lg"
                      >
                        <span>Register Now</span>
                        <ArrowRight size={14} className="text-[#ff5a00]" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 6. GALLERY - Extreme 36px Rounded light moments cards with Picsum placeholders */}
        <section id="gallery" className="py-24 space-y-12 scroll-mt-14">
          <div className="space-y-3">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
              Our Moments
            </h2>
            <p className="text-[16px] text-[#71717a]">
              Real events. Real people. Real impact.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.map((item, index) => (
              <a 
                href={item.imageUrl}
                key={item.id} 
                className="glightbox group bg-white rounded-[36px] p-4 border border-[#ececee] overflow-hidden shadow-sm hover:border-[#ff5a00] transition-all block"
                data-gallery="club-moments"
                data-description={item.caption}
              >
                {/* Image Wrap */}
                <div className="aspect-[3/2] overflow-hidden relative bg-[#ececee] rounded-[24px]">
                  {/* REPLACE: Insert real event photos here */}
                  <img 
                    src={item.imageUrl} 
                    alt={item.caption} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 hover:scale-[1.02] transition-all duration-300" 
                  />
                  {/* Overlay camera prompt */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md p-2 rounded-lg border border-[#ececee] shadow-sm">
                    <span role="img" aria-label="Camera Icon" className="text-xs select-none">📸</span>
                  </div>
                </div>

                {/* Caption description */}
                <div className="p-3.5 flex items-center justify-between">
                  <span className="text-[13px] text-[#18181b] font-bold">
                    {item.caption}
                  </span>
                  <span className="text-[#a1a1aa] text-xs font-mono">
                    [{index + 1}/6]
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-4 flex justify-start">
            <a 
              href="https://x.com/BlockchainLASU" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#71717a] hover:text-[#09090b] transition-colors inline-flex items-center gap-2 group text-[13px] font-semibold"
            >
              Follow us on X for more <span className="group-hover:translate-x-1.5 transition-transform text-[#ff5a00]">→</span>
            </a>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 7. TEAM SECTION - Extreme rounded cards with DiceBear svg elements */}
        <section id="team" className="py-24 space-y-12 scroll-mt-14">
          <div className="space-y-3">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
              Meet the Team
            </h2>
            <p className="text-[16px] text-[#71717a]">
              The builders steering the Blockchain LASU movement.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div 
                key={member.id} 
                className="bg-white p-6 rounded-[36px] border border-[#ececee] shadow-sm hover:translate-y-[-2px] transition-all duration-300 flex flex-col items-center text-center space-y-4"
              >
                {/* Circular Avatar wrapped */}
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#f4f4f5] border border-[#ececee] flex items-center justify-center">
                  {/* REPLACE: Swap DiceBear with real photos */}
                  <img 
                    src={`https://api.dicebear.com/7.x/personas/svg?seed=${member.seed}`} 
                    alt={member.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="space-y-1">
                  <h3 className="text-[15px] font-bold text-[#09090b] tracking-tight">{member.name}</h3>
                  <p className="text-[12px] text-[#71717a] font-medium">{member.role}</p>
                </div>

                <a 
                  href={`https://x.com/${member.xHandle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[#a1a1aa] hover:text-[#09090b] transition-colors inline-block"
                >
                  /* REPLACE: real social link */
                  @{member.xHandle}
                </a>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 8. PARTNERS SECTION - Muted partner cards & Custom dashed join cards */}
        <section id="partners" className="py-24 space-y-12 scroll-mt-14">
          <div className="space-y-3">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
              Partners & Collaborators
            </h2>
            <p className="text-[16px] text-[#71717a]">
              Web3 organizations we've built with across Nigeria and beyond.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DETAILED_PARTNERS.map((partner) => (
              <div 
                key={partner.id} 
                className="bg-white p-6 rounded-[28px] border border-[#ececee] shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="text-[15px] font-bold text-[#09090b]">{partner.name}</h3>
                  <p className="text-[13px] text-[#71717a] leading-relaxed">{partner.description}</p>
                </div>
              </div>
            ))}

            {/* Become a partner prompt with dashed border */}
            <div className="bg-transparent border-2 border-dashed border-[#d4d4d8] p-6 rounded-[28px] flex flex-col items-center justify-center text-center space-y-4">
              <span className="text-[13px] text-[#71717a] font-medium">
                Interested in partnering?
              </span>
              <button 
                onClick={handleBecomePartner}
                className="bg-[#09090b] text-white text-[13px] font-[510] px-4 py-2 rounded-full hover:bg-[#18181b] transition-all cursor-pointer shadow-sm"
              >
                Get in Touch
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-[#ececee] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <span className="text-[15px] text-[#71717a] font-medium">
              Building something in Web3? Let's collaborate.
            </span>
            <button 
              onClick={handleBecomePartner}
              className="bg-white border border-[#3f3f46] text-[#3f3f46] text-[13px] font-[500] px-5 py-2 rounded-full hover:bg-[#f4f4f5] transition-all flex items-center gap-1.5 shadow-sm"
            >
              Partner With Us
            </button>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 9. MEMBERSHIP SECTION - Rounded input elements & custom submission workflows */}
        <section id="membership" className="py-24 space-y-12 scroll-mt-14" ref={membershipRef}>
          <div className="space-y-3">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
              Join the Movement
            </h2>
            <p className="text-[16px] text-[#71717a]">
              Become part of Nigeria's most active campus Web3 community.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT — Member Perks with Ember Dot indicator */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[18px] font-bold text-[#09090b]">Member Perks & Access</h3>
                <p className="text-[13px] text-[#71717a] leading-relaxed">
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
                  <div key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a00] mt-2 flex-shrink-0"></span>
                    <span className="text-[15px] text-[#18181b] font-medium leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — Registration form Snow White block */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 rounded-[36px] border border-[#ececee] shadow-lg">
                
                {joinSuccess ? (
                  /* Form execution receipt view */
                  <div className="border-l-[4px] border-[#ff5a00] pl-6 py-2 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-[22px] font-bold text-[#09090b]">🎉 Application Received!</h3>
                      <p className="text-[13px] text-[#71717a] leading-relaxed">
                        Thank you for applying to join the LASU Blockchain Club, <span className="text-[#09090b] font-semibold">{joinData.fullName}</span>. We've logged your application details securely:
                      </p>
                    </div>

                    <div className="bg-[#f4f4f5] p-5 rounded-[14px] border border-[#ececee] font-mono text-[12px] text-[#71717a] space-y-2">
                      <div><span className="text-[#a1a1aa]">Applicant://</span> {joinData.fullName}</div>
                      <div><span className="text-[#a1a1aa]">Matric_No://</span> {joinData.studentId}</div>
                      <div><span className="text-[#a1a1aa]">Dept_Level://</span> {joinData.facultyDept} ([{joinData.level}L])</div>
                      <div><span className="text-[#a1a1aa]">Exp_Level://</span> {joinData.priorKnowledge}</div>
                      <div><span className="text-[#a1a1aa]">Status_Dot://</span> Active Processing</div>
                    </div>

                    <p className="text-[13px] text-[#52525b] leading-relaxed">
                      We'll inspect your details and be in touch via email (<span className="text-[#ff5a00] font-semibold">{joinData.email}</span>) within 48 hours with onboarding steps!
                    </p>

                    <button 
                      onClick={() => setJoinSuccess(false)}
                      className="text-[12px] font-semibold text-[#71717a] hover:text-[#09090b] underline"
                    >
                      Fill another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleJoinSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name field */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-full-name" className="block text-[11px] font-bold text-[#3f3f46]">Full Name</label>
                        <input 
                          id="join-full-name"
                          type="text" 
                          required
                          value={joinData.fullName}
                          onChange={(e) => setJoinData({...joinData, fullName: e.target.value})}
                          placeholder="Felix Adebayo"
                          className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                        />
                      </div>

                      {/* Student ID */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-student-id" className="block text-[11px] font-bold text-[#3f3f46]">
                          Student ID / Matric Number
                        </label>
                        <input 
                          id="join-student-id"
                          type="text" 
                          required
                          value={joinData.studentId}
                          onChange={(e) => setJoinData({...joinData, studentId: e.target.value})}
                          placeholder="240591001"
                          className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] font-mono transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Faculty Dept */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-faculty-dept" className="block text-[11px] font-bold text-[#3f3f46]">Faculty & Department</label>
                        <input 
                          id="join-faculty-dept"
                          type="text" 
                          required
                          value={joinData.facultyDept}
                          onChange={(e) => setJoinData({...joinData, facultyDept: e.target.value})}
                          placeholder="Science / Computer Science"
                          className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                        />
                      </div>

                      {/* Level */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-level" className="block text-[11px] font-bold text-[#3f3f46]">Level</label>
                        <select 
                          id="join-level"
                          value={joinData.level}
                          onChange={(e) => setJoinData({...joinData, level: e.target.value})}
                          className="w-full bg-[#f4f4f5] text-[#09090b] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] cursor-pointer transition-all appearance-none"
                        >
                          <option value="100">100 Level</option>
                          <option value="200">200 Level</option>
                          <option value="300">300 Level</option>
                          <option value="400">400 Level</option>
                          <option value="500">500 Level</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email address */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-email" className="block text-[11px] font-bold text-[#3f3f46]">Email Address</label>
                        <input 
                          id="join-email"
                          type="email" 
                          required
                          value={joinData.email}
                          onChange={(e) => setJoinData({...joinData, email: e.target.value})}
                          placeholder="felix@student.lasu.edu.ng"
                          className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                        />
                      </div>

                      {/* Phone number */}
                      <div className="space-y-1.5">
                        <label htmlFor="join-phone" className="block text-[11px] font-bold text-[#3f3f46]">Phone Number</label>
                        <input 
                          id="join-phone"
                          type="tel" 
                          required
                          value={joinData.phoneNumber}
                          onChange={(e) => setJoinData({...joinData, phoneNumber: e.target.value})}
                          placeholder="+234 812 345 6789"
                          className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                        />
                      </div>
                    </div>

                    {/* Prior Knowledge */}
                    <div className="space-y-1.5">
                      <label htmlFor="join-prior-knowledge" className="block text-[11px] font-bold text-[#3f3f46]">Prior blockchain knowledge?</label>
                      <select 
                        id="join-prior-knowledge"
                        value={joinData.priorKnowledge}
                        onChange={(e) => setJoinData({...joinData, priorKnowledge: e.target.value})}
                        className="w-full bg-[#f4f4f5] text-[#09090b] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] cursor-pointer transition-all appearance-none"
                      >
                        <option value="None">None (Interested to Learn)</option>
                        <option value="Beginner">Beginner (Know basic terminologies)</option>
                        <option value="Intermediate">Intermediate (Used wallets, understand mechanics)</option>
                        <option value="Advanced">Advanced (Develop smart contracts/build solutions)</option>
                      </select>
                    </div>

                    {/* Reason */}
                    <div className="space-y-1.5">
                      <label htmlFor="join-reason" className="block text-[11px] font-bold text-[#3f3f46]">Why do you want to join?</label>
                      <textarea 
                        id="join-reason"
                        required
                        value={joinData.reason}
                        onChange={(e) => setJoinData({...joinData, reason: e.target.value})}
                        rows={4}
                        placeholder="State your expectations, goals, or technical interests in joining..."
                        className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] resize-none focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <button 
                      type="submit"
                      disabled={joinLoading}
                      className="w-full bg-[#09090b] h-12 text-white text-[14px] font-bold rounded-full hover:bg-[#18181b] transition-all disabled:opacity-50 inline-flex items-center justify-center cursor-pointer shadow-md"
                    >
                      {joinLoading ? 'Recording Application...' : 'Submit Application'}
                    </button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 10. INVITATION SECTION  */}
        <section id="contact" className="py-24 space-y-12 scroll-mt-14" ref={invitationRef}>
          <div className="text-center space-y-3 max-w-[640px] mx-auto">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
              Invite Us to Your Event
            </h2>
            <p className="text-[16px] text-[#71717a] leading-relaxed">
              Planning a conference, panel, or campus event? We bring Web3 expertise, energy, and a community of builders to maximize impact.
            </p>
          </div>

          <div className="max-w-[560px] mx-auto">
            <div className="bg-white p-8 rounded-[36px] border border-[#ececee] shadow-lg">
              
              {inviteSuccess ? (
                /* Invitation Received view */
                <div className="border-l-[4px] border-[#ff5a00] pl-6 py-2 space-y-4">
                  <h3 className="text-[18px] font-bold text-[#09090b]">✅ Invitation received.</h3>
                  <p className="text-[13px] text-[#71717a] leading-relaxed">
                    We've received your coordination request for the event <span className="text-[#09090b] font-semibold">"{inviteData.eventName}"</span>.
                  </p>
                  <p className="text-[13px] text-[#52525b]">
                    The Secretariat will inspect the itinerary and reach back to <span className="text-[#ff5a00] font-semibold">{inviteData.contactEmail}</span> inside 48 hours to confirm availability and discutir arrangements.
                  </p>
                  <button 
                    onClick={() => setInviteSuccess(false)}
                    className="text-[12px] font-semibold text-[#71717a] hover:text-[#09090b] underline"
                  >
                    Send another invitation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInviteSubmit} className="space-y-6">
                  {/* Event Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="invite-event-name" className="block text-[11px] font-bold text-[#3f3f46]">Event Name</label>
                    <input 
                      id="invite-event-name"
                      type="text" 
                      required
                      value={inviteData.eventName}
                      onChange={(e) => setInviteData({...inviteData, eventName: e.target.value})}
                      placeholder="e.g. Lagos Tech Summit"
                      className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Event Date */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-event-date" className="block text-[11px] font-bold text-[#3f3f46]">Event Date</label>
                      <input 
                        id="invite-event-date"
                        type="date" 
                        required
                        value={inviteData.eventDate}
                        onChange={(e) => setInviteData({...inviteData, eventDate: e.target.value})}
                        className="w-full bg-[#f4f4f5] text-[#09090b] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                      />
                    </div>

                    {/* Event Type */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-event-type" className="block text-[11px] font-bold text-[#3f3f46]">Event Type</label>
                      <select 
                        id="invite-event-type"
                        value={inviteData.eventType}
                        onChange={(e) => setInviteData({...inviteData, eventType: e.target.value})}
                        className="w-full bg-[#f4f4f5] text-[#09090b] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] cursor-pointer transition-all appearance-none"
                      >
                        <option value="Conference">Conference</option>
                        <option value="Panel">Panel</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Hackathon">Hackathon</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Coordinator Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-contact-name" className="block text-[11px] font-bold text-[#3f3f46]">Your Name & Organization</label>
                      <input 
                        id="invite-contact-name"
                        type="text" 
                        required
                        value={inviteData.contactNameOrg}
                        onChange={(e) => setInviteData({...inviteData, contactNameOrg: e.target.value})}
                        placeholder="Emeka Okafor (Tech Lagos)"
                        className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                      />
                    </div>

                    {/* Coordinator Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="invite-contact-email" className="block text-[11px] font-bold text-[#3f3f46]">Contact Email</label>
                      <input 
                        id="invite-contact-email"
                        type="email" 
                        required
                        value={inviteData.contactEmail}
                        onChange={(e) => setInviteData({...inviteData, contactEmail: e.target.value})}
                        placeholder="speaker@techlagos.org"
                        className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label htmlFor="invite-description" className="block text-[11px] font-bold text-[#3f3f46]">Brief Description</label>
                    <textarea 
                      id="invite-description"
                      required
                      value={inviteData.description}
                      onChange={(e) => setInviteData({...inviteData, description: e.target.value})}
                      rows={4}
                      placeholder="Outline speaking details, estimated delegation size, and how LASU Blockchain members can participate..."
                      className="w-full bg-[#f4f4f5] text-[#09090b] placeholder-[#a1a1aa] text-sm p-3 rounded-[14px] resize-none focus:outline-none focus:ring-1 focus:ring-[#ff5a00] transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit"
                    disabled={inviteLoading}
                    className="w-full bg-[#09090b] h-12 text-white text-[14px] font-bold rounded-full hover:bg-[#18181b] transition-all disabled:opacity-50 inline-flex items-center justify-center cursor-pointer shadow-md"
                  >
                    {inviteLoading ? 'Sending Invitation...' : 'Send Invitation'}
                  </button>
                </form>
              )}

            </div>
          </div>
        </section>

        <hr className="border-[#ececee]" />

        {/* 11. SOCIALS SECTION & High-contrast Newsletter capturing row */}
        <section className="py-24 space-y-16">
          <div className="space-y-3">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#09090b] tracking-tight">
              Stay in the Loop
            </h2>
            <p className="text-[16px] text-[#71717a]">
              Never miss an event, workshop, or recruitment opportunity.
            </p>
          </div>

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
                <a 
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-[28px] p-4 border border-[#ececee] shadow-sm hover:border-[#ff5a00] hover:translate-y-[-2px] hover:shadow-md transition-all text-center flex flex-col justify-center items-center h-24"
                >
                  <span className="text-[14px] font-bold text-[#09090b]">{soc.label}</span>
                  <span className="text-[10px] text-[#71717a] font-mono mt-1">/* REPLACE: social */</span>
                </a>
              ))}
            </div>

            {/* Right side High-contrast Obsidian email capture banner */}
            <div className="lg:col-span-6 bg-[#09090b] text-white p-8 md:p-10 rounded-[36px] shadow-lg flex flex-col justify-between">
              <div className="space-y-3 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-white/10 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  📰 Club Newsletter
                </span>
                <h3 className="text-[20px] font-bold">Consensus Bulletin</h3>
                <p className="text-[13px] text-[#a1a1aa] leading-relaxed">
                  Get occasional development recaps, Solidity tips, and job openings sent directly to your inbox.
                </p>
              </div>

              {newsletterSubmitted ? (
                <div className="bg-white/10 p-4 rounded-[14px] border border-white/15 text-[13px] text-white font-medium">
                  🎉 Swell! Thank you for subscribing. Check your mail soon!
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter school email"
                    className="flex-grow bg-white/10 border border-white/20 text-white placeholder-white/55 text-sm p-3 rounded-[14px] focus:outline-none focus:ring-1 focus:ring-white transition-all"
                  />
                  <button 
                    type="submit"
                    className="bg-[#ff5a00] text-white hover:bg-[#e04f00] text-[13px] font-bold px-6 py-3 rounded-full transition-all cursor-pointer shadow-md inline-flex items-center justify-center"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

      </div>

      {/* 12. FOOTER - Flat Snow White background */}
      <footer className="bg-white border-t border-[#ececee] pt-16 pb-12">
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Column 1: Brand details */}
          <div className="md:col-span-5 space-y-4">
            <button 
              onClick={() => handleScrollTo('home')} 
              className="flex items-center gap-2 font-[700] text-[#09090b] hover:text-[#ff5a00] transition-colors focus:outline-none text-[16px] tracking-tight text-left"
            >
              <span>⛓</span>
              <span>BlockchainLASU</span>
            </button>
            <p className="text-[13px] text-[#71717a] leading-relaxed max-w-[340px]">
              Educating, training, and connecting LASU students to the future of Web3 and decentralization.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-sans text-[11px] text-[#71717a] font-bold tracking-wider uppercase">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {['home', 'about', 'events', 'gallery', 'team', 'partners', 'membership', 'contact'].map((link) => (
                <button 
                  key={link}
                  onClick={() => handleScrollTo(link)} 
                  className="text-left text-[13px] text-[#71717a] hover:text-[#09090b] hover:underline decoration-[#ff5a00] hover:font-bold transition-all focus:outline-none capitalize"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Social list */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-sans text-[11px] text-[#71717a] font-bold tracking-wider uppercase">Social Channels</h4>
            <div className="flex flex-col gap-2 text-[13px] text-[#71717a]">
              <a href="https://x.com/BlockchainLASU" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090b] hover:underline decoration-[#ff5a00] transition-colors">Twitter/X</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090b] hover:underline decoration-[#ff5a00] transition-colors">Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090b] hover:underline decoration-[#ff5a00] transition-colors">LinkedIn</a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090b] hover:underline decoration-[#ff5a00] transition-colors">Telegram</a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#09090b] hover:underline decoration-[#ff5a00] transition-colors">WhatsApp</a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-[1200px] mx-auto px-6 pt-8 border-t border-[#ececee]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#71717a]">
            <span>© 2025 Blockchain Club, Lagos State University. All rights reserved.</span>
            <span>Built by the LASU Blockchain Community</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
