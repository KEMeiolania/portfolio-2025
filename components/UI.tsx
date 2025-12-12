import React from 'react';

// A sophisticated container simulating frosted glass with physical depth
export const GlassCard: React.FC<{ children?: React.ReactNode; className?: string; depth?: 'flat' | 'deep' }> = ({ children, className = '', depth = 'flat' }) => (
  <div className={`
    relative overflow-hidden rounded-[24px] md:rounded-[40px] border border-white/60
    backdrop-blur-xl bg-white/70 transition-all duration-500
    ${depth === 'deep' ? 'shadow-[0_20px_40px_-12px_rgba(0,0,0,0.12)]' : 'shadow-[0_4px_24px_-1px_rgba(0,0,0,0.04)]'}
    ${className}
  `}>
    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
    <div className="relative z-10 h-full w-full">{children}</div>
  </div>
);

interface TypographyProps {
  children?: React.ReactNode;
  className?: string;
}

export const Typography = {
  Display: ({ children, className = '' }: TypographyProps) => (
    <h1 className={`font-semibold tracking-tighter text-5xl md:text-8xl leading-[0.9] text-[#1d1d1f] ${className}`}>{children}</h1>
  ),
  Heading: ({ children, className = '' }: TypographyProps) => (
    <h2 className={`font-medium tracking-tight text-3xl md:text-5xl text-[#1d1d1f] ${className}`}>{children}</h2>
  ),
  Subheading: ({ children, className = '' }: TypographyProps) => (
    <h3 className={`font-normal tracking-wide text-lg md:text-xl text-[#86868b] ${className}`}>{children}</h3>
  ),
  Label: ({ children, className = '' }: TypographyProps) => (
    <span className={`font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#86868b] ${className}`}>{children}</span>
  ),
  Body: ({ children, className = '' }: TypographyProps) => (
    <p className={`font-normal text-base md:text-xl leading-relaxed text-[#424245] ${className}`}>{children}</p>
  ),
  Mono: ({ children, className = '' }: TypographyProps) => (
    <span className={`font-mono text-sm text-[#86868b] ${className}`}>{children}</span>
  ),
  Number: ({ children, className = '' }: TypographyProps) => (
    <span className={`font-medium tabular-nums tracking-tight font-sans ${className}`}>{children}</span>
  )
};

// A precision dial inspired by high-end audio equipment
export const PrecisionDial: React.FC<{ value: number; min: number; max: number; onChange: (val: number) => void; label: string }> = ({ value, min, max, onChange, label }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex justify-between items-end">
        <Typography.Label>{label}</Typography.Label>
        <Typography.Number className="text-2xl">{value.toFixed(2)}</Typography.Number>
      </div>
      <div className="relative h-12 flex items-center group cursor-ew-resize">
        <input 
          type="range" 
          min={min} 
          max={max} 
          step={0.01}
          value={value} 
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-ew-resize"
        />
        {/* Track */}
        <div className="w-full h-1 bg-[#e5e5e5] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#1d1d1f] transition-all duration-75 ease-out" 
            style={{ width: `${((value - min) / (max - min)) * 100}%` }} 
          />
        </div>
        {/* Handle */}
        <div 
          className="absolute h-8 w-8 bg-white rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-[#e5e5e5] flex items-center justify-center transition-transform duration-100 ease-out z-10 pointer-events-none group-active:scale-110"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 16px)` }}
        >
          <div className="w-2 h-2 bg-[#1d1d1f] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const MetricBox: React.FC<{ label: string; value: string; trend?: string }> = ({ label, value, trend }) => (
  <div className="flex flex-col p-6 bg-white/40 rounded-2xl border border-white/40 backdrop-blur-sm">
    <Typography.Label className="mb-2">{label}</Typography.Label>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-light text-[#1d1d1f]">{value}</span>
      {trend && <span className="text-xs font-medium text-[#86868b]">{trend}</span>}
    </div>
  </div>
);