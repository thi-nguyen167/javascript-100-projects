"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { useState, useEffect, useCallback } from "react";

export default function QuizApp() {
  const project = projectsData.find((p) => p.id === 5);

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

      <div className="max-w-7xl w-full flex flex-col lg:flex-row justify-between gap-8 overflow-hidden"></div>
    </section>
  );
}
