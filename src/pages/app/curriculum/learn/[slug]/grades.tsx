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
  TableContainer,
  TableCaption,
  Table,
  Th,
  Thead,
  Tr,
  Tfoot,
  Td,
  Tbody,
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';

export default function Page() {

  return (
    <>
      <Head>
        <title>RoadFlow - Grades</title>
      </Head>

      <Heading size={"md"}>Grades</Heading>
      <Box className='topic-content'
        py={5}>
        <Box py={6}>

          <TableContainer
            border={'1px'}
            borderColor={'gray.200'}
            borderRadius={'md'}
            p={5}>
            <Table variant='simple'>
              <TableCaption>
                Grades for each week of the curriculum
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Week</Th>
                  <Th>Topic</Th>
                  <Th isNumeric>Grade (100%)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((week, index) => (
                    <Tr key={index}>
                      <Td>{week}</Td>
                      <Td>What is Web Development</Td>
                      <Td isNumeric>45</Td>
                    </Tr>
                  ))
                }
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Week</Th>
                  <Th>Topic</Th>
                  <Th isNumeric>Grade (100%)</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
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
