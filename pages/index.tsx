import { useState, useEffect } from "react";
import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

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
        <div
          className={styles.center}
          aria-live="assertive"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <p className={inter.className}>Loading...</p>
          ) : (
            <p className={inter.className}>
              This is the loaded content. If you enabled a screen reader you
              should hear this text being read. This is because of the{" "}
              <code>aria-live</code> attribute on the parent element.
            </p>
          )}
        </div>
        <button onClick={() => setIsLoading(true)}>Restart Loader</button>
      </main>
    </>
  );
}
