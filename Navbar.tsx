import { Sparkles, ShoppingBag, Terminal } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-sm text-white">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans text-lg font-bold tracking-tight text-slate-900">
                AIAssist <span className="text-indigo-600">Retail</span>
              </span>
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold font-mono text-indigo-600 border border-indigo-100">
                v2.0.4
              </span>
            </div>
            <p className="hidden sm:block text-[11px] text-slate-500 font-mono">
              AI-Powered Shopping Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 border border-slate-200 text-xs text-slate-600 font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Gemini Pro Active</span>
          </div>
          
          <div className="hidden md:flex flex-col text-right text-xs border-l border-slate-200 pl-4 font-sans">
            <span className="font-semibold text-slate-700">Internship Project</span>
            <span className="text-[10px] text-slate-400 font-mono">Retail AI Solution</span>
          </div>
        </div>
      </div>
    </header>
  );
}
