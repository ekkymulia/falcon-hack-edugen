import { Inter } from "next/font/google";
import "./globals.css";
import { JotaiProviders } from "@/components/jotaiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProviders>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {children}
        </main>
        </JotaiProviders>
      </body>
    </html>
  );
}
