"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { ArrowRight, CircleCheck } from "lucide-react";
import { Quiz, QuizQuestion } from "../../../lib/quizData";
import { useState } from "react";

export default function QuizApp() {
  const project = projectsData.find((p) => p.id === 5);
  // Track which question we are currently on (starts at 0)
  const [currentIndex, setCurrentIndex] = useState(0);

  // Grab the single active question object
  const activeQuestion = Quiz[currentIndex];

  if (!project) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );
  }

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      <div className="max-w-7xl w-full flex flex-col gap-8 overflow-hidden items-center justify-center p-6 md:p-12">
        {/* Quiz Container */}
        <div className="w-full max-w-2xl bg-gray-50 rounded-xl p-8 md:p-12 overflow-hidden shadow-md">
          {/* Progress Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-8">
            <div>
              <span className="font-label-xs uppercase tracking-[0.2em] text-primary/70 mb-1 block">
                {activeQuestion.category.split(" ")[0]}
              </span>
              <h3 className="font-headline-md text-headline-md">
                {activeQuestion.category}
              </h3>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-6">
              <span className="font-label-xs uppercase tracking-widest text-orange-400 font-bold">
                Question {activeQuestion.id}/{Quiz.length}
              </span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-0.5 bg-secondary/40 mb-12 overflow-hidden">
            <div className="h-full bg-orange-400 transition-all duration-700 ease-out w-[50%]"></div>
          </div>
          {/* Question Area */}
          <div className="min-h-85 flex flex-col">
            <div className="mb-10">
              <p className="font-body-lg text-body-lg text-primary/80 leading-relaxed">
                {activeQuestion.question}
              </p>
              {activeQuestion.codeSnippet && (
                <div className="mt-6 p-2 md:p-6 bg-secondary/10 rounded-lg overflow-x-auto">
                  <pre className="font-code-sm text-code-sm text-primary/75 leading-relaxed">
                    <code>{activeQuestion.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
            {/* Options*/}
            <div className="space-y-4">
              {activeQuestion.options.map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left p-5 rounded-lg border border-outline-variant hover:border-orange-400 hover:bg-orange-400/5 transition-all flex justify-between items-center group"
                >
                  <span className="font-body-md">{item}</span>
                  <ArrowRight />
                </button>
              ))}
            </div>
          </div>
          {/* Feedback Overlay (Hidden by default)*/}
        </div>
        {/* Context Info */}
      </div>
    </section>
  );
}
