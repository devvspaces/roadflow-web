import { useCurrentUser } from "@/common/hooks/useCurrentUser";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Avatar,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import Head from "next/head";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";

export default function Profile() {
  const user = useCurrentUser();
  return (
    <>
      <Head>
        <title>RoadFlowAI - Profile</title>
      </Head>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          width={"100%"}
          maxW={"lg"}
          spacing={8}
          mx={"auto"}
          py={12}
          px={6}
        >
          <Stack align={"center"} mb={5}>
            <Avatar
              size={"2xl"}
              mb={3}
              name={user?.profile.fullname}
              src={user?.profile.image}
            />
            <Heading fontSize={"4xl"} textAlign={"center"}>
              {user?.profile.fullname}
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              {/* Software Engineer */}
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="fullname" isRequired>
                <FormLabel>Your fullname</FormLabel>
                <Input value={user?.profile.fullname} type="text" />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input value={user?.username} type="text" />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input value={user?.email} disabled type="email" />
              </FormControl>
              <FormControl id="github">
                <FormLabel>Github</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <FaGithub color="gray.300" />
                  </InputLeftElement>
                  <Input value={user?.profile.github} type="text" />
                </InputGroup>
              </FormControl>
              <FormControl id="twitter">
                <FormLabel>X (Formally Twitter)</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <BsTwitterX color="gray.300" />
                  </InputLeftElement>
                  <Input value={user?.profile.twitter} type="text" />
                </InputGroup>
              </FormControl>
              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea value={user?.profile.bio} />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Update Profile
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  <Link href="/login" color={"blue.400"}>
                    Change your password
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
