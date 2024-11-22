import React, { ReactElement } from "react";
import {
  Box,
  Heading,
  Text,
  TableContainer,
  Table,
  Th,
  Thead,
  Tr,
  Tfoot,
  Td,
  Tbody,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";

export default function Page() {
  return (
    <>
      <Head>
        <title>RoadflowAI- Classmate</title>
      </Head>

      <Heading size={"md"}>Classmates</Heading>
      <Box className="topic-content" py={5}>
        <Text>Here are the classmates you are currently learning with.</Text>

        <Box py={6}>
          <TableContainer
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={"md"}
            p={5}
          >
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Username</Th>
                  <Th>Country</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((week, index) => (
                  <Tr key={index}>
                    <Td>Ayanwola Ayomide</Td>
                    <Td>Nigeria</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Username</Th>
                  <Th>Country</Th>
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
  return <LearnLayout>{page}</LearnLayout>;
};
