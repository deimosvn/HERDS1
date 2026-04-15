import { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Tecnología', href: '#tecnologia' },
    { label: 'Rover', href: '#rover' },
    { label: 'Impacto', href: '#impacto' },
    { label: 'Equipo', href: '#equipo' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border-b border-black/[0.04]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 sm:px-6 h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/logo.png" alt="Herds-1" className="w-8 h-8 rounded-lg object-contain group-hover:scale-105 transition-transform" />
          <span className={`text-[17px] font-bold tracking-tight font-[family-name:var(--font-display)] transition-colors duration-500 ${scrolled ? 'text-slate' : 'text-white'}`}>
            Herds-1
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-2 text-[13px] font-medium text-slate-mid hover:text-forest transition-colors rounded-lg hover:bg-forest/[0.04]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold text-white bg-forest hover:bg-forest-light transition-all duration-300 shadow-[0_1px_2px_rgba(26,60,52,0.2),0_0_0_1px_rgba(26,60,52,0.1)] hover:shadow-[0_4px_12px_rgba(26,60,52,0.25)]"
          >
            Solicitar Demo
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden relative w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${scrolled ? 'hover:bg-black/[0.04]' : 'hover:bg-white/10'}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <div className="flex flex-col gap-[5px]">
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${scrolled ? 'bg-slate' : 'bg-white'} ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${scrolled ? 'bg-slate' : 'bg-white'} ${mobileOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] transition-all duration-300 ${scrolled ? 'bg-slate' : 'bg-white'} ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="bg-white/90 backdrop-blur-2xl border-t border-black/[0.04] px-6 pb-5 pt-2 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-mid hover:text-forest transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block text-center px-5 py-2.5 rounded-full bg-forest text-white text-sm font-semibold"
          >
            Solicitar Demo
          </a>
        </div>
      </div>
    </nav>
  );
}