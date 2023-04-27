import { useState } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import Nav from "../components/Nav";

const inter = Inter({ subsets: ["latin"] });

export default function AriaParent() {
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
        <title>aria-live and aria-busy on Parent Element</title>
        <meta
          name="description"
          content="Demonstrate more accessible ways to indicate loading and dynamic content updates"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>aria-live and aria-busy on Parent Element</h1>
        <small>Maybe this will work...</small>
        <div className={styles.mainWrapper}>
          <div>
            <p>
              This scenario demonstrates whether including{" "}
              <code>aria-live</code> and <code>aria-busy</code> on the{" "}
              <em>parent element</em> will announce the loading state and
              content updates as we might expect. The short answer is{" "}
              <em>sort of</em>. <code>aria-live</code> will announce changes to
              content, but again <code>aria-busy</code> tells the assistive
              technology to <em>wait</em> on announcements until the{" "}
              <code>aria-busy</code> attribute is set to <code>false</code>.
              This <em>will</em> happen because the <code>aria</code> attributes
              are included on the parent element, which is always present in the
              DOM, and will therefore announce changes. However, keep in mind
              that it will not announce the Loading state because of{" "}
              <code>aria-busy</code>.
            </p>

            <h2>Expectations</h2>
            <ul>
              <li>
                The screen reader should read out this content on the initial
                render
              </li>
              <li>
                You should not hear any updates indicating the loading state{" "}
              </li>
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
          aria-live="polite"
          aria-busy={isLoading}
        >
          {isLoading && <Loader />}
          {!isLoading && (
            <div className={inter.className}>
              This is the loaded content. You should hear the screen reader
              announce this conent on the initial render, but not announce
              anything until after the loading state is completed. This is still
              not a good solution, as the user had no idea that something was
              loading.
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
