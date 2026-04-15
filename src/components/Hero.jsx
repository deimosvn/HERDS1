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
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setValue(Math.floor(ease * (end - start) + start));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start, trigger]);
  return value;
}

/* ── Floating particles ── */
const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  emoji: ['💧', '🌱', '🍃', '💦', '☘️', '✦'][i % 6],
  size: 10 + Math.random() * 14,
  x: Math.random() * 100,
  y: Math.random() * 100,
  dur: 8 + Math.random() * 12,
  delay: Math.random() * -10,
  opacity: 0.15 + Math.random() * 0.25,
}));

export default function Hero() {
  const heroRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FAFDF8]"
    >
      {/* ── Animated Background Layer ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large morphing blob - top-right */}
        <div
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-mint-light/60 via-sky-pale/40 to-mint/20 animate-morph blur-[40px]"
          style={{
            transform: `translate(${mouse.x * -30}px, ${mouse.y * -20}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Medium morphing blob - bottom-left */}
        <div
          className="absolute -bottom-32 -left-20 w-[500px] h-[500px] bg-gradient-to-tr from-sky-pale/50 via-mint-light/30 to-sky-light/20 animate-morph blur-[50px]"
          style={{
            animationDelay: '-5s',
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 15}px)`,
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
        {/* Small accent blob - center-left */}
        <div
          className="absolute top-1/3 left-[10%] w-[250px] h-[250px] bg-gradient-to-br from-leaf/15 to-sky/10 rounded-full blur-[60px] animate-float-slow"
          style={{
            transform: `translate(${mouse.x * 40}px, ${mouse.y * 30}px)`,
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />

        {/* Dot grid with mask */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: 'radial-gradient(circle, #2D6A4F 0.5px, transparent 0.5px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)',
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

        {/* Orbiting element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0">
          <div className="animate-orbit opacity-20">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-leaf to-sky" />
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-20">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-forest/[0.06] border border-forest/10 mb-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-leaf opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-sage" />
          </span>
          <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-forest">
            Patente en trámite
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`font-[family-name:var(--font-display)] text-[clamp(2.5rem,6.5vw,5rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-slate text-balance transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Doble Acción: El Futuro
          <br className="hidden sm:block" />
          {' de la '}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-forest via-sage via-leaf to-water bg-[length:300%_100%] bg-clip-text text-transparent animate-gradient">
              Resiliencia Agrícola
            </span>
            {/* Underline decoration */}
            <svg className="absolute -bottom-2 left-0 w-full h-3 text-leaf/30" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0 5 Q50 0, 100 5 T200 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`mt-8 max-w-2xl mx-auto text-[17px] md:text-lg leading-relaxed text-slate-soft text-balance transition-all duration-700 delay-200 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Rovers autónomos que siembran un{' '}
          <span className="font-semibold text-forest">hidrogel patentado</span> con doble acción:
          irrigación inteligente por ósmosis y remediación de suelos salinos.
        </p>

        {/* CTA Buttons */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 transition-all duration-700 delay-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="#contacto"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-forest via-forest-light to-forest text-white font-semibold text-[15px] overflow-hidden transition-all duration-500 shadow-[0_4px_15px_rgba(26,60,52,0.25)] hover:shadow-[0_8px_30px_rgba(26,60,52,0.35)] hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Shimmer effect on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">Solicitar Demo</span>
            <svg className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <a
            href="#tecnologia"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full text-slate-mid font-semibold text-[15px] border border-black/[0.08] hover:border-forest/20 hover:bg-forest/[0.04] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explorar Tecnología
            <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          </a>
        </div>

        {/* ── Interactive Tech Visual ── */}
        <div
          className={`mt-16 transition-all duration-1000 delay-500 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative max-w-3xl mx-auto">
            {/* Glass card */}
            <div
              className="relative rounded-3xl bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10 overflow-hidden"
              style={{
                transform: `perspective(1000px) rotateY(${mouse.x * 3}deg) rotateX(${mouse.y * -3}deg)`,
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-leaf/50 to-transparent" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* Feature pills */}
                {[
                  { icon: '🛰️', label: 'GPS RTK + LiDAR', sub: 'Navegación' },
                  { icon: '💧', label: 'Osmosis Inteligente', sub: 'Irrigación' },
                  { icon: '🧪', label: 'Captura Na⁺ Cl⁻', sub: 'Remediación' },
                  { icon: '☀️', label: '400W Solar', sub: 'Energía' },
                ].map((feat, i) => (
                  <div
                    key={feat.label}
                    className={`group text-center p-3 rounded-2xl hover:bg-forest/[0.03] transition-all duration-300 cursor-default ${
                      visible ? 'animate-scale-in' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${600 + i * 120}ms` }}
                  >
                    <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-300">{feat.icon}</div>
                    <div className="text-[12px] font-bold text-slate leading-tight">{feat.label}</div>
                    <div className="text-[10px] text-slate-soft mt-0.5 uppercase tracking-wider">{feat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Animated connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" preserveAspectRatio="none">
                <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="#1A3C34" strokeWidth="1" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                </line>
                <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="#2C74B3" strokeWidth="1" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="8" to="0" dur="1s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>

            {/* Floating badges around the visual */}
            <div
              className="absolute -top-4 -left-4 md:left-6 px-3 py-1.5 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] animate-float-slow"
            >
              <span className="text-xs font-semibold text-water">IoT Conectado</span>
            </div>
            <div
              className="absolute -top-4 -right-4 md:right-6 px-3 py-1.5 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-black/[0.04] animate-float-slow delay-200"
            >
              <span className="text-xs font-semibold text-sage">IP67 Robusto</span>
            </div>
          </div>
        </div>

        {/* ── Stats Row ── */}
        <div
          className={`mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto transition-all duration-700 delay-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: `${count70}%`, label: 'Ahorro hídrico', color: 'text-water' },
            { value: `${count3}x`, label: 'Recuperación de suelos', color: 'text-forest' },
            { value: '24/7', label: 'Operación autónoma', color: 'text-sage' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group text-center p-4 rounded-2xl hover:bg-white/80 hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 cursor-default"
            >
              <div className={`text-2xl md:text-3xl font-extrabold font-[family-name:var(--font-display)] ${stat.color} tracking-tight group-hover:scale-110 transition-transform duration-300`}>
                {stat.value}
              </div>
              <div className="mt-1.5 text-[10px] text-slate-soft font-medium uppercase tracking-[0.12em] leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
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