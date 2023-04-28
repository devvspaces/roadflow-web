import { ReactNode } from 'react';
import {
  Box, useColorModeValue,
} from '@chakra-ui/react';
import Navbar from './components/navbar';
import FooterBar from './components/footer';
import Alerts from '../alert';


export default function DefaultLayout({ children }: { children: ReactNode }) {
  const bgNav = useColorModeValue('gray.200', 'gray.800');

  return (
    <>
      <Box bg={bgNav} px={10}>
        <Navbar />
      </Box>

      <Alerts />

      <Box width={'100%'} minH={'100vh'} pb={"3rem"}>
        {children}
      </Box>
      <FooterBar />
    </>
  );
}