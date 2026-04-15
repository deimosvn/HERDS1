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
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2]"
    >
      {/* ── Animated Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large morphing blob - top-right (warm earth) */}
        <div
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-sand/70 via-amber/20 to-sand-light/40 animate-morph blur-[40px]"
          style={{
            transform: `translate(${mouse.x * -30}px, ${mouse.y * -20}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Medium morphing blob - bottom-left (earth + green) */}
        <div
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sand/50 via-mint-light/25 to-sand-light/30 animate-morph blur-[50px]"
          style={{
            animationDelay: '-5s',
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Small accent blob */}
        <div
          className="absolute top-1/4 right-[15%] w-[300px] h-[300px] bg-gradient-to-br from-terra-light/12 to-leaf/8 rounded-full blur-[80px] animate-float-slow"
          style={{
            transform: `translate(${mouse.x * 40}px, ${mouse.y * 30}px)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Dot grid with mask */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(circle, #8B5E3C 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
            maskImage: 'radial-gradient(ellipse 80% 70% at 30% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 30% 50%, black, transparent)',
          }}
        />

        {/* Floating particles */}
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute animate-float-slow"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          >
            {p.emoji}
          </div>
        ))}

        {/* Orbiting elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
          <div className="animate-orbit opacity-15">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-leaf to-sky" />
          </div>
        </div>
      </div>

      {/* ── Main Content: Split Layout ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left Column: Text Content ── */}
          <div className="order-2 lg:order-1">
            {/* Logo + Brand cluster */}
            <div
              className={`flex items-center gap-4 mb-8 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <img
                src="/logo.png"
                alt="Herds-1 Logo"
                className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg"
              />
              <div>
                <div className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-forest">
                  HERDS-1
                </div>
                <div className="text-[10px] md:text-[11px] font-semibold tracking-[0.18em] uppercase text-terra-light">
                  AgroTech de Doble Acción
                </div>
              </div>
            </div>

            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-terra/[0.06] border border-terra/10 mb-8 transition-all duration-700 delay-100 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terra" />
              </span>
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-clay">
                Patente en trámite
              </span>
            </div>

            {/* Heading */}
            <h1
              className={`font-[family-name:var(--font-display)] text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-slate transition-all duration-700 delay-200 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              El Futuro de la
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-clay via-terra to-forest bg-[length:300%_100%] bg-clip-text text-transparent animate-gradient">
                  {typedText}
                </span>
                <span className="inline-block w-[3px] h-[0.9em] bg-terra/60 ml-0.5 align-middle animate-pulse" />
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className={`mt-6 max-w-xl text-[16px] md:text-[17px] leading-relaxed text-slate-soft transition-all duration-700 delay-300 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Rovers autónomos que siembran un{' '}
              <span className="font-semibold text-clay">hidrogel patentado</span> con doble acción:
              irrigación inteligente por ósmosis y remediación de suelos salinos.
            </p>

            {/* Stats inline */}
            <div
              className={`mt-8 flex flex-wrap gap-6 transition-all duration-700 delay-400 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {[
                { value: `${count70}%`, label: 'Ahorro hídrico', color: 'text-terra' },
                { value: `${count3}x`, label: 'Recuperación suelos', color: 'text-clay' },
                { value: '24/7', label: 'Autónomo', color: 'text-forest' },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <div className={`text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-display)] ${stat.color} tracking-tight group-hover:scale-110 transition-transform duration-300`}>
                    {stat.value}
                  </div>
                  <div className="text-[10px] text-slate-soft font-medium uppercase tracking-[0.1em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`mt-10 flex flex-col sm:flex-row items-start gap-3 transition-all duration-700 delay-500 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a
                href="#contacto"
                className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-clay via-terra to-clay text-white font-semibold text-[15px] overflow-hidden transition-all duration-500 shadow-[0_4px_15px_rgba(107,66,38,0.3)] hover:shadow-[0_8px_30px_rgba(107,66,38,0.4)] hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative">Solicitar Demo</span>
                <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href="#tecnologia"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-slate-mid font-semibold text-[15px] border border-terra/15 hover:border-terra/30 hover:bg-terra/[0.04] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Explorar Tecnología
                <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right Column: Rover Visual ── */}
          <div className="order-1 lg:order-2">
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
              }`}
            >
              {/* Glow ring behind rover */}
              <div
                className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-gradient-to-br from-amber/20 via-sand/15 to-terra-light/10 blur-[60px] animate-pulse"
                style={{
                  transform: `translate(${mouse.x * -15}px, ${mouse.y * -10}px)`,
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />

              {/* Main rover card with 3D tilt */}
              <div
                className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-sand/50 shadow-[0_8px_60px_rgba(139,94,60,0.08)] p-6 md:p-8 overflow-hidden"
                style={{
                  transform: `perspective(1000px) rotateY(${mouse.x * 4}deg) rotateX(${mouse.y * -4}deg)`,
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/50 to-transparent" />

                {/* Rover Video */}
                <video
                  src="/rovervideo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-2xl"
                />

                {/* Overlay label */}
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <div className="text-[13px] font-bold text-slate font-[family-name:var(--font-display)]">
                      Rover Autónomo H-1
                    </div>
                    <div className="text-[10px] text-slate-soft uppercase tracking-wider">
                      Irrigación + Remediación
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber/10 border border-amber/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-terra" />
                    </span>
                    <span className="text-[10px] font-semibold text-forest">Operativo</span>
                  </div>
                </div>

                {/* Feature chips on card */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { icon: '🛰️', label: 'GPS RTK' },
                    { icon: '💧', label: 'Osmosis' },
                    { icon: '🧪', label: 'Remediación' },
                    { icon: '☀️', label: 'Solar 400W' },
                  ].map((chip, i) => (
                    <div
                      key={chip.label}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-terra/[0.05] border border-terra/[0.08] ${
                        visible ? 'animate-scale-in' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${800 + i * 100}ms` }}
                    >
                      <span className="text-xs">{chip.icon}</span>
                      <span className="text-[10px] font-semibold text-clay">{chip.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 md:left-2 px-3 py-1.5 rounded-full bg-white shadow-[0_4px_20px_rgba(139,94,60,0.08)] border border-sand/40 animate-float-slow z-10">
                <span className="text-xs font-semibold text-terra">IoT Conectado</span>
              </div>
              <div className="absolute -top-3 -right-3 md:right-2 px-3 py-1.5 rounded-full bg-white shadow-[0_4px_20px_rgba(139,94,60,0.08)] border border-sand/40 animate-float-slow delay-300 z-10">
                <span className="text-xs font-semibold text-terra-light">IP67</span>
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white shadow-[0_4px_20px_rgba(139,94,60,0.08)] border border-sand/40 animate-float delay-500 z-10">
                <span className="text-xs font-semibold text-clay">100% Autónomo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <a href="#tecnologia" className="flex flex-col items-center gap-2 opacity-40 hover:opacity-70 transition-opacity">
          <span className="text-[10px] font-medium text-slate-soft uppercase tracking-[0.15em]">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-soft/40 flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-slate-soft/50 animate-bounce-subtle" />
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