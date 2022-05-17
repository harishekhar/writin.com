import "../styles/globals.css";
import type { AppProps } from "next/app";

import * as Sentry from "@sentry/browser";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
