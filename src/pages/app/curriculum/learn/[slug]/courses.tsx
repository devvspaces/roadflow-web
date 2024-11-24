import React, { ReactElement, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Wrap,
  WrapItem,
  HStack,
  Badge,
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { FaExternalLinkAlt } from "react-icons/fa";
import { api } from "@/services/api";
import { CurriculumWithResources } from "@/common/interfaces/curriculum";
import { getResource } from "@/common/interfaces/resource";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setLoading,
  setHeadState,
  setNavState,
  selectLoading,
} from "@/store/learnNavSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [data, setData] = useState<CurriculumWithResources | null>(null);
  const router = useRouter();
  const { slug } = router.query;
  const toast = useToast();

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const res = await api.get_curriculum_with_resources(slug as string);
      if (res.success) {
        setData(res.result.data!!);
      } else {
        toast({
          title: "Failed to find resources",
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
        data.syllabus.map((item, index) => {
          if (item.topics.length == 0) {
            throw new Error("Invalid response");
          }
          return {
            name: item.title,
            completed: item.completed,
            link: `/app/curriculum/learn/${data.slug}/${item.topics[0].slug}`,
          };
        })
      )
    );
    dispatch(setHeadState(data.name));
  }, [dispatch, data]);

  if (loading) {
    return (
      <HStack gap={5}>
        <Skeleton height={"200px"} width={"200px"} />
        <Skeleton height={"200px"} width={"200px"} />
      </HStack>
    );
  }

  if (!data) {
    return (
      <Box>
        <Text>Course not found.</Text>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>RoadflowAI - {data.name} (External Courses) </title>
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
