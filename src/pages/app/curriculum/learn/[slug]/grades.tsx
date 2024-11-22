import React, { ReactElement, useEffect } from "react";
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
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { Grades } from "@/common/interfaces/grades";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  checkServerSideResponse,
  getAccessTokenServerSide,
} from "@/services/authenticate";
import { api } from "@/services/api";
import { useDispatch } from "react-redux";
import { setHeadState, setNavState } from "@/store/learnNavSlice";

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setNavState(
        data.curriculum.syllabus.map((item, index) => {
          if (item.topics.length == 0) {
            throw new Error("Invalid response");
          }
          console.log(item);
          return {
            // name: `Week ${index + 1}`,
            name: item.title,
            completed: item.completed,
            link: `/app/curriculum/learn/${data.curriculum.slug}/${item.topics[0].slug}`,
          };
        })
      )
    );

    dispatch(setHeadState(data.curriculum.name));
  }, [dispatch, data]);

  return (
    <>
      <Head>
        <title>RoadflowAI- Grades</title>
      </Head>

      <Heading size={"md"}>Grades</Heading>
      <Box className="topic-content" py={5}>
        <Box py={6}>
          <TableContainer
            border={"1px"}
            borderColor={"gray.200"}
            borderRadius={"md"}
            p={5}
          >
            <Table variant="simple">
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
                {data.progress.map((progress, index) => (
                  <Tr key={index}>
                    <Td>{progress.syllabi.title}</Td>
                    <Td>{progress.topic.title}</Td>
                    <Td isNumeric>{progress.quiz_mark}</Td>
                  </Tr>
                ))}
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
  return <LearnLayout>{page}</LearnLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  data: Grades;
}> = async ({ params, req }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { slug } = params;
  api.getAccessToken = () => getAccessTokenServerSide(req);
  const response = await api.get_curriculum_with_grades(slug as string);
  const check = checkServerSideResponse(response, req);
  if (check) {
    return check;
  }

  const data = response.result.data;
  if (!data) {
    throw new Error("Invalid response");
  }

  return {
    props: {
      data,
    },
  };
};
