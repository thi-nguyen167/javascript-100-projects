"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ChevronDown, ArrowBigUpDash } from "lucide-react";
import { projectsData } from "../../lib/data";

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
