const impacts = [
  {
    icon: '💧',
    title: 'Ahorro Hídrico',
    value: '70%',
    unit: 'menos agua',
    description:
      'Reducción en consumo de agua frente a riego convencional, gracias a la liberación controlada del hidrogel.',
    accent: 'text-water',
    bg: 'bg-sky-pale/40',
    border: 'border-water/10',
  },
  {
    icon: '🌿',
    title: 'Recuperación de Suelos',
    value: '3x',
    unit: 'más rápido',
    description:
      'Velocidad de recuperación de suelos salinos vs. métodos tradicionales de lavado por inundación.',
    accent: 'text-forest',
    bg: 'bg-mint-light/40',
    border: 'border-leaf/10',
  },
  {
    icon: '📈',
    title: 'Escalabilidad Comercial',
    value: '∞',
    unit: 'potencial',
    description:
      'Modelo escalable mediante flotas de rovers y producción industrial de hidrogel para mercados globales.',
    accent: 'text-slate',
    bg: 'bg-black/[0.02]',
    border: 'border-black/[0.04]',
  },
];

export default function Impact() {
  return (
    <section id="impacto" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase text-leaf mb-4">
            Por qué importa
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[2.75rem] font-extrabold text-slate tracking-tight">
            Impacto Medible
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-slate-soft text-[15px] leading-relaxed">
            Cada despliegue de Herds-1 genera resultados concretos en
            sostenibilidad, productividad y retorno financiero.
          </p>
        </div>

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-5">
          {impacts.map((item) => (
            <div
              key={item.title}
              className={`relative rounded-2xl ${item.bg} border ${item.border} p-7 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] group`}
            >
              <span className="text-3xl mb-5 block">{item.icon}</span>

              <div className="flex items-baseline gap-2 mb-1">
                <span className={`text-4xl font-extrabold font-[family-name:var(--font-display)] ${item.accent} tracking-tight`}>
                  {item.value}
                </span>
                <span className="text-[12px] font-medium text-slate-soft/60 uppercase tracking-wide">
                  {item.unit}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-slate mb-2.5 mt-3">
                {item.title}
              </h3>
              <p className="text-[13px] text-slate-soft leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}