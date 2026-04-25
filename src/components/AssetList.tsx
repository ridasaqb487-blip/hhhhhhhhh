import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Asset } from '../types';
import { cn } from '../lib/utils';

interface AssetListProps {
  assets: Asset[];
}

export default function AssetList({ assets }: AssetListProps) {
  return (
    <div className="bg-black py-8">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Portfolio Assets</h3>
        <button className="text-[9px] uppercase tracking-widest font-black border-b border-white hover:opacity-50 transition-opacity">
          Archive / 04
        </button>
      </div>
      
      <div className="flex flex-col gap-1">
        {assets.map((asset) => (
          <div key={asset.id} className="grid grid-cols-4 items-center py-4 border-b border-white/5 hover:bg-white/5 px-2 transition-colors group cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-bold opacity-20 group-hover:opacity-100 transition-opacity">0{asset.id}</span>
              <h4 className="font-black text-lg tracking-tighter">{asset.symbol}</h4>
            </div>
            
            <div className="text-[10px] font-medium tracking-widest opacity-60">
              {asset.name}
            </div>

            <div className="text-right font-mono text-sm">
               {asset.balance.toLocaleString()}
            </div>
            
            <div className="text-right">
              <span className="font-black text-lg tracking-tighter tabular-nums text-white">
                ${(asset.price * asset.balance).toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
