"use client";

import { useState } from "react";
import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { ChevronsLeft, ChevronsRight, Minus, Plus, Check } from "lucide-react";

export default function CounterApp() {
  const [count, setCount] = useState<number>(0);
  const [step, setStep] = useState<number>(1);
  const [lastAction, setLastAction] = useState<string>("-");
  const [totalClicks, setTotalClicks] = useState<number>(0);

  const project = projectsData.find((p) => p.id === 1);
  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );
  }

  const MIN_VALUE = 0;
  const MAX_VALUE = 99;
  const isMin = count - step <= MIN_VALUE;
  const isMax = count + step >= MAX_VALUE;

  const STEPS = [1, 5, 10];

  const handleDecrement = () => {
    if (count > MIN_VALUE) {
      setCount((prev) => prev - step);
      setLastAction(`-${step}`);
      setTotalClicks((prev) => prev + 1);
    }
  };
  const handleIncrement = () => {
    if (count < MAX_VALUE) {
      setCount((prev) => prev + step);
      setLastAction(`+${step}`);
      setTotalClicks((prev) => prev + 1);
    }
  };

  const handleReset = () => {
    setCount(MIN_VALUE);
    setLastAction("-");
    setTotalClicks(0);
  };

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 my-8">
        <div className="md:col-span-8 border border-outline-variant bg-background shadow-lg rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center relative overflow-hidden min-h-105">
          {/* Min / Max Indicators */}
          <div className="absolute top-6 left-8 right-8 flex justify-between items-center">
            <div
              className={`flex items-center gap-2 transition-all duration-300 ${isMin ? "text-error" : "text-secondary opacity-30"}`}
            >
              <ChevronsLeft size={16} />
              <span className="font-label-xs text-label-xs">MIN: 0</span>
            </div>
            <div
              className={`flex items-center gap-2 transition-all duration-300 ${isMax ? "text-error" : "text-secondary opacity-30"}`}
            >
              <span className="font-label-xs text-label-xs">MAX: 99</span>
              <ChevronsRight size={16} />
            </div>
          </div>

          {/* Counter display and controls */}
          <div className="mt-8 flex flex-col items-center">
            <span className="font-headline-xl text-[120px] font-extrabold text-primary leading-none mb-12 tabular-nums">
              {count}
            </span>

            <div className="flex items-center gap-6 md:gap-8">
              {/* Minus button */}
              <button
                onClick={handleDecrement}
                disabled={isMin}
                className="w-20 h-20 rounded-full border border-outline flex items-center justify-center hover:scale-105 transition-all btn-press"
              >
                <Minus size={28} />
              </button>

              {/* Reset button */}
              <button
                onClick={handleReset}
                className="px-6 py-2 rounded-full font-label-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors font-bold"
              >
                Reset
              </button>

              {/* Plus button */}
              <button
                onClick={handleIncrement}
                disabled={isMax}
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-md transition-all bg-[#97A88F] text-white hover:scale-105 active:scale-95"
              >
                <Plus size={28} />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Step size buttons container */}
          <div className="border border-outline-variant bg-background shadow-lg rounded-2xl p-6">
            <h3 className="font-label-xs text-[11px] uppercase tracking-widest text-secondary mb-4 font-bold">
              Step Size
            </h3>
            <div className="flex flex-col gap-3">
              {STEPS.map((item) => {
                const isActive = item === step;
                return (
                  <button
                    key={item}
                    onClick={() => setStep(item)}
                    className={`w-full p-4 border rounded-xl flex justify-between items-center transition-all group ${
                      isActive
                        ? "border-primary bg-surface-container text-primary font-bold shadow-xs"
                        : "border-outline-variant/60 text-secondary hover:border-primary/50 bg-transparent"
                    }`}
                  >
                    <span className="font-code-sm text-[13px]">
                      Increment by {item}
                    </span>
                    <Check
                      size={16}
                      className={
                        isActive ? "opacity-100 text-primary" : "opacity-0"
                      }
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div className="border border-outline-variant bg-background shadow-lg rounded-2xl p-6 flex flex-col justify-between gap-4">
            <div className="flex justify-between items-center">
              <span className="font-label-xs text-[12px] text-secondary">
                Last Action
              </span>
              <span className="font-code-sm font-bold text-primary">
                {lastAction}
              </span>
            </div>
            <div className="w-full h-px bg-outline-variant/30"></div>
            <div className="flex justify-between items-center">
              <span className="font-label-xs text-[12px] text-secondary">
                Total Clicks
              </span>
              <span className="font-code-sm font-bold text-primary">
                {totalClicks}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
