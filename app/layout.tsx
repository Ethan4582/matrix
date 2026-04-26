import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import {
  GeistPixelSquare,
  GeistPixelGrid,
  GeistPixelCircle,
  GeistPixelTriangle,
  GeistPixelLine
} from "geist/font/pixel";
import type { ReactNode } from "react";

import "@/loaders/styles.css";
import "./globals.css";

const fontVariables = [
  GeistSans.variable,
  GeistMono.variable,
  GeistPixelSquare.variable,
  GeistPixelGrid.variable,
  GeistPixelCircle.variable,
  GeistPixelTriangle.variable,
  GeistPixelLine.variable
].join(" ");

export const metadata: Metadata = {
  title: "Dotmatrix Loader Library",
  description: "Dotmatrix-style loading animations with shadcn registry support."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" data-diffkit-extension="1">
      <body
        className={`${GeistPixelCircle.className} ${fontVariables} font-medium antialiased`}
        cz-shortcut-listen="true"
      >
        {children}
      </body>
    </html>
  );
}
