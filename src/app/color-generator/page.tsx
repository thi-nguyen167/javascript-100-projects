"use client";

import { useState } from "react";
import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { Shuffle } from "lucide-react";

export default function GenerateColor() {
  const [color, setColor] = useState<string>("#FFFFFF");

  const project = projectsData.find((p) => p.id === 2);
  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );
  }

  const generateRandomColor = () => {
    const colorValue =
      "#" +
      Math.floor(Math.random() * 16777215) // Get random number up to max hex value (FFFFFF) - 16^6 -1
        .toString(16) // Convert base-10 number to base-16 (hex) string
        .padStart(6, "0") // Pad with zeros if less than 6 characters
        .toUpperCase();
    return setColor(colorValue);
  };

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 my-8">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div
            style={{ backgroundColor: color }} // Style the background color as the random hex code
            className="w-full h-64 md:h-100 border border-outline-variant/20 rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm relative transition-colors duration-300 group cursor-pointer"
          >
            <span
              className="font-headline-xl text-[48px] md:text-[80px] font-extrabold text-on-background leading-none"
              id="color-value"
            >
              {color}
            </span>
            <span className="font-label-xs text-xs uppercase tracking-widest text-primary/60 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to copy
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between w-full gap-4">
            <button
              onClick={generateRandomColor}
              className="w-fit px-8 py-4 bg-primary text-on-primary rounded-lg font-label-xs uppercase tracking-widest font-bold flex items-center gap-3 hover:opacity-90 transition-opacity"
              id="random"
            >
              <Shuffle size={18} />
              Randomize
            </button>

            <button
              id="copy-btn"
              className="w-fit px-8 py-4 font-label-xs uppercase tracking-widest font-bold flex items-center justify-center rounded-lg border border-outline-variant hover:border-primary transition-colors text-outline-variant hover:text-primary bg-background"
            >
              Click to copy
            </button>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col pt-2">
          <h3 className="font-label-xs text-[10px] uppercase tracking-widest text-secondary font-bold mb-6 border-b border-outline-variant pb-4">
            Recently Generated
          </h3>
          <ul className="flex flex-col gap-3" id="color-list"></ul>
        </div>
      </div>
    </section>
  );
}
