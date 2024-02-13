import { AppProps } from "next/app";
import { AuthProvider } from '../context/AuthContext';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import "../styles/globals.css";
import "../styles/font.css";

import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import Script from "next/script";

const CaptchaDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Init AOS for animations
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  return (
    // The Grid is needed so the footer is always at the bottom of the page (Event when there is not enough content to fill the page)
    <div className="flex flex-col h-full">
      {/* <div id="lean-link"></div>
      <CaptchaDiv>
        <div id="recaptcha-container"></div>
      </CaptchaDiv> */}

      <main className="relative">
        <AuthProvider>
          <Layout>
            <Component className="flex flex-1" {...pageProps} />
          </Layout>
        </AuthProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            error: {
              duration: 7000, // Display error toast for 7 sec
            },
          }}
        />
      </main>
      <Script src="https://cdn.leantech.me/sa/link/sdk/web/latest/Lean.min.js" />
    </div>
  );
}

export default App;
