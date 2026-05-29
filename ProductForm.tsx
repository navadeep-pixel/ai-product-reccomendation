import React, { useState } from "react";
import { RecommendationFormInputs } from "../types";
import { Sparkles, DollarSign, Tag, Heart, Info, ArrowRight, RefreshCw, Layers } from "lucide-react";
import { motion } from "motion/react";

interface ProductFormProps {
  onSubmit: (inputs: RecommendationFormInputs) => void;
  isLoading: boolean;
}

const INITIAL_STATE: RecommendationFormInputs = {
  purpose: "",
  budget: "",
  category: "",
  preferences: "",
  dietary: "",
  additional: "",
};

// Preset scenarios matching user instructions
const PRESETS = [
  {
    label: "🍿 Healthy Travel Snacks",
    icon: "🎒",
    inputs: {
      purpose: "Travel snacks suitable for long train or flight journeys",
      budget: "Under ₹500",
      category: "Snacks & Munchies",
      preferences: "Roasted instead of fried, low calorie, dry",
      dietary: "Vegetarian",
      additional: "Long shelf life, individual vacuum packaging",
    },
  },
  {
    label: "🍚 Curd Rice Sides",
    icon: "🌶️",
    inputs: {
      purpose: "Traditional accompaniments/sides suitable for eating with curd rice",
      budget: "Under ₹300",
      category: "Groceries & Condiments",
      preferences: "Tangy, spicy, and crunchy textures",
      dietary: "Gluten-Free, Vegetarian",
      additional: "Authentic homemade style pickles, papads, or roasted cluster beans (mor milagai)",
    },
  },
  {
    label: "🏃‍♂️ High-Protein Fitness",
    icon: "💪",
    inputs: {
      purpose: "Pre/post workout muscle recovery snacks",
      budget: "Under ₹1500",
      category: "Health Foods",
      preferences: "Protein-dense, high fiber, minimal added sugar",
      dietary: "Dairy-Free, Eggless",
      additional: "Ready to eat directly, easy digestion",
    },
  },
  {
    label: "🍱 Kids Lunch Box",
    icon: "👦",
    inputs: {
      purpose: "Healthy and delicious finger foods for kids' mid-day school break",
      budget: "Under ₹800",
      category: "Groceries & Packaged Foods",
      preferences: "Mild flavors, fun colors, non-messy",
      dietary: "Nut-Free to comply with school policy",
      additional: "Comes in small convenient serving portions, visually attractive",
    },
  },
  {
    label: "💻 Healthy Office Snacking",
    icon: "💼",
    inputs: {
      purpose: "Munchies for the office desk drawer to combat 4 PM cravings",
      budget: "Under ₹1000",
      category: "Beverages & Healthy Snacks",
      preferences: "Baked, trail mixes, dried superfoods",
      dietary: "Vegan",
      additional: "Quiet to chew, no strong smells, fits in a small drawer",
    },
  },
];

export default function ProductForm({ onSubmit, isLoading }: ProductFormProps) {
  const [inputs, setInputs] = useState<RecommendationFormInputs>(INITIAL_STATE);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    if (name === "purpose" && value.trim()) {
      setErrorStatus(null);
    }
  };

  const handleApplyPreset = (presetInputs: RecommendationFormInputs) => {
    setInputs(presetInputs);
    setErrorStatus(null);
  };

  const handleClear = () => {
    setInputs(INITIAL_STATE);
    setErrorStatus(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.purpose.trim()) {
      setErrorStatus("Primary purpose or use case is required to generate tailored recommendations.");
      return;
    }
    onSubmit(inputs);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Layers className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">Configure Your Request</h2>
        </div>
        <p className="text-xs text-slate-500">
          Tell Gemini what you're looking for, or click an internship demo preset scenario below to auto-fill the parameters.
        </p>
      </div>

      {/* Preset Quick Actions */}
      <div className="mb-8">
        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 font-mono">
          Quick-Fill Demos (Try these inputs)
        </label>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleApplyPreset(preset.inputs)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 border border-slate-200 hover:border-indigo-100 transition duration-150 cursor-pointer text-slate-700"
            >
              <span>{preset.icon}</span>
              <span>{preset.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Purpose (Required) */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
            What do you need products for? <span className="text-indigo-600 font-bold">*</span>
          </label>
          <div className="relative">
            <textarea
              name="purpose"
              value={inputs.purpose}
              onChange={handleChange}
              rows={3}
              placeholder="e.g., Healthy travel snacks for long flights / Tangy sides for Curd Rice / Gym fitness fuel"
              className={`w-full px-4 py-3 bg-slate-50/50 rounded-xl text-sm text-slate-900 placeholder-slate-400 border focus:outline-none focus:ring-2 transition-all duration-200 ${
                errorStatus
                  ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                  : "border-slate-200 focus:ring-indigo-100 focus:border-indigo-500"
              }`}
            />
          </div>
          {errorStatus ? (
            <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
              {errorStatus}
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-400 font-mono">
              Describe your objective, situation, or main goals in detail.
            </p>
          )}
        </div>

        {/* Budget & Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              Budget Target (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <DollarSign className="w-4 h-4 text-indigo-500" />
              </div>
              <input
                type="text"
                name="budget"
                value={inputs.budget}
                onChange={handleChange}
                placeholder="e.g., Under ₹500, Below $40"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 rounded-xl text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              General Category (optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Tag className="w-4 h-4 text-indigo-500" />
              </div>
              <input
                type="text"
                name="category"
                value={inputs.category}
                onChange={handleChange}
                placeholder="e.g., Snacks, Groceries, Fitness"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 rounded-xl text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Preferences & Dietary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              Specific Preferences
            </label>
            <input
              type="text"
              name="preferences"
              value={inputs.preferences}
              onChange={handleChange}
              placeholder="e.g., baked, low sugar, organic, tangy"
              className="w-full px-4 py-2.5 bg-slate-50/50 rounded-xl text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              Dietary Restrictions
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Heart className="w-4 h-4 text-indigo-500" />
              </div>
              <input
                type="text"
                name="dietary"
                value={inputs.dietary}
                onChange={handleChange}
                placeholder="e.g., Vegetarian, Vegan, Nut-Free"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-50/50 rounded-xl text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Additional Requirements */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
            Additional Requirements or Context
          </label>
          <textarea
            name="additional"
            value={inputs.additional}
            onChange={handleChange}
            rows={2}
            placeholder="e.g., Individually wrapped, easy to store on office shelf, non-spillable caps"
            className="w-full px-4 py-2.5 bg-slate-50/50 rounded-xl text-sm text-slate-900 placeholder-slate-400 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-200"
          />
        </div>

        {/* Action Button Strip */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition duration-150 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Form
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md hover:shadow-lg shadow-indigo-100 active:scale-[0.98] transition-all disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Analyze with Gemini AI
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
