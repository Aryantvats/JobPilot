"use client";

import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import JobCard from "./JobCard";
import { floatingCards } from "@/public/data/codeExamples";
import { useAppContext } from "@/context/AppContext";

type FloatingCard = {
  bgColor: string;
  iconColor: string;
  textColor: string;
  contentColor: string;
  icon: string;
  title: string;
  content: string;
};

type FloatingCardsMap = Record<string, FloatingCard>;

type HeroProps = {
  mousePosition: {
    x: number;
    y: number;
  };
};

export default function Hero({mousePosition}: HeroProps) {
  
  const { router } = useAppContext();
  const [activeTab, setActiveTab] = useState<string>("App.jsx");
  const cards = floatingCards as FloatingCardsMap;
  const currentFloatingCard = cards[activeTab];
   
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          background: `radial-gradient(
            400px circle at ${mousePosition.x}px ${mousePosition.y}px,
            rgba(59, 130, 246, 0.15),
            transparent 40%
          )`,
        }}
      />

      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto w-full relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">
                Introducing JobScout AI
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold mb-6">
              <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Discover Internships
              </span>
              <span className="block bg-gradient-to-b from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                Track new openings
              </span>
              <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Get Referrals Faster
              </span>
            </h1>

            <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8">
              Find internships, see relevant company employees on LinkedIn, and
              generate AI-powered referral messages in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={() => router.push("/signup")} className="group px-8 py-4 bg-gradient-to-b from-blue-600 to-blue-400 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-[1.02] transition">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

              <button className="group px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition">
                How It Works
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 shadow-2xl">
              <div className="rounded-lg overflow-hidden h-[450px] border border-white/5 bg-gradient-to-br from-gray-900/20 to-gray-800/20">

                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-300">
                      JOBSCOUT
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                <div className="p-6">
                  <JobCard
                    company="Google"
                    role="Frontend Developer"
                    location="Remote"
                    type="Full-time"
                    isNew
                  />
                </div>
              </div>


              {currentFloatingCard && (
                <div
                  className={`hidden lg:block absolute bottom-4 right-4 translate-x-8 translate-y-8 w-72 ${currentFloatingCard.bgColor} backdrop-blur-xl rounded-lg p-4 border border-white/20 shadow-2xl`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`w-6 h-6 flex items-center justify-center text-sm font-bold ${currentFloatingCard.iconColor}`}
                    >
                      {currentFloatingCard.icon}
                    </div>
                    <span
                      className={`text-sm font-medium ${currentFloatingCard.textColor}`}
                    >
                      {currentFloatingCard.title}
                    </span>
                  </div>

                  <p
                    className={`text-sm ${currentFloatingCard.contentColor}`}
                  >
                    {currentFloatingCard.content}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
