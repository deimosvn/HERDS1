const specs = [
  {
    icon: '🛰️',
    title: 'Navegación Autónoma',
    description: 'GPS RTK + LiDAR para mapeo centimétrico. Evasión de obstáculos y optimización de rutas de siembra.',
    tag: 'Precisión',
  },
  {
    icon: '📡',
    title: 'Sensores de Precisión',
    description: 'Array multiespectral para análisis de salinidad, humedad y compactación del suelo en tiempo real.',
    tag: 'Datos',
  },
  {
    icon: '🛡️',
    title: 'Chasis de Alta Resistencia',
    description: 'Aleación de aluminio aeronáutico con protección IP67 para terrenos áridos extremos.',
    tag: 'Durabilidad',
  },
  {
    icon: '⚙️',
    title: 'Siembra Programable',
    description: 'Dosificación de hidrogel calibrada por zona con capacidad de hasta 500 kg por ciclo operativo.',
    tag: 'Eficiencia',
  },
  {
    icon: '☀️',
    title: 'Energía Solar Integrada',
    description: 'Panel fotovoltaico de 400W con batería LiFePO4 para 12+ horas de autonomía continua.',
    tag: 'Energía',
  },
  {
    icon: '📲',
    title: 'Conectividad IoT',
    description: 'Telemetría via LoRa/4G con dashboard de monitoreo para cada misión de siembra.',
    tag: 'Conectividad',
  },
];

export default function TechSpecs() {
  return (
    <section id="rover" className="py-28 bg-mist">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase text-water mb-4">
            Rover Autónomo
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-[2.75rem] font-extrabold text-slate tracking-tight">
            Ingeniería de Precisión
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-slate-soft text-[15px] leading-relaxed">
            Diseñado para operar autónomamente en los entornos agrícolas más exigentes.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {specs.map((spec, i) => (
            <div
              key={spec.title}
              className={`group relative p-6 rounded-2xl bg-card border border-black/[0.04] hover:border-black/[0.08] transition-all duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] ${
                i === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-2xl">{spec.icon}</span>
                <span className="text-[10px] font-semibold tracking-[0.1em] uppercase text-sage/70 px-2.5 py-1 rounded-full bg-mint-light/50">
                  {spec.tag}
                </span>
              </div>

              <h3 className="font-[family-name:var(--font-display)] text-[16px] font-bold text-slate mb-2">
                {spec.title}
              </h3>
              <p className="text-[13px] text-slate-soft leading-relaxed">
                {spec.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}