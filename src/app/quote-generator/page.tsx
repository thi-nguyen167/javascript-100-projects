"use client";

import Image from "next/image";
import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { Quote, Bookmark } from "lucide-react";

export default function quoteGenerator() {
  const project = projectsData.find((p) => p.id === 4);

  const generateQuote = (): void => {};

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );
  }

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between gap-8 overflow-hidden">
        <div className="flex-1 transition-transform duration-400 ease opacity-100 transform translate-y-0">
          <div className="mb-8">
            <Quote className="opacity-20 block mb-4 fill-red-300" size={60} />

            <h1 className="font-headline-xl text-headline-xl text-on-background leading-tight mb-8">
              &quot;The only way to do great work is to love what you do.&quot;
            </h1>
          </div>
          <div className="flex flex-row items-center justify-between gap-8 pt-8 border-t border-outline-variant">
            <div>
              <p className="font-body-lg font-bold text-on-surface">
                Steve Jobs
              </p>
              <p className="font-label-xs text-sm md:text-base text-secondary uppercase">
                Tech Visionary
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
              >
                Generate Quote
              </button>
            </div>
          </div>
        </div>

        {/* Image */}
        <div className="flex items-center justify-center">
          <Image src="" alt="" className="object-cover w-80 h-80" />
        </div>
      </div>
    </section>
  );
}
