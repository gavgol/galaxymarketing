import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MousePointer2, ArrowRight, Zap, Target, Layers, Globe, Search, Code, BarChart3, Rocket, TrendingUp, Palette, Menu, X, Send, Phone, Mail, CheckCircle, Bot, Brain, Eye } from 'lucide-react';
import Blog from './pages/Blog.jsx';
import BlogPost from './pages/BlogPost.jsx';
import blogPosts from './data/blogPosts.js';

gsap.registerPlugin(ScrollTrigger);

/* ── Loader ── */
const Loader = ({ progress, visible }) => (
  <div
    className="fixed inset-0 z-[9999] bg-background flex items-center justify-center transition-opacity duration-600"
    style={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
  >
    <div className="text-center">
      <div className="font-sans text-3xl font-bold text-textMain mb-6 tracking-tight">
        GALAXY <span className="text-primary">MARKETING</span>
      </div>
      <p className="font-mono text-xs text-textMuted uppercase tracking-[3px] mb-4">Loading</p>
      <div className="w-48 h-[3px] rounded bg-slate/50 mx-auto">
        <div
          className="h-full rounded bg-primary transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  </div>
);

/* ── Global Space Background — fixed behind entire site with slow drift animation ── */
const GlobalSpaceBg = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
    <div className="absolute inset-[-20%] w-[140%] h-[140%] animate-space-drift">
      <img src="/space-bg-sections.jpeg" alt="" className="w-full h-full object-cover" />
    </div>
    {/* Subtle global darkening for text readability */}
    <div className="absolute inset-0 bg-background/40"></div>
  </div>
);

/* ── Reduced Motion ── */
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Helpers ── */
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

/* Noise removed */

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
    outline: 'bg-background/80 border border-slate text-textMain px-8 py-4 hover:border-primary',
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

  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { label: 'Services', id: 'services' },
    { label: 'Process', id: 'process' },
    { label: 'Results', id: 'results' },
    { label: 'Blog', id: 'blog', isRoute: true },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const showNav = () => {
      if (!navRef.current) return;
      if (window.scrollY > 100) {
        navRef.current.classList.add('nav-scrolled');
      } else {
        navRef.current.classList.remove('nav-scrolled');
      }
    };
    window.addEventListener('scroll', showNav);
    return () => window.removeEventListener('scroll', showNav);
  }, []);

  const handleNav = (id, isRoute) => {
    if (isRoute) {
      setMobileOpen(false);
      return; // Link component handles navigation
    }
    if (!isHome) {
      // Navigate to home then scroll
      window.location.href = `/#${id}`;
      return;
    }
    scrollTo(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav ref={navRef} className="fixed top-0 md:top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 md:rounded-full border border-transparent transition-all duration-500 w-full md:w-[90%] max-w-6xl bg-background/60 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
        <Link to="/" onClick={scrollToTop} className="text-xl font-sans font-bold tracking-tight flex items-center gap-2 cursor-pointer">
          GALAXY<span className="text-primary">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm">
          {links.map(link => (
            link.isRoute ? (
              <Link key={link.id} to={`/${link.id}`} className="text-textMuted hover:text-textMain hover:-translate-y-[1px] transition-all cursor-pointer">
                {link.label}
              </Link>
            ) : (
              <button key={link.id} onClick={() => handleNav(link.id)} className="text-textMuted hover:text-textMain hover:-translate-y-[1px] transition-all cursor-pointer">
                {link.label}
              </button>
            )
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton variant="primary" className="py-2.5 px-6 text-sm" href="#contact">Get a Free Quote</MagneticButton>
        </div>

        {/* Mobile hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen} className="md:hidden text-textMain p-2 cursor-pointer relative z-50">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu — compact dropdown under nav */}
      <div
        role="dialog"
        aria-label="Mobile navigation"
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm bg-background/95 backdrop-blur-xl rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 md:hidden ${mobileOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <div className="py-3">
          {links.map(link => (
            link.isRoute ? (
              <Link key={link.id} to={`/${link.id}`} onClick={() => setMobileOpen(false)} className="block px-6 py-3 text-sm font-sans font-medium text-textMain hover:text-primary hover:bg-white/[0.03] transition-all cursor-pointer">
                {link.label}
              </Link>
            ) : (
              <button key={link.id} onClick={() => handleNav(link.id)} className="block w-full text-left px-6 py-3 text-sm font-sans font-medium text-textMain hover:text-primary hover:bg-white/[0.03] transition-all cursor-pointer">
                {link.label}
              </button>
            )
          ))}
          <div className="px-6 pt-2 pb-4">
            <MagneticButton variant="primary" className="w-full py-3 text-sm" href="#contact" onClick={() => setMobileOpen(false)}>Get a Free Quote</MagneticButton>
          </div>
        </div>
      </div>
      {/* Backdrop */}
      {mobileOpen && <div className="fixed inset-0 z-30 md:hidden" onClick={() => setMobileOpen(false)}></div>}
    </>
  );
};

/* ── Scroll Video Hero — clean, fast, no cards ── */
const FRAME_COUNT = 61;

const ScrollVideoHero = ({ onFramesLoaded }) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const heroTextRef = useRef(null);
  const overlayRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(-1);
  const ctxRef = useRef(null);
  const allLoadedRef = useRef(false);

  // Cover-fit drawing — always fills the viewport edge-to-edge
  const drawFrame = useCallback((index) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const img = framesRef.current[index];
    if (!canvas || !ctx || !img || !img.complete) return;

    const cw = canvas.width, ch = canvas.height;
    ctx.clearRect(0, 0, cw, ch);

    // Cover-fit (fill viewport, crop overflow)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let drawW, drawH;
    if (canvasRatio > imgRatio) { drawW = cw; drawH = cw / imgRatio; }
    else { drawH = ch; drawW = ch * imgRatio; }
    ctx.drawImage(img, (cw - drawW) / 2, (ch - drawH) / 2, drawW, drawH);
  }, []);

  // Canvas resize — NO devicePixelRatio (1x = faster draws)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctxRef.current = canvas.getContext('2d', { willReadFrequently: false });

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const imgs = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(4, '0')}.jpg`;
      img.onload = () => {
        loaded++;
        onFramesLoaded(Math.round((loaded / FRAME_COUNT) * 100));
        if (loaded === FRAME_COUNT) {
          allLoadedRef.current = true;
          currentFrameRef.current = 0;
          drawFrame(0);
        }
      };
      imgs.push(img);
    }
    framesRef.current = imgs;
  }, [drawFrame, onFramesLoaded]);

  // Scroll → frame mapping. Pure vanilla, no React state, requestAnimationFrame + passive
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const section = sectionRef.current;
          if (!section || !allLoadedRef.current) { ticking = false; return; }

          const rect = section.getBoundingClientRect();
          const scrollableHeight = section.offsetHeight - window.innerHeight;
          const progress = Math.min(1, Math.max(0, -rect.top / scrollableHeight));

          // Only redraw when frame changes
          const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
          if (frameIndex !== currentFrameRef.current) {
            currentFrameRef.current = frameIndex;
            drawFrame(frameIndex);
          }

          // Fade out hero text as scroll starts
          const textOpacity = Math.max(0, 1 - progress * 8);
          if (heroTextRef.current) {
            heroTextRef.current.style.opacity = textOpacity;
            heroTextRef.current.style.pointerEvents = textOpacity > 0.5 ? 'auto' : 'none';
          }
          if (overlayRef.current) {
            overlayRef.current.style.opacity = textOpacity;
          }

          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [drawFrame]);

  return (
    <section ref={sectionRef} className="relative" style={{ height: '200vh' }}>
      <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Dark overlay for text readability */}
        <div
          ref={overlayRef}
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.15) 100%)',
          }}
        />

        {/* Hero text */}
        <div ref={heroTextRef} className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl">
            <p className="text-primary font-mono text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 uppercase flex items-center justify-center gap-3">
              <span className="h-[1px] w-8 bg-primary"></span>
              Web Design &bull; SEO &bull; AI Visibility
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-bold leading-[1.05] tracking-tight mb-2 text-white">
              Get Found. <br />
              <span className="block font-sans font-light text-white/80 text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] mt-2">Get Chosen.</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-xl mx-auto mt-6 sm:mt-10 font-sans leading-relaxed">
              We build websites that rank, get recommended by AI, and convert.
            </p>
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <MagneticButton href="#contact">Start Your Project <ArrowRight size={18} /></MagneticButton>
              <MagneticButton variant="outline" href="#results">See Our Results <BarChart3 size={18} /></MagneticButton>
            </div>
            <div className="mt-8 sm:mt-12 flex items-center justify-center gap-2 text-white/40 text-xs font-mono animate-bounce">
              <span>Scroll to explore</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* HeroMockups removed */

/* ── Hero ── */
const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(() => {
    const rm = prefersReducedMotion();
    gsap.from('.hero-text', {
      y: rm ? 10 : 40, opacity: 0,
      duration: rm ? 0.5 : 1, stagger: 0.15, ease: 'power3.out', delay: 0.2
    });
  }, { scope: containerRef });

  // Play video once, then stay on last frame (dashboard)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.playbackRate = 0.8;
    const handleEnded = () => {
      // Pause on last frame — dashboard stays visible and "alive"
      vid.currentTime = vid.duration - 0.1;
      vid.pause();
    };
    vid.addEventListener('ended', handleEnded);
    return () => vid.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <section ref={containerRef} className="relative w-full flex items-center pt-24 pb-8 md:pt-32 md:pb-20 px-6 md:px-16 overflow-hidden min-h-dvh">
      {/* Video background — visible on all screens */}
      <div className="absolute inset-0 z-[1]">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 hero-video-mask"
          src="/hf_20260328_121348_99915d41-7b29-4e5b-bf60-8593d3ce29db.mp4"
        />
        {/* Top fade only — bottom blends smoothly into space bg */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
          <p className="hero-text text-primary font-mono text-[10px] sm:text-sm tracking-widest mb-6 uppercase flex items-center justify-center md:justify-start gap-2 sm:gap-3 whitespace-nowrap">
            <span className="h-[1px] w-6 sm:w-8 bg-primary"></span>
            Web Design &bull; SEO &bull; AI Visibility
          </p>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-[5.5rem] font-sans font-bold leading-[1.05] tracking-tight mb-2 text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.9)]">
            Get Found. <br />
            <span className="hero-text block font-sans font-light text-white/80 text-5xl md:text-7xl lg:text-[6rem] mt-2">Get Chosen.</span>
          </h1>
          <p className="hero-text text-lg md:text-xl text-white/80 max-w-xl mx-auto md:mx-0 mt-10 font-sans leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
            We build websites that rank on Google, get recommended by ChatGPT, Gemini, and Perplexity, and turn every visitor into a customer. <span className="text-white font-medium">SEO + GEO + AEO — the full visibility stack</span>
          </p>
          <div className="hero-text mt-10 flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-5">
            <MagneticButton href="#contact">Start Your Project <ArrowRight size={18} /></MagneticButton>
            <MagneticButton variant="outline" href="#results">See Our Results <BarChart3 size={18} /></MagneticButton>
          </div>
          <div className="hero-text mt-8 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-mono text-white/70">
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
              <span className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse"></span>
              150+ Websites Launched
            </div>
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
              <TrendingUp size={12} className="text-primary" />
              Avg. 3x Traffic Growth
            </div>
            <div className="flex items-center gap-2 bg-background/60 backdrop-blur-sm border border-white/10 px-4 py-2 rounded-full">
              <Bot size={12} className="text-primary" />
              AI-Optimized
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Philosophy Typewriter ── */
const PhilosophyTypewriter = () => {
  const lines = [
    'Not just page one of Google...',
    'We get you into ChatGPT answers, Gemini recommendations, and Perplexity results too.',
    "That's the difference between being found and being invisible",
  ];
  const fullText = lines.join('\n');
  const [displayed, setDisplayed] = useState('');
  const ref = useRef(null);
  const startedRef = useRef(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !startedRef.current) {
        startedRef.current = true;
        let i = 0;
        const int = setInterval(() => {
          i++;
          if (i > fullText.length) {
            clearInterval(int);
            setDone(true);
            return;
          }
          setDisplayed(fullText.slice(0, i));
        }, 18);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [fullText]);

  const renderedLines = displayed.split('\n');

  return (
    <div ref={ref} className="phil-word mt-10 text-white/80 max-w-3xl mx-auto font-sans text-xl md:text-2xl leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] space-y-4 min-h-[6rem]">
      {renderedLines.map((line, i) => (
        <p key={i} className={line ? 'opacity-100' : 'opacity-0'}>
          {line}
          {i === renderedLines.length - 1 && !done && <span className="inline-block w-2 h-6 bg-primary ml-1 animate-pulse align-middle"></span>}
        </p>
      ))}
    </div>
  );
};

/* ── Philosophy ── */
const Philosophy = () => {
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from('.phil-word', {
      scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
      y: prefersReducedMotion() ? 0 : 30,
      opacity: 0,
      duration: prefersReducedMotion() ? 0.3 : 0.8,
      stagger: prefersReducedMotion() ? 0.02 : 0.08,
      ease: 'power3.out'
    });
  }, { scope: textRef });

  return (
    <section id="philosophy" ref={textRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 text-center">
        <h2 className="text-xl md:text-3xl font-sans font-normal text-white/70 mb-8 flex flex-wrap justify-center gap-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]">
          {"Google changed. AI is answering the questions now.".split(' ').map((w, i) => <span key={i} className="phil-word inline-block">{w}</span>)}
        </h2>
        <div className="text-4xl md:text-7xl font-sans font-bold leading-tight flex flex-wrap justify-center items-center gap-3 md:gap-5 mt-8 text-white drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
          {"Your business needs to be".split(' ').map((w, i) => <span key={i} className="phil-word inline-block">{w}</span>)}
          <span className="phil-word font-sans font-light text-primary block w-full mt-4 text-5xl md:text-8xl drop-shadow-[0_2px_15px_rgba(0,0,0,0.7)]">everywhere.</span>
        </div>
        <PhilosophyTypewriter />
      </div>
    </section>
  );
};

/* ── Interactive Cards ── */
const CardSEO = () => {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const items = [
    { icon: Search, label: 'Google SEO', desc: 'Page 1 rankings' },
    { icon: Bot, label: 'GEO', desc: 'AI recommendations' },
    { icon: Brain, label: 'AEO', desc: 'Answer engines' },
  ];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const int = setInterval(() => setActive(p => (p + 1) % 3), 2500);
    return () => clearInterval(int);
  }, [isVisible]);

  return (
    <div ref={ref} className="h-48 w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-xs text-textMuted font-mono uppercase">
        <Globe size={12} className="text-primary" />
        Visibility stack
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className={`flex items-center gap-3 p-2.5 rounded-lg transition-all duration-500 ${i === active ? 'bg-primary/10 border border-primary/20' : 'bg-transparent border border-transparent'}`}>
            <item.icon size={16} className={`transition-colors duration-500 ${i === active ? 'text-primary' : 'text-textMuted/40'}`} />
            <div className="flex-1">
              <span className={`font-mono text-xs transition-colors duration-500 ${i === active ? 'text-white' : 'text-textMuted/60'}`}>{item.label}</span>
            </div>
            <span className={`text-[10px] font-mono transition-all duration-500 ${i === active ? 'text-primary opacity-100' : 'opacity-0'}`}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CardTypewriter = () => {
  const text = "Your website is live, Google indexed it in 4 hours and ChatGPT is already recommending you to local customers";
  const [display, setDisplay] = useState('');
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let index = 0;
    const int = setInterval(() => {
      setDisplay(text.slice(0, index));
      index++;
      if (index > text.length + 10) index = 0;
    }, 80);
    return () => clearInterval(int);
  }, [isVisible]);

  return (
    <div ref={ref} className="h-48 w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col font-mono relative overflow-hidden">
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

const CardGrowth = () => {
  const [counts, setCounts] = useState([0, 0, 0]);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const targets = [340, 127, 89];
    const duration = 2000;
    const steps = 40;
    let step = 0;
    const int = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounts(targets.map(t => Math.round(t * eased)));
      if (step >= steps) clearInterval(int);
    }, duration / steps);
    return () => clearInterval(int);
  }, [isVisible]);

  return (
    <div ref={ref} className="h-48 w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
      <div className="flex items-center gap-2 text-xs text-textMuted font-mono uppercase">
        <Rocket size={12} className="text-primary" />
        Growth metrics
      </div>
      <div className="space-y-3">
        {[
          { label: 'Traffic growth', value: `+${counts[0]}%`, color: 'bg-primary' },
          { label: 'Lead increase', value: `+${counts[1]}%`, color: 'bg-emerald-400' },
          { label: 'Conversion rate', value: `${(counts[2] / 10).toFixed(1)}%`, color: 'bg-sky-400' },
        ].map((m, i) => (
          <div key={i}>
            <div className="flex justify-between text-[10px] font-mono text-textMuted mb-1">
              <span>{m.label}</span>
              <span className="text-white/80">{m.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/[0.06]">
              <div className={`h-full rounded-full ${m.color} transition-all duration-1000`} style={{ width: `${Math.min(100, (counts[i] / [340, 127, 89][i]) * 100)}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Features ── */
const Features = () => {
  return (
    <section id="services" className="relative py-16 md:py-32 px-6 md:px-16 mx-auto max-w-7xl">
      <div className="mb-12 md:mb-24 text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          The only agency you'll ever need.
        </h2>
        <div className="text-white/70 max-w-3xl font-sans text-lg md:text-xl leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] space-y-2">
          <p>Beautiful design, first page rankings, and AI recommendations</p>
          <p>We build your entire digital presence<br />so customers find you everywhere they search</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <div className="group rounded-[2rem] bg-background/50 backdrop-blur-md border border-white/[0.08] p-8 hover:border-primary/30 transition-colors duration-500">
          <CardSEO />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">SEO + GEO + AEO</h3>
            <p className="text-white/70 text-sm leading-relaxed">Rank on Google, get recommended by AI, and own the answer box. We cover traditional SEO, Generative Engine Optimization, and Answer Engine Optimization so every search leads to you</p>
          </div>
        </div>
        <div className="group rounded-[2rem] bg-background/50 backdrop-blur-md border border-white/[0.08] p-8 hover:border-primary/30 transition-colors duration-500">
          <CardTypewriter />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">Web Design That Converts</h3>
            <p className="text-white/70 text-sm leading-relaxed">Custom, lightning fast websites built for one thing: turning visitors into paying customers. Every pixel and every interaction is designed with your bottom line in mind</p>
          </div>
        </div>
        <div className="group rounded-[2rem] bg-background/50 backdrop-blur-md border border-white/[0.08] p-8 hover:border-primary/30 transition-colors duration-500">
          <CardGrowth />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">Launch & Scale Strategy</h3>
            <p className="text-white/70 text-sm leading-relaxed">From first meeting to going live and beyond. We manage the full journey with ongoing optimization, content strategy, and performance tracking that drives real growth</p>
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
      y: prefersReducedMotion() ? 0 : 40,
      opacity: 0,
      duration: prefersReducedMotion() ? 0.3 : 0.8,
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
    <section ref={containerRef} className="relative py-12 md:py-16 px-6 md:px-16">
      <div className="max-w-5xl mx-auto bg-background/50 backdrop-blur-md rounded-[2rem] border border-white/[0.06] p-10 md:p-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item text-center">
              <stat.icon size={24} className="text-primary mx-auto mb-4 opacity-60" />
              <div className="text-4xl md:text-5xl font-sans font-bold text-white mb-2">{stat.value}</div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Selectivity ── */
const Selectivity = () => {
  return (
    <section id="results" className="relative py-16 md:py-24 px-6 md:px-16 mx-auto max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20">
        <div className="lg:col-span-3">
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-12 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] text-center lg:text-left">Your competitors are still <br /><span className="font-sans font-light text-primary">stuck on page two.</span></h2>
          <ul className="space-y-8 font-mono text-sm tracking-wide text-textMain/80">
            <li className="flex items-start gap-5 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-white/[0.05]"><Rocket size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Startups that need a stunning first impression and instant credibility online</span></li>
            <li className="flex items-start gap-5 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-white/[0.05]"><TrendingUp size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Growing businesses tired of paying for ads, ready for organic traffic that compounds</span></li>
            <li className="flex items-start gap-5 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-white/[0.05]"><Bot size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Forward-thinkers who want AI models like ChatGPT and Gemini to recommend their business</span></li>
            <li className="flex items-start gap-5 bg-background/50 backdrop-blur-sm rounded-xl p-4 border border-white/[0.05]"><Palette size={20} className="text-primary mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Brands that know a premium website isn't a cost, it's their highest ROI investment</span></li>
          </ul>
        </div>
        <div className="lg:col-span-2 flex flex-col justify-center bg-background/70 backdrop-blur-md p-10 md:p-14 border border-slate/40 rounded-[2rem] shadow-xl">
          <div className="font-mono text-xs uppercase text-primary tracking-widest mb-8 border-b border-primary/20 pb-4">Why clients choose us</div>
          <p className="font-sans text-lg text-white/70 leading-relaxed font-light">
            We make it profitable. Every site is engineered for Google rankings, AI visibility, and conversion from day one. While others build brochure sites, we build revenue engines
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
    const rm = prefersReducedMotion();
    const cards = gsap.utils.toArray('.protocol-card');
    cards.forEach((card, index) => {
      const isLast = index === cards.length - 1;
      if (!isLast) {
        gsap.to(card, {
          scale: rm ? 0.96 : 0.92,
          opacity: rm ? 0.5 : 0.3,
          filter: rm ? 'blur(4px)' : 'blur(10px)',
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
    { num: '01', title: 'Discover', desc: 'We dig into your business, your competitors, and your audience to find what\'s working, what\'s broken, and where the biggest opportunities are in Google and AI search engines', icon: Search, img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80' },
    { num: '02', title: 'Design', desc: 'Your website gets a custom design built around conversion psychology, not a template with your logo slapped on but a strategic, user tested experience that guides visitors to take action', icon: Palette, img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=600&q=80' },
    { num: '03', title: 'Develop & Optimize', desc: 'Clean, blazing fast code with structured data for AI crawlers, schema markup for rich snippets, and technical SEO baked into every page so your site launches ready to rank on Google and in AI answers', icon: Code, img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80' },
    { num: '04', title: 'Grow & Dominate', desc: 'Launch is just the beginning. We deploy content strategy, link building, GEO optimization, and ongoing performance monitoring so your traffic grows, your leads compound, and your competitors wonder what happened', icon: TrendingUp, img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80' }
  ];

  return (
    <section id="process" ref={containerRef} className="relative py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto mb-10 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] text-center md:text-left">A proven system <br /> <span className="font-sans font-light text-white/70">that delivers results.</span></h2>
      </div>
      <div className="max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className={`protocol-card sticky top-20 md:top-24 rounded-2xl md:rounded-[3rem] bg-surface border border-slate shadow-2xl overflow-hidden will-change-transform ${index < steps.length - 1 ? 'mb-[8vh] md:mb-[15vh]' : 'mb-0'}`} style={{ zIndex: index }}>
            <div className="flex flex-col md:flex-row h-full min-h-[280px] md:min-h-[400px]">
              <div className="w-full md:w-1/3 relative overflow-hidden border-b md:border-b-0 md:border-r border-slate/30 min-h-[120px] md:min-h-0">
                <img src={step.img} alt={step.title} className="absolute inset-0 w-full h-full object-cover opacity-30" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
                <div className="relative p-6 md:p-12 flex flex-row md:flex-col justify-between items-center md:items-start h-full">
                  <span className="font-mono text-primary text-2xl md:text-4xl">({step.num})</span>
                  <div className="w-12 h-12 md:h-32 md:w-full flex items-center justify-center opacity-60">
                    <step.icon size={36} className="text-primary md:hidden" />
                    <step.icon size={56} className="text-primary hidden md:block" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 p-6 md:p-16 flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl md:text-5xl font-sans font-bold tracking-tight mb-4 md:mb-6">{step.title}</h3>
                <p className="text-white/70 text-sm md:text-xl leading-relaxed max-w-lg">{step.desc}</p>
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
  <section className="relative py-10 md:py-16 px-6 flex justify-center text-center">
    <div className="max-w-4xl">
      <div className="font-sans font-light text-3xl md:text-5xl text-white leading-[1.3] mb-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.8)] space-y-2">
        <p>"The best time to future proof your online presence was yesterday.</p>
        <p>The second best time is right now."</p>
      </div>
      <div className="font-mono text-sm tracking-widest text-primary uppercase">Galaxy Marketing Philosophy</div>
    </div>
  </section>
);

/* ── Contact Form ── */
const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.contact-anim', {
      scrollTrigger: { trigger: containerRef.current, start: 'top 80%' },
      y: prefersReducedMotion() ? 0 : 40,
      opacity: 0,
      duration: prefersReducedMotion() ? 0.3 : 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    });
  }, { scope: containerRef });

  const validateField = (name, value) => {
    switch (name) {
      case 'name': return value.trim() ? '' : 'Please enter your name';
      case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email';
      case 'service': return value ? '' : 'Please select a service';
      case 'message': return value.trim().length >= 10 ? '' : 'Please tell us a bit more (at least 10 characters)';
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    ['name', 'email', 'service', 'message'].forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorField = document.getElementById(Object.keys(newErrors)[0]);
      if (firstErrorField) firstErrorField.focus();
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      setErrors({});
    }, 1500);
  };

  const inputClasses = 'w-full bg-background/80 border border-slate/40 rounded-xl px-5 py-4 text-textMain font-sans text-sm placeholder:text-textMuted/60 focus:outline-none focus:border-primary/60 transition-colors duration-300';

  return (
    <section id="contact" ref={containerRef} className="relative py-16 md:py-32 px-6 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16">

          {/* Left — Info */}
          <div className="contact-anim md:col-span-2">
            <h2 className="text-4xl md:text-6xl font-sans font-bold tracking-tight mb-8 leading-[1.1] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] text-center md:text-left">
              Ready to stop being <br /><span className="font-sans font-light text-primary">invisible online?</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-md drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)] text-center md:text-left mx-auto md:mx-0">
              Tell us about your business and goals and we'll send you a free audit showing exactly where you're losing traffic and how to fix it
            </p>

            <div className="space-y-5 max-w-xs mx-auto md:mx-0">
              <a href="mailto:hello@galaxymarketing.com" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-0.5">Email</div>
                  <div className="font-sans text-base font-medium">hello@galaxymarketing.com</div>
                </div>
              </a>
              <a href="tel:+1234567890" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
                <div className="h-14 w-14 shrink-0 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-0.5">Phone</div>
                  <div className="font-sans text-base font-medium">+1 (234) 567-890</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-anim md:col-span-3">
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
              <form onSubmit={handleSubmit} className="bg-surface border border-slate/40 rounded-2xl md:rounded-[2rem] p-5 sm:p-8 md:p-10 space-y-4 sm:space-y-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="sr-only">Your Name</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="Your Name *"
                      required
                      aria-required="true"
                      aria-invalid={errors.name ? 'true' : undefined}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputClasses} ${errors.name ? 'border-red-500/60' : ''}`}
                    />
                    {errors.name && <p id="name-error" role="alert" className="text-red-400 text-xs font-mono mt-1.5 ml-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      aria-required="true"
                      aria-invalid={errors.email ? 'true' : undefined}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputClasses} ${errors.email ? 'border-red-500/60' : ''}`}
                    />
                    {errors.email && <p id="email-error" role="alert" className="text-red-400 text-xs font-mono mt-1.5 ml-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="sr-only">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="sr-only">Service Type</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      aria-required="true"
                      aria-invalid={errors.service ? 'true' : undefined}
                      aria-describedby={errors.service ? 'service-error' : undefined}
                      className={`${inputClasses} ${!formData.service ? 'text-textMuted/60' : ''} ${errors.service ? 'border-red-500/60' : ''}`}
                    >
                      <option value="" disabled>What do you need? *</option>
                      <option value="web-design">Website Design &amp; Development</option>
                      <option value="seo">SEO &amp; Google Rankings</option>
                      <option value="geo-aeo">GEO &amp; AEO (AI Visibility)</option>
                      <option value="full-package">Full Package (Design + SEO + AI)</option>
                      <option value="marketing">Digital Marketing &amp; Ads</option>
                      <option value="other">Other / Not Sure Yet</option>
                    </select>
                    {errors.service && <p id="service-error" role="alert" className="text-red-400 text-xs font-mono mt-1.5 ml-1">{errors.service}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your business, what you do, who your customers are, and what success looks like for you..."
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={errors.message ? 'true' : undefined}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`${inputClasses} resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                  />
                  {errors.message && <p id="message-error" role="alert" className="text-red-400 text-xs font-mono mt-1.5 ml-1">{errors.message}</p>}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-background/30 border-t-background rounded-full animate-spin"></span>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 whitespace-nowrap">Get My Free Audit <Send size={16} /></span>
                    )}
                  </MagneticButton>
                  <p className="text-textMuted/60 font-mono text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
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
  <footer className="relative bg-background/60 backdrop-blur-sm pt-20 pb-12 px-6 md:px-16">
    <div className="max-w-7xl mx-auto">
      <div className="border-b border-slate/30 pb-12 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <button onClick={scrollToTop} className="text-2xl font-sans font-bold tracking-tight text-textMain/80 cursor-pointer">GALAXY<span className="text-primary">.</span></button>
          <p className="text-white/50 text-sm mt-2 max-w-xs">Websites that rank on Google, get recommended by AI, and convert visitors into customers</p>
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
          <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <button onClick={() => scrollTo('contact')} className="hover:text-primary transition-colors cursor-pointer">Contact</button>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs text-textMuted">
          <a href="mailto:hello@galaxymarketing.com" className="hover:text-primary transition-colors">Email</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
        </div>

        <p className="font-mono text-[10px] text-textMuted/60 uppercase tracking-widest">
          &copy; 2026 Galaxy Marketing. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

/* ── Home Page ── */
const HomePage = () => (
  <main id="main-content">
    <Hero />
    <Philosophy />
    <div className="relative">
      <Stats />
      <Features />
      <Selectivity />
      <Protocol />
      <TrustSignal />
      <ContactForm />
    </div>
  </main>
);

/* ── App ── */
const App = () => {
  return (
    <div className="w-full min-h-screen relative text-textMain antialiased selection:bg-primary/20 selection:text-primary">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-background focus:px-4 focus:py-2 focus:rounded-full focus:font-sans focus:text-sm">Skip to content</a>
      <GlobalSpaceBg />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<Blog posts={blogPosts} />} />
        <Route path="/blog/:slug" element={<BlogPost posts={blogPosts} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
