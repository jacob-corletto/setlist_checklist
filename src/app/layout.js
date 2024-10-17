import { Inter } from "next/font/google";
import "./globals.css";
import DropdownMenu from "@/components/DropdownMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Setlist Checklist",
  description: "The checklist for your next concert",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="justify-around bg-grey">
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

        <div className="flex flex-col w-full items-center justify-between">
          <footer className="bg-white rounded-lg shadow m-4 dark:bg-gray-800 bottom-0 left-50">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2023{" "}
                <a href="https://flowbite.com/" className="hover:underline">
                  Setlist Checklist
                </a>
                . All Rights Reserved.
              </span>
              <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline me-4 md:me-6">
                    Licensing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
