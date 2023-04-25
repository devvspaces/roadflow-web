import Head from 'next/head'
import { Box, Button, Container, FormControl, HStack, Heading, Input, Select, Stack, Text, useDisclosure } from '@chakra-ui/react';
import RoleCard, { RoleObject } from '@/components/pages/roles/card';

export default function Roles() {

  const roles: RoleObject[] = [
    {
      name: 'Data Scientist',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      salary: {
        min: 100000,
        max: 300000
      },
      video: 'https://www.youtube.com/embed/qWru-b6m030',
    },
    {
      name: 'Data Engineer',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      salary: {
        min: 100000,
        max: 300000
      },
      video: 'https://www.youtube.com/embed/qWru-b6m030',
    },
    {
      name: 'Data Scientist',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      salary: {
        min: 100000,
        max: 300000
      },
      video: 'https://www.youtube.com/embed/qWru-b6m030',
    },
    {
      name: 'Data Scientist',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      salary: {
        min: 100000,
        max: 300000
      },
      video: 'https://www.youtube.com/embed/qWru-b6m030',
    },
  ]

  return (
    <>
      <Head>
        <title>RoadFlow - Welcome</title>
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
            Select a job role
          </Heading>
          <Text color={'gray.500'}>
            To get started, select a job role that you are interested in.
            If you are already familiar with a job role, you can skip this step.
            If you are not sure yet what you want to do, you can always change it later.
          </Text>

          <HStack gap={4} spacing={0} wrap={'wrap'} justify={'center'}>
            <FormControl maxW={'370px'}>
              <Input h={14} py={5} px={5} borderRadius={30} type='email' placeholder='Search role...' />
            </FormControl>

            <Select maxW={'300px'} h={14} borderRadius={30} placeholder='Salary average by country' id='salary-avg-by-country'>
              <option value='united-states'>United States</option>
              <option value='united-kingdom'>United Kingdom</option>
              <option value='germany'>Germany</option>
            </Select>

            <Button h={14} borderRadius={30} colorScheme='blue' variant='solid' minW={'150px'}>
              Search
            </Button>
          </HStack>
        </Stack>

        <Stack
        justify={'center'}
        gridGap={4}
        spacing={0}
        direction={'row'}
        flexWrap={'wrap'}>
          {
            roles.map((role, index) => (
              <RoleCard key={index} role={role} />
            ))
          }
        </Stack>
      </Container>
    </>
  );
}
