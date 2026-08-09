"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";

export default function WorldClock() {
  const project = projectsData.find((p) => p.id === 3);
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

      {/* Filter time zone */}
      <div className="flex gap-4">
        <select className="appearance-none bg-surface border border-outline-variant px-6 py-3 rounded-lg font-label-xs focus:ring-0 focus:border-primary cursor-pointer">
          <option>UTC +00:00 (London)</option>
          <option>UTC +01:00 (Paris/Local)</option>
          <option>UTC -05:00 (New York)</option>
          <option>UTC +09:00 (Tokyo)</option>
        </select>
        <button className="bg-primary text-white px-8 py-3 rounded-lg font-label-xs hover:opacity-90 transition-opacity">
          Add Zone
        </button>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-8 my-8">
        {/* Clock */}
        <div className="col-span-12 lg:col-span-8 p-12 flex flex-col justify-between h-120 bg-on-primary border border-outline-variant shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                Current Location
              </span>
              <h3 className="font-headline-md text-headline-md mt-1">
                Berlin, Germany
              </h3>
            </div>
            <div className="text-right">
              <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                Date
              </span>
              <p className="font-body-md font-bold mt-1" id="current-date">
                July 28, 2026
              </p>
            </div>
          </div>
          <div className="py-12">
            <div
              className="time-display font-headline-xl text-8xl md:text-9xl leading-none font-extrabold tracking-tighter"
              id="main-clock"
            >
              13:20:06
            </div>
          </div>
        </div>

        {/* List countries */}
        <ul className="col-span-12 lg:col-span-4 flex flex-col gap-6">
          <li className="p-8 bg-on-primary flex justify-between items-center group cursor-pointer overflow-hidden  transition-border duration-300 hover:border hover:border-outline-variant ease-in-out">
            <div>
              <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                New York
              </span>
              <h4 className="font-headline-md text-headline-md text-on-surface mt-1">
                EDT
              </h4>
            </div>
            <div className="text-right">
              <div
                className="time-display font-headline-md text-headline-md font-bold"
                id="clock-ny"
              >
                15:20
              </div>
              <span className="uppercase font-code-sm text-xs md:text-sm tracking-widest text-secondary">
                -6 Hours
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
