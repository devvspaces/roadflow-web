import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Avatar,
} from '@chakra-ui/react';
import Head from 'next/head';

export default function Profile() {
  return (

    <>
      <Head>
        <title>RoadFlow - User Profile</title>
      </Head>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack width={"100%"} maxW={'lg'} spacing={8} mx={'auto'} py={12} px={6}>
          <Stack align={'center'} mb={5}>
            <Avatar size={'2xl'} mb={3} name='Ayanwola Ayomide' src='https://bit.ly/dan-abramov' />
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Ayanwola Ayomide
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              Software Engineer
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Your fullname</FormLabel>
                <Input value={'Ayanwola Ayomide'} type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Username</FormLabel>
                <Input value={'test'} type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input value={'test@gmail.com'} disabled type="email" />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Update Profile
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  <Link href='/login' color={'blue.400'}>Change your password</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}