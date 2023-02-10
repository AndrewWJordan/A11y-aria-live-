import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  function Loader() {
    return (
      <div>
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
        <div className={styles.center}>
          {isLoading && <Loader />}
          {!isLoading && (
            <div className={inter.className}>
              This is the loaded content. If you enabled a screen reader you
              should hear this text being read to you. This is because of the{" "}
              <code>aria-live</code> attribute on the parent element.
            </div>
          )}
        </div>
        <button onClick={() => startLoader()}>Start Loader</button>
      </main>
    </>
  );
}
