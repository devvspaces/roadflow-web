import { ReactNode } from 'react';
import {
  Box,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from './components/navbar';
import FooterBar from './components/footer';


export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Box bgGradient='linear(to-l, #7928CA, blue.600)'  px={10}>
        <Navbar links={[]} />
      </Box>

      {/* <Box width={'100%'} maxW={'1300px'} mx={'auto'} px={4} pt={4} pb={20} minH={'100vh'}>
        <Container maxW={'5xl'}>{children}</Container>
      </Box> */}
      
      <Box width={'100%'} minH={'100vh'}>
      {children}
      </Box>
      <FooterBar />
    </>
  );
}