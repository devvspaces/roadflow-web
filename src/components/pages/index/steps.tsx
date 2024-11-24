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
import { MdLooksOne, MdLooksTwo, MdLooks3 } from "react-icons/md";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
}

const Card = ({ heading, description, icon }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"center"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("green.300", "green.600")}
          mb={5}
        >
          {icon}
        </Flex>
        <Box mt={2} textAlign={"center"}>
          <Heading size="md" mb={5}>
            {heading}
          </Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default function StepsComponent() {
  return (
    <Box p={4} py={20} pt={0} id="how-it-works">
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          How does it work?
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Start learning at your own pace using curated road maps and practice
          when you are done in 3 simple steps.
        </Text>
      </Stack>

      <Container maxW={"5xl"} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={"Enroll in a course"}
            icon={
              <Text fontWeight={"bold"} fontSize={"1.5rem"}>
                1
              </Text>
            }
            description={
              "Pick a course you want to learn from the available courses."
            }
          />
          <Card
            heading={"Follow the curriculum"}
            icon={
              <Text fontWeight={"bold"} fontSize={"1.5rem"}>
                2
              </Text>
            }
            description={
              "Each course has an organized curriculum that you go through. Each topics has open source resources for you to study."
            }
          />
          <Card
            heading={"Practice"}
            icon={
              <Text fontWeight={"bold"} fontSize={"1.5rem"}>
                3
              </Text>
            }
            description={
              "There are tests per topic that you take to gauge your understanding before moving to the next."
            }
          />
        </Flex>
      </Container>
    </Box>
  );
}
