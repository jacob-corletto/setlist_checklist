import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Setlist Checklist",
  description: "The checklist for your next concert",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="text-gray-900 bg-black font-serif">
      <body className="justify-around">
        {children}
        <Footer />
      </body>
    </html>
  );
}
