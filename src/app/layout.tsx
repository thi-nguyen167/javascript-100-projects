import type { Metadata } from "next";
import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Configure the fonts
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "100 JS Projects Challenge",
  description: "A definitive catalog of vanilla JavaScript mechanics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`light ${hanken.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full font-body-md text-body-md overflow-x-hidden bg-background text-primary flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
