import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(!setIsLoading);
    }, 10000);

    return () => clearTimeout(timer);
  }, [isLoading]);
  return (
    <>
      <Head>
        <title>Aria-live and aria-busy demo</title>
        <meta
          name="description"
          content="Demonstrate more accessible ways to indicate loading and dynamic content updates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Accessibility and Dynamic Content</h1>
        <small>Pitfalls for Assistive Technology (AT) Users</small>
        <div className={styles.mainWrapper}>
          <div>
            <p>
              This was a knowledge quest I embarked on to help me gain a better
              understanding of <code>aria-live</code> and how it can help us
              create a better user experience for users of assistive technology.
              I hope others find this helpful too.
            </p>
            <p>
              Dynamic content is a frequent pattern, but a lot of the changes
              are visual. An AT user may be unaware of an interaction that
              triggered a fetch or that content updated on another part of the
              page as a result (notice the loader below).
            </p>
            <p>
              What about loading indicators? How would they know one just popped
              up on their screen without some indication of what is happening.
              How can we make a better user experience for <em>EVERYONE</em>?
            </p>
            <p>
              So break out a screen reader (I&apos;m using VoiceOver on Mac OS)
              and go through these pages. Please share your findings.
            </p>
          </div>
          <Nav />
        </div>

        <div className={`${styles.center} ${styles.demo}`}>
          {isLoading ? (
            <p className={inter.className}>Loading...</p>
          ) : (
            <p className={inter.className}>
              Here&apos;s some content. <code>aria-live</code> is not included
              on any elements on this page. How do you suppose someone who
              cannot see the page would know something just loaded? Is your
              screen reader on? Click the button and imagine this was some super
              important information that the AT user was hoping to understand.
            </p>
          )}
        </div>
        <button
          className={styles.buttonPrimary}
          onClick={() => setIsLoading(true)}
        >
          Restart Loader
        </button>
      </main>
    </>
  );
}
