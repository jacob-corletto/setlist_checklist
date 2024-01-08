import { Inter } from 'next/font/google'
import './globals.css'
import styles from '../Styles/Nav.module.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Setlist Checklist',
  description: 'The checklist for your next concert',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className={styles.nav}>
          <h1 className={styles.h1}>logo</h1>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <a className={styles.a} href="/about">About</a>
            </li>
            <li className={styles.li}>
              <a className={styles.a} href='/'>home</a>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  )
}
