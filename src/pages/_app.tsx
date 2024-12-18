import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import DefaultLayout from "@/components/layouts/default";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { wrapper } from "../store/store";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  const getLayout = Component.getLayout ?? ((page) => page);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => {
      NProgress.start();
    };

    const handleStop = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <DefaultLayout>
          {getLayout(<Component {...props.pageProps} />)}
        </DefaultLayout>
      </ChakraProvider>
      <Analytics />
    </Provider>
  );
}

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
