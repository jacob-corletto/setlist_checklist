import { Inter } from "next/font/google";
import "./globals.css";
// import styles from '../Styles/Nav.module.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Setlist Checklist",
  description: "The checklist for your next concert",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-black border-gray-200 dark:bg-gray-900">
          <h1>logo</h1>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/">home</a>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
