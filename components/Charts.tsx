import React, { useEffect, useRef, useMemo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine, ScatterChart, Scatter, ZAxis, CartesianGrid, Legend } from 'recharts';

// --- UTILS ---
const useCanvasResize = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  useEffect(() => {
    const handleResize = () => {
      const cvs = canvasRef.current;
      if (cvs && cvs.parentElement) {
        const dpr = window.devicePixelRatio || 1;
        const rect = cvs.parentElement.getBoundingClientRect();
        cvs.width = rect.width * dpr;
        cvs.height = rect.height * dpr;
        const ctx = cvs.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
      }
    };
    window.addEventListener('resize', handleResize);
    setTimeout(handleResize, 100); 
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasRef]);
};

// --- COMPONENT 1: THE STADIUM GRID (Digital Twin v2 - Realistic Morphology) ---
export const StadiumGridMap: React.FC<{ 
  mode: 'hero' | 'master' | 'raw' | 'heatmap' | 'simulation' | 'wireframe';
  intensity?: number; 
}> = ({ mode, intensity = 0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  
  useCanvasResize(canvasRef);

  // Procedural City Generation
  // Instead of noise dots, we generate "Blocks" and "Roads"
  const cityData = useMemo(() => {
    const blocks: { x: number, y: number, w: number, h: number, type: 'building' | 'void', density: number, id: number }[] = [];
    
    // Grid settings
    const gridSize = 60; // 60x36 roughly matches aspect ratio
    const aspect = 1.8;
    const cols = gridSize;
    const rows = Math.floor(gridSize / aspect);
    
    // Road definitions (Xinjiekou Cross)
    const midX = Math.floor(cols / 2);
    const midY = Math.floor(rows / 2);
    const mainRoadWidth = 2;

    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            // 1. Define The Stadium Shape (Boundary)
            // A rounded rectangle: (x/a)^4 + (y/b)^4 < 1 is a squircle, but let's do pill shape
            // Normalize coords to -1 to 1
            const nx = (x / cols) * 2 - 1;
            const ny = (y / rows) * 2 - 1;
            
            // Stadium SDF logic (approximate)
            // d = length of box - radius
            const w = 0.6; // Width of the straight section
            const dx = Math.abs(nx) - w;
            const d = dx > 0 ? Math.sqrt(dx*dx + ny*ny) : Math.abs(ny);
            
            // If inside boundary
            // Tuning the shape to match the image: wide oval/pill
            const isInside = (Math.abs(nx) < 0.5 && Math.abs(ny) < 0.9) || 
                             (Math.sqrt(Math.pow(Math.abs(nx) - 0.5, 2) + Math.pow(ny*1.4, 2)) < 0.7);

            if (isInside) {
                // 2. Define Roads
                let isRoad = false;
                
                // Central Cross (Main Arteries)
                if (Math.abs(x - midX) < mainRoadWidth) isRoad = true;
                if (Math.abs(y - midY) < mainRoadWidth) isRoad = true;
                
                // Secondary Roads (Grid pattern)
                if ((x % 8 === 0) || (y % 8 === 0)) isRoad = true;

                // 3. Generate Block
                if (!isRoad) {
                    // Density noise
                    const noise = Math.sin(x * 0.2) * Math.cos(y * 0.2);
                    
                    // Randomly merge cells to form larger buildings? 
                    // For simplicity, we treat each cell as a potential building unit
                    blocks.push({
                        x, y, w: 1, h: 1,
                        type: 'building',
                        density: Math.abs(noise),
                        id: x * 1000 + y
                    });
                }
            }
        }
    }
    return { cols, rows, blocks };
  }, []);

  const animate = (time: number) => {
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;
    
    const width = cvs.width / (window.devicePixelRatio || 1);
    const height = cvs.height / (window.devicePixelRatio || 1);

    render(ctx, width, height, time);
    
    if (mode === 'master' || mode === 'simulation') {
        requestRef.current = requestAnimationFrame(animate);
    }
  };

  const render = (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height);
    
    const padding = 20;
    const availW = width - padding * 2;
    const availH = height - padding * 2;
    
    // Fit grid to container
    const cellW = availW / cityData.cols;
    const cellH = availH / cityData.rows;
    // Maintain square cells? No, let them stretch slightly to fit stadium
    const cellSize = Math.min(cellW, cellH);
    
    const offsetX = (width - (cellSize * cityData.cols)) / 2;
    const offsetY = (height - (cellSize * cityData.rows)) / 2;

    // Draw Boundary Stroke (The Blue Line in original map)
    if (mode === 'master') {
         // We can't easily stroke the procedural pixels, so we simulate it with a large rounded rect or just let the blocks define it.
         // Let's stick to the blocks defining the shape to be "honest" to the data.
    }

    // Draw Blocks
    cityData.blocks.forEach(block => {
        const x = offsetX + block.x * cellSize;
        const y = offsetY + block.y * cellSize;
        // Gap for streets
        const gap = 1.0; 
        const w = cellSize - gap;
        const h = cellSize - gap;

        if (w < 0 || h < 0) return;

        let color = '#e5e5ea';
        let alpha = 1.0;

        if (mode === 'master') {
            // "Blueprint" Style
            if (block.density > 0.6) {
                color = '#1d1d1f'; // High density core
            } else if (block.density > 0.3) {
                color = '#86868b'; // Medium density
            } else {
                color = '#d1d1d6'; // Low density
            }
            
            // Activity Pulse (Flows)
            // Simulate traffic or activity moving along the "Central Cross"
            const distFromCenter = Math.sqrt(Math.pow(block.x - cityData.cols/2, 2) + Math.pow(block.y - cityData.rows/2, 2));
            const pulse = Math.sin(time * 0.003 - distFromCenter * 0.2);
            
            if (pulse > 0.8 && Math.random() > 0.7) {
                 color = '#0071e3'; // Apple Blue
            }

        } else if (mode === 'simulation') {
            // Stress Test Visualization
            const centerDist = Math.sqrt(Math.pow(block.x - cityData.cols/2, 2) + Math.pow(block.y - cityData.rows/2, 2));
            const maxDist = cityData.cols / 2;
            const normDist = centerDist / maxDist;
            
            if (normDist < 0.3) {
                // Core
                const coreHeat = 0.2 + (intensity * 0.8);
                color = `rgba(215, 78, 70, ${coreHeat})`; // Red heat
            } else {
                // Periphery (Drain)
                const drain = 1 - (intensity * 0.6);
                color = `rgba(142, 142, 147, ${drain})`;
            }

        } else if (mode === 'wireframe') {
            color = '#1d1d1f';
            alpha = 0.05;
        }

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fillRect(x, y, w, h);
    });
  };

  useEffect(() => {
    if (mode === 'master' || mode === 'simulation') {
        requestRef.current = requestAnimationFrame(animate);
    } else {
        const cvs = canvasRef.current;
        if (cvs) {
            const ctx = cvs.getContext('2d');
            const width = cvs.width / (window.devicePixelRatio || 1);
            const height = cvs.height / (window.devicePixelRatio || 1);
            if(ctx) render(ctx, width, height, 0);
        }
    }
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mode, intensity, cityData]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
};


// --- COMPONENT 2: COEFFICIENT CHART (Impact Balance Sheet) ---
const data = [
  { name: 'Floor Area Ratio', direct: 0.298, spillover: -0.145, label: 'Built Density (FAR)' },
  { name: 'Functional Div', direct: 0.162, spillover: 0.110, label: 'Functional Mix' },
  { name: 'Network Int', direct: 0.455, spillover: 0.850, label: 'Network Integration' },
];

export const CoefficientChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        barSize={28}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e5e5e5" />
        <XAxis type="number" hide domain={[-0.5, 1.0]} />
        <YAxis type="category" dataKey="label" width={140} tick={{fontSize: 12, fill: '#1d1d1f', fontWeight: 500, fontFamily: 'Inter'}} axisLine={false} tickLine={false} />
        <Tooltip
            cursor={{fill: 'transparent'}}
            content={({ active, payload }) => {
                if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                        <div className="bg-white/95 border border-black/5 shadow-xl p-4 rounded-xl text-xs backdrop-blur font-sans">
                            <div className="font-semibold text-base mb-2">{d.label}</div>
                            <div className="space-y-2">
                                <div className="flex justify-between gap-8">
                                    <span className="text-gray-500">Private Gain</span>
                                    <span className="font-mono font-medium text-[#1d1d1f]">+{d.direct}</span>
                                </div>
                                <div className="flex justify-between gap-8">
                                    <span className="text-gray-500">Public Effect</span>
                                    <span className={`font-mono font-medium ${d.spillover < 0 ? 'text-[#d74e46]' : 'text-[#0071e3]'}`}>
                                        {d.spillover > 0 ? '+' : ''}{d.spillover}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                }
                return null;
            }}
        />
        <ReferenceLine x={0} stroke="#1d1d1f" strokeOpacity={0.2} />
        
        <Bar dataKey="direct" fill="#1d1d1f" radius={[0, 4, 4, 0]} name="Direct Effect" stackId="a" />
        <Bar dataKey="spillover" fill="#86868b" radius={[4, 4, 4, 4]} name="Spillover Effect">
            {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.spillover < 0 ? '#d74e46' : '#0071e3'} />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};


// --- COMPONENT 3: POLICY SCATTER ---
export const PolicyScatter: React.FC = () => {
    const data = useMemo(() => {
        const points = [];
        for(let i=0; i<412; i++) {
            const density = Math.random() * 100;
            const integration = (Math.random() * 60) + (density * 0.4) + (Math.random() * 20 - 10);
            let zone = 'Neutral';
            let color = '#d1d1d6';
            
            if (density > 60 && integration < 40) {
                zone = 'Siphon Risk';
                color = '#d74e46'; 
            } else if (density > 60 && integration > 60) {
                zone = 'Sustainable';
                color = '#34c759'; 
            } else if (integration > 70) {
                zone = 'Network Hub';
                color = '#0071e3';
            }
            points.push({ x: density, y: integration, color, zone });
        }
        return points;
    }, []);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f7" />
                <XAxis type="number" dataKey="x" name="FAR" tick={{fontSize: 10, fontFamily: 'Inter'}} axisLine={false} tickLine={false} />
                <YAxis type="number" dataKey="y" name="Integration" tick={{fontSize: 10, fontFamily: 'Inter'}} axisLine={false} tickLine={false} />
                <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            const d = payload[0].payload;
                            return (
                                <div className="bg-white/90 backdrop-blur border border-black/10 p-2 rounded text-[10px] shadow-sm font-sans">
                                    <div style={{color: d.color}} className="font-bold">{d.zone}</div>
                                </div>
                            );
                        }
                        return null;
                    }}
                />
                <Scatter name="Grids" data={data}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Scatter>
            </ScatterChart>
        </ResponsiveContainer>
    );
};