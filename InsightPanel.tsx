import { RecommendationInsights } from "../types";
import { Crown, Coins, Gem, HeartPulse, Sparkles } from "lucide-react";

interface InsightPanelProps {
  insights: RecommendationInsights;
}

export default function InsightPanel({ insights }: InsightPanelProps) {
  const { bestOverall, budgetFriendly, premium, healthiest } = insights;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">AI Spotlight Pick Insights</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Best Overall Choice block */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 border-l-4 border-indigo-500 shadow-sm flex flex-col justify-between relative">
          <div className="absolute top-4 right-4 text-indigo-500">
            <Crown className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Best Overall Choice
            </p>
            <h3 className="font-bold text-sm text-slate-800 truncate mt-1">
              {bestOverall?.productName || "Selected Product"}
            </h3>
            <p className="text-[11px] text-indigo-600 font-semibold mt-0.5">
              Balanced Excellence
            </p>
            <p className="text-xs text-slate-500 leading-relaxed italic mt-2">
              &ldquo;{bestOverall?.reason}&rdquo;
            </p>
          </div>
        </div>

        {/* Budget-Friendly Choice block */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 border-l-4 border-amber-500 shadow-sm flex flex-col justify-between relative">
          <div className="absolute top-4 right-4 text-amber-500">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Budget Option
            </p>
            <h3 className="font-bold text-sm text-slate-800 truncate mt-1">
              {budgetFriendly?.productName || "Value Match"}
            </h3>
            <p className="text-[11px] text-amber-600 font-semibold mt-0.5">
              {budgetFriendly?.priceRange || "Optimized Savings"}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed italic mt-2">
              &ldquo;{budgetFriendly?.reason}&rdquo;
            </p>
          </div>
        </div>

        {/* Premium Choice block */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 border-l-4 border-slate-900 shadow-sm flex flex-col justify-between relative">
          <div className="absolute top-4 right-4 text-slate-900">
            <Gem className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Premium Flagship Pick
            </p>
            <h3 className="font-bold text-sm text-slate-800 truncate mt-1">
              {premium?.productName || "Premium Standard"}
            </h3>
            <p className="text-[11px] text-slate-700 font-semibold mt-0.5">
              {premium?.priceRange || "Max Quality"}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed italic mt-2">
              &ldquo;{premium?.reason}&rdquo;
            </p>
          </div>
        </div>

        {/* Healthiest Choice block */}
        <div className="bg-white p-5 rounded-xl border border-slate-100 border-l-4 border-emerald-500 shadow-sm flex flex-col justify-between relative">
          <div className="absolute top-4 right-4 text-emerald-500">
            <HeartPulse className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
              Healthiest Option
            </p>
            <h3 className="font-bold text-sm text-slate-800 truncate mt-1">
              {healthiest?.productName || "Wellness Match"}
            </h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
              Zero-Noise Processed
            </p>
            <p className="text-xs text-slate-500 leading-relaxed italic mt-2">
              &ldquo;{healthiest?.reason || "Fulfills natural ingredient goals with lowest processed level."}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
