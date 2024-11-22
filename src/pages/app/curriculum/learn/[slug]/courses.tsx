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
  HStack,
  Badge,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  checkServerSideResponse,
  getAccessTokenServerSide,
} from "@/services/authenticate";
import { api } from "@/services/api";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { CurriculumWithResources } from "@/common/interfaces/curriculum";
import { getResource } from "@/common/interfaces/resource";
import { useDispatch } from "react-redux";
import { setHeadState, setNavState } from "@/store/learnNavSlice";

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setNavState(
        data.syllabus.map((item, index) => {
          if (item.topics.length == 0) {
            throw new Error("Invalid response");
          }
          return {
            name: `Week ${index + 1}`,
            completed: item.completed,
            link: `/app/curriculum/learn/${data.slug}/${item.topics[0].slug}`,
          };
        })
      )
    );

    dispatch(setHeadState(data.name));
  }, [dispatch, data]);

  return (
    <>
      <Head>
        <title>RoadflowAI- {data.name} (External Courses) </title>
      </Head>

      <Heading size={"md"}>External Courses</Heading>
      <Box className="topic-content" py={5}>
        <Text>
          Courses from popular platforms like Udemy, Coursera, etc. that can
          help you learn this curriculum are listed below. There are also books
          that can help you learn this curriculum.
        </Text>

        {/* Courses */}
        <Box py={6}>
          <Wrap spacing={4}>
            {data.resources.map((item, index) => (
              <WrapItem key={index}>
                <Box
                  border={"1px"}
                  borderColor={"gray.300"}
                  borderRadius={"md"}
                  transition={"all 0.2s ease-in-out"}
                  cursor={"pointer"}
                  _hover={{
                    borderColor: "gray.500",
                    boxShadow: "xl",
                    transform: "translateX(2px)",
                  }}
                  p={5}
                >
                  <HStack spacing={4} mb={3}>
                    <Badge colorScheme={"blue"}>
                      {getResource(item.rtype)}
                    </Badge>
                    <Badge colorScheme={"green"}>{item.provider}</Badge>
                  </HStack>

                  <Heading size={"sm"} color={"blue.500"} mb={3}>
                    <Link href={item.url} display={"flex"} gap={4}>
                      {item.name}
                      <FaExternalLinkAlt />
                    </Link>
                  </Heading>
                  <Text>
                    by{" "}
                    <span
                      style={{
                        fontWeight: "600",
                      }}
                    >
                      {item.author}
                    </span>
                  </Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
          {data.resources.length == 0 && (
            <Text fontWeight={600} fontSize={"lg"}>
              No Available Resources
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LearnLayout>{page}</LearnLayout>;
};

export const getServerSideProps: GetServerSideProps<{
  data: CurriculumWithResources;
}> = async ({ params, req }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { slug } = params;
  api.getAccessToken = () => getAccessTokenServerSide(req);
  const response = await api.get_curriculum_with_resources(slug as string);
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
