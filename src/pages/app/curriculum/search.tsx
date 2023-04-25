import Head from 'next/head'
import { Box, Container, FormControl, HStack, Heading, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';

export default function SearchCurriculum() {

  const curriculums: CurriculumCard[] = [
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
  ]

  return (
    <>
      <Head>
        <title>RoadFlow - Curriculum</title>
      </Head>

      <Container maxW={'5xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8 }}
          py={20}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '4xl', sm: '5xl' }}
          >
            Find new Curriculums
          </Heading>
          <Text color={'gray.500'}>
            You can search for new curriculums here. There are labeled with difficulty level and duration.
          </Text>

          <HStack gap={4} spacing={0} wrap={'wrap'} justify={'center'}>
            <FormControl maxW={'500px'}>
              <Input h={14} py={5} px={5} borderRadius={30} type='email' placeholder='Search for curriculums' />
            </FormControl>

            <IconButton
              size={'md'}
              icon={<SearchIcon />}
              colorScheme='blue'
              aria-label={'Search database'}
              h={14}
              w={14}
              borderRadius={30}
            />
          </HStack>
        </Stack>

        <Stack
          justify={'center'}
          gridGap={4}
          spacing={0}
          direction={'row'}
          flexWrap={'wrap'}>
          {
            curriculums.map((obj, index) => {
              return (
                <CurriculumCardComponent key={index} obj={obj} />
              )
            })
          }
        </Stack>

        {/* Pagination */}

        {/* Create a great pagination */}

        <HStack
          justify={'center'}
          gridGap={4}
          mt={10}
          fontSize={'12px'}
          spacing={0}>
            <Box
            bg={'gray.100'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>First</Text>
          </Box>
            <Box
            bg={'gray.100'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>Prev</Text>
          </Box>
          <Box
            bg={'gray.100'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>1</Text>
          </Box>
          <Box
            bg={'blue.300'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>2</Text>
          </Box>
          <Box
            bg={'gray.100'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>3</Text>
          </Box>
          <Box
            bg={'gray.100'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>Next</Text>
          </Box>
          <Box
            bg={'gray.100'}
            display={'flex'}
            alignItems={'center'}
            justifyContent={'center'}
            cursor={'pointer'}
            p={2}
            px={3}
            rounded={'md'}
          >
            <Text>Last</Text>
          </Box>

        </HStack>
      </Container>
    </>
  );
}
