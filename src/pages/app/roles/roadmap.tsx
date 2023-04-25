import Head from 'next/head'
import { Box, Container, Flex, Heading, Stack, Text, VStack, useColorModeValue } from '@chakra-ui/react';

export default function RoleRoadMap() {

  const boxColor = useColorModeValue('gray.200', 'gray.700');
  const boxHoverColor = useColorModeValue('blue.200', 'blue.700');

  return (
    <>
      <Head>
        <title>RoadFlow - Roadmap (Data Engineer)</title>
      </Head>

      <Container maxW={'5xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8 }}
          py={20}
          alignItems={'center'}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '4xl', sm: '5xl' }}
          >
            Data Engineer Roadmap 🚧
          </Heading>
          <Text maxW={'3xl'} color={'gray.500'}>
            This is a roadmap for becoming a Data Engineer. Don&apos;t feel overwhelmed, you don&apos;t need to know it all to start working. Just pick a path and start learning!
          </Text>
        </Stack>


        <VStack spacing={0} gap={20} alignItems={'start'}>

          <Flex
            align={'start'}
            gap={4}
            wrap={'wrap'}
            justify={{ sm: 'center' }}
          >

            <Box maxW={'300px'} p={5} py={7} position={'relative'} border={'2px'} borderColor={'blue.600'} borderRadius={10}>
              <Text
                fontSize={'sm'}
                position={'absolute'}
                fontWeight={700}
                width={"30px"}
                height={"30px"}
                borderRadius={"50%"}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                top={0}
                left={5}
                transform={'translateY(-50%)'}
                colorScheme='blue.600'
                color={'white'}
                bg={'blue.600'}>
                1</Text>
              <Heading size={'md'} mb={3}>Learn the basics</Heading>
              <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quisquam asperiores et veritatis culpa cumque eum dolor provident.</Text>
            </Box>

            <Flex
              wrap={'wrap'}
              gap={4}
              maxW={{ base: '550px', md: '550px' }}
              justify={{ sm: 'center' }}
            >
              {
                [1, 2, 3, 4].map((v) => {
                  return (
                    <Box
                      maxW={'250px'}
                      bg={boxColor}
                      p={4}
                      rounded={'md'}
                      cursor={'pointer'}
                      transition={'.3s'}
                      _hover={{ bg: boxHoverColor }}
                      key={v}
                    >
                      <Heading size={'sm'} mb={3}>Learn Python</Heading>
                      <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quisquam asperiores ...</Text>
                    </Box>
                  )
                })
              }
            </Flex>
          </Flex>

        </VStack>

      </Container>
    </>
  );
}
