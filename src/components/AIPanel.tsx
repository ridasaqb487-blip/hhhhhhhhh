import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function AIPanel() {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  async function generateInsight() {
    setLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "You are the ABBC AI market analyst. Provide a short, pithy, and technical brief (2-3 sentences) on the current sentiment of the crypto market, specifically mentioning the ABBC ecosystem. Use a sophisticated and data-driven tone.",
      });
      setInsight(response.text || 'Unable to generate market insight at this time.');
    } catch (error) {
      console.error(error);
      setInsight('AI Analysis offline. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    generateInsight();
  }, []);

  return (
    <div className="bg-black border border-white/20 p-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-white"></div>
          <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase opacity-40">AI Market Thesis</h3>
        </div>
        <button 
          onClick={generateInsight}
          disabled={loading}
          className="text-[9px] border-b border-white/40 font-bold uppercase tracking-widest hover:opacity-50 transition-opacity"
        >
          {loading ? "Decrypting..." : "Sync AI"}
        </button>
      </div>

      <div className="min-h-[100px] flex items-center">
        {loading ? (
          <div className="w-full h-1 bg-white/5 overflow-hidden">
            <div className="w-1/2 h-full bg-white animate-[shimmer_2s_infinite_linear]"></div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.p 
              key={insight}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl text-white leading-tight font-black tracking-tight"
            >
              "{insight}"
            </motion.p>
          </AnimatePresence>
        )}
      </div>
      
      <div className="mt-8 flex gap-4">
        <span className="text-[9px] font-bold tracking-widest px-2 py-1 bg-white text-black">MARKET_BULLISH</span>
        <span className="text-[9px] font-bold tracking-widest px-2 py-1 border border-white/20 opacity-40">TX_MONITOR_ACTIVE</span>
      </div>
    </div>
  );
}

// Utility function copied here as well to avoid cross-import complexities if not needed, 
// but using it from utils.ts is better. I'll just import it.
import { cn } from '../lib/utils';
