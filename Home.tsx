import { useState } from "react";
import { RecommendationFormInputs, RecommendationResponse } from "../types";
import { fetchRecommendations } from "../services/recommendationService";
import ProductForm from "../components/ProductForm";
import ProductCard from "../components/ProductCard";
import InsightPanel from "../components/InsightPanel";
import Loader from "../components/Loader";
import { Sparkles, ShoppingBag, ShieldAlert, BookOpen, ChevronRight, CornerDownRight } from "lucide-react";
import { motion } from "motion/react";

export default function Home() {
  const [recommendations, setRecommendations] = useState<RecommendationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);
  const [activeQuery, setActiveQuery] = useState<RecommendationFormInputs | null>(null);

  const handleRecommendationRequest = async (inputs: RecommendationFormInputs) => {
    setIsLoading(true);
    setErrorStatus(null);
    setRecommendations(null);
    setActiveQuery(inputs);

    try {
      const data = await fetchRecommendations(inputs);
      setRecommendations(data);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(
        err.message || 
        "Something went wrong while consulting the recommendation engine. Please verify your connection setup and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendations(null);
    setActiveQuery(null);
    setErrorStatus(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      {/* Upper main workspace area */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Landing Hero Area */}
        {!recommendations && !isLoading && (
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-4 border border-indigo-100/80">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Next-Gen Semantic Product Recommendation</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Smart Shopping Decisions, Powered by Google Gemini
            </h1>
            
            <p className="text-sm sm:text-base text-slate-500 font-sans leading-relaxed">
              Skip hours of manual comparison. Briefly explain what you need, your target budget, dietary guidelines, or lifestyle constraints, and let our expert AI assistant craft instantly optimized recommendations with concrete advice.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-left font-mono text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-indigo-600 font-extrabold">•</span>
                <span>Analyses allergies</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-indigo-600 font-extrabold">•</span>
                <span>Values budget caps</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-indigo-600 font-extrabold">•</span>
                <span>Suggests alterns</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-slate-200/60 shadow-sm">
                <span className="text-indigo-600 font-extrabold">•</span>
                <span>Assesses ratings</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-10">
          {/* Main Input Form block */}
          {!recommendations && !isLoading && (
            <div className="max-w-3xl mx-auto">
              <ProductForm onSubmit={handleRecommendationRequest} isLoading={isLoading} />
            </div>
          )}

          {/* Loading View */}
          {isLoading && (
            <div className="max-w-2xl mx-auto">
              <Loader />
            </div>
          )}

          {/* Error View */}
          {errorStatus && !isLoading && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center">
              <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4 border border-red-100">
                <ShieldAlert className="w-5 h-5 text-red-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">Recommendation Consultation Failed</h3>
              <p className="text-xs text-slate-500 mb-6">{errorStatus}</p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                Go Back to Search
              </button>
            </div>
          )}

          {/* Results Area */}
          {recommendations && !isLoading && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Query Summary & Reset strip */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-indigo-600 block mb-1">
                    Current active request
                  </span>
                  <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                    <ChevronRight className="w-4 h-4 text-indigo-600 shrink-0" />
                    &ldquo;{activeQuery?.purpose}&rdquo;
                  </p>
                  <p className="text-xs text-slate-500 font-mono mt-1">
                    {activeQuery?.budget && `Budget: ${activeQuery.budget}`}
                    {activeQuery?.category && ` | Category: ${activeQuery.category}`}
                    {activeQuery?.dietary && ` | Dietary: ${activeQuery.dietary}`}
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs border border-indigo-100 transition cursor-pointer self-start sm:self-center"
                >
                  Create New Request
                </button>
              </div>

              {/* AI Highlights Panel */}
              <InsightPanel insights={recommendations.insights} />

              {/* Shopping Guidelines & Hand-picked Advice block */}
              <div className="bg-gradient-to-r from-indigo-50/70 to-indigo-50/10 border border-indigo-100 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">AI Shopping Guidance</h3>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4 py-0.5">
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {recommendations.finalShoppingAdvice}
                  </p>
                </div>
              </div>

              {/* Product recommendation list heading */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="w-5 h-5 text-indigo-600" />
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                    Recommended Selections
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  Based on your parameters, Gemini evaluated these top matches:
                </p>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>

              {/* Footer resetting trigger */}
              <div className="flex justify-center pt-8 border-t border-slate-200">
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:shadow-indigo-100 transition duration-150 text-xs cursor-pointer"
                >
                  Conduct Another Search
                </button>
              </div>
              
            </div>
          )}

        </div>
      </main>

      {/* Decorative, stable bottom status strip */}
      <footer className="w-full h-10 bg-white border-t border-slate-200 px-6 flex items-center justify-between text-[10px] text-slate-500 font-medium font-sans mt-12 bg-white/80 backdrop-blur-sm shadow-inner">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            API Connection Stable
          </div>
          <span>|</span>
          <span>Query Processed via Gemini 3.5 Active</span>
        </div>
        <div className="uppercase tracking-wider hidden sm:block">
          Designed for Career Development Internship • 2026
        </div>
      </footer>
    </div>
  );
}
