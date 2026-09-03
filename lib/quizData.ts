export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const advancedJsQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "What is a closure in JavaScript?",
    options: [
      "A method to prevent variables from being garbage collected by deleting them.",
      "A function combined with its lexical environment, remembering its outer scope.",
      "A strict mode feature that prevents variables from leaking into the global scope.",
      "A function that takes another function as an argument.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "A closure is formed when a function is bundled together with references to its surrounding state (the lexical environment). It allows an inner function to access an outer function's scope even after the outer function has returned.",
  },
  {
    id: 2,
    question: "What is the output of the following code?",
    codeSnippet: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 1000);
}`,
    options: [
      "0, 1, 2",
      "3, 3, 3",
      "Undefined, Undefined, Undefined",
      "1, 2, 3",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Because `var` is function-scoped, there is only one shared `i`. By the time the `setTimeout` callbacks execute, the loop has finished and `i` has incremented to 3.",
  },
  {
    id: 3,
    question:
      "How can we fix the previous `var` loop to correctly output `0, 1, 2` without changing `var` to `let`?",
    options: [
      "Define `i` as a global variable outside the loop.",
      "Remove the 1000ms delay in `setTimeout`.",
      "Wrap the `setTimeout` in an IIFE, passing `i` as an argument.",
      "It is impossible without using `let`.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "An Immediately Invoked Function Expression (IIFE) creates a new function scope for every iteration, capturing the current value of `i` in a new variable.",
  },
  {
    id: 4,
    question: "What does this code log to the console?",
    codeSnippet: `let a = 1;
function foo() {
  console.log(a);
  let a = 2;
}
foo();`,
    options: ["1", "2", "undefined", "ReferenceError"],
    correctAnswerIndex: 3,
    explanation:
      "The `let a = 2` declaration is hoisted to the top of `foo`'s scope, but remains in the Temporal Dead Zone (TDZ). Accessing it before initialization throws a ReferenceError.",
  },
  {
    id: 5,
    question:
      "Consider the Module Pattern below. What does `counter.count` return?",
    codeSnippet: `const counter = (function() {
  let count = 0;
  return {
    up: () => ++count,
    value: () => count
  };
})();
counter.count;`,
    options: ["0", "1", "undefined", "null"],
    correctAnswerIndex: 2,
    explanation:
      "The module pattern creates private variables using closures. `count` is only accessible inside the IIFE and through the returned methods. Directly accessing it on the object returns `undefined`.",
  },
  {
    id: 6,
    question: "What is the output of the following code?",
    codeSnippet: `function createAdder(x) {
  return function(y) {
    return x + y;
  };
}
const add5 = createAdder(5);
console.log(add5(3));`,
    options: ["5", "3", "8", "undefined"],
    correctAnswerIndex: 2,
    explanation:
      "The inner function forms a closure that captures `x` from `createAdder`. When `add5(3)` is called, it adds the captured `x` (5) and the passed `y` (3).",
  },
  {
    id: 7,
    question: "What will be logged to the console?",
    codeSnippet: `var x = 10;
(function() {
  console.log(x);
  var x = 20;
})();`,
    options: ["10", "20", "undefined", "ReferenceError"],
    correctAnswerIndex: 2,
    explanation:
      "Inside the IIFE, `var x` is hoisted to the top of the function scope, but its initialization (`= 20`) is not. Therefore, `x` exists in the local scope but is `undefined` when logged.",
  },
  {
    id: 8,
    question:
      "Do closures in JavaScript capture the values of variables, or their references (bindings)?",
    options: [
      "They capture the exact values at the time the closure is created.",
      "They capture references to the variables, meaning they see updates made after creation.",
      "They create deep copies of the outer scope.",
      "They capture values for primitives, and references for objects.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Closures capture variable bindings (references), not just their values. This is why in a loop with `var`, all setTimeout callbacks log the final updated value of the shared variable.",
  },
  {
    id: 9,
    question: "What is the output of the following code?",
    codeSnippet: `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}`,
    options: [
      "0, 1, 2",
      "3, 3, 3",
      "1, 2, 3",
      "Undefined, Undefined, Undefined",
    ],
    correctAnswerIndex: 0,
    explanation:
      "Because `let` is block-scoped, a new lexical environment (and a fresh binding of `i`) is created for each iteration of the loop. Thus, each closure captures a distinct `i`.",
  },
  {
    id: 10,
    question: "Which of the following is NOT a common use case for closures?",
    options: [
      "Data privacy (Emulating private methods)",
      "Currying and partial application",
      "Event handlers and callbacks",
      "Enhancing the performance of global variables",
    ],
    correctAnswerIndex: 3,
    explanation:
      "Closures are excellent for data privacy, currying, and callbacks, but they consume memory by keeping outer scopes alive and do not enhance global variable performance.",
  },
];
