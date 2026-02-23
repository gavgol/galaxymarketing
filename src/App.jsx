import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { MousePointer2, ArrowRight, Zap, Target, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Noise = () => (
  <svg className="noise-overlay">
    <filter id="noiseFilter">
      <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
  </svg>
);

const MagneticButton = ({ children, variant = 'primary', className = '' }) => {
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

  const baseClasses = 'relative inline-flex items-center justify-center overflow-hidden rounded-full font-sans font-medium transition-all duration-300 group';
  const variants = {
    primary: 'bg-primary text-background px-8 py-4',
    outline: 'bg-transparent border border-slate text-textMain px-8 py-4 hover:border-primary',
  };

  return (
    <button
      ref={btnRef}
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

const Navbar = () => {
  const navRef = useRef(null);

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

  return (
    <nav ref={navRef} className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-full border border-transparent transition-all duration-500 w-[90%] max-w-6xl">
      <div className="text-xl font-sans font-bold tracking-tight">GALILEO.</div>
      <div className="hidden md:flex items-center gap-8 font-mono text-sm">
        {['Philosophy', 'Selectivity', 'Approach'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-textMuted hover:text-textMain hover:-translate-y-[1px] transition-all">
            {link}
          </a>
        ))}
      </div>
      <div>
        <MagneticButton variant="primary" className="py-2.5 px-6 text-sm">Start a Conversation</MagneticButton>
      </div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const gradientRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

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
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-svh w-full flex flex-col justify-end pb-24 px-6 md:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[#0A0A0F]">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 blur-[4px] contrast-75 saturate-50"
          poster=""
        >
          <source src="https://res.cloudinary.com/dbil4ewv7/video/upload/v1771848001/WEBHERO_oytcpg.mp4" type="video/mp4" />
        </video>

        {/* Animated Gradient Layer to mask loop */}
        <div
          ref={gradientRef}
          className="absolute inset-0 bg-gradient-to-tr from-background/80 via-primary/5 to-background/90 mix-blend-overlay"
          style={{ backgroundSize: '300% 300%', backgroundPosition: '0% 0%' }}
        ></div>

        {/* Stronger Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-5xl">
        <p className="hero-text text-primary font-mono text-sm tracking-widest mb-6 uppercase flex items-center gap-3">
          <span className="h-[1px] w-8 bg-primary"></span>
          Galileo Studio
        </p>
        <h1 className="hero-text text-5xl md:text-7xl lg:text-[6.5rem] font-sans font-bold leading-[1.05] tracking-tight mb-2">
          Designing Intelligence <br />
          <span className="hero-text block font-serif italic text-textMuted text-6xl md:text-8xl lg:text-[7rem] mt-2">for the Next Era.</span>
        </h1>
        <p className="hero-text text-lg md:text-xl text-textMuted max-w-2xl mt-12 font-sans leading-relaxed">
          We partner with forward-thinking companies to build cinematic digital experiences and AI systems that elevate how they operate and grow.
        </p>
        <div className="hero-text mt-12 flex flex-col items-start gap-8">
          <MagneticButton>Start a Conversation <ArrowRight size={18} /></MagneticButton>
          <div className="flex items-center gap-3 text-xs font-mono text-textMuted/70 border-l px-4 border-slate/30 py-1 tracking-wide leading-relaxed">
            <span className="h-1.5 w-1.5 bg-primary/80 rounded-full animate-pulse mr-1"></span>
            We partner with a limited number of clients each quarter <br className="hidden md:block" /> to ensure exceptional focus and results.
          </div>
        </div>
      </div>
    </section>
  );
};

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
          {"Most agencies focus on: superficial deliverables.".split(' ').map((w, i) => <span key={i} className="phil-word inline-block">{w}</span>)}
        </h2>
        <div className="text-4xl md:text-7xl font-sans font-bold leading-tight flex flex-wrap justify-center items-center gap-3 md:gap-5 mt-8">
          {"We focus on:".split(' ').map((w, i) => <span key={i} className="phil-word inline-block">{w}</span>)}
          <span className="phil-word font-serif italic text-primary block w-full mt-4 text-5xl md:text-8xl">Depth over volume.</span>
        </div>
        <p className="phil-word mt-16 text-textMuted/60 max-w-xl mx-auto font-mono text-sm leading-relaxed">
          We prioritize long-term thinking and meaningful outcomes over transactional work.
        </p>
      </div>
    </section>
  );
};

const CardShuffler = () => {
  const [cards, setCards] = useState(['Intelligent Routing', 'Predictive Analysis', 'Process Automation']);

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
            style={{
              transform: `translateY(${yOffset}px) scale(${scale})`,
              opacity, zIndex
            }}
          >
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Zap size={14} />
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
  const text = "Architecting high-fidelity interfaces that establish unparalleled authority.";
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
        Telemetry Stream
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
        <div className="bg-primary/5 text-primary border border-primary/20 px-3 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest">Deploy</div>
      </div>
      <MousePointer2 className="cursor-svg absolute top-6 left-6 text-white w-5 h-5 stroke-[1.5]" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }} />
    </div>
  )
};

const Features = () => {
  return (
    <section id="expertise" className="py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-slate/20">
      <div className="mb-24 md:text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-6">Clarifying Advantage.</h2>
        <p className="text-textMuted max-w-2xl font-sans text-lg md:text-xl leading-relaxed">
          We strip away noise to build refined capabilities: automation, design, and cinematic content that position you categorically higher.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

        <div className="group rounded-[2rem] bg-background border border-slate/40 p-8 hover:border-primary/30 transition-colors duration-500">
          <CardShuffler />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">AI Systems & Automation</h3>
            <p className="text-textMuted text-sm leading-relaxed">Strategic integration of intelligence protocols to scale operations quietly and effectively.</p>
          </div>
        </div>

        <div className="group rounded-[2rem] bg-background border border-slate/40 p-8 hover:border-primary/30 transition-colors duration-500">
          <CardTypewriter />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">Digital Experience</h3>
            <p className="text-textMuted text-sm leading-relaxed">Minimal, authoritative user interfaces powered by rigorous frontend engineering.</p>
          </div>
        </div>

        <div className="group rounded-[2rem] bg-background border border-slate/40 p-8 hover:border-primary/30 transition-colors duration-500">
          <CardScheduler />
          <div className="mt-12 text-center">
            <h3 className="text-lg font-sans font-semibold mb-3">Cinematic Production</h3>
            <p className="text-textMuted text-sm leading-relaxed">Atmospheric 3D assets and motion design that frame your technology as a premium asset.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

const Selectivity = () => {
  return (
    <section id="selectivity" className="py-40 px-6 md:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">

        <div className="lg:col-span-3">
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-12 text-textMain/90">Built for <br /><span className="font-serif italic text-primary">ambitious teams.</span></h2>
          <ul className="space-y-8 font-mono text-sm tracking-wide text-textMuted">
            <li className="flex items-start gap-5"><Zap size={20} className="text-textMain/40 mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Founders scaling their companies</span></li>
            <li className="flex items-start gap-5"><Layers size={20} className="text-textMain/40 mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Businesses embracing AI transformation</span></li>
            <li className="flex items-start gap-5"><Target size={20} className="text-textMain/40 mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Teams seeking strategic design and systems</span></li>
            <li className="flex items-start gap-5"><MousePointer2 size={20} className="text-textMain/40 mt-0.5 shrink-0" /> <span className="pt-0.5 leading-relaxed">Leaders who value clarity and execution</span></li>
          </ul>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-center bg-[#08080B] p-10 md:p-14 border border-slate/40 rounded-[2rem] shadow-xl">
          <div className="font-mono text-xs uppercase text-textMain/40 tracking-widest mb-8 border-b border-primary/20 pb-4">Who this is not for</div>
          <p className="font-sans text-lg text-textMuted/90 leading-relaxed font-light">
            This may not be the right fit if you’re looking for quick fixes, low-cost solutions, or transactional work. We engage thoughtfully.
          </p>
        </div>

      </div>
    </section>
  );
};

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
    { num: '01', title: 'Understand', desc: 'Isolating the core signal from the noise. We work alongside your team to define, design, and refine the precise vector for impact.' },
    { num: '02', title: 'Architect', desc: 'Designing the blueprint. We map the intelligent systems, cinematic aesthetics, and user journeys needed to outmaneuver the market.' },
    { num: '03', title: 'Execute', desc: 'Quiet, flawless implementation. Deploying high-fidelity solutions with pixel-perfect accuracy and robust code.' },
    { num: '04', title: 'Refine', desc: 'Continuous iteration. We elevate the platform based on real-world performance metrics to ensure an enduring advantage.' }
  ];

  return (
    <section id="approach" ref={containerRef} className="py-24 px-6 md:px-16 bg-[#08080B]">
      <div className="max-w-7xl mx-auto mb-20">
        <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight mb-4">A disciplined approach <br /> <span className="font-serif italic text-textMuted">to innovation.</span></h2>
      </div>

      <div className="max-w-5xl mx-auto pb-[10vh]">
        {steps.map((step, index) => (
          <div key={index} className="protocol-card sticky top-24 rounded-[2.5rem] md:rounded-[3rem] bg-surface border border-slate shadow-2xl overflow-hidden will-change-transform mb-[40vh]" style={{ zIndex: index }}>
            <div className="flex flex-col md:flex-row h-full min-h-[400px]">
              <div className="w-full md:w-1/3 bg-[#0A0A0F] p-10 md:p-12 pl-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate/30">
                <span className="font-mono text-primary text-4xl">({step.num})</span>

                <div className="h-32 w-full flex items-center justify-center opacity-40 mt-8 md:mt-0">
                  {index === 0 && <Target size={56} className="text-primary" />}
                  {index === 1 && <Layers size={56} className="text-primary" />}
                  {index === 2 && <Zap size={56} className="text-primary" />}
                  {index === 3 && <MousePointer2 size={56} className="text-primary" />}
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

const TrustSignal = () => (
  <section className="py-40 px-6 flex justify-center text-center bg-background border-t border-slate/20">
    <div className="max-w-4xl">
      <p className="font-serif italic text-4xl md:text-6xl text-textMain/90 leading-[1.3] mb-16">
        "Working with founders, operators, and teams shaping the future."
      </p>
      <div className="font-mono text-sm tracking-widest text-primary uppercase">Private Partnerships</div>
    </div>
  </section>
);

const Insight = () => (
  <section className="py-24 px-6 md:px-16 bg-[#050508] text-center border-t border-slate/20">
    <p className="font-sans text-xl md:text-2xl text-textMuted/70 max-w-3xl mx-auto leading-relaxed">
      Thoughtfully crafted. Built with intention. <br className="hidden md:block" />
      <span className="text-textMain/90 block mt-4 font-medium">For teams building what’s next. Carefully considered solutions.</span>
    </p>
  </section>
);

const Footer = () => (
  <footer className="bg-background pt-32 pb-12 px-6 md:px-16 border-t border-slate/30 rounded-t-[3rem] -mt-10 relative z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-32">
        <div className="max-w-xl">
          <h2 className="text-5xl md:text-7xl font-sans font-bold tracking-tight mb-10 leading-[1.1]">Let's explore <br /><span className="font-serif italic text-textMuted">what's possible.</span></h2>
          <MagneticButton variant="primary">Start a Conversation</MagneticButton>
          <div className="mt-8 pt-6 border-t border-slate/20">
            <p className="font-mono text-xs text-textMuted/60 uppercase tracking-widest mb-3">Consultation Frame</p>
            <p className="text-sm text-textMuted/90 max-w-sm leading-relaxed">
              After you reach out, we’ll schedule a short conversation to understand your goals and determine alignment.
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:items-end lg:text-right pt-4">
          <p className="font-mono text-sm uppercase text-textMuted tracking-widest mb-6">Reach Out</p>
          <p className="text-textMain/70 max-w-sm mb-6 leading-relaxed font-sans text-lg">
            Discuss your detailed objectives and discover how a strategic partnership with GALILEO can construct a competitive advantage.
          </p>
          <a href="#" className="font-sans text-primary hover:text-white transition-colors underline underline-offset-4">collaborate@galileostudio.com</a>
        </div>
      </div>

      <div className="border-t border-slate/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-2xl font-sans font-bold tracking-tight text-textMain/80">GALILEO<span className="text-primary">.</span></div>

        <div className="flex items-center gap-3 font-mono text-xs text-textMuted/80 bg-slate/20 px-4 py-2 rounded-full border border-slate/40">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          SYSTEM OPERATIONAL
        </div>

        <div className="font-mono text-xs text-textMuted flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">X (Twitter)</a>
          <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="w-full min-h-screen relative bg-background text-textMain antialiased selection:bg-primary/20 selection:text-primary">
      <Noise />
      <Navbar />
      <Hero />
      <Philosophy />
      <Selectivity />
      <Features />
      <Protocol />
      <TrustSignal />
      <Insight />
      <Footer />
    </div>
  );
}

export default App;
