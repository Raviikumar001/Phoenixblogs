import React, {useEffect, useState} from 'react'
import { Layout } from '../components'
import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import * as gtag from "../lib/gtag";

import { useRouter } from "next/router";

const isProduction = process.env.NODE_ENV === "production";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;