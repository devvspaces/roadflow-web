import React, { ReactElement } from 'react'
import {
  Box,
  Heading,
  Text,
  Link,
  Wrap,
  WrapItem,
  AspectRatio,
  UnorderedList,
  ListItem,
  HStack,
  Badge,
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';
import { FaExternalLinkAlt } from 'react-icons/fa';

export default function Page() {

  return (
    <>
      <Head>
        <title>RoadFlow - Introduction to Web Development (External Courses) </title>
      </Head>

      <Heading size={"md"}>External Courses</Heading>
      <Box className='topic-content'
        py={5}>
        <Text>
          Courses from popular platforms like Udemy, Coursera, etc. that can help you learn this curriculum are listed below.
          There are also books that can help you learn this curriculum.
        </Text>


        {/* Courses */}
        <Box py={6}>

          <Wrap spacing={4}>

            {
              [
                {
                  title: 'Learn Web Development in 2021',
                  author: 'John Doe',
                  link: '#',
                  provider: 'Udemy',
                  type: 'course',
                },
                {
                  title: 'Learn Web Development for Dummies',
                  author: 'Ken Thompson',
                  link: '#',
                  provider: 'Amazon',
                  type: 'book',
                },
                {
                  title: 'Master Web Development',
                  author: 'John Doe',
                  link: '#',
                  provider: 'Coursera',
                  type: 'course',
                }
              ].map((item, index) => (
                <WrapItem
                  key={index}
                >
                  <Box
                    border={'1px'}
                    borderColor={'gray.300'}
                    borderRadius={'md'}
                    transition={'all 0.2s ease-in-out'}
                    cursor={'pointer'}
                    _hover={{
                      borderColor: 'gray.500',
                      boxShadow: 'xl',
                      transform: 'translateX(2px)',
                    }}
                    p={5}>

                    <HStack
                      spacing={4}
                      mb={3}>
                      <Badge
                        colorScheme={'blue'}>
                        {item.type}
                      </Badge>
                      <Badge
                        colorScheme={'green'}>
                        {item.provider}
                      </Badge>
                    </HStack>

                    <Heading
                      size={"sm"}
                      color={'blue.500'}
                      mb={3}>
                      <Link
                        href={item.link}
                        display={'flex'}
                        gap={4}>
                        {item.title}
                        <FaExternalLinkAlt />
                      </Link>
                    </Heading>
                    <Text>
                      by <span
                        style={{
                          fontWeight: '600',
                        }}
                      >
                        {item.author}
                      </span>
                    </Text>
                  </Box>
                </WrapItem>
              ))
            }

          </Wrap>

        </Box>

      </Box>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <LearnLayout>
      {page}
    </LearnLayout>
  )
}
