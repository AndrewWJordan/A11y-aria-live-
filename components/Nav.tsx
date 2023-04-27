import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Nav() {
  return (
    <nav className={`${styles.nav} ${inter.className}`}>
      <Link href="#demo" className={styles.visuallyHidden}>
        Skip to content
      </Link>
      <h2>Examples</h2>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/dynamic-loader">Dynamic Loader w/ aria</Link>
        </li>
        <li>
          <Link href="/aria-parent">Parent Element w/ aria</Link>
        </li>
        <li>
          <Link href="/aria-parent-working">
            Parent Element w/ aria - Working
          </Link>
        </li>
      </ul>
    </nav>
  );
}
