import React from "react";
import { Product } from "../types";
import { Star, Tag, CheckCircle, ArrowRightLeft } from "lucide-react";

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative bg-white border border-slate-100 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full rounded-2xl p-5 overflow-hidden">
      <div>
        {/* Category & Score Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            {product.category || "General"}
          </span>

          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded text-yellow-700 text-[11px] font-bold">
            <Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-slate-800 group-hover:text-slate-950 mb-2 leading-tight transition-colors duration-200">
          {product.productName}
        </h3>

        {/* AI Description/Reasoning */}
        <div className="mb-4 bg-slate-50 rounded-xl p-3 border border-slate-100">
          <p className="text-xs text-slate-600 leading-relaxed italic">
            &ldquo;{product.whyRecommended}&rdquo;
          </p>
        </div>

        {/* Key Benefits */}
        <div className="mb-5 space-y-2">
          <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mb-1">
            Core Advantages
          </span>
          {product.keyBenefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        {/* Estimated Price */}
        <div className="flex items-center justify-between py-2.5 border-t border-slate-100 mt-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase">Price Range</span>
          <span className="text-sm font-extrabold text-indigo-600 uppercase tracking-tighter">
            {product.priceRange}
          </span>
        </div>

        {/* Suggested Alternatives */}
        {product.alternatives && product.alternatives.length > 0 && (
          <div className="border-t border-slate-100 pt-3 mt-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mb-2">
              <ArrowRightLeft className="w-3.5 h-3.5 text-slate-400" />
              Alternatives
            </div>
            <div className="flex flex-wrap gap-1.2">
              {product.alternatives.map((alt, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200/60 font-medium"
                >
                  {alt}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
