"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./hero-highlight";
import { useEffect, useState } from "react";
import { InfiniteMovingCardsDemo } from "./MovingCard";
import { NumberTicker } from "./number-ticker";


export function HeroHighlightDemo({ onButtonClick }:{ onButtonClick?: () => void }) {
  const [shouldAnimate, setShouldAnimate] = useState(true); // Set to true directly

  useEffect(() => {
    // Trigger the animation on mount
    setShouldAnimate(true);
  }, []);

  return (
    <div className="h-[80vh] flex flex-col items-center justify-center bg-transparent px-4 md:px-8 lg:px-16 mt-44 lg:mt-44">
      {/* Button container */}
      <div className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl mt-16 sm:mt-20 lg:mt-36 mb-8 sm:mb-10 lg:mb-12 shadow-zinc-900 rounded-full p-px text-xs font-sans leading-6 text-white inline-block">
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">  
    <span className="relative flex h-3 w-3 ml-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white dark:bg-slate-900 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-white dark:bg-slate-900"></span>
    </span>
    <span>
      <NumberTicker value={244604911}/> views
    </span>
    {/* Ping Effect */}

  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-blue-400/0 via-blue-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
</div>


      {/* HeroHighlight container */}
      <HeroHighlight>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-7xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-sans font-bold text-white max-w-4xl lg:leading-snug text-center mx-auto mb-4 sm:mb-6"
          style={{ willChange: "opacity, transform", fontFamily: "Helvetica, sans-serif" }}
        >
          <h1 className="text-white font-medium">Ignite Vision</h1>
        </motion.h1>

        {/* Subtitle */}
        <p className="justify-center font-normal text-white text-sm sm:text-base md:text-lg lg:text-lg mt-2 text-center " style={{ fontFamily: "Helvetica, sans-serif" }}>
          A personal branding agency focused on empowering innovators, creators, and brands to tell their unique stories.
        </p>

        {/* Button */}
        <div className="flex justify-center mt-6 sm:mt-8">
          <button
            onClick={onButtonClick}
            aria-label="Book a call"
            className="inline-flex h-10 sm:h-12 animate-shimmer items-center justify-center rounded-2xl border border-blue-900 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 sm:px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            Book A Call
          </button>
        </div>
      </HeroHighlight>
      
      <div className="w-full flex justify-center -mt-10 z-20">
        <InfiniteMovingCardsDemo />
      </div>
    </div>
  );
}
