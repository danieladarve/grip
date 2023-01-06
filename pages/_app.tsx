import "../styles/globals.css";

import type { AppProps } from "next/app";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useGripStore } from "../store/grip-slice";
import { useEffect } from "react";

export default function MyApp({ Component, pageProps }: AppProps) {
  const { menuOpen } = useGripStore();

  useEffect(() => {
    const sectionMain: HTMLDivElement = document.querySelector("section.main");

    const main: HTMLElement = document.querySelector("main");

    if (sectionMain && main) {
      sectionMain.classList.toggle("menu-open", menuOpen);
      main.classList.toggle("menu-open", menuOpen);
    }
  }, [menuOpen]);

  useEffect(() => {
    const appHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--main-app-height", `${window.innerHeight}px`);
    };

    window.addEventListener("resize", appHeight);
    appHeight();

    return () => window.removeEventListener("resize", appHeight);
  }, []);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      <Component {...pageProps} />
    </GoogleReCaptchaProvider>
  );
}
