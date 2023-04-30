import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import DefaultLayout from '@/components/layouts/default'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { wrapper } from "../store/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}


function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <ChakraProvider>
      <DefaultLayout>
        {
          getLayout(<Component {...pageProps} />)
        }
      </DefaultLayout>
    </ChakraProvider>
  )
}

export default wrapper.withRedux(App);
