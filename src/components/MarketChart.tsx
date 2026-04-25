import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { MarketData } from '../types';

interface MarketChartProps {
  data: MarketData[];
  title: string;
  color?: string;
}

export default function MarketChart({ data, title, color = "#00FF00" }: MarketChartProps) {
  return (
    <div className="w-full h-[300px] bg-[#141414] border border-[#222] rounded-xl p-6 relative overflow-hidden group">
      <div className="absolute top-6 left-6 z-10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-[#666] mb-1">{title}</h3>
        <p className="text-2xl font-bold font-mono tracking-tighter">
          ${data[data.length - 1]?.value.toLocaleString()}
        </p>
      </div>
      
      <div className="absolute inset-0 pt-20">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.1}/>
                <stop offset="95%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#222" />
            <XAxis 
              dataKey="time" 
              hide 
            />
            <YAxis 
              hide 
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px' }}
              itemStyle={{ color: color }}
              labelClassName="font-mono text-[10px] text-gray-500"
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1} 
              fill="url(#colorValue)" 
              strokeWidth={2}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
