import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata = {
  title: "URL Saver",
  description: "Save URLs and access them at ease.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex items-center justify-center min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
