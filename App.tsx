import React, { useState } from 'react';
import { GlassCard, Typography, PrecisionDial, MetricBox } from './components/UI';
import { StadiumGridMap, CoefficientChart, PolicyScatter } from './components/Charts';
import { ArrowDown, Github, FileText } from 'lucide-react';

const Page: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <section className={`h-screen w-full snap-start snap-always shrink-0 flex flex-col relative overflow-hidden px-6 py-8 md:p-12 lg:p-16 ${className}`}>
    <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
    <div className="max-w-[1400px] w-full mx-auto h-full flex flex-col relative z-10">
        {children}
    </div>
  </section>
);

const App: React.FC = () => {
  const [farValue, setFarValue] = useState(0.69);
  
  // Simulation Math
  const intensity = (farValue - 0.69) / (4.0 - 0.69); 
  const localGain = (intensity * 168).toFixed(0);
  const neighborLoss = (intensity * 13.5).toFixed(1);

  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#1d1d1f] selection:text-white scroll-smooth font-sans">
      
      {/* 01. HERO: Scale. Network. Function. */}
      <Page className="bg-[#f5f5f7]">
         <div className="flex-1 flex flex-col justify-center items-center text-center z-10 space-y-12">
            <div>
               <Typography.Display className="max-w-5xl tracking-tighter mt-6">
                 Scale. Network. Function.
               </Typography.Display>
               <Typography.Body className="max-w-2xl mx-auto text-[#86868b] font-light mt-8">
                 A causal identification of urban vitality simulation in the Xinjiekou district.
               </Typography.Body>
            </div>
         </div>
         
         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#1d1d1f]/20">
            <ArrowDown size={24} />
         </div>
      </Page>

      {/* 02. ABSTRACTION: The Real Digital Twin */}
      <Page className="bg-white">
        <div className="flex flex-col h-full gap-8">
            <div className="flex-none grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-6">
                    <Typography.Label className="text-[#1d1d1f]">01 — Abstraction</Typography.Label>
                    <Typography.Heading className="mt-4">The Digital Twin.</Typography.Heading>
                </div>
                <div className="lg:col-span-6 lg:text-right">
                    <Typography.Body className="text-sm md:text-base">
                        Constructing a 50m×50m mesh to capture the invisible flows. <br className="hidden lg:block"/>412 sensors tracking morphological DNA across the Xinjiekou district.
                    </Typography.Body>
                </div>
            </div>
            
            <div className="flex-1 w-full h-full min-h-0 relative">
                <GlassCard depth="deep" className="w-full h-full p-4 md:p-8 bg-[#f5f5f7]/80 border-0">
                    <StadiumGridMap mode="master" />
                    
                    {/* Architectural Legend */}
                    <div className="absolute bottom-6 left-6 flex flex-col gap-2 pointer-events-none">
                         <div className="text-[10px] uppercase tracking-widest font-bold text-[#1d1d1f] mb-1">Morphology</div>
                         <div className="flex gap-6 text-[10px] uppercase tracking-wider font-medium text-[#86868b]">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#1d1d1f]"></div>
                                <span>High Density</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#86868b]"></div>
                                <span>Medium</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#0071e3]"></div>
                                <span>Vitality Flow</span>
                            </div>
                        </div>
                    </div>
                </GlassCard>
            </div>
        </div>
      </Page>

      {/* 03. THE MODEL */}
      <Page className="bg-[#f5f5f7]">
        <div className="flex flex-col h-full justify-center">
            <Typography.Label className="mb-12 text-center w-full block">02 — The Methodology</Typography.Label>
            <div className="w-full max-w-5xl mx-auto relative">
                <GlassCard className="p-12 md:p-24 flex flex-col items-center justify-center bg-white shadow-xl">
                    <div className="flex flex-wrap justify-center items-baseline gap-4 md:gap-8 font-light text-3xl md:text-6xl text-[#1d1d1f]">
                        <span className="font-serif italic">y</span>
                        <span className="text-[#86868b] font-thin">=</span>
                        <div className="flex flex-col items-center group cursor-default">
                            <span className="text-[#0071e3] transition-all group-hover:scale-110">ρWy</span>
                            <span className="text-[10px] mt-2 uppercase tracking-widest text-[#0071e3] font-bold opacity-60">Feedback</span>
                        </div>
                        <span className="text-[#86868b] font-thin">+</span>
                        <span>Xβ</span>
                        <span className="text-[#86868b] font-thin">+</span>
                        <div className="flex flex-col items-center group cursor-default">
                             <span className="text-[#d74e46] transition-all group-hover:scale-110">WXθ</span>
                             <span className="text-[10px] mt-2 uppercase tracking-widest text-[#d74e46] font-bold opacity-60">Spillover</span>
                        </div>
                        <span className="text-[#86868b] font-thin">+</span>
                        <span className="text-[#86868b]">ε</span>
                    </div>
                    <div className="mt-16 text-center max-w-2xl mx-auto">
                        <p className="text-[#424245] leading-relaxed">
                            The <span className="font-semibold text-[#1d1d1f]">Spatial Durbin Model (SDM)</span> allows us to mathematically separate a building's internal success from its impact on the neighborhood.
                        </p>
                    </div>
                </GlassCard>
            </div>
        </div>
      </Page>

      {/* 04. RESULTS */}
      <Page className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-12 lg:gap-24 items-center">
             <div className="order-1 flex flex-col justify-center space-y-8">
                <Typography.Label className="text-[#d74e46]">03 — Findings</Typography.Label>
                <Typography.Heading>
                    The Siphon Effect.
                </Typography.Heading>
                <Typography.Body>
                    Contrary to traditional planning theory, density is not a universal good. 
                    <br/><br/>
                    Our coefficients reveal that <span className="font-semibold text-[#1d1d1f]">FAR (Floor Area Ratio)</span> has a parasitic relationship with neighbors (-0.145), while <span className="font-semibold text-[#1d1d1f]">Network Integration</span> acts as a multiplier (+0.850).
                </Typography.Body>
             </div>
             <div className="order-2 h-[400px] lg:h-[500px] w-full">
                <GlassCard className="w-full h-full p-6 md:p-12 border border-[#e5e5e5]">
                   <div className="flex justify-between items-center mb-6">
                       <span className="text-xs font-bold uppercase tracking-widest text-[#86868b]">Impact Balance Sheet</span>
                   </div>
                   <div className="w-full h-full">
                     <CoefficientChart />
                   </div>
                </GlassCard>
             </div>
        </div>
      </Page>

      {/* 05. SIMULATION */}
      <Page className="bg-[#1d1d1f]">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full gap-8">
            <div className="col-span-1 lg:col-span-8 relative order-2 lg:order-1 h-[50vh] lg:h-full">
                <div className="w-full h-full flex items-center justify-center">
                    <StadiumGridMap mode="simulation" intensity={intensity} />
                </div>
                <div className="absolute bottom-8 left-8 text-white/20 text-xs font-mono">
                    REAL-TIME RENDERING // GRID 380
                </div>
            </div>
            <div className="col-span-1 lg:col-span-4 flex flex-col justify-center space-y-12 order-1 lg:order-2 z-20">
                <div className="space-y-2">
                    <Typography.Label className="text-white/50">04 — Stress Test</Typography.Label>
                    <Typography.Heading className="text-white text-3xl">Visualizing the<br/>Void.</Typography.Heading>
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] space-y-10">
                    <PrecisionDial 
                        label="Floor Area Ratio (Density)" 
                        value={farValue} 
                        min={0.69} 
                        max={4.00} 
                        onChange={setFarValue} 
                    />
                    <div className="space-y-4">
                        <div className="flex justify-between items-end pb-4 border-b border-white/10">
                            <span className="text-sm text-white/40">Subject Vitality</span>
                            <span className="text-2xl font-light text-[#34c759] tracking-tight">+{localGain}%</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm text-white/40">Neighbor Vitality</span>
                            <span className="text-2xl font-light text-[#d74e46] tracking-tight">-{neighborLoss}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </Page>

      {/* 06. POLICY */}
      <Page className="bg-[#f5f5f7]">
         <div className="flex flex-col h-full max-w-5xl mx-auto w-full">
            <div className="flex-none mb-8 text-center">
                 <Typography.Label>05 — Policy Verdict</Typography.Label>
                 <Typography.Heading className="mt-4">Conditional Zoning.</Typography.Heading>
            </div>
            <div className="flex-1 w-full relative">
                <GlassCard className="w-full h-full p-4 md:p-8 bg-white">
                    <PolicyScatter />
                </GlassCard>
            </div>
            <div className="flex-none mt-8 text-center max-w-2xl mx-auto">
                 <Typography.Body className="text-sm md:text-base">
                     <span className="font-semibold text-[#d74e46]">Red Zone:</span> High density without integration creates dead zones.<br/>
                     <span className="font-semibold text-[#34c759]">Green Zone:</span> High density is only permitted when matched by high network integration.
                 </Typography.Body>
            </div>
         </div>
      </Page>

      {/* 07. CREDITS (Unified Font Architecture) */}
      <Page className="bg-[#f5f5f7]">
         <div className="absolute inset-0 pointer-events-none opacity-20">
             <StadiumGridMap mode="wireframe" />
         </div>

         <div className="relative z-10 flex flex-col justify-center h-full max-w-6xl mx-auto w-full">
            <Typography.Display className="text-[#1d1d1f] mb-24">Credits</Typography.Display>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                {/* Column 1: About */}
                <div className="space-y-6">
                    <h3 className="text-[#1d1d1f] font-sans font-medium text-lg mb-4">About</h3>
                    <p className="text-[#86868b] font-light leading-relaxed text-sm">
                        This interactive prototype presents a novel methodology for diagnosing urban vitality flows. By fusing quantitative survey data and geospatial information into a unified analytical framework.
                    </p>
                </div>

                {/* Column 2: People */}
                <div className="space-y-6">
                    <h3 className="text-[#1d1d1f] font-sans font-medium text-lg mb-4">People</h3>
                    <div className="space-y-4 text-sm border-l-2 border-[#1d1d1f] pl-4">
                        <div>
                            <p className="text-[#1d1d1f] font-medium text-base">Zijian Qiu</p>
                            <p className="text-[#86868b] text-xs mt-1">Principal Investigator</p>
                        </div>
                        <div className="pt-2">
                            <p className="text-[#1d1d1f] font-medium text-base">Bing Qv</p>
                            <p className="text-[#86868b] text-xs mt-1">Advisor</p>
                        </div>
                        <div className="pt-4 mt-4 border-t border-[#e5e5e5]">
                            <p className="text-[#1d1d1f] opacity-80">Nanjing Forestry University</p>
                        </div>
                    </div>
                </div>

                {/* Column 3: Pubs */}
                <div className="space-y-6">
                    <h3 className="text-[#1d1d1f] font-sans font-medium text-lg mb-4">Publication & Code</h3>
                    <div className="space-y-6 text-sm">
                        <div className="group cursor-pointer">
                            <div className="flex items-center gap-2 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                                <FileText size={16} />
                                <span className="font-medium">Full Research Report [PDF]</span>
                            </div>
                            <p className="text-[#86868b] mt-1 text-xs">
                                A detailed academic paper outlining the research methodology.
                            </p>
                        </div>
                        <div className="group cursor-pointer">
                            <div className="flex items-center gap-2 text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                                <Github size={16} />
                                <span className="font-medium">Project Repository [GitHub]</span>
                            </div>
                            <p className="text-[#86868b] mt-1 text-xs">
                                Access the complete source code for this interactive prototype.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
         </div>
      </Page>

    </div>
  );
};

export default App;