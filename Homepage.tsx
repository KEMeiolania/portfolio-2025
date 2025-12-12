import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Github, Mail, Activity, Layers, Grid, Disc } from 'lucide-react';

const Homepage = () => {
  return (
    <div className="min-h-screen w-full max-w-[1100px] mx-auto px-6 md:px-12 py-16 flex flex-col font-sans selection:bg-white/20 selection:text-white overflow-x-hidden">
      
      {/* ================= 1. HEADER ================= */}
      <header className="flex justify-between items-start mb-32 opacity-70 relative z-20">
        <div className="flex flex-col gap-1">
          <h1 className="text-xs font-bold tracking-[0.25em] uppercase text-[#e5e5e5]">Zijian Qiu</h1>
          <span className="text-[9px] font-mono text-[#666] uppercase tracking-widest">DATA & URBAN ANALYSIS</span>
        </div>
        <div className="text-right">
          <p className="text-[9px] font-mono text-[#666] uppercase tracking-widest">Status: Online</p>
          <p className="text-[9px] font-mono text-[#444] uppercase tracking-widest">Loc: 32.06°N, 118.79°E</p>
        </div>
      </header>

      {/* ================= 2. HERO ================= */}
      <section className="mb-48 px-2 relative">
        
        <div className="absolute top-[-50%] right-[-20%] w-[600px] h-[600px] border border-[#ffffff03] rounded-full animate-[spin_60s_linear_infinite] pointer-events-none z-0 opacity-50">
           <div className="absolute inset-[15%] border border-[#ffffff03] rounded-full"></div>
           <div className="absolute inset-[30%] border border-[#ffffff03] rounded-full"></div>
           <div className="absolute top-0 left-1/2 w-[1px] h-full bg-gradient-to-b from-transparent via-[#ffffff05] to-transparent"></div>
        </div>

        <div className="relative z-10">
          <p className="font-mono text-[10px] text-[#444] mb-8 uppercase tracking-widest">/// 001_Prologue</p>
          
          <blockquote className="max-w-4xl">
            <p className="text-etched text-3xl md:text-6xl lg:text-6xl font-serif font-medium leading-[2] text-[#d4d4d4] tracking-tight mb-8">
              Turning and turning in the <span className="italic text-[#777]">widening gyre</span> <br/>
              The falcon cannot hear the falconer; <br/>
              Things fall apart; the centre cannot hold...
            </p>
            <footer className="text-sm font-mono text-[#555] uppercase tracking-wider mb-12">
              — W.B. Yeats, The Second Coming (1919)
            </footer>
          </blockquote>

          <div className="border-l-2 border-[#333] pl-6 py-2">
             <h2 className="text-lg md:text-xl text-[#e5e5e5] font-light tracking-wide">
               Decoding the <span className="font-light text-white">invisible geometry</span> of Cities.
             </h2>
          </div>
        </div>
      </section>

      {/* ================= 3. NARRATIVE ================= */}
      <section className="mb-40 relative group">
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[#333] to-transparent"></div>
        
        <div className="pl-8 md:pl-12 relative">
          <div className="font-mono text-[10px] text-[#444] mb-8 uppercase tracking-widest flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#333] rounded-full group-hover:bg-white group-hover:shadow-[0_0_8px_white] transition-all duration-500"></span>
            <span>002_Origin_Log</span>
          </div>

          <div className="oled-glow border border-[#ffffff05] rounded-[2px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 star-dust pointer-events-none"></div>
            
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6 text-sm md:text-base text-[#a0a0a0] leading-7 font-light font-sans">
                <p>
                  My hometown <strong className="text-white font-normal">Nanjing</strong> quadrupled its urban footprint between 2000 and 2020. 
                  My coming of age paralleled the breathtaking velocity of modern Chinese urbanization. 
                </p>
                <p>
                  The immense wealth and population, siphoned by land finance and rapid development, converged here, 
                  turning the city into an <span className="text-white italic font-serif">ocean of stars</span> when viewed from the hilltop at night.
                  However, as I matured, I realized a city is more than a physical network of skyscrapers and subways. 
                </p>
              </div>
              
              <div className="space-y-6 text-sm md:text-base text-[#a0a0a0] leading-7 font-light font-sans border-l border-[#ffffff0a] pl-0 md:pl-12">
                <p>
                  Today, ten million active agents navigate this region daily, generating a perpetual stream of complex, dynamic interactions at every instant.
                  It is a complex <strong className="text-white font-normal">information system</strong>.
                </p>
                <p>
                  Space shapes behavior, and behavior reshapes space—a feedback loop driven by the exchange of information. 
                  To truly understand the economic and political logic beneath this fourfold expansion, I must  
                   delve into the data generated by human interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. INSTRUMENTS ================= */}
      <section className="mb-40">
        <div className="flex items-end justify-between mb-8 px-2">
          <span className="text-[10px] font-mono text-[#444] uppercase tracking-widest">/// 003_Instruments</span>
        </div>

        <div className="border-t border-[#ffffff0a]">
          <ProjectSlot 
            id="01"
            title="Scale. Network. Function."
            subtitle="Urban Vitality Simulation"
            tech="REACT / SDM"
            desc="Causal identification of urban vitality. An interactive engine simulating the 'Siphon Effect' in dense grids."
            link="/scale"
            isInternal={true}
            icon={<Activity size={14} />}
          />

          <ProjectSlot 
            id="02"
            title="Unseen Fractures"
            subtitle="Community Resilience"
            tech="D3.JS / GRAPH"
            desc="Decoding invisible risk structures. Visualizing post-disaster community narratives through force-directed graphs."
            link="/fractures/index.html"
            isInternal={false}
            icon={<Grid size={14} />}
          />

          <ProjectSlot 
            id="03"
            title="Algorithmic Colonization"
            subtitle="Spatial Texture Analysis"
            tech="THREE.JS / SHADER"
            desc="Quantifying memory displacement. A critical analysis of how algorithmic consumption reshapes urban textures."
            link="/colonization/index.html"
            isInternal={false}
            icon={<Layers size={14} />}
          />
        </div>
      </section>

      {/* ================= 5. SPECIFICATIONS & FOCUS ================= */}
      <section className="mb-32 px-2">
        <div className="text-[10px] font-mono text-[#444] uppercase tracking-widest mb-8">/// 004_Specifications</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-t border-[#ffffff0a] pt-12">
          <div>
            <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Disc size={12} className="animate-spin duration-[3000ms]"/>
              Technical Architecture
            </h3>
            <div className="space-y-0">
              <SpecRow label="Core" value="TypeScript, Python, SQL" />
              <SpecRow label="Frontend" value="React, Next.js, Tailwind" />
              <SpecRow label="Visualization" value="D3.js, WebGL, Three.js" />
              <SpecRow label="Spatial" value="ArcGIS, QGIS, Kepler.gl" />
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-[#666] uppercase tracking-widest mb-6">Research Protocols</h3>
            <div className="space-y-0">
              <SpecRow label="Domain" value="Urban Science / Human Geography" />
              <SpecRow label="Methodology" value="Causal Inference / Spatial Econometrics" />
              <SpecRow label="Interest" value="Algorithmic Urbanism / Resilience" />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. FOOTER  ================= */}
      <footer className="py-12 border-t border-[#ffffff0a] flex justify-between items-end text-[10px] font-mono text-[#444] uppercase tracking-widest">
        <div className="flex gap-8">
          <SocialLink href="mailto:tsuchienchiu17@gmail.com" label="Email" icon={<Mail size={14}/>} />
          <SocialLink href="https://github.com/KEMeiolania" label="GitHub" icon={<Github size={14}/>} />
        </div>
        <div>
          © 2025 Z.Qiu / All Systems Operational
        </div>
      </footer>

    </div>
  );
};

// --- 组件库 ---

const ProjectSlot = ({ id, title, subtitle, tech, desc, link, isInternal, icon }) => {
  const Wrapper = isInternal ? Link : 'a';
  const props = isInternal ? { to: link } : { href: link };

  return (
    // @ts-ignore
    <Wrapper {...props} className="group relative block w-full py-10 border-b border-[#ffffff0a] transition-colors duration-500 hover:bg-[#111]">
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#333] group-hover:bg-[#e5e5e5] transition-colors duration-300"></div>
      <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-y-0 items-baseline">
        <div className="md:col-span-1 text-[10px] font-mono text-[#444] group-hover:text-[#666] transition-colors">/{id}</div>
        <div className="md:col-span-6">
          <h3 className="text-xl md:text-2xl font-light text-[#ccc] group-hover:text-white transition-colors tracking-tight mb-1">{title}</h3>
          <p className="text-xs text-[#555] font-mono uppercase tracking-wide group-hover:text-[#777] transition-colors">{subtitle}</p>
        </div>
        <div className="md:col-span-5 flex justify-start md:justify-end items-center gap-4">
           <span className="text-[10px] font-mono text-[#444] group-hover:text-[#666] transition-colors uppercase tracking-widest border border-[#222] px-2 py-1 rounded-[2px]">{tech}</span>
           <ArrowUpRight size={16} className="text-[#333] group-hover:text-white transition-colors transform group-hover:translate-x-1 duration-300" />
        </div>
      </div>
      <div className="max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500 ease-out px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 pt-6">
           <div className="md:col-span-6 md:col-start-2">
              <p className="text-xs text-[#777] font-light leading-relaxed">{desc}</p>
           </div>
        </div>
      </div>
    </Wrapper>
  );
};

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between py-3 border-b border-[#ffffff05] group hover:bg-[#ffffff02] transition-colors">
    <span className="text-xs font-mono text-[#555] uppercase tracking-wider group-hover:text-[#777]">{label}</span>
    <span className="text-xs font-mono text-[#777] text-right group-hover:text-[#aaa]">{value}</span>
  </div>
);

const SocialLink = ({ href, label, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-[#ccc] transition-colors flex items-center gap-2 group">
    <span className="w-1 h-1 bg-[#333] rounded-full group-hover:bg-white transition-colors"></span>
    <span className="flex items-center gap-2">{icon} {label}</span>
  </a>
);

export default Homepage;