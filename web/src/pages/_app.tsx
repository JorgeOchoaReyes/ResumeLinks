import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import theme from '../theme';
import React from 'react';

type props = { Component: any, pageProps: any}

const MyApp: React.FC<props> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

export default MyApp
