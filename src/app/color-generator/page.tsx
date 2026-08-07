"use client";

import { useState, useEffect, useCallback } from "react";
import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { Shuffle, Check, Copy } from "lucide-react";

// Utility function to determine text color based on background brightness
const getContrastColor = (hexCode: string) => {
  const hex = hexCode.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

export default function GenerateColor() {
  const [color, setColor] = useState<string>("#FFFFFF");
  const [colorsGenerated, setColorsGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);

  const project = projectsData.find((p) => p.id === 2);

  // Memoized function to generate a random color and update the history array
  const generateRandomColor = useCallback(() => {
    const colorValue =
      "#" +
      Math.floor(Math.random() * 16777215) // Generate a random number up to the max hex value (16^6 - 1)
        .toString(16) // Convert the base-10 number to a base-16 (hex) string
        .padStart(6, "0") // Ensure the string is always exactly 6 characters long
        .toUpperCase();

    // Update the main display color
    setColor(colorValue);

    // Add the new color to the history state, keeping only the 5 most recent colors
    setColorsGenerated((prev) => [colorValue, ...prev].slice(0, 5));

    // Reset the clipboard UI feedback
    setCopied(false);
  }, []);

  // --- Effects ---
  // Generate the initial random color on component mount
  useEffect(() => {
    // Push the state update to the end of the execution queue.
    // This prevents synchronous cascading render warnings and Next.js hydration mismatch errors.
    const timer = setTimeout(() => {
      generateRandomColor();
    }, 0);

    // Cleanup the timeout if the component unmounts prematurely
    return () => clearTimeout(timer);
  }, [generateRandomColor]);

  // Calculate dynamic text color for the main display
  const textColor = getContrastColor(color);

  const handleCopy = async () => {
    // interacting with the browser's clipboard
    try {
      await navigator.clipboard.writeText(color); // the browser's built-in Clipboard API to take whatever string is stored in the color variable and copy it to the user's system clipboard
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Revert back after a second
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 my-8">
        <div className="md:col-span-8 flex flex-col gap-6">
          <div
            style={{ backgroundColor: color, color: textColor }} // Style the background and text color as the random hex code
            className="w-full h-64 md:h-100 border border-outline-variant/20 rounded-2xl p-8 flex flex-col items-center justify-center shadow-sm relative transition-colors duration-300 group"
          >
            <span
              className="font-headline-xl text-[64px] md:text-[80px] font-extrabold text-on-background leading-none"
              id="color-value"
            >
              {color}
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
              onClick={handleCopy}
              className={`w-fit px-8 py-4 font-label-xs uppercase tracking-widest font-bold flex items-center justify-center gap-2 rounded-lg border transition-colors ${
                copied
                  ? "border-primary text-primary"
                  : "border-outline-variant hover:border-primary text-outline-variant hover:text-primary bg-background"
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Click to copy"}
            </button>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col pt-2">
          <h3 className="font-label-xs text-[10px] uppercase tracking-widest text-secondary font-bold mb-6 border-b border-outline-variant pb-4">
            Recently Generated
          </h3>
          <ul className="flex flex-col gap-3">
            {colorsGenerated.map((color, index) => (
              <li
                key={`${index}-${color}`}
                onClick={() => setColor(color)}
                className="flex flex-row items-center gap-4 group cursor-pointer hover:bg-surface-container/30 p-2 -ml-2 rounded-lg transition-colors"
              >
                <div
                  style={{ backgroundColor: color }}
                  className="w-12 h-12 rounded-lg shadow-sm border border-outline-variant/30 shrink-0"
                />
                <div className="flex flex-col justify-center">
                  <span className="text-primary font-bold text-sm uppercase">
                    {color}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
