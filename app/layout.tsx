import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eugene Novikov — Senior Java Engineer",
  description:
    "Senior Java Software Engineer / Tech Lead. Backend systems, distributed systems, security engineering. Open to opportunities in EU, UK, and USA.",
  openGraph: {
    title: "Eugene Novikov — Senior Java Engineer",
    description:
      "Backend engineer who enjoys making complicated systems boring.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full`}
    >
      <body className="min-h-full font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
