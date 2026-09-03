"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { Quiz } from "../../../lib/quizData";
import { useState } from "react";

export default function QuizApp() {
  const project = projectsData.find((p) => p.id === 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const activeQuestion = Quiz[currentIndex];

  const handleCheckAnswer = (selectedIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < Quiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      // Reset the UI for the new question
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // Replace later
      alert("Quiz Complete!");
    }
  };

  const isCorrectGuess = selectedAnswer === activeQuestion.correctAnswerIndex;
  const progressPercentage = ((currentIndex + 1) / Quiz.length) * 100;

  if (!project)
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        Project not found
      </div>
    );

  return (
    <section className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-margin-desktop pt-16 pb-24 flex flex-col items-center mt-8 md:mt-12">
      <ProjectHeader
        challengeNumber={project.id.toString().padStart(3, "0")}
        title={project.title}
        description={project.desc}
      />

      <div className="max-w-7xl w-full flex flex-col gap-8 overflow-hidden items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-2xl bg-gray-50 rounded-xl p-8 md:p-12 overflow-hidden shadow-md">
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

          {/* Dynamic Progress Bar */}
          <div className="w-full h-0.5 bg-secondary/40 mb-12 overflow-hidden">
            <div
              className="h-full bg-orange-400 transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

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

            {/* Options */}
            <div className="space-y-4">
              {activeQuestion.options.map((item, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectOption =
                  activeQuestion.correctAnswerIndex === index;

                let buttonStyle =
                  "border-outline-variant hover:border-orange-400 hover:bg-orange-400/5";

                if (isAnswered) {
                  if (isSelected && isCorrectOption) {
                    buttonStyle =
                      "border-green-500 bg-green-50 text-green-700 font-bold";
                  } else if (isSelected && !isCorrectOption) {
                    buttonStyle = "border-red-500 bg-red-50 text-red-700";
                  } else if (isCorrectOption) {
                    buttonStyle =
                      "border-green-500 bg-green-50/40 text-green-700";
                  } else {
                    buttonStyle = "border-outline-variant opacity-50";
                  }
                }

                return (
                  <button
                    key={index}
                    disabled={isAnswered} // Lock button after answering
                    className={`w-full text-left p-5 rounded-lg border transition-all flex justify-between items-center group ${buttonStyle}`}
                    onClick={() => handleCheckAnswer(index)}
                  >
                    <span className="font-body-md">{item}</span>
                    {/* Only show the arrow if it hasn't been answered yet */}
                    {!isAnswered && (
                      <ArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Overlay */}
          {isAnswered && (
            <div
              className={`mt-8 p-6 rounded-lg border flex flex-col md:flex-row items-start md:items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300 ${isCorrectGuess ? "border-green-200 bg-green-50/50" : "border-red-200 bg-red-50/50"}`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isCorrectGuess ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
              >
                {isCorrectGuess ? (
                  <CircleCheck size={28} />
                ) : (
                  <CircleX size={28} />
                )}
              </div>
              <div className="flex-1">
                <h4
                  className={`font-bold text-lg mb-1 ${isCorrectGuess ? "text-green-700" : "text-red-700"}`}
                >
                  {isCorrectGuess ? "Correct!" : "Incorrect"}
                </h4>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  {activeQuestion.explanation}
                </p>
              </div>
              <button
                onClick={handleNextQuestion}
                className="mt-4 md:mt-0 w-full md:w-auto px-8 py-3 bg-primary text-on-primary rounded font-label-xs uppercase tracking-widest hover:bg-primary/90 active:scale-95 transition-all shrink-0"
              >
                {currentIndex < Quiz.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
