import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 w-full h-20 bg-background/90 backdrop-blur-md border-b border-outline-variant flex items-center px-6 md:px-margin-desktop z-50">
      <Link
        href="/"
        className="font-headline-md text-[24px] text-primary font-bold hover:opacity-70 transition-opacity tracking-tight"
      >
        JS100
      </Link>
    </header>
  );
}
