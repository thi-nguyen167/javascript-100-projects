"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { ChevronsLeft, ChevronsRight, Minus, Plus } from "lucide-react";

export default function CounterApp() {
  const project = projectsData.find((p) => p.id === 1);
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

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-gutter border border-outline-variant my-8 shadow-lg rounded-lg pb-4 md:pb-8">
        <div className="md:col-span-8 rounded-xl px-6 md:px-8 lg:px-12 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute top-6 left-8 right-8 flex justify-between">
            <div className="flex items-center gap-2 text-on-surface opacity-30 transition-opacity text-error">
              <ChevronsLeft className="text-[16px]" />
              <span className="font-label-xs text-label-xs">MIN: 0</span>
            </div>
            <div className="flex items-center gap-2 text-on-surface opacity-30 transition-opacity">
              <span className="font-label-xs text-label-xs">MAX: 99</span>
              <ChevronsRight className="text-[16px]" />
            </div>
          </div>
          <div className="mt-8 flex flex-col items-center">
            <span className="font-headline-xl text-[120px] font-extrabold text-on-background leading-none mb-8 transition-all duration-300">
              00
            </span>
            <div className="flex items-center gap-8">
              <button className="w-20 h-20 rounded-full border border-outline flex items-center justify-center hover:scale-105 transition-all btn-press">
                <Minus />
              </button>
              <button className="px-6 py-2 rounded-full font-label-xs uppercase tracking-widest text-on-surface hover:text-primary transition-colors">
                Reset
              </button>
              <button className="w-20 h-20 border rounded-full flex items-center justify-center hover:scale-105 transition-all">
                <Plus />
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-sage/20 to-transparent"></div>
        </div>
        <div className="md:col-span-4 space-y-gutter">
          <div className="rounded-xl p-8">
            <h3 className="font-label-xs text-label-xs uppercase tracking-widest text-on-surface mb-6">
              Step Size
            </h3>
            <div className="flex flex-col gap-3" id="step-selector"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
