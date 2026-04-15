import { useState } from 'react';

const cards = [
  {
    id: 'irrigacion',
    title: 'Irrigación Osmótica',
    emoji: '💧',
    color: 'ocean-mid',
    borderActive: 'border-water/30',
    bgIcon: 'bg-sky-pale/60',
    textIcon: 'text-water',
    description:
      'El hidrogel Herds-1 libera agua de forma controlada mediante un proceso osmótico, manteniendo la humedad óptima en la rizósfera sin riego tradicional.',
    specs: [
      'Liberación gradual por diferencia de potencial osmótico',
      'Retención de hasta 400× su peso en agua',
      'Reducción del 70% en consumo hídrico',
      'Biodegradable y no tóxico para el suelo',
    ],
  },
  {
    id: 'remediacion',
    title: 'Remediación de Sales',
    emoji: '🌱',
    color: 'forest',
    borderActive: 'border-leaf/30',
    bgIcon: 'bg-mint-light/60',
    textIcon: 'text-forest',
    description:
      'La misma matriz polimérica captura iones de sodio y cloruro presentes en suelos salinos, restaurando la conductividad eléctrica ideal para el cultivo.',
    specs: [
      'Absorción selectiva de Na⁺ y Cl⁻',
      'Restaura la CE del suelo a niveles óptimos',
      'Efecto acumulativo con cada ciclo de aplicación',
      'Monitoreo en tiempo real vía sensores del rover',
    ],
  },
];

export default function Features() {
  const [active, setActive] = useState(null);

  return (
    <section id="tecnologia" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase text-sage mb-4">
            Tecnología de patente
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[2.75rem] font-extrabold text-slate tracking-tight text-balance">
            Doble Acción en un Solo Producto
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-slate-soft text-[15px] leading-relaxed">
            El hidrogel Herds-1 combina dos funciones críticas para la
            agricultura en zonas áridas y suelos degradados.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {cards.map((card) => {
            const isActive = active === card.id;
            return (
              <div
                key={card.id}
                className={`group relative rounded-2xl bg-card p-7 md:p-9 border transition-all duration-400 cursor-pointer ${
                  isActive
                    ? `${card.borderActive} shadow-[0_8px_30px_rgba(0,0,0,0.06)]`
                    : 'border-black/[0.05] hover:border-black/[0.08] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]'
                }`}
                onClick={() => setActive(isActive ? null : card.id)}
                onKeyDown={(e) => e.key === 'Enter' && setActive(isActive ? null : card.id)}
                role="button"
                tabIndex={0}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${card.bgIcon} flex items-center justify-center text-xl mb-5`}>
                  {card.emoji}
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-slate mb-2.5">
                  {card.title}
                </h3>
                <p className="text-[14px] text-slate-soft leading-relaxed">
                  {card.description}
                </p>

                {/* Expandable specs */}
                <div
                  className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isActive ? 'max-h-80 opacity-100 mt-6' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="border-t border-black/[0.04] pt-5">
                    <h4 className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-soft/60 mb-3">
                      Especificaciones
                    </h4>
                    <ul className="space-y-2.5">
                      {card.specs.map((spec) => (
                        <li key={spec} className="flex items-start gap-3 text-[13px] text-slate-mid leading-snug">
                          <span className="mt-[7px] w-1 h-1 rounded-full bg-leaf shrink-0" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Toggle hint */}
                <div className="mt-5 flex items-center gap-1 text-[11px] font-medium text-slate-soft/40">
                  <svg className={`w-3 h-3 transition-transform duration-300 ${isActive ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  {isActive ? 'Cerrar' : 'Ver especificaciones'}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}