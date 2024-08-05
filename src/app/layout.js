import { Inter } from "next/font/google";
import "./globals.css";
import { JotaiProviders } from "@/components/jotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EdugenAI",
  description: "Education with Falcon Generative AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProviders>
        <main className="">
          {children}
        </main>
        </JotaiProviders>
      </body>
    </html>
  );
}
