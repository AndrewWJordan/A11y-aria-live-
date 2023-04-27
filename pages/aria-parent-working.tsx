import { useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function AriaParentWorking() {
  const [isLoading, setIsLoading] = useState(false);

  function Loader() {
    return <div>Loading...</div>;
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
        <title>aria-live Only on Parent Element - A Working Example</title>
        <meta
          name="description"
          content="Demonstrate more accessible ways to indicate loading and dynamic content updates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>aria-live Only on Parent Element - A Working Example</h1>
        <small>Now we&apos;re talking...</small>
        <div className={styles.mainWrapper}>
          <div>
            <p>
              This scenario demonstrates whether including only{" "}
              <code>aria-live</code> on the <em>parent element</em> will
              announce the loading state and content updates as we might expect.
              The short answer is <em>yes</em>. <code>aria-live</code> will
              announce all changes to content within this element.
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

        <div className={`${styles.center} ${styles.demo}`} aria-live="polite">
          {isLoading && <Loader />}
          {!isLoading && (
            <div className={inter.className}>
              This is the loaded content. You should hear the screen reader
              announce this conent on the initial render, the loading state, and
              read the content again after the loading state concludes. This, in
              my opinion, is a good solution, as the user had an idea that
              something was loading and the new content was announced.
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
