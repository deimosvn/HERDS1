const members = [
  {
    name: 'Diego Martínez',
    role: 'CTO',
    specialty: 'Ingeniero Mecatrónico',
    bio: 'Especialista en robótica autónoma y sistemas embebidos. Lidera el diseño del rover y la integración de sensores.',
    initials: 'DM',
    gradient: 'from-ocean-mid to-water',
  },
  {
    name: 'José Cortez',
    role: 'CEO',
    specialty: 'Estrategia & Operaciones',
    bio: 'Visión estratégica del negocio, relaciones con inversores y desarrollo de la propiedad intelectual.',
    initials: 'JC',
    gradient: 'from-forest to-sage',
  },
  {
    name: 'Gerardo Murillo',
    role: 'COO',
    specialty: 'Logística & Supply Chain',
    bio: 'Gestión de operaciones en campo, coordinación de despliegues y optimización de la producción del hidrogel.',
    initials: 'GM',
    gradient: 'from-slate to-slate-mid',
  },
];

export default function Team() {
  return (
    <section id="equipo" className="py-28 bg-mist">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase text-ocean-mid mb-4">
            Quiénes somos
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[2.75rem] font-extrabold text-slate tracking-tight">
            El Equipo
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-slate-soft text-[15px] leading-relaxed">
            Un equipo multidisciplinario con la misión de transformar la
            agricultura con tecnología de frontera.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {members.map((m) => (
            <div
              key={m.name}
              className="group text-center p-8 rounded-2xl bg-card border border-black/[0.04] hover:border-black/[0.08] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              {/* Avatar */}
              <div
                className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${m.gradient} flex items-center justify-center mb-5 group-hover:scale-105 group-hover:rounded-xl transition-all duration-300`}
              >
                <span className="text-lg font-bold text-white">
                  {m.initials}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-[17px] font-bold text-slate">
                {m.name}
              </h3>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="text-[12px] font-semibold text-forest">{m.role}</span>
                <span className="w-1 h-1 rounded-full bg-black/10" />
                <span className="text-[12px] text-slate-soft">{m.specialty}</span>
              </div>
              <p className="mt-4 text-[13px] text-slate-soft leading-relaxed">
                {m.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}