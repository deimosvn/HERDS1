export default function Contact() {
  return (
    <section id="contacto" className="py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-forest via-forest-light to-ocean-mid p-10 md:p-16">
          {/* Background shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-leaf/10 blur-[60px]" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-sky/10 blur-[60px]" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto text-center">
            <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase text-mint/70 mb-4">
              Conecta con nosotros
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Solicita tu Demo
            </h2>
            <p className="mt-3 text-[15px] text-white/60 leading-relaxed">
              ¿Interesado en Herds-1? Déjanos tus datos y nuestro equipo te
              contactará.
            </p>

            {/* Form */}
            <form
              className="mt-10 grid sm:grid-cols-2 gap-3 text-left"
              onSubmit={(e) => e.preventDefault()}
            >
              <div>
                <label htmlFor="name" className="block text-[10px] font-semibold text-white/40 mb-1.5 uppercase tracking-[0.1em]">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.08] backdrop-blur border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-[10px] font-semibold text-white/40 mb-1.5 uppercase tracking-[0.1em]">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.08] backdrop-blur border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="company" className="block text-[10px] font-semibold text-white/40 mb-1.5 uppercase tracking-[0.1em]">
                  Empresa / Organización
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Nombre de tu empresa"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.08] backdrop-blur border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-transparent transition-all text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-[10px] font-semibold text-white/40 mb-1.5 uppercase tracking-[0.1em]">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={3}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.08] backdrop-blur border border-white/[0.08] text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-leaf/40 focus:border-transparent transition-all text-sm resize-none"
                />
              </div>
              <div className="sm:col-span-2 pt-1">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-white text-forest font-semibold text-[14px] hover:bg-mint-light transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                >
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}