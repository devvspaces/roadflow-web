import Head from "next/head";
import HeroComponent from "@/components/pages/index/hero";
import OurStory from "@/components/pages/index/story";
import FeaturesComponents from "@/components/pages/index/features";
import BasicStatistics from "@/components/pages/index/stats";
import StepsComponent from "@/components/pages/index/steps";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import ShareButtons from "@/components/shareButtons";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>RoadFlowAI - Learn by flow</title>
      </Head>

      <HeroComponent />
      <StepsComponent />
      <FeaturesComponents />
      <BasicStatistics />
      <Box maxW="5xl" mx={"auto"} py={5} px={{ base: 2, sm: 12, md: 17 }}>
        <Heading
          textAlign={"center"}
          fontSize={"4xl"}
          py={10}
          fontWeight={"bold"}
        >
          Support RoadflowAI
        </Heading>
        <Flex
          gap={"1rem"}
          flexWrap={"wrap"}
          align={"stretch"}
          justify={"center"}
        >
          <Card w={"100%"} maxW={"300px"}>
            <CardHeader pb={0}>
              <Heading size={"md"}>Star on GitHub</Heading>
            </CardHeader>
            <CardBody>
              Give us a 🌟 on{" "}
              <Link
                href={"https://github.com/devvspaces/roadflow-web"}
                target="_blank"
              >
                <Button size={"sm"}>Github</Button>{" "}
              </Link>
              This really goes a long way to motivate the team
            </CardBody>
          </Card>
          <Card w={"100%"} maxW={"300px"}>
            <CardHeader pb={0}>
              <Heading size={"md"}>We value your feedback</Heading>
            </CardHeader>
            <CardBody>
              Give us a{" "}
              <Link
                href={"https://forms.gle/sgb91CQyLq3fnPTt9"}
                target="_blank"
              >
                <Button size={"sm"}>feedback</Button>{" "}
              </Link>
              . This helps us to improve the platform.
            </CardBody>
          </Card>
          <Card w={"100%"} maxW={"300px"}>
            <CardHeader pb={0}>
              <Heading size={"md"}>Share with others</Heading>
            </CardHeader>
            <CardBody>
              <Text mb={2}>
                Share with friends. Help them learn better in a more organized
                fashion.
              </Text>
              <ShareButtons />
            </CardBody>
          </Card>
        </Flex>
      </Box>
    </>
  );
}
