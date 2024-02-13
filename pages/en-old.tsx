import React, { useEffect } from "react";
import Contact from "../components/newHome/Contact";
import Footer from "../components/newHome/Footer";
import Hero from "../components/newHome/Hero";
import NavBar from "../components/newHome/NavBar";
import Offers from "../components/newHome/Offers";
import SearchBar from "../components/newHome/SearchBar";
import WhyUs from "../components/newHome/WhyUs";
import Head from "next/head";
import styled from "styled-components";
import { brandColors } from "../utils/helpers";
import NewSearchBar from "../components/new/NewSearchBar";
import NewHero from "../components/new/NewHero";
import NewWhyUs from "../components/new/NewWhyUs";
import NewContact from "../components/new/NewContact";
import { AnalyticsBrowser } from "@segment/analytics-next";

const analytics = AnalyticsBrowser.load({
  writeKey: "BBZmEer22jLupVHfv4fSX3lzGhQE9Lts",
});

const SearchBarDiv = styled.div`
  background: linear-gradient(
    180deg,
    ${brandColors.transparent} 50%,
    ${brandColors.captionBlack}12 50%
  );
`;

function English() {
  useEffect(() => {
    analytics.track("Page Viewed", {
      category: "English",
      label: "Home Page",
    });
  }, []);
  return (
    <>
      {/* <Head>
        <title>Bonokey - Best loan offer comparisons</title>
        <meta
          name="description"
          content="Looking for the best loan offer? Bonokey makes it easy by allowing you to compare loan offers from different banks. Our platform offers a hassle-free way to find the loan that meets your financial needs. Start comparing today and find the best loan offer for you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewHero />
      <NewSearchBar
        isOnHomePage={true}
        searchFunction={null}
        monthlySalary={0}
        loanAmount={0}
        jobSector={""}
        duration={0}
        useMaxLoan={false}
      /> */}

      <Head>
        <title>Bonokey - Best loan offer comparisons</title>
        <meta
          name="description"
          content="Looking for the best loan offer? Bonokey makes it easy by allowing you to compare loan offers from different banks. Our platform offers a hassle-free way to find the loan that meets your financial needs. Start comparing today and find the best loan offer for you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero />
      <SearchBar
        isOnHomePage={true}
        searchFunction={null}
        monthlySalary={0}
        loanAmount={0}
        jobSector={""}
        duration={0}
        useMaxLoan={false}
      />

      {/* <NewWhyUs />
      <NewContact /> */}
      <WhyUs />
      {/* <Offers /> */}
      <Contact />
    </>
  );
}

export default English;
