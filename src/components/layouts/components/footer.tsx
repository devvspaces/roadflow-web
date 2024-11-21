import {
  Box,
  chakra,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaGithub, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
      target="_blank"
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export default function FooterBar() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Flex align={"center"} gap={".7rem"}>
          <Image src={"/logo.png"} alt={"RoadFlow"} w={"30px"} />
          <Heading fontSize={"2xl"}>RoadFlowAI</Heading>
        </Flex>
        <Text>© {new Date().getFullYear()} RoadFlowAI</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"https://x.com/netrobeweb/"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton
            label={"YouTube"}
            href={"https://www.youtube.com/@devnetrobe"}
          >
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Github"} href={"https://github.com/devvspaces"}>
            <FaGithub />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
}
