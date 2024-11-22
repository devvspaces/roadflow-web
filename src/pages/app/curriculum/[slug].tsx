import Head from "next/head";
import {
  Accordion,
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import React from "react";
import {
  CurriculumDifficulty,
  CurriculumPageResponse,
  getDifficulty,
} from "@/common/interfaces/curriculum";
import { api } from "@/services/api";
import { ratingPercent } from "@/common";
import { SyllabiWeek } from "@/components/week";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
  checkServerSideResponse,
  getAccessTokenServerSide,
} from "@/services/authenticate";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const curriculum = data;
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();

  const registerUser = async () => {
    setLoading(true);
    const response = await api.enroll_user(data.slug);
    setLoading(false);
    if (response.success) {
      toast({
        title: "Enrollment successful.",
        description: "Congratulations on starting your learning journey.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      router.push(
        `/app/curriculum/learn/${encodeURIComponent(data.slug)}/home`
      );
      return;
    }
    toast({
      title: "Enrollment failed.",
      description: "Please try again or contact support for assistance.",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const bgNav = useColorModeValue("gray.200", "#090a10");

  return (
    <>
      <Head>
        <title>RoadflowAI - Course {curriculum.name}</title>
      </Head>

      <Box width={"100%"} bg={bgNav}>
        <Container maxW={"1300px"} py={"3rem"}>
          <HStack w={"100%"}>
            <Box w={"100%"}>
              <Text
                textTransform={"uppercase"}
                fontSize={"sm"}
                fontWeight={500}
                mb={5}
              >
                Course
              </Text>

              <HStack w={"100%"} justify={"space-between"} align={"center"}>
                <Box>
                  <Heading mb={5}>{curriculum.name}</Heading>
                  <HStack spacing={5}>
                    <Badge colorScheme="blackAlpha" p={2}>
                      {curriculum.level}
                    </Badge>
                    <Badge colorScheme="blackAlpha" p={2}>
                      {curriculum.syllabus.length} weeks
                    </Badge>
                  </HStack>
                </Box>
                {data.is_enrolled ? (
                  <Button
                    as={NextLink}
                    transition={".3s"}
                    bgGradient="linear(to-l, purple.700, #FF0080)"
                    color="white"
                    rounded={"5px"}
                    bgSize={"100%"}
                    p={6}
                    _hover={{
                      bgGradient: "linear(to-l, purple.700, #FF0080)",
                      bgSize: "200%",
                    }}
                    href={`/app/curriculum/learn/${encodeURIComponent(
                      data.slug
                    )}/home`}
                    py={8}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    transition={".3s"}
                    bgGradient="linear(to-l, #41e19c, #08c7e4)"
                    color="gray.800"
                    rounded={"5px"}
                    bgSize={"100%"}
                    p={6}
                    _hover={{
                      bgSize: "200%",
                    }}
                    py={8}
                    onClick={async (e) => {
                      e.preventDefault();
                      await registerUser();
                    }}
                    isLoading={loading}
                  >
                    Start Learning
                  </Button>
                )}
              </HStack>
            </Box>
          </HStack>
        </Container>
      </Box>

      <Container maxW={"1300px"} py={"3rem"}>
        <HStack
          wrap={"wrap"}
          gap={10}
          spacing={0}
          mb={10}
          justifyContent={"space-between"}
          alignItems={"self-start"}
        >
          <Box maxWidth={"750px"}>
            <Heading size={"md"} mb={4} textTransform={"uppercase"}>
              Description
            </Heading>
            <Text lineHeight={1.8}>{curriculum.description}</Text>

            <Heading size={"md"} mt={10} mb={4} textTransform={"uppercase"}>
              Objective
            </Heading>
            <Text lineHeight={1.8}>{curriculum.objective}</Text>

            <Heading size={"md"} mt={10} mb={4} textTransform={"uppercase"}>
              Prerequisites
            </Heading>
            <Text lineHeight={1.8}>{curriculum.prerequisites}</Text>
          </Box>

          {/* <Box
            width={"100%"}
            border={"1px"}
            borderColor={"gray.300"}
            rounded={"md"}
            p={5}
            maxW={"400px"}
          >
            <Heading
              size={".9rem"}
              mb={6}
              color={"gray.600"}
              textTransform={"uppercase"}
            >
              Associated Roles
            </Heading>
            <HStack gap={3} spacing={0} mt={5} wrap={"wrap"}>
              <Badge p={1} px={2} colorScheme="gray">
                Software Engineer
              </Badge>
              <Badge p={1} px={2} colorScheme="gray">
                Artificial Engineer
              </Badge>
              <Badge p={1} px={2} colorScheme="gray">
                Software Engineer
              </Badge>
              <Badge p={1} px={2} colorScheme="gray">
                Artificial Engineer
              </Badge>
            </HStack>
          </Box> */}
        </HStack>

        <Box mt={"5rem"}>
          <Box>
            <Heading fontSize={"1.5rem"}>Key Learning Outcomes</Heading>
            <Text mt={4}>
              Complete each module to reach your learning goals.
              {/* Content Rating: {ratingPercent(curriculum.rating)}% */}
            </Text>
          </Box>

          <Accordion mt={"3rem"} defaultIndex={[0]} allowMultiple>
            {curriculum.syllabus.map((item, index) => {
              return (
                <SyllabiWeek
                  key={index}
                  index={index + 1}
                  topic={item.title}
                  {...item}
                />
              );
            })}
          </Accordion>
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<{
  data: CurriculumPageResponse & {
    level: string;
    is_enrolled: boolean;
  };
}> = async ({ params, req }) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const { slug } = params;
  api.getAccessToken = () => getAccessTokenServerSide(req);
  const response = await api.get_single_curriculum(slug as string);
  const check = checkServerSideResponse(response, req);
  if (check) {
    return check;
  }

  const data = response.result.data;
  if (!data) {
    throw new Error("Invalid response");
  }

  const curriculum = {
    ...data,
    level: getDifficulty(data.difficulty as CurriculumDifficulty),
    is_enrolled: await api.check_enrolled_in_curriculum(slug as string),
  };

  return {
    props: {
      data: curriculum,
    },
  };
};
