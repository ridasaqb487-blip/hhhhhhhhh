/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  BarChart3, 
  Settings, 
  Bell, 
  User, 
  Search,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import MarketChart from './components/MarketChart';
import AssetList from './components/AssetList';
import AIPanel from './components/AIPanel';
import { Asset, MarketData } from './types';
import { cn } from './lib/utils';
import { motion } from 'motion/react';

// Mock Data Generators
const generateMarketData = (base: number, volatility: number = 0.05): MarketData[] => {
  const data: MarketData[] = [];
  let current = base;
  for (let i = 0; i < 20; i++) {
    const change = current * (Math.random() * volatility * 2 - volatility);
    current += change;
    data.push({ time: `${i}:00`, value: Math.round(current * 100) / 100 });
  }
  return data;
};

const INITIAL_ASSETS: Asset[] = [
  { id: '1', name: 'ABBC Coin', symbol: 'ABBC', balance: 45000, price: 0.0824, change24h: 5.2, color: '#00FF00' },
  { id: '2', name: 'Bitcoin', symbol: 'BTC', balance: 0.42, price: 68500, change24h: -1.4, color: '#F7931A' },
  { id: '3', name: 'Ethereum', symbol: 'ETH', balance: 12.5, price: 3450, change24h: 2.1, color: '#627EEA' },
  { id: '4', name: 'Solana', symbol: 'SOL', balance: 85, price: 142, change24h: 8.7, color: '#14F195' },
];

export default function App() {
  const [marketData, setMarketData] = useState<MarketData[]>(generateMarketData(1.24));
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData(prev => {
        const last = prev[prev.length - 1];
        const next = last.value + (last.value * (Math.random() * 0.02 - 0.01));
        return [...prev.slice(1), { time: 'Now', value: Math.round(next * 100) / 100 }];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const totalBalance = INITIAL_ASSETS.reduce((acc, curr) => acc + (curr.price * curr.balance), 0);

  return (
    <div className="min-h-screen bg-black text-white p-12 flex flex-col font-sans overflow-x-hidden selection:bg-white selection:text-black">
      {/* Background Decals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-[0.03] select-none">
        <div className="absolute top-0 right-0 text-[600px] font-black tracking-tighter leading-none -mr-20 -mt-20">A</div>
        <div className="absolute bottom-0 left-0 text-[600px] font-black tracking-tighter leading-none -ml-20 -mb-20 text-outline">B</div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-end border-b border-white/20 pb-8 mb-16">
        <div>
          <h2 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-50 mb-1">Portfolio & Infrastructure</h2>
          <h1 className="text-4xl font-black tracking-tighter leading-none">ABBC™</h1>
        </div>
        <div className="hidden md:flex gap-12 text-[10px] uppercase tracking-[0.3em] font-black">
          <button onClick={() => setActiveTab('dashboard')} className={cn("hover:opacity-100 transition-opacity", activeTab === 'dashboard' ? "opacity-100" : "opacity-30")}>Nodes</button>
          <button onClick={() => setActiveTab('portfolio')} className={cn("hover:opacity-100 transition-opacity", activeTab === 'portfolio' ? "opacity-100" : "opacity-30")}>Liquidity</button>
          <button onClick={() => setActiveTab('market')} className={cn("hover:opacity-100 transition-opacity", activeTab === 'market' ? "opacity-100" : "opacity-30")}>Market</button>
          <button className="opacity-30 hover:opacity-100 transition-opacity">Archive</button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Stats and Chart */}
        <div className="lg:col-span-8">
          <div className="mb-20">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">Primary Node Balance</span>
              <span className="text-xs font-bold leading-none py-1 px-2 border border-emerald-500 text-emerald-500">ACTIVE PHASE 04</span>
            </div>
            <div className="flex items-baseline gap-6">
              <h1 className="text-[120px] font-black tracking-[-0.05em] leading-[0.8] tabular-nums">
                ${Math.floor(totalBalance / 1000)}k
              </h1>
              <div className="flex flex-col">
                <span className="text-3xl font-black tracking-tighter">.{(totalBalance % 1000).toFixed(0).padStart(3, '0')}</span>
                <span className="text-[10px] font-bold text-emerald-500 tracking-ultra mt-2">▲ +4.2%</span>
              </div>
            </div>
          </div>

          <MarketChart data={marketData} title="System Wide Trading Volume" />
          
          <AssetList assets={INITIAL_ASSETS} />
        </div>

        {/* Right Column: AI and Stats */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          <div className="bg-white text-black p-10 border-[12px] border-black h-fit shadow-[20px_20px_0px_#222]">
            <p className="text-[11px] font-black uppercase tracking-[0.3em] mb-6 border-b border-black/10 pb-4 flex justify-between">
              <span>Mission Intent</span>
              <span className="font-normal opacity-50">001-A</span>
            </p>
            <p className="text-2xl leading-tight font-black tracking-tight mb-8">
              Decentralized infrastructure for the next generation of digital urban environments.
            </p>
            <button className="w-full bg-black text-white py-4 font-black text-xs tracking-widest hover:bg-zinc-800 transition-colors uppercase">
              Establish Peer Sync
            </button>
          </div>

          <AIPanel />

          <div className="grid grid-cols-1 gap-4 pt-12 border-t border-white/10">
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-[10px] tracking-widest opacity-40">Active Nodes</span>
              <span className="text-xl font-black">4,821</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-[10px] tracking-widest opacity-40">Network TPS</span>
              <span className="text-xl font-black">1,240</span>
            </div>
            <div className="flex justify-between items-end border-b border-white/5 pb-4">
              <span className="text-[10px] tracking-widest opacity-40">Staked Yield</span>
              <span className="text-xl font-black text-emerald-500">12.4%</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-16 pt-12 mt-20 border-t border-white/20 items-end">
        <div className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-ultra opacity-40">Operational Zone</span>
          <span className="text-sm font-black uppercase tracking-tight">Copenhagen / Ørestad South</span>
          <span className="text-[10px] font-mono opacity-60">55.61° N, 12.57° E</span>
        </div>
        
        <div className="flex flex-col gap-2">
          <span className="text-[9px] uppercase tracking-ultra opacity-40">Current Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500"></div>
            <span className="text-sm font-black uppercase tracking-tight">Active Foundation</span>
          </div>
          <span className="text-[10px] opacity-40 italic font-serif">Concrete Metadata & Protocol</span>
        </div>

        <div className="flex flex-col items-end gap-6">
          <div className="flex gap-1">
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-[10px] opacity-30 font-black">01</div>
            <div className="w-12 h-12 border border-white/20 flex items-center justify-center text-[10px] opacity-30 font-black">02</div>
            <div className="w-12 h-12 border border-white flex items-center justify-center text-[10px] font-black">03</div>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-black">EST. 2026 © SYSTEM ABBC</span>
        </div>
      </footer>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
        active 
          ? "bg-[#00FF00]/10 text-[#00FF00] border border-[#00FF00]/20" 
          : "text-gray-500 hover:bg-[#111] hover:text-white"
      )}
    >
      <span className={cn(active ? "text-[#00FF00]" : "text-gray-500 group-hover:text-white")}>
        {icon}
      </span>
      {label}
    </button>
  );
}

function StatCard({ label, value, change }: { label: string, value: string, change: number }) {
  return (
    <div className="bg-[#141414] border border-[#222] rounded-xl p-4 hover:border-[#333] transition-colors">
      <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-lg font-bold font-mono tracking-tight">{value}</p>
      <p className={cn("text-[9px] font-mono", change >= 0 ? "text-green-500" : "text-red-500")}>
        {change >= 0 ? '+' : ''}{change}%
      </p>
    </div>
  );
}

function LogItem({ time, msg, status }: { time: string, msg: string, status: 'success' | 'pending' | 'failed' }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-[10px] font-mono text-gray-600 mt-1">{time}</span>
      <div className="flex-1">
        <p className="text-xs text-gray-300 font-mono tracking-tight">{msg}</p>
        <div className="flex items-center gap-2 mt-1">
          <div className={cn(
            "w-1.5 h-1.5 rounded-full",
            status === 'success' ? "bg-[#00FF00]" : "bg-yellow-500 animate-pulse"
          )}></div>
          <span className="text-[9px] font-mono text-gray-600 uppercase">{status}</span>
        </div>
      </div>
    </div>
  );
}
