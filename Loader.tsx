import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ShoppingBag, BrainCircuit } from "lucide-react";

const LOADER_TIPS = [
  "Analyzing ingredients & checking dietary restrictions...",
  "Securing best value budget options under your cap...",
  "Gemini is comparing benefits, price ranges, and ratings...",
  "Scanning retail catalogs for high-quality alternatives...",
  "Formulating smartest overall shopping strategy for you...",
  "Tailoring premium recommendations to fit your custom preferences..."
];

export default function Loader() {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % LOADER_TIPS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-2xl border border-slate-100">
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 rounded-full border-4 border-indigo-600/15 border-t-indigo-600"
        />

        {/* Middle reverse spinning ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-4 border-indigo-500/5 border-b-indigo-500"
        />

        {/* Center glowing element */}
        <div className="absolute inset-4 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-100">
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <BrainCircuit className="w-8 h-8 text-indigo-600" />
          </motion.div>
        </div>
      </div>

      <motion.h3 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-base font-bold text-slate-800 flex items-center gap-2 justify-center mb-2"
      >
        <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
        Consulting Gemini Recommendation Engine
      </motion.h3>

      <div className="h-6 overflow-hidden max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono text-slate-500"
          >
            {LOADER_TIPS[tipIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-slate-400">
        <ShoppingBag className="w-3.5 h-3.5" />
        Running real-time analysis
      </div>
    </div>
  );
}
