"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, ArrowBigUpDash } from "lucide-react";

const projectsData = [
  // LEVEL 1 (1-25)
  {
    id: 1,
    title: "Counter App",
    desc: "Increment, decrement, step size selector, and min/max limits.",
    level: 1,
  },
  {
    id: 2,
    title: "Color Generator",
    desc: "Random color engine with a 'Click to Copy' clipboard button.",
    level: 1,
  },
  {
    id: 3,
    title: "World Clock",
    desc: "Live clock with time zone selection capabilities.",
    level: 1,
  },
  {
    id: 4,
    title: "Quote Generator",
    desc: "Pull quotes locally with a favorite/bookmark list feature.",
    level: 1,
  },
  {
    id: 5,
    title: "Quiz App",
    desc: "Single-page quiz with immediate feedback and score calculation.",
    level: 1,
  },
  {
    id: 6,
    title: "Expense Tracker",
    desc: "Add income/expense items and view current net balance.",
    level: 1,
  },
  {
    id: 7,
    title: "Tip Calculator",
    desc: "Calculates bill splits with customizable tip percentages.",
    level: 1,
  },
  {
    id: 8,
    title: "Accordion Widget",
    desc: "Collapsible UI with smooth open/close toggling.",
    level: 1,
  },
  {
    id: 9,
    title: "Modal Dialog System",
    desc: "Reusable modal window triggered by clicks, esc key, and backdrop clicks.",
    level: 1,
  },
  {
    id: 10,
    title: "Character Counter",
    desc: "Live counter with character limits and warning indicators for textareas.",
    level: 1,
  },
  {
    id: 11,
    title: "To-Do List",
    desc: "Full CRUD list stored in browser memory.",
    level: 1,
  },
  {
    id: 12,
    title: "Image Slider",
    desc: "Carousel featuring auto-play, pause-on-hover, and manual controls.",
    level: 1,
  },
  {
    id: 13,
    title: "Countdown Timer",
    desc: "Input target date/time to build an active event countdown.",
    level: 1,
  },
  {
    id: 14,
    title: "Unit Converter",
    desc: "Convert values across length, weight, and temperature metrics.",
    level: 1,
  },
  {
    id: 15,
    title: "Filterable Grid",
    desc: "Instant search bar and category selection filters for dynamic UI items.",
    level: 1,
  },
  {
    id: 16,
    title: "Form Validator",
    desc: "Instant feedback for email format, password strength, and match verification.",
    level: 1,
  },
  {
    id: 17,
    title: "Stopwatch",
    desc: "Millisecond timer featuring split-time and lap logging.",
    level: 1,
  },
  {
    id: 18,
    title: "Password Generator",
    desc: "Generate secure passwords based on length and character type toggles.",
    level: 1,
  },
  {
    id: 19,
    title: "Memory Match Game",
    desc: "4x4 card grid with flip animations, match logic, and move tracking.",
    level: 1,
  },
  {
    id: 20,
    title: "RPS Game",
    desc: "Interactive game featuring score persistence and win animations.",
    level: 1,
  },
  {
    id: 21,
    title: "Star Rating",
    desc: "Hover preview and selection rating control.",
    level: 1,
  },
  {
    id: 22,
    title: "Tabbed Navigation",
    desc: "Swappable tab content panels loaded dynamically.",
    level: 1,
  },
  {
    id: 23,
    title: "Read More Toggle",
    desc: "Dynamic text truncation and smooth expansion controls.",
    level: 1,
  },
  {
    id: 24,
    title: "Table Filter",
    desc: "Filter and sort dynamic HTML data table rows in real time.",
    level: 1,
  },
  {
    id: 25,
    title: "Theme Switcher",
    desc: "Theme toggle saved in localStorage to preserve user preferences.",
    level: 1,
  },

  // LEVEL 2 (26-50)
  {
    id: 26,
    title: "Weather Dashboard",
    desc: "Fetch live weather data using OpenWeather API with 5-day forecasts.",
    level: 2,
  },
  {
    id: 27,
    title: "Movie Finder App",
    desc: "Search movies via the OMDB API with detail modal previews.",
    level: 2,
  },
  {
    id: 28,
    title: "GitHub Profile Search",
    desc: "Query GitHub API to display stats, top repositories, and activity.",
    level: 2,
  },
  {
    id: 29,
    title: "Crypto Price Tracker",
    desc: "Real-time crypto price dashboard with auto-refreshing polling.",
    level: 2,
  },
  {
    id: 30,
    title: "Recipe Finder",
    desc: "Search recipes by ingredients using Spoonacular API.",
    level: 2,
  },
  {
    id: 31,
    title: "Infinite Scroll Gallery",
    desc: "Load dynamic images continuously using Unsplash API.",
    level: 2,
  },
  {
    id: 32,
    title: "Pokédex Web App",
    desc: "Paginated Pokémon directory with detailed stats using PokeAPI.",
    level: 2,
  },
  {
    id: 33,
    title: "Currency Converter",
    desc: "Live currency conversions utilizing exchange rate APIs.",
    level: 2,
  },
  {
    id: 34,
    title: "GitHub Issue Tracker",
    desc: "Fetch and paginate repositories' open/closed issues.",
    level: 2,
  },
  {
    id: 35,
    title: "TTS & STT",
    desc: "Audio reader built with the native Web Speech API.",
    level: 2,
  },
  {
    id: 36,
    title: "Kanban Board",
    desc: "Trello-like task board built using standard HTML5 Drag and Drop API.",
    level: 2,
  },
  {
    id: 37,
    title: "File Dropzone",
    desc: "Drag-and-drop file uploader with live thumbnail image previewing.",
    level: 2,
  },
  {
    id: 38,
    title: "Markdown Editor",
    desc: "Split-screen editor translating Markdown text into rendered HTML.",
    level: 2,
  },
  {
    id: 39,
    title: "Custom Video Player",
    desc: "HTML5 video controls with custom scrubbing, playback speed, and volume.",
    level: 2,
  },
  {
    id: 40,
    title: "News Aggregator",
    desc: "Categorized news articles fetched from a live News API with search capabilities.",
    level: 2,
  },
  {
    id: 41,
    title: "Virtual Soundboard",
    desc: "Keyboard event-driven sound triggers using Web Audio.",
    level: 2,
  },
  {
    id: 42,
    title: "Visual Expense Tracker",
    desc: "Budget dashboard with dynamic graph rendering via Chart.js.",
    level: 2,
  },
  {
    id: 43,
    title: "Bookmark Manager",
    desc: "URL bookmark storage with auto-fetched site favicon previews.",
    level: 2,
  },
  {
    id: 44,
    title: "Shopping Cart Engine",
    desc: "Quantity updating, tax computation, discount code validation, and state saving.",
    level: 2,
  },
  {
    id: 45,
    title: "Sticky Notes",
    desc: "Drag-and-drop, color-coded sticky notes on a virtual corkboard.",
    level: 2,
  },
  {
    id: 46,
    title: "Quiz Leaderboard",
    desc: "Quiz game using IndexedDB to store user high scores offline.",
    level: 2,
  },
  {
    id: 47,
    title: "Multi-Step Form",
    desc: "Complex registration workflow with step validation and global state.",
    level: 2,
  },
  {
    id: 48,
    title: "Location Explorer",
    desc: "Native Geolocation API mapped using Leaflet.js interactive maps.",
    level: 2,
  },
  {
    id: 49,
    title: "WYSIWYG Editor",
    desc: "Mini text editor with bold, italic, list, and header formatting.",
    level: 2,
  },
  {
    id: 50,
    title: "Habit Tracker Grid",
    desc: "Monthly habit completion tracker rendered as a GitHub-style activity grid.",
    level: 2,
  },

  // LEVEL 3 (51-75)
  {
    id: 51,
    title: "Classic Snake Game",
    desc: "Canvas-rendered Snake game with food generation and collision engines.",
    level: 3,
  },
  {
    id: 52,
    title: "Breakout Game",
    desc: "Canvas game featuring ball physics, paddle controls, and destructibles.",
    level: 3,
  },
  {
    id: 53,
    title: "2D Platformer Engine",
    desc: "Physics sandbox with gravity, jumping mechanics, platforms, and collision detection.",
    level: 3,
  },
  {
    id: 54,
    title: "Canvas Paint App",
    desc: "Draw app featuring adjustable brushes, color pickers, and undo/redo stacks.",
    level: 3,
  },
  {
    id: 55,
    title: "Audio Spectrum",
    desc: "Real-time audio frequency visualizer using Web Audio API and Canvas.",
    level: 3,
  },
  {
    id: 56,
    title: "Pixel Art Studio",
    desc: "Grid-based pixel canvas with export functionality to PNG.",
    level: 3,
  },
  {
    id: 57,
    title: "Typing Speed Test",
    desc: "Speed typing evaluator tracking WPM, accuracy percentages, and real-time error highlights.",
    level: 3,
  },
  {
    id: 58,
    title: "Periodic Table",
    desc: "Searchable periodic table displaying element dynamic detail cards.",
    level: 3,
  },
  {
    id: 59,
    title: "Virtual Piano",
    desc: "Keyboard/mouse playable synth using Web Audio sound synthesizer nodes.",
    level: 3,
  },
  {
    id: 60,
    title: "Form Builder",
    desc: "Drag UI elements onto a canvas to construct dynamic custom forms.",
    level: 3,
  },
  {
    id: 61,
    title: "Financial Dashboard",
    desc: "Transaction filter system rendering multi-chart analytics reports.",
    level: 3,
  },
  {
    id: 62,
    title: "Event Calendar",
    desc: "Interactive calendar featuring drag-and-drop event scheduling.",
    level: 3,
  },
  {
    id: 63,
    title: "Infinite Canvas",
    desc: "Pan and zoom infinite workspace engine built on Canvas transform matrix operations.",
    level: 3,
  },
  {
    id: 64,
    title: "File Tree Visualizer",
    desc: "Tree-view component mapping nested object hierarchies.",
    level: 3,
  },
  {
    id: 65,
    title: "Algorithm Visualizer",
    desc: "Animated visual representations of Bubble, Selection, Quick, and Merge Sort.",
    level: 3,
  },
  {
    id: 66,
    title: "Pathfinding Visualizer",
    desc: "Graphical visualization of Dijkstra's and A* pathfinding algorithms on a grid.",
    level: 3,
  },
  {
    id: 67,
    title: "Real-Time Canvas",
    desc: "Multi-user shared drawing board powered by WebSockets.",
    level: 3,
  },
  {
    id: 68,
    title: "Code Editor",
    desc: "Custom editor with basic syntax highlighting and dynamic iframe preview rendering.",
    level: 3,
  },
  {
    id: 69,
    title: "Sprite Animator",
    desc: "Dynamic animation engine controlling frame rate and sprite sheet offsets.",
    level: 3,
  },
  {
    id: 70,
    title: "Voice Note-Taker",
    desc: "Voice-controlled note taker featuring hands-free commands.",
    level: 3,
  },
  {
    id: 71,
    title: "Spreadsheet Engine",
    desc: "Mini Excel engine parsing dynamic formulas like =SUM(A1:A5).",
    level: 3,
  },
  {
    id: 72,
    title: "Screen Recorder",
    desc: "Screen capture and video recording tool powered by MediaRecorder API.",
    level: 3,
  },
  {
    id: 73,
    title: "Particle System",
    desc: "Interactive particle system with gravity, mouse attraction, and particle lifespans.",
    level: 3,
  },
  {
    id: 74,
    title: "Offline-First PWA",
    desc: "Full Progressive Web App utilizing Service Workers for offline caching and push alerts.",
    level: 3,
  },
  {
    id: 75,
    title: "Pomodoro App",
    desc: "Configurable timer featuring background Web Workers and sound notifications.",
    level: 3,
  },

  // LEVEL 4 (76-100)
  {
    id: 76,
    title: "Virtual DOM Library",
    desc: "Lightweight React-like framework featuring virtual DOM diffing and rendering.",
    level: 4,
  },
  {
    id: 77,
    title: "SPA Router",
    desc: "Framework-free router utilizing the Browser History API and Hash Routing.",
    level: 4,
  },
  {
    id: 78,
    title: "State Management",
    desc: "Global store management system implementing dynamic subscriptions (Redux/Pinia clone).",
    level: 4,
  },
  {
    id: 79,
    title: "Markdown Compiler",
    desc: "Custom regex and token-based markdown parser converting text into HTML elements.",
    level: 4,
  },
  {
    id: 80,
    title: "Promise Engine",
    desc: "Custom implementation adhering to the core Promises/A+ specification.",
    level: 4,
  },
  {
    id: 81,
    title: "Sandboxed REPL",
    desc: "JavaScript execution environment running safely inside sandboxed iframe contexts.",
    level: 4,
  },
  {
    id: 82,
    title: "JSON Parser",
    desc: "Lexer and parser parsing stringified JSON into JavaScript structures.",
    level: 4,
  },
  {
    id: 83,
    title: "3D Solar System",
    desc: "Interactive 3D planetary model engine built with Three.js.",
    level: 4,
  },
  {
    id: 84,
    title: "Regex Visualizer",
    desc: "Engine showing step-by-step regex execution and matching across sample text.",
    level: 4,
  },
  {
    id: 85,
    title: "Image Compressor",
    desc: "In-browser image compressor using Canvas toBlob and file conversion.",
    level: 4,
  },
  {
    id: 86,
    title: "Terminal Simulator",
    desc: "Interactive command line interface with executable virtual file system commands.",
    level: 4,
  },
  {
    id: 87,
    title: "P2P Multiplayer Game",
    desc: "Peer-to-peer multiplayer game synchronized over WebRTC.",
    level: 4,
  },
  {
    id: 88,
    title: "Math Evaluator",
    desc: "Mathematical expression parser built using the Shunting-Yard algorithm.",
    level: 4,
  },
  {
    id: 89,
    title: "P2P File Transfer",
    desc: "Direct file transfer tool passing data channels directly over WebRTC connection.",
    level: 4,
  },
  {
    id: 90,
    title: "Finite State Machine",
    desc: "Configurable state machine library visualizing transitions and state flow.",
    level: 4,
  },
  {
    id: 91,
    title: "RSS Feed Aggregator",
    desc: "Reader engine fetching, parsing, and caching XML feeds via Service Workers.",
    level: 4,
  },
  {
    id: 92,
    title: "Network Visualizer",
    desc: "Force-directed network graph engine positioning interactive nodes in real time.",
    level: 4,
  },
  {
    id: 93,
    title: "Static Site Generator",
    desc: "Node.js generator tool converting markdown source files into built HTML sites.",
    level: 4,
  },
  {
    id: 94,
    title: "Audio Synthesizer",
    desc: "Browser synthesizer featuring custom sound oscillators, gain controls, and ADSR envelopes.",
    level: 4,
  },
  {
    id: 95,
    title: "Game Engine",
    desc: "Mini 2D engine featuring gameloop ticks, entity-component systems (ECS), and input mapping.",
    level: 4,
  },
  {
    id: 96,
    title: "Code Diff Viewer",
    desc: "Side-by-side text comparison engine highlighting additions and deletions.",
    level: 4,
  },
  {
    id: 97,
    title: "Database Engine",
    desc: "Query engine built on top of IndexedDB supporting indexing and complex filtering.",
    level: 4,
  },
  {
    id: 98,
    title: "Schema Parser",
    desc: "Custom domain-specific schema parser enforcing object validation rules.",
    level: 4,
  },
  {
    id: 99,
    title: "WebGL Fluid Engine",
    desc: "WebGL shader simulation rendering fluid physics interactions.",
    level: 4,
  },
  {
    id: 100,
    title: "JS AST Linter",
    desc: "Syntax parser constructing Abstract Syntax Trees (AST) to evaluate custom linting rules.",
    level: 4,
  },
];

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

// Stable color generator based on ID
const getStableColor = (id: number) => {
  const colors = [
    "#F1BFA8",
    "#C03CFA",
    "#979A8F",
    "#1F5E9A",
    "#5D2B1C",
    "#58697A",
    "#CF9D4F",
  ];
  return colors[id % colors.length];
};

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("oldest");
  const [search, setSearch] = useState("");
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // If user scrolls down more than 500px, show the button
      setShowTopBtn(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const processedProjects = projectsData
    .filter((p) => {
      const query = search.toLowerCase();
      const matchesSearch =
        p.title.toLowerCase().includes(query) ||
        p.desc.toLowerCase().includes(query);
      const matchesFilter = filter === "all" || p.level.toString() === filter;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      return sort === "newest" ? b.id - a.id : a.id - b.id;
    });

  return (
    <div className="flex-1 w-full flex flex-col">
      {/* Hero Section */}
      <section className="max-w-7xl px-6 md:px-margin-desktop py-16 md:py-24 mx-auto w-full">
        <span className="font-label-xs text-label-xs uppercase tracking-widest text-secondary mb-4 block">
          Interactive Roadmap
        </span>
        <h2 className="font-semibold font-headline-xl text-headline-xl text-primary leading-tight">
          The JS Journal:
          <br />
          100 Masterclasses
        </h2>
        <p className="font-body-lg text-body-lg text-secondary mt-8 max-w-lg leading-relaxed">
          A definitive catalog of vanilla JavaScript mechanics. Bridging the gap
          between raw scripting and modern frameworks.
        </p>
      </section>

      {/* Filter/Search Bar */}
      <section className="px-6 md:px-margin-desktop pb-8 border-b border-outline-variant flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-wrap gap-3">
          {[
            { id: "all", label: "All Projects" },
            { id: "1", label: "DOM & State" },
            { id: "2", label: "Async & APIs" },
            { id: "3", label: "Canvas & Graphics" },
            { id: "4", label: "Architecture" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-4 py-1.5 rounded-full border font-label-xs uppercase tracking-widest text-[10px] transition-colors ${
                filter === btn.id
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline-variant hover:border-primary bg-transparent text-primary"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row md:flex-wrap items-center gap-6 w-full lg:w-auto justify-between lg:justify-end">
          <div className="flex gap-2 items-center bg-surface-container px-4 py-2 rounded-full border border-outline-variant/30 flex-1 lg:flex-none">
            <Search />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-sm w-full lg:w-48 font-body-md"
              placeholder="Search projects..."
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="font-label-xs text-label-xs uppercase tracking-widest text-secondary hidden sm:block">
              Sort:
            </label>
            <div className="relative flex items-center group cursor-pointer">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-transparent border-none py-0 pl-2 pr-5 focus:ring-0 font-label-xs uppercase tracking-widest text-primary font-bold cursor-pointer outline-none"
              >
                <option value="oldest">Oldest First</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="text-sm absolute right-0 pointer-events-none text-primary group-hover:translate-y-px transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Render Grid using JSX */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-[#E2E1DE] border-b border-outline-variant flex-1 w-full">
        {processedProjects.length === 0 ? (
          <div className="p-10 text-secondary col-span-full">
            No projects found matching your criteria.
          </div>
        ) : (
          processedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/${createSlug(project.title)}`}
              className="project-card p-8 md:p-10 flex flex-col group cursor-pointer relative overflow-hidden bg-background hover:bg-[#f6f3f2] transition-colors duration-200 text-current no-underline w-full"
            >
              <div className="flex justify-between items-start mb-12 md:mb-16">
                <span className="font-label-xs text-[32px] md:text-[40px] font-extrabold text-outline-variant/30 group-hover:text-primary transition-colors duration-500">
                  {project.id.toString().padStart(2, "0")}
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md mb-2 group-hover:translate-x-2 transition-transform duration-300 pr-4">
                {project.title}
              </h3>
              <p className="text-sm text-secondary font-code-sm mb-8 line-clamp-2">
                {project.desc}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-label-xs text-xs uppercase tracking-widest text-secondary">
                  LEVEL {project.level}
                </span>
                <div
                  className="w-6 h-6 rounded-full transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: getStableColor(project.id) }}
                ></div>
              </div>
            </Link>
          ))
        )}
      </section>

      {showTopBtn && (
        <div className="fixed bottom-10 right-10 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={scrollToTop}
            className="bg-primary text-on-primary w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
          >
            <ArrowBigUpDash />
          </button>
        </div>
      )}
    </div>
  );
}
