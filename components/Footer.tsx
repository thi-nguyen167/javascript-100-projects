import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-margin-desktop py-16 flex flex-col md:flex-row justify-between border-t border-outline-variant mt-auto bg-surface-container-low/30">
      <div>
        <p className="font-headline-md text-primary font-bold">JS100</p>
        <p className="font-label-xs text-[10px] text-secondary mt-2 tracking-widest uppercase">
          100 JAVASCRIPT PROJECT CHALLENGE.
          <br />
          DESIGNED & DEVELOPED BY THI NGUYEN 2026.
        </p>
      </div>

      <div className="flex gap-12 mt-8 md:mt-0">
        <div className="flex flex-col gap-2">
          <span className="font-label-xs font-bold uppercase tracking-widest text-primary mb-2">
            Community
          </span>
          <Link
            href="#"
            className="text-xs font-label-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            Guidelines
          </Link>
          <Link
            href="#"
            className="text-xs font-label-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors"
          >
            GitHub
          </Link>
        </div>
      </div>
    </footer>
  );
}
