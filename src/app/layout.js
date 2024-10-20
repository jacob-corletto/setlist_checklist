import { Inter } from "next/font/google";
import "./globals.css";
import DropdownMenu from "@/components/DropdownMenu";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Setlist Checklist",
  description: "The checklist for your next concert",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" class="text-gray-900 bg-black font-serif" >
      <body className="justify-around"> 
        <nav className="flex items-center justify-around bg-black p-4">
          <h1 className="text-2xl font-bold text-white">
            <a href="/">logo</a>
          </h1>
          <ul className="flex space-x-4 items-center">
            <DropdownMenu />
            <li>
              <a href="/" className="text-white hover:text-gray-300">
                {" "}
                About{" "}
              </a>
            </li>
          </ul>
        </nav>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
