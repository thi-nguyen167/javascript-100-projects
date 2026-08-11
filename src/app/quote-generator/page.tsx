"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";

export default function quoteGenerator() {
  const project = projectsData.find((p) => p.id === 4);

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
        <div className="md:col-span-8 flex flex-col gap-6"></div>

        <div className="md:col-span-4 flex flex-col pt-2"></div>
      </div>
    </section>
  );
}
