import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  TableContainer,
  TableCaption,
  Table,
  Th,
  Thead,
  Tr,
  Tfoot,
  Td,
  Tbody,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { Grades } from "@/common/interfaces/grades";
import { api } from "@/services/api";
import {
  selectLoading,
  setHeadState,
  setLoading,
  setNavState,
} from "@/store/learnNavSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

export default function Page() {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Grades | null>(null);
  const router = useRouter();
  const { slug } = router.query;
  const toast = useToast();
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const res = await api.get_curriculum_with_grades(slug as string);
      if (res.success) {
        setData(res.result.data!!);
      } else {
        toast({
          title: "Failed to find grades",
          description:
            "Please try again, if the problem persists contact our support team",
          status: "error",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
      }
      dispatch(setLoading(false));
    })();
  }, [dispatch, toast, slug]);

  useEffect(() => {
    if (!data) return;
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

  if (loading) {
    return (
      <Box>
        <Skeleton height={"200px"} width={"100%"} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box>
        <Text>Grades not found.</Text>
      </Box>
    );
  }

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
