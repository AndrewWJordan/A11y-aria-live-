import { useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function DynamicLoader() {
  const [isLoading, setIsLoading] = useState(false);

  function Loader() {
    return (
      <div aria-live="polite" aria-busy={isLoading}>
        Loading...
      </div>
    );
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
        <title>Dynamic Loader Test w/ aria-live and aria-busy</title>
        <meta
          name="description"
          content="Demonstrate more accessible ways to indicate loading and dynamic content updates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>The Problem With Dynamic Content</h1>
        <small>And how to fix it</small>
        <div className={styles.mainWrapper}>
          <div>
            <p>
              This scenario demonstrates whether including{" "}
              <code>aria-live</code> and <code>aria-busy</code> on the{" "}
              <em>loading component</em> will communicate the loading state as
              we might expect. The short answer is <em>no</em>.{" "}
              <code>aria-live</code> will announce changes to content, but{" "}
              <code>aria-busy</code> tells the assistive technology to{" "}
              <em>wait</em> on announcements until the <code>aria-busy</code>{" "}
              attribute is set to <code>false</code>. This will <em>never</em>{" "}
              happen because the <code>aria</code> attributes are included on
              the loading element and this element is rendered and then removed
              from the DOM when the loading state changes.
            </p>

            <h2>Expectations</h2>
            <ul>
              <li>
                The screen reader should read out this content on the initial
                render
              </li>
              <li>
                You should not hear any updates indicating the loading state or
                the content update after clicking the button
              </li>
            </ul>
          </div>
          <Nav />
        </div>

        <div className={`${styles.center} ${styles.demo}`} id="demo">
          {isLoading && <Loader />}
          {!isLoading && (
            <div className={inter.className}>
              This is the loaded content. You should hear the screen reader
              announce this conent on the initial render, but not announce
              anything after clicking the button to trigger the dynamic loader
              component. This may not be a good solution.
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
