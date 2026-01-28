import "./globals.css";
import { Inter } from "next/font/google";

import { ThemeContextProvider } from "@/context/ThemeContext";
import { AlertProvider } from "@/context/AlertContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeContextProvider>
          <AlertProvider>
          {children}
          </AlertProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
