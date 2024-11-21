import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
} from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function FeaturesComponents() {
  return (
    <Box p={4} py={20}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          Why RoadFlow?
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          We help you learn at your own pace using curated roadmaps and
          interactive curriculums.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Courses"}
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            description={
              "Enroll in courses created by experts in the field and learn at your own pace."
            }
            href={"#"}
          />
          <Card
            heading={"Quizzes"}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={
              "Test your knowledge by taking quizzes and get a certificate of completion."
            }
            href={"#"}
          />
          <Card
            heading={"Track Progress"}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={
              "Track your progress and see how you are doing compared to others."
            }
            href={"#"}
          />
        </Flex>
      </Container>
    </Box>
  );
}
