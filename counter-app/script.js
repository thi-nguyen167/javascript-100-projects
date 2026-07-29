"use strict";

const increment = document.getElementById("increment");
const decrement = document.getElementById("decrement");
const counterValue = document.getElementById("counter-value");
const reset = document.getElementById("reset");

const minIndicator = document.getElementById("min-indicator");
const maxIndicator = document.getElementById("max-indicator");

const stepContainer = document.getElementById("step-selector");

const MIN_VALUE = 0;
const MAX_VALUE = 99;
const STEPS = [1, 5, 10];

let count = 0;
let currentStep = 1;

// Render step button dynamic
const renderStepButtons = () => {
  stepContainer.innerHTML = STEPS.map((step) => {
    const isActive = step === currentStep;

    const activeClass =
      "border-primary text-on-background bg-surface-container active";
    const inactiveClass =
      "border-outline-variant text-on-surface bg-transparent";

    return `
            <button
                class="step-btn w-full p-4 border rounded-lg flex justify-between items-center transition-all group ${isActive ? activeClass : inactiveClass}"
                data-step="${step}"
            >
                <span class="font-code-sm text-code-sm">Increment by ${step}</span>
                <span class="material-symbols-outlined text-[18px] ${isActive ? "opacity-100 text-primary" : "opacity-0 group-hover:opacity-50"}">
                    check_circle
                </span>
            </button>
        `;
  }).join("");
};

stepContainer.addEventListener("click", (e) => {
  const btn = e.target.closest(".step-btn");
  if (!btn) return;

  currentStep = parseInt(btn.getAttribute("data-step"), 10);

  renderStepButtons();
});

const displayUI = () => {
  counterValue.textContent = count.toString().padStart(2, "0");

  if (count === MIN_VALUE) {
    decrement.disabled = true;
    decrement.style.opacity = "0.2";
    minIndicator.style.opacity = "1";
    minIndicator.classList.add("text-error");
  } else {
    decrement.disabled = false;
    decrement.style.opacity = "1";
    minIndicator.style.opacity = "0.3";
    minIndicator.classList.remove("text-error");
  }

  if (count === MAX_VALUE) {
    increment.disabled = true;
    increment.style.opacity = "0.2";
    maxIndicator.style.opacity = "1";
    maxIndicator.classList.add("text-error");
  } else {
    increment.disabled = false;
    increment.style.opacity = "1";
    maxIndicator.style.opacity = "0.3";
    maxIndicator.classList.remove("text-error");
  }
};

increment.addEventListener("click", () => {
  count = Math.min(count + currentStep, MAX_VALUE);
  displayUI();
});

decrement.addEventListener("click", () => {
  count = Math.max(count - currentStep, MIN_VALUE);
  displayUI();
});

// Reset
reset.addEventListener("click", () => {
  count = MIN_VALUE;
  displayUI();
});

const init = () => {
  renderStepButtons();
  displayUI();
};

init();
