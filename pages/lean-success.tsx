import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.scss";

class LeanSuccess extends React.Component<any, any> {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Head>
          <title>Bonokey | Success</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className={styles.search}>
          <div className={styles.wrapper}>
            <h1 className={styles.mainTitle}>
              The connection to the bank has been established
            </h1>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
    );
  }
}

export default LeanSuccess;
