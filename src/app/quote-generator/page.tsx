"use client";

import Image from "next/image";
import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { Quote as QuoteIcon } from "lucide-react";
import { quotesData, type Quote } from "../../../lib/quotes";
import { useState, useEffect, useCallback } from "react";

// A reliable fallback image in case the data is missing an imageUrl
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000";

export default function QuoteGenerator() {
  const project = projectsData.find((p) => p.id === 4);

  const [quote, setQuote] = useState<Quote>(quotesData[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const generateQuote = useCallback(() => {
    setIsAnimating(true);

    setTimeout(() => {
      setQuote((prevQuote) => {
        let randomIndex;
        let newQuote;

        do {
          randomIndex = Math.floor(Math.random() * quotesData.length);
          newQuote = quotesData[randomIndex];
        } while (newQuote.id === prevQuote.id && quotesData.length > 1);

        return newQuote;
      });

      setIsAnimating(false);
    }, 300);
  }, []); //

  useEffect(() => {
    const timer = setTimeout(() => {
      generateQuote();
    }, 0);

    return () => clearTimeout(timer);
  }, [generateQuote]);

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );
  }

  // Determine the final image source: the fallback if it is empty/null
  const imageSource = quote.imageUrl || FALLBACK_IMAGE;

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between gap-8 overflow-hidden">
        <div
          className={`flex-1 transition-all duration-300 ease-in-out transform ${
            isAnimating
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          <div className="mb-8">
            <QuoteIcon
              className="opacity-20 block mb-4 text-primary"
              size={60}
            />
            <h1 className="font-headline-xl text-4xl md:text-headline-xl text-on-background leading-tight mb-8">
              {quote.text}
            </h1>
          </div>

          <div className="flex flex-row items-center justify-between gap-8 pt-8 border-t border-outline-variant">
            <div>
              <p className="font-body-lg font-bold text-on-surface">
                {quote.author}
              </p>
              <p className="font-label-xs text-sm md:text-base text-secondary uppercase">
                {quote.category}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Bookmark function - optional */}
              {/* <button className="w-12 h-12 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition-colors">
                <Bookmark />
              </button> */}

              <button
                className="px-8 py-3 bg-primary text-on-primary rounded font-label-xs uppercase tracking-widest hover:bg-primary/80 transition-all duration-300 shadow-sm flex items-center gap-2"
                onClick={generateQuote}
                disabled={isAnimating}
              >
                Generate Quote
              </button>
            </div>
          </div>
        </div>

        {/* Replaced width/height with fill to avoid Next.js aspect ratio warnings */}
        <div
          className={`relative flex items-center justify-center w-80 h-80 transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-100"}`}
        >
          <Image
            src={imageSource}
            alt={`Image for quote by ${quote.author}`}
            fill
            sizes="(max-width: 768px) 320px, 320px"
            unoptimized
            priority
            className="object-cover rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
