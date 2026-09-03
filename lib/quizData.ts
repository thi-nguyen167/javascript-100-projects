export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const Quiz: QuizQuestion[] = [
  {
    id: 1,
    category: "JavaScript Engines",
    question: "What is the output of the following asynchronous code?",
    codeSnippet: `console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`,
    options: ["A, B, C, D", "A, D, C, B", "A, D, B, C", "A, C, D, B"],
    correctAnswerIndex: 1,
    explanation:
      "Promises use the microtask queue, which is prioritized and processed completely before the macrotask queue used by setTimeout. Thus, 'C' logs before 'B'.",
  },
  {
    id: 2,
    category: "React Architecture",
    question:
      "Why is it considered dangerous to use an array's `index` as a `key` in a React list?",
    options: [
      "It causes the application to crash.",
      "React cannot parse numbers as keys.",
      "It can cause bugs with component state if the list items are reordered, inserted, or deleted.",
      "It bypasses the Virtual DOM entirely.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "If the list order changes, React might reuse the old DOM elements and internal state for the wrong items because the keys (indices) remained the same.",
  },
  {
    id: 3,
    category: "Next.js App Router",
    question:
      "In the Next.js App Router, what is the default rendering behavior of a newly created component?",
    options: [
      "It is a Client Component.",
      "It is a React Server Component (RSC).",
      "It is statically generated at build time, but hydrates completely on the client.",
      "It throws an error unless you add 'use client' or 'use server'.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "By default, all components in the Next.js App Router are Server Components. They render exclusively on the server and send zero JavaScript to the client unless you explicitly opt-in with 'use client'.",
  },
  {
    id: 4,
    category: "TypeScript",
    question:
      "In TypeScript, what is a primary difference between an `interface` and a `type` alias?",
    options: [
      "Interfaces can only be used for classes, while types are for functions.",
      "Interfaces can be re-opened and merged (declaration merging), while types are closed.",
      "Types compile to JavaScript objects, while interfaces are erased.",
      "There is no difference; they are strictly identical under the hood.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Interfaces support 'declaration merging', meaning you can declare the same interface multiple times and TypeScript will merge them. Type aliases cannot be changed once declared.",
  },
  {
    id: 5,
    category: "CSS Layouts",
    question:
      "Which CSS layout strategy is best suited for controlling both rows and columns simultaneously?",
    options: [
      "Flexbox",
      "CSS Grid",
      "Block formatting context",
      "Float layout",
    ],
    correctAnswerIndex: 1,
    explanation:
      "Flexbox is inherently designed for 1-dimensional layouts (either a row OR a column). CSS Grid is specifically built to handle complex 2-dimensional layouts (both rows AND columns at the same time).",
  },
  {
    id: 6,
    category: "Web Performance",
    question:
      "What does the term 'Hydration' refer to in modern web frameworks like Next.js?",
    options: [
      "Minifying and compressing JavaScript files for faster downloads.",
      "Caching database queries on the edge network.",
      "The process of attaching React event listeners to the static HTML sent from the server.",
      "Pre-loading images before they enter the viewport.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Hydration is the process where React 'wakes up' the static, non-interactive HTML sent by the server, attaching event listeners and state to make it a fully interactive Single Page Application.",
  },
  {
    id: 7,
    category: "React Hooks",
    question:
      "What happens if you provide an empty dependency array `[]` to a `useEffect` hook?",
    options: [
      "The effect runs after every single render.",
      "The effect only runs once when the component mounts.",
      "The effect never runs.",
      "The effect causes an infinite loop.",
    ],
    correctAnswerIndex: 1,
    explanation:
      "An empty dependency array tells React that the effect does not depend on any changing state or props, so it only needs to execute exactly once upon the initial mount.",
  },
  {
    id: 8,
    category: "TypeScript",
    question:
      "What does the `<T>` represent in the following TypeScript function?",
    codeSnippet: `function identity<T>(arg: T): T {
  return arg;
}`,
    options: [
      "A specific built-in type for text.",
      "A syntax error; T is not defined.",
      "A generic type variable that captures and preserves the type the user provides.",
      "An HTML tag indicating template output.",
    ],
    correctAnswerIndex: 2,
    explanation:
      "Generics (`<T>`) allow you to create reusable components that adapt to a variety of types rather than a single hardcoded one, ensuring type safety is maintained throughout the function execution.",
  },
  {
    id: 9,
    category: "Web Accessibility (a11y)",
    question:
      "Which HTML attribute should you use to hide a decorative icon from screen readers?",
    options: [
      "alt=''",
      "aria-hidden='true'",
      "role='presentation'",
      "Both aria-hidden='true' for SVGs, or an empty alt='' for images.",
    ],
    correctAnswerIndex: 3,
    explanation:
      'Using `aria-hidden="true"` on inline SVGs/icons or an empty `alt=""` tag on an image tells assistive technologies to completely ignore the element, keeping the screen reader experience clean.',
  },
  {
    id: 10,
    category: "JavaScript Quirks",
    question: "What is the result of `typeof null` in JavaScript?",
    options: ["'null'", "'undefined'", "'object'", "'boolean'"],
    correctAnswerIndex: 2,
    explanation:
      "`typeof null` returning `'object'` is a well-known, historical bug in JavaScript from its original implementation in 1995 that was never fixed in order to avoid breaking legacy websites.",
  },
];
