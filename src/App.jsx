import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MousePointer2, ArrowRight, Zap, Target, Layers, Globe, Search, Code, BarChart3, Rocket, TrendingUp, Palette, Menu, X, Send, Phone, Mail, CheckCircle, Bot, Brain, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ── Helpers ── */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* ── Noise ── */
const Noise = () => (
  <svg className="noise-overlay">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

/* ── Magnetic Button ── */
const MagneticButton = ({ children, variant = 'primary', className = '', onClick, href, type = 'button' }) => {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = btnRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) * 0.2;
    const y = (e.clientY - top - height / 2) * 0.2;
    gsap.to(btnRef.current, { x, y, duration: 0.3, ease: 'power3.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
  };

  const baseClasses = 'relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-medium transition-all duration-300 group cursor-pointer';
  const variants = {
    primary: 'bg-primary text-background px-8 py-4',
    outline: 'bg-transparent border border-slate text-textMain px-8 py-4 hover:border-primary',
  };

  const handleClick = (e) => {
    if (href) {
      e.preventDefault();
      if (href.startsWith('#')) {
        scrollTo(href.slice(1));
      } else {
        window.open(href, '_blank', 'noopener');
      }
    }
    if (onClick) onClick(e);
  };

  return (
    <button
      ref={btnRef}
      type={type}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={{ transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      )}
      {variant === 'outline' && (
        <div className="absolute inset-0 bg-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"></div>
      )}
    </button>
  );
};

/* ── Navbar ── */
const Navbar = () => {
  const navRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
    { label: 'Results', id: 'results' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const showNav = () => {
      if (window.scrollY > 100) {
        navRef.current.classList.add('bg-background/80', 'backdrop-blur-xl', 'border-slate/50');
        navRef.current.classList.remove('bg-transparent', 'border-transparent');
      } else {
        navRef.current.classList.remove('bg-background/80', 'backdrop-blur-xl', 'border-slate/50');
        navRef.current.classList.add('bg-transparent', 'border-transparent');
      }
    };
    window.addEventListener('scroll', showNav);
    return () => window.removeEventListener('scroll', showNav);
  }, []);

  const handleNav = (id) => {
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full border border-transparent transition-all duration-500 w-[90%] max-w-6xl">
        <button onClick={scrollToTop} className="text-xl font-sans font-bold tracking-tight flex items-center gap-2 cursor-pointer">
          GALAXY<span className="text-primary">.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {links.map(link => (
            <button key={link.id} onClick={() => handleNav(link.id)} className="text-textMuted hover:text-textMain hover:-translate-y-[1px] transition-all cursor-pointer">
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton variant="primary" className="py-2.5 px-6 text-sm" href="#contact">Get a Free Quote</MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-textMain p-2 cursor-pointer">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-500 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {links.map(link => (
          <button key={link.id} onClick={() => handleNav(link.id)} className="text-2xl font-sans font-medium text-textMain hover:text-primary transition-colors cursor-pointer">
            {link.label}
          </button>
        ))}
        <MagneticButton variant="primary" className="mt-4" href="#contact" onClick={() => setMobileOpen(false)}>Get a Free Quote</MagneticButton>
      </div>
    </>
  );
};

/* ── Hero Mockups ── */
const HeroMockups = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.mockup-item', {
      y: 80,
      opacity: 0,
      rotateX: 15,
      duration: 1.4,
      stagger: 0.25,
      ease: 'power3.out',
      delay: 0.5
    });

    gsap.to('.mockup-float-1', { y: -12, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.mockup-float-2', { y: 10, x: -5, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    gsap.to('.mockup-float-3', { y: -8, x: 5, duration: 4.5, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 0.8 });
    // Subtle shimmer on main screen
    gsap.to('.screen-shimmer', {
      backgroundPosition: '200% 0%',
      duration: 3,
      repeat: -1,
      ease: 'none'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[450px] lg:min-h-[550px]" style={{ perspective: '1200px' }}>

      {/* ── Main Browser Window ── */}
      <div className="mockup-item mockup-float-1 absolute top-[2%] left-[0%] w-[78%] z-10" style={{ transform: 'rotateY(-4deg) rotateX(2deg)' }}>
        <div className="rounded-2xl border border-white/[0.08] shadow-[0_20px_80px_-15px_rgba(201,168,76,0.15),0_0_0_1px_rgba(255,255,255,0.05)] overflow-hidden" style={{ background: 'linear-gradient(145deg, #1C1C28 0%, #13131D 100%)' }}>
          {/* Browser chrome */}
          <div className="flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.06]" style={{ background: 'linear-gradient(180deg, #1A1A26 0%, #16161F 100%)' }}>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E] shadow-[0_0_6px_rgba(254,188,46,0.4)]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.4)]"></div>
            </div>
            <div className="flex-1 mx-4 bg-black/30 rounded-lg px-4 py-1.5 text-[10px] font-mono text-textMuted/60 flex items-center gap-2 border border-white/[0.04]">
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              </div>
              sleekpredators.com
            </div>
            <div className="flex gap-1.5">
              <div className="w-6 h-5 rounded bg-white/[0.04] border border-white/[0.06]"></div>
              <div className="w-6 h-5 rounded bg-white/[0.04] border border-white/[0.06]"></div>
            </div>
          </div>

          {/* Website screen — rich dark dashboard-style site */}
          <div className="relative p-5 min-h-[200px]" style={{ background: 'linear-gradient(180deg, #0E0E16 0%, #0A0A12 100%)' }}>
            {/* Shimmer overlay */}
            <div className="screen-shimmer absolute inset-0 opacity-[0.03] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 30%, rgba(201,168,76,0.5) 50%, transparent 70%)', backgroundSize: '200% 100%' }}></div>

            {/* Nav */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <span className="text-[6px] font-bold text-background">SP</span>
                </div>
                <span className="text-[10px] font-semibold text-textMain/90 tracking-tight">Sleek Predators</span>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-6 h-[3px] rounded bg-textMuted/20"></div>
                <div className="w-6 h-[3px] rounded bg-textMuted/20"></div>
                <div className="w-6 h-[3px] rounded bg-textMuted/20"></div>
                <div className="w-12 h-5 rounded-full bg-primary/80 flex items-center justify-center">
                  <span className="text-[6px] font-bold text-background">SHOP</span>
                </div>
              </div>
            </div>

            {/* Hero area with gradient */}
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ background: 'linear-gradient(135deg, #1a1520 0%, #0D0D18 40%, #1a150a 100%)' }}>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-primary/5 to-transparent"></div>
              <div className="p-5 relative z-10">
                <div className="text-[7px] font-mono text-primary tracking-[0.2em] uppercase mb-2">Premium Collection</div>
                <div className="text-[16px] font-bold text-textMain/95 leading-tight mb-1">Product Design</div>
                <div className="text-[16px] font-bold text-textMain/40 leading-tight font-serif italic mb-3">Excellence</div>
                <div className="flex gap-2">
                  <div className="w-14 h-5 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[6px] font-bold text-background">EXPLORE</span>
                  </div>
                  <div className="w-14 h-5 rounded-full border border-white/10 flex items-center justify-center">
                    <span className="text-[6px] text-textMuted">LOOKBOOK</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product cards */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { gradient: 'from-amber-900/30 via-primary/10 to-transparent', price: '$1,200' },
                { gradient: 'from-slate-700/40 via-slate-800/20 to-transparent', price: '$890' },
                { gradient: 'from-primary/20 via-amber-900/10 to-transparent', price: '$2,100' },
              ].map((card, i) => (
                <div key={i} className="rounded-lg overflow-hidden border border-white/[0.06]" style={{ background: 'linear-gradient(180deg, #141420 0%, #0D0D16 100%)' }}>
                  <div className={`aspect-square bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm"></div>
                  </div>
                  <div className="p-2">
                    <div className="w-12 h-1 bg-textMain/15 rounded mb-1"></div>
                    <div className="text-[7px] font-mono text-primary/70">{card.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Card — Portfolio Piece ── */}
      <div className="mockup-item mockup-float-2 absolute top-[8%] right-[-2%] w-[42%] z-20" style={{ transform: 'rotateY(5deg) rotateX(-3deg)' }}>
        <div className="rounded-2xl border border-white/[0.08] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-sm" style={{ background: 'linear-gradient(160deg, #1E1E2C 0%, #14141F 100%)' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[8px] font-mono text-primary uppercase tracking-[0.15em]">Polished Portfolio</div>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-full bg-white/[0.04] border border-white/[0.08]"></div>
                <div className="w-4 h-4 rounded-full bg-white/[0.04] border border-white/[0.08]"></div>
              </div>
            </div>

            {/* Rich gradient thumbnail */}
            <div className="rounded-xl aspect-[4/3] mb-3 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #2a1f10 0%, #1a1028 50%, #0a1a20 100%)' }}>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-purple-500/10"></div>
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent"></div>
              {/* Fake UI elements inside */}
              <div className="absolute top-3 left-3">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                </div>
              </div>
              <div className="absolute bottom-3 left-3 right-3">
                <div className="w-20 h-1.5 bg-white/30 rounded mb-1.5"></div>
                <div className="w-14 h-1 bg-white/15 rounded"></div>
              </div>
              <div className="absolute top-3 right-3 w-12 h-5 rounded-full bg-primary/70 flex items-center justify-center">
                <span className="text-[6px] font-bold text-background">LIVE</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] font-semibold text-textMain/80 mb-0.5">Artisan Coffee Co.</div>
                <div className="text-[8px] text-textMuted/50 font-mono">E-Commerce Redesign</div>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-[7px] font-mono text-emerald-400">+340% Sales</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Card — Analytics Dashboard ── */}
      <div className="mockup-item mockup-float-3 absolute bottom-[0%] right-[0%] w-[55%] z-30" style={{ transform: 'rotateY(3deg) rotateX(-2deg)' }}>
        <div className="rounded-2xl border border-primary/10 shadow-[0_30px_80px_-20px_rgba(201,168,76,0.12),0_0_40px_-10px_rgba(201,168,76,0.05)] overflow-hidden backdrop-blur-sm" style={{ background: 'linear-gradient(160deg, #1A1A28 0%, #111119 100%)' }}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[8px] font-mono text-primary uppercase tracking-[0.15em] mb-1">Growth Dashboard</div>
                <div className="text-[14px] font-bold text-textMain/90">$48,250</div>
                <div className="text-[8px] text-textMuted/50 font-mono">Revenue this month</div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  <TrendingUp size={8} className="text-emerald-400" />
                  <span className="text-[8px] font-mono text-emerald-400 font-semibold">+127%</span>
                </div>
                <span className="text-[7px] text-textMuted/40 font-mono">vs last month</span>
              </div>
            </div>

            {/* Chart with gradient fill */}
            <div className="relative h-16 mb-3">
              <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.5" />
                    <stop offset="50%" stopColor="#C9A84C" stopOpacity="1" />
                    <stop offset="100%" stopColor="#C9A84C" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                <path d="M0,55 C20,50 30,45 50,40 C70,35 80,42 100,30 C120,18 130,25 150,15 C170,5 180,10 200,3 L200,60 L0,60 Z" fill="url(#chartGrad)" />
                <path d="M0,55 C20,50 30,45 50,40 C70,35 80,42 100,30 C120,18 130,25 150,15 C170,5 180,10 200,3" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="200" cy="3" r="3" fill="#C9A84C" className="animate-pulse" />
              </svg>
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Visitors', value: '24.8K', color: 'text-primary' },
                { label: 'Leads', value: '1,247', color: 'text-emerald-400' },
                { label: 'Conv. Rate', value: '5.03%', color: 'text-sky-400' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-lg p-2 text-center">
                  <div className={`text-[10px] font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-[7px] text-textMuted/40 font-mono uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Glow effects */}
      <div className="absolute top-[30%] left-[20%] w-[60%] h-[50%] bg-primary/6 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-primary/4 blur-[80px] rounded-full pointer-events-none"></div>
    </div>
  );
};

/* ── Hero ── */
const Hero = () => {
  const containerRef = useRef(null);
  const gradientRef = useRef(null);
  const orbRef1 = useRef(null);
  const orbRef2 = useRef(null);
  const orbRef3 = useRef(null);

  useGSAP(() => {
    gsap.from('.hero-text', {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2
    });

    gsap.to(gradientRef.current, {
      backgroundPosition: '200% 200%',
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to(orbRef1.current, { x: 60, y: -40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orbRef2.current, { x: -80, y: 50, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orbRef3.current, { x: 40, y: 60, duration: 12, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full flex items-center pt-28 pb-16 md:pt-32 md:pb-20 px-6 md:px-16 overflow-hidden min-h-[90vh]">
      <div className="absolute inset-0 z-0 bg-[#0A0A0F]">
        <div ref={orbRef1} className="absolute top-[15%] right-[20%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px]"></div>
        <div ref={orbRef2} className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-primary/10 blur-[100px]"></div>
        <div ref={orbRef3} className="absolute top-[50%] left-[50%] w-[600px] h-[600px] rounded-full bg-primary/8 blur-[150px]"></div>
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        ></div>
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-tr from-background/80 via-primary/5 to-background/90 mix-blend-overlay"
          style={{ backgroundSize: '300% 300%', backgroundPosition: '0% 0%' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-end">
        {/* Left — Copy */}
        <div className="max-w-2xl">
          <p className="hero-text text-primary font-mono text-sm tracking-widest mb-6 uppercase flex items-center gap-3">
            <span className="h-[1px] w-8 bg-primary"></span>
            Web Design &bull; SEO &bull; AI Visibility
          </p>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-bold leading-[1.05] tracking-tight mb-2">
            Get Found. <br />
            <span className="hero-text block font-serif italic text-textMuted text-5xl md:text-7xl lg:text-[6rem] mt-2">Get Chosen.</span>
          </h1>
          <p className="hero-text text-lg md:text-xl text-textMuted max-w-xl mt-10 font-sans leading-relaxed">
            We build websites that don't just look incredible — they rank on Google, get recommended by ChatGPT, Gemini, and Perplexity, and turn every visitor into a customer. <span className="text-textMain/90 font-medium">SEO + GEO + AEO — the full visibility stack.</span>
          </p>
          <div className="hero-text mt-10 flex flex-col sm:flex-row items-start gap-5">
            <MagneticButton href="#contact">Start Your Project <ArrowRight size={18} /></MagneticButton>
            <MagneticButton variant="outline" href="#results">See Our Results <BarChart3 size={18} /></MagneticButton>
          </div>
          <div className="hero-text mt-8 flex flex-wrap items-center gap-4 text-xs font-mono text-textMuted/70">
            <div className="flex items-center gap-2 bg-surface/50 border border-slate/30 px-4 py-2 rounded-full">
              <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"></span>
              150+ Websites Launched
            </div>
            <div className="flex items-center gap-2 bg-surface/50 border border-slate/30 px-4 py-2 rounded-full">
              <TrendingUp size={12} className="text-primary" />
              Avg. 3x Traffic Growth
            </div>
            <div className="flex items-center gap-2 bg-surface/50 border border-slate/30 px-4 py-2 rounded-full">
              <Bot size={12} className="text-primary" />
              AI-Optimized
            </div>
          </div>
        </div>

        {/* Right — Mockups */}
        <div className="hero-text hidden lg:block">
          <HeroMockups />
        </div>
      </div>
    </section>
  );
};

/* ── Philosophy ── */
const Philosophy = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from('.phil-word', {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }, { scope: textRef });

  return (
    <section id="philosophy" ref={textRef} className="relative py-40 border-t border-slate/30 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 text-center">
        <h2 className="text-xl md:text-3xl font-sans font-normal text-textMuted mb-8 flex flex-wrap justify-center gap-2">
          {"Google changed. AI is answering the questions now.".split(' ').map((w, i) => <span key={i} className="phil-word inline-block">{w}</span>)}
        </h2>
        <div className="text-4xl md:text-7xl font-sans font-bold leading-tight flex flex-wrap justify-center items-center gap-3 md:gap-5 mt-8">
          {"Your business needs to be".split(' ').map((w, i) => <span key={i} className="phil-word inline-block">{w}</span>)}
          <span className="phil-word font-serif italic text-primary block w-full mt-4 text-5xl md:text-8xl">everywhere.</span>
        </div>
        <p className="phil-word mt-16 text-textMuted/60 max-w-2xl mx-auto font-mono text-sm leading-relaxed">
          Not just page one of Google — but in ChatGPT answers, Gemini recommendations, and Perplexity results. We optimize for all of them. That's the difference between being found and being invisible.
        </p>
      </div>
    </section>
  );
};

/* ── Interactive Cards ── */
const CardShuffler = () => {
  const [cards, setCards] = useState(['Google SEO', 'AI Visibility (GEO)', 'Answer Engines (AEO)']);

  useEffect(() => {
    const int = setInterval(() => {
      setCards(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        newArr.unshift(last);
        return newArr;
      });
    }, 3000);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {cards.map((text, i) => {
        const yOffset = i * -15;
        const scale = 1 - (i * 0.05);
        const opacity = 1 - (i * 0.3);
        const zIndex = 10 - i;
        return (
          <div
            key={text}
            className="absolute bg-surface border border-slate rounded-2xl w-full max-w-[200px] p-5 shadow-2xl transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{ transform: `translateY(${yOffset}px) scale(${scale})`, opacity, zIndex }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <TrendingUp size={14} />
              </div>
              <p className="font-mono text-xs">{text}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
};

const CardTypewriter = () => {
  const text = "Your website is live. Google indexed it in 4 hours. ChatGPT is already recommending you to local customers.";
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let index = 0;
    const int = setInterval(() => {
      setDisplay(text.slice(0, index));
      index++;
      if (index > text.length + 10) index = 0;
    }, 80);
    return () => clearInterval(int);
  }, []);

  return (
    <div className="h-48 w-full bg-surface border border-slate rounded-2xl p-6 flex flex-col font-mono relative overflow-hidden">
      <div className="flex items-center gap-2 text-xs text-textMuted mb-6 uppercase">
        <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
        Building your site
      </div>
      <p className="text-sm leading-relaxed text-textMain/80">
        {display}<span className="inline-block w-1.5 bg-primary h-3 ml-1 animate-pulse"></span>
      </p>
    </div>
  )
};

const CardScheduler = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.set('.cursor-svg', { x: -20, y: -20, scale: 1, opacity: 0 })
      .to('.cursor-svg', { opacity: 1, duration: 0.3 })
      .to('.cursor-svg', { x: 74, y: 34, duration: 1, ease: 'power2.inOut', delay: 0.2 })
      .to('.cursor-svg', { scale: 0.8, duration: 0.1 })
      .to('.day-cell', { backgroundColor: '#C9A84C', color: '#000', duration: 0.2 }, '<')
      .to('.cursor-svg', { scale: 1, duration: 0.1 })
      .to('.cursor-svg', { x: 180, y: 80, duration: 1, ease: 'power2.inOut', delay: 0.5 })
      .to('.cursor-svg', { opacity: 0, duration: 0.3 })
      .to('.day-cell', { backgroundColor: 'transparent', color: '#A0A0AA', duration: 0.5 });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="h-48 w-full bg-surface border border-slate rounded-2xl p-6 relative">
      <div className="grid grid-cols-7 gap-1">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
          <div key={i} className={`h-8 rounded-md flex items-center justify-center text-xs font-mono bg-background text-textMuted transition-colors duration-300 ${i === 3 ? 'day-cell' : ''}`}>
            {d}
          </div>
        ))}
      </div>
      <div className="absolute bottom-6 right-6">
        <div className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest">Launch</div>
      </div>
      <MousePointer2 className="cursor-svg absolute top-6 left-6 text-white w-5 h-5 stroke-[1.5]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
    </div>
  )
};

/* ── Features ── */
const Features = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-slate/20">
      <div className="mb-24 md:text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6">
          The only agency you'll ever need.
        </h2>
        <p className="text-textMuted max-w-2xl font-sans text-lg md:text-xl leading-relaxed">
          Beautiful design. First-page rankings. AI recommendations. We don't just build websites — we build your entire digital presence so customers find you everywhere they search.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="group rounded-[2rem] bg-background border border-slate/40 p-8 hover:border-primary/30 transition-colors duration-500">
          <CardShuffler />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">SEO + GEO + AEO</h3>
            <p className="text-textMuted text-sm leading-relaxed">Rank on Google. Get recommended by AI. Own the answer box. We cover traditional SEO, Generative Engine Optimization, and Answer Engine Optimization — so every search leads to you.</p>
          </div>
        </div>
        <div className="group rounded-[2rem] bg-background border border-slate/40 p-8 hover:border-primary/30 transition-colors duration-500">
          <CardTypewriter />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">Web Design That Converts</h3>
            <p className="text-textMuted text-sm leading-relaxed">Custom, lightning-fast websites engineered for one thing: turning visitors into paying customers. Every pixel, every interaction is designed with your bottom line in mind.</p>
          </div>
        </div>
        <div className="group rounded-[2rem] bg-background border border-slate/40 p-8 hover:border-primary/30 transition-colors duration-500">
          <CardScheduler />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">Launch & Scale Strategy</h3>
            <p className="text-textMuted text-sm leading-relaxed">From first meeting to going live — and beyond. We manage the full journey with ongoing optimization, content strategy, and performance tracking that drives real growth.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Stats ── */
const Stats = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.stat-item', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const stats = [
    { value: '150+', label: 'Websites Delivered', icon: Globe },
    { value: '3x', label: 'Avg. Traffic Increase', icon: TrendingUp },
    { value: '98%', label: 'Client Satisfaction', icon: Target },
    { value: '#1', label: 'AI Recommended', icon: Bot },
  ];

  return (
    <section ref={containerRef} className="py-20 px-6 md:px-16 border-t border-slate/20 bg-[#08080B]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="stat-item text-center">
            <stat.icon size={24} className="text-primary mx-auto mb-4 opacity-60" />
            <div className="text-4xl md:text-5xl font-sans font-bold text-textMain mb-2">{stat.value}</div>
            <div className="font-mono text-xs uppercase tracking-widest text-textMuted">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Selectivity ── */
const Selectivity = () => {
  return (
    <section id="results" className="py-40 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
        <div className="lg:col-span-3">
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-12 text-textMain/90">Your competitors are still <br /><span className="font-serif italic text-primary">stuck on page two.</span></h2>
          <ul className="space-y-8 font-mono text-sm tracking-wide text-textMuted">
            <li className="flex items-start gap-5"><Rocket size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Startups that need a stunning first impression and instant credibility online</span></li>
            <li className="flex items-start gap-5"><TrendingUp size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Growing businesses tired of paying for ads — ready for organic traffic that compounds</span></li>
            <li className="flex items-start gap-5"><Bot size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Forward-thinkers who want AI models like ChatGPT and Gemini to recommend their business</span></li>
            <li className="flex items-start gap-5"><Palette size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Brands that know a premium website isn't a cost — it's their highest-ROI investment</span></li>
          </ul>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center bg-[#08080B] p-10 md:p-14 border border-slate/40 rounded-[2rem] shadow-xl">
          <div className="font-mono text-xs uppercase text-primary tracking-widest mb-8 border-b border-primary/20 pb-4">Why clients choose us</div>
          <p className="font-sans text-lg text-textMuted/90 leading-relaxed font-light">
            We don't just make it pretty — we make it profitable. Every site is engineered for Google rankings, AI visibility, and conversion from day one. While others build brochure sites, we build revenue engines.
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── Protocol ── */
const Protocol = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray('.protocol-card');
    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;
      if (!isLast) {
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.3,
          filter: 'blur(10px)',
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: cards[index + 1],
            start: 'top 85%',
            end: 'top 15%',
            scrub: true,
          }
        });
      }
    });
  }, { scope: containerRef });

  const steps = [
    { num: '01', title: 'Discover', desc: 'We dig into your business, your competitors, and your audience. We analyze what\'s working, what\'s broken, and where the biggest opportunities are — in Google and in AI search engines.', icon: Search },
    { num: '02', title: 'Design', desc: 'Your website gets a custom design built around conversion psychology. Not a template with your logo slapped on — a strategic, user-tested experience that guides visitors to take action.', icon: Palette },
    { num: '03', title: 'Develop & Optimize', desc: 'Clean, blazing-fast code. Structured data for AI crawlers. Schema markup for rich snippets. Technical SEO baked into every page. Your site launches ready to rank — on Google and in AI answers.', icon: Code },
    { num: '04', title: 'Grow & Dominate', desc: 'Launch is just the beginning. We deploy content strategy, link building, GEO optimization, and ongoing performance monitoring. Your traffic grows. Your leads compound. Your competitors wonder what happened.', icon: TrendingUp }
  ];

  return (
    <section id="process" ref={containerRef} className="py-24 px-6 md:px-16 bg-[#08080B]">
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4">A proven system <br /> <span className="font-serif italic text-textMuted">that delivers results.</span></h2>
      </div>
      <div className="max-w-5xl mx-auto pb-[10vh]">
        {steps.map((step, index) => (
          <div key={index} className="protocol-card sticky top-24 rounded-[2.5rem] md:rounded-[3rem] bg-surface border border-slate shadow-2xl overflow-hidden will-change-transform mb-[40vh]" style={{ zIndex: index }}>
            <div className="flex flex-col md:flex-row h-full min-h-[400px]">
              <div className="w-full md:w-1/3 bg-[#0A0A0F] p-10 md:p-12 pl-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate/30">
                <span className="font-mono text-primary text-4xl">({step.num})</span>
                <div className="h-32 w-full flex items-center justify-center opacity-40 mt-8 md:mt-0">
                  <step.icon size={56} className="text-primary" />
                </div>
              </div>
              <div className="w-full md:w-2/3 p-10 md:p-16 flex flex-col justify-center">
                <h3 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6">{step.title}</h3>
                <p className="text-textMuted text-lg md:text-xl leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── Trust Signal ── */
const TrustSignal = () => (
  <section className="py-40 px-6 flex justify-center text-center bg-background border-t border-slate/20">
    <div className="max-w-4xl">
      <p className="font-serif italic text-4xl md:text-6xl text-textMain/90 leading-[1.3] mb-16">
        "The best time to future-proof your online presence was yesterday. The second best time is right now."
      </p>
      <div className="font-mono text-sm tracking-widest text-primary uppercase">Galaxy Marketing Philosophy</div>
    </div>
  </section>
);

/* ── Contact Form ── */
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.contact-anim', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputClasses = 'w-full bg-[#0A0A0F] border border-slate/40 rounded-xl px-5 py-4 text-textMain font-sans text-sm placeholder:text-textMuted/40 focus:outline-none focus:border-primary/60 transition-colors duration-300';

  return (
    <section id="contact" ref={containerRef} className="py-32 px-6 md:px-16 bg-[#050508] border-t border-slate/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left — Info */}
          <div className="contact-anim">
            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[1.1]">
              Ready to stop being <br /><span className="font-serif italic text-primary">invisible online?</span>
            </h2>
            <p className="text-textMuted text-lg leading-relaxed mb-12 max-w-md">
              Tell us about your business and goals. We'll send you a free audit showing exactly where you're losing traffic — and how we'll fix it. No fluff, no obligation.
            </p>

            <div className="space-y-6">
              <a href="mailto:hello@galaxymarketing.com" className="flex items-center gap-4 text-textMuted hover:text-primary transition-colors group">
                <div className="h-12 w-12 rounded-full bg-surface border border-slate/40 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-textMuted/50 mb-1">Email</div>
                  <div className="font-sans text-sm">hello@galaxymarketing.com</div>
                </div>
              </a>

              <a href="tel:+1234567890" className="flex items-center gap-4 text-textMuted hover:text-primary transition-colors group">
                <div className="h-12 w-12 rounded-full bg-surface border border-slate/40 flex items-center justify-center group-hover:border-primary/40 transition-colors">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <div className="font-mono text-xs uppercase tracking-widest text-textMuted/50 mb-1">Phone</div>
                  <div className="font-sans text-sm">+1 (234) 567-890</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-anim">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center bg-surface border border-slate/40 rounded-[2rem] p-12">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle size={32} className="text-primary" />
                </div>
                <h3 className="text-2xl font-sans font-bold mb-4">We're on it!</h3>
                <p className="text-textMuted max-w-sm leading-relaxed">
                  Your free audit is being prepared. Expect a detailed breakdown of your current online visibility within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', phone: '', service: '', message: '' }); }}
                  className="mt-8 font-mono text-sm text-primary hover:text-textMain transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface border border-slate/40 rounded-[2rem] p-8 md:p-10 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                    className={`${inputClasses} ${!formData.service ? 'text-textMuted/40' : ''}`}
                  >
                    <option value="" disabled>What do you need? *</option>
                    <option value="web-design">Website Design & Development</option>
                    <option value="seo">SEO & Google Rankings</option>
                    <option value="geo-aeo">GEO & AEO (AI Visibility)</option>
                    <option value="full-package">Full Package (Design + SEO + AI)</option>
                    <option value="marketing">Digital Marketing & Ads</option>
                    <option value="other">Other / Not Sure Yet</option>
                  </select>
                </div>
                <textarea
                  name="message"
                  placeholder="Tell us about your business — what you do, who your customers are, and what success looks like for you..."
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`${inputClasses} resize-none`}
                />
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">Get My Free Audit <Send size={16} /></span>
                    )}
                  </MagneticButton>
                  <p className="text-textMuted/40 font-mono text-[10px] uppercase tracking-widest">
                    Free audit &bull; No obligation &bull; 24h response
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

/* ── Footer ── */
const Footer = () => (
  <footer className="bg-background pt-20 pb-12 px-6 md:px-16 border-t border-slate/30">
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-slate/30 pb-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <button onClick={scrollToTop} className="text-2xl font-sans font-bold tracking-tight text-textMain/80 cursor-pointer">GALAXY<span className="text-primary">.</span></button>
          <p className="text-textMuted/60 text-sm mt-2 max-w-xs">Websites that rank on Google, get recommended by AI, and convert visitors into customers.</p>
        </div>
        <div className="flex items-center gap-3 font-mono text-xs text-textMuted/80 bg-slate/20 px-4 py-2 rounded-full border border-slate/40">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          ACCEPTING NEW PROJECTS
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-8 font-mono text-xs text-textMuted">
          <button onClick={() => scrollTo('services')} className="hover:text-primary transition-colors cursor-pointer">Services</button>
          <button onClick={() => scrollTo('process')} className="hover:text-primary transition-colors cursor-pointer">Process</button>
          <button onClick={() => scrollTo('results')} className="hover:text-primary transition-colors cursor-pointer">Results</button>
          <button onClick={() => scrollTo('contact')} className="hover:text-primary transition-colors cursor-pointer">Contact</button>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-textMuted">
          <a href="mailto:hello@galaxymarketing.com" className="hover:text-primary transition-colors">Email</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        </div>

        <p className="font-mono text-[10px] text-textMuted/40 uppercase tracking-widest">
          &copy; 2026 Galaxy Marketing. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

/* ── App ── */
const App = () => {
  return (
    <div className="w-full min-h-screen relative bg-background text-textMain antialiased selection:bg-primary/20 selection:text-primary">
      <Noise />
      <Navbar />
      <Hero />
      <Philosophy />
      <Stats />
      <Features />
      <Selectivity />
      <Protocol />
      <TrustSignal />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
