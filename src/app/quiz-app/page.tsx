"use client";

import ProjectHeader from "../../../components/ProjectHeader";
import { projectsData } from "../../../lib/data";
import { ArrowRight, CircleCheck, CircleX, RotateCcw } from "lucide-react";
import { Quiz } from "../../../lib/quizData";
import { useState, useEffect } from "react";

export default function QuizApp() {
  const project = projectsData.find((p) => p.id === 5);

  // --- Quiz State ---
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false); // New state to toggle results screen

  // --- Metrics State ---
  const [timeRemaining, setTimeRemaining] = useState(15 * 60);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // --- Timer Logic ---
  useEffect(() => {
    // Stop counting if time runs out OR if the quiz is finished
    if (timeRemaining <= 0 || isFinished) return;

    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeRemaining, isFinished]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const accuracy =
    totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const activeQuestion = Quiz[currentIndex];

  // --- Handlers ---
  const handleCheckAnswer = (selectedIndex: number) => {
    if (isAnswered) return;

    setSelectedAnswer(selectedIndex);
    setIsAnswered(true);
    setTotalAnswered((prev) => prev + 1);

    if (selectedIndex === activeQuestion.correctAnswerIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < Quiz.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      // End the quiz and show results
      setIsFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsFinished(false);
    setTimeRemaining(15 * 60);
    setTotalAnswered(0);
    setCorrectCount(0);
  };

  // --- Derived Variables ---
  const isCorrectGuess = selectedAnswer === activeQuestion?.correctAnswerIndex;
  const progressPercentage =
    ((currentIndex + (isFinished ? 1 : 0)) / Quiz.length) * 100;

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
        {/* Conditional Rendering: Show Results OR Active Quiz */}
        {isFinished ? (
          <div className="w-full max-w-2xl bg-gray-50 rounded-xl p-8 md:p-16 flex flex-col items-center text-center shadow-md border border-outline-variant">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
              <CircleCheck size={40} />
            </div>
            <h2 className="font-headline-lg text-3xl md:text-4xl font-bold text-on-surface mb-2">
              Quiz Completed!
            </h2>
            <p className="text-secondary mb-10 text-lg">
              Here is how you performed.
            </p>

            <div className="grid grid-cols-2 gap-4 md:gap-8 w-full mb-10">
              <div className="p-6 bg-surface rounded-lg border border-outline-variant shadow-sm flex flex-col">
                <span className="font-label-xs uppercase tracking-widest text-secondary block mb-2">
                  Final Score
                </span>
                <span className="font-headline-lg text-4xl font-bold text-orange-400">
                  {correctCount}
                  <span className="text-2xl text-on-surface-variant">
                    /{Quiz.length}
                  </span>
                </span>
              </div>
              <div className="p-6 bg-surface rounded-lg border border-outline-variant shadow-sm flex flex-col">
                <span className="font-label-xs uppercase tracking-widest text-secondary block mb-2">
                  Accuracy
                </span>
                <span className="font-headline-lg text-4xl font-bold text-on-surface">
                  {accuracy}%
                </span>
              </div>
            </div>

            <button
              onClick={handleResetQuiz}
              className="px-8 py-4 bg-primary text-on-primary rounded font-label-xs uppercase tracking-widest hover:bg-primary/90 active:scale-95 transition-all flex items-center gap-2 shadow-sm"
            >
              <RotateCcw size={18} />
              Take Quiz Again
            </button>
          </div>
        ) : (
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
                      disabled={isAnswered}
                      className={`w-full text-left p-5 rounded-lg border transition-all flex justify-between items-center group ${buttonStyle}`}
                      onClick={() => handleCheckAnswer(index)}
                    >
                      <span className="font-body-md">{item}</span>
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
        )}

        {/* Global Context Info Footer */}
        <div className="max-w-2xl w-full grid grid-cols-2 gap-8 opacity-75">
          <div className="p-4 border-l-2 border-outline-variant">
            <span className="font-label-xs uppercase block mb-1 text-secondary tracking-widest">
              Time Remaining
            </span>
            <span
              className={`font-headline-md text-lg font-bold ${timeRemaining < 60 && !isFinished ? "text-red-500 animate-pulse" : "text-on-surface"}`}
            >
              {formatTime(timeRemaining)}
            </span>
          </div>

          <div className="p-4 border-l-2 border-outline-variant">
            <span className="font-label-xs uppercase block mb-1 text-secondary tracking-widest">
              Accuracy
            </span>
            <span className="font-headline-md text-lg font-bold text-on-surface">
              {accuracy}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
