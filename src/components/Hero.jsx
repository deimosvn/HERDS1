import { useState, useEffect, useRef, useCallback } from 'react';

/* ── Animated counter hook ── */
function useCountUp(end, duration = 2000, start = 0, trigger = true) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    if (!trigger) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, trigger]);
  return value;
}

/* ── Floating particles ── */
const particles = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  emoji: ['💧', '🌱', '🍃', '💦', '☘️', '✦', '⚡'][i % 7],
  size: 10 + Math.random() * 14,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: 8 + Math.random() * 12,
  delay: Math.random() * -10,
  opacity: 0.12 + Math.random() * 0.2,
}));

/* ── Typed text hook ── */
function useTypedText(texts, typingSpeed = 80, deletingSpeed = 40, pauseTime = 2500) {
  const [displayed, setDisplayed] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deletingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((textIndex + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayed;
}

export default function Hero() {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const typedText = useTypedText([
    'Irrigación Inteligente',
    'Remediación de Suelos',
    'Agricultura Autónoma',
    'Resiliencia Agrícola',
  ]);

  /* Parallax on mouse move */
  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouse({ x, y });
  }, []);

  /* Trigger visibility */
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  /* Animated counters */
  const count70 = useCountUp(70, 2200, 0, visible);
  const count3 = useCountUp(3, 1500, 0, visible);

  return (
    <section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center overflow-hidden bg-slate"
    >
      {/* ── Background Video ── */}
      <div className="absolute inset-0">
        <video
          src="/rovervideo.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/70 md:bg-gradient-to-r md:from-black/75 md:via-black/55 md:to-black/40" />
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* ── Subtle animated layer over video ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-float-slow"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              opacity: p.opacity * 0.6,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}
      </div>

      {/* ── Main Content: Centered over video ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-6 lg:px-12 pt-24 sm:pt-32 pb-20 sm:pb-28">
        <div>
          {/* ── Text Content ── */}
          <div>
            {/* Logo + Brand cluster */}
            <div
              className={`flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <img
                src="/logo.png"
                alt="Herds-1 Logo"
                className="w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
              />
              <div>
                <div className="font-[family-name:var(--font-display)] text-xl sm:text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-white">
                  HERDS-1
                </div>
                <div className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-amber">
                  AgroTech de Doble Acción
                </div>
              </div>
            </div>

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 sm:mb-8 transition-all duration-700 delay-100 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white/90">
                Patente en trámite
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`font-[family-name:var(--font-display)] text-[clamp(1.75rem,7vw,4.2rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white transition-all duration-700 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              El Futuro de la
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-amber via-sand to-mint bg-[length:300%_100%] bg-clip-text text-transparent animate-gradient">
                  {typedText}
                </span>
                <span className="inline-block w-[3px] h-[0.9em] bg-amber/70 ml-0.5 align-middle animate-pulse" />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-4 sm:mt-6 max-w-xl text-[14px] sm:text-[16px] md:text-[17px] leading-relaxed text-white/80 transition-all duration-700 delay-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Rovers autónomos que siembran un{' '}
              <span className="font-semibold text-amber">hidrogel patentado</span> con doble acción:
              irrigación inteligente por ósmosis y remediación de suelos salinos.
            </p>

            {/* Stats inline */}
            <div
              className={`mt-6 sm:mt-8 grid grid-cols-3 gap-3 sm:gap-6 sm:flex sm:flex-wrap transition-all duration-700 delay-400 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {[
                { value: `${count70}%`, label: 'Ahorro hídrico', color: 'text-amber' },
                { value: `${count3}x`, label: 'Recuperación suelos', color: 'text-sand' },
                { value: '24/7', label: 'Autónomo', color: 'text-mint' },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default text-center sm:text-left">
                  <div className={`text-xl sm:text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-display)] ${stat.color} tracking-tight group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-white/50 font-medium uppercase tracking-[0.1em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-start gap-3 transition-all duration-700 delay-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contacto"
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-amber via-terra-light to-amber text-slate font-semibold text-[14px] sm:text-[15px] overflow-hidden transition-all duration-500 shadow-[0_4px_20px_rgba(200,149,109,0.4)] hover:shadow-[0_8px_35px_rgba(200,149,109,0.5)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Solicitar Demo</span>
                <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#tecnologia"
                className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-white font-semibold text-[14px] sm:text-[15px] border border-white/25 hover:border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explorar Tecnología
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Feature chips row ── */}
          <div
            className={`mt-8 sm:mt-10 flex flex-wrap gap-2 sm:gap-2.5 transition-all duration-700 delay-600 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {[
              { icon: '🛰️', label: 'GPS RTK + LiDAR' },
              { icon: '💧', label: 'Osmosis Inteligente' },
              { icon: '🧪', label: 'Remediación' },
              { icon: '☀️', label: 'Solar 400W' },
              { icon: '🤖', label: 'Autónomo 24/7' },
            ].map((chip, i) => (
              <div
                key={chip.label}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm ${
                  visible ? 'animate-scale-in' : 'opacity-0'
                }`}
                style={{ animationDelay: `${900 + i * 80}ms` }}
              >
                <span className="text-xs sm:text-sm">{chip.icon}</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-white/90">{chip.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#tecnologia" className="flex flex-col items-center gap-2 opacity-50 hover:opacity-80 transition-opacity">
          <span className="text-[10px] font-medium text-white/60 uppercase tracking-[0.15em]">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/50 animate-bounce-subtle" />
          </div>
        </a>
      </div>

      {/* ── Bottom wave ── */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg className="relative block w-[200%] h-[60px] animate-wave" viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,30 C150,50 350,0 600,30 C850,60 1050,10 1200,30 L1200,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}