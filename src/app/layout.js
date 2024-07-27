import { Inter } from "next/font/google";
import "./globals.css";
import { JotaiProviders } from "@/components/jotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Grab",
  description: "Grab Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProviders>
        <main className="flex min-h-screen flex-col items-center justify-between">
          {children}
        </main>
        </JotaiProviders>
      </body>
    </html>
  );
}
