import { useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function Nested() {
  const [isLoading, setIsLoading] = useState(false);

  function Loader() {
    return <div aria-live="polite">Loading...</div>;
  }

  function startLoader() {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 10000);
    }
  }

  return (
    <>
      <Head>
        <title>Nested aria-live Regions</title>
        <meta
          name="description"
          content="Demonstrate more accessible ways to indicate loading and dynamic content updates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} id="main">
        <h1>Nested aria-live Regions</h1>
        <small>Is there an echo in here?</small>
        <div className={styles.mainWrapper}>
          <div>
            <p>
              This scenario demonstrates whether nested <code>aria-live</code>{" "}
              elements will work together to announce the loading state and
              content updates without duplication. The short answer is{" "}
              <em>yes</em>. <code>aria-live</code> will announce all changes to
              content within this element and does not appear to duplicate
              announcements even though the loader and parent element both have{" "}
              <code>aria-live</code> attributes.
            </p>

            <h2>Expectations</h2>
            <ul>
              <li>
                The screen reader should read out this content on the initial
                render
              </li>
              <li>You should hear an update indicating the loading state </li>
              <li>
                You will hear the screen reader read the initial content again
                when the loading state concludes
              </li>
            </ul>
          </div>
          <Nav />
        </div>

        <div
          className={`${styles.center} ${styles.demo}`}
          id="demo"
          aria-live="polite"
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <div className={inter.className}>
              This is the loaded content. You should hear the screen reader
              announce this conent on the initial render, the loading state, and
              read the content again after the loading state concludes. This, in
              my opinion, is probably a common scenario that developers will
              encounter. There may be differences with how other AT treats
              nested aria attributes.
            </div>
          )}
        </div>
        <button className={styles.buttonPrimary} onClick={() => startLoader()}>
          Start Loader
        </button>
      </main>
    </>
  );
}
