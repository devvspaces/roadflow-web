import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Link,
  Wrap,
  UnorderedList,
  ListItem,
  Button,
  Center,
  Highlight,
  OrderedList,
  Radio,
  RadioGroup,
  Stack,
  Skeleton,
  HStack,
  useColorModeValue,
  Card,
  CardBody,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { api } from "@/services/api";
import {
  checkServerSideResponse,
  getAccessTokenServerSide,
} from "@/services/authenticate";
import { SyllabiTopicResponse } from "@/common/interfaces/curriculum";
import {
  selectLoading,
  setHeadState,
  setLoading,
  setNavState,
} from "@/store/learnNavSlice";
import { ResourceType } from "@/common/interfaces/resource";
import { VideoComponent } from "@/components/video";
import { TopicQuiz } from "@/common/interfaces/quiz";
import { Formik, Form, Field } from "formik";
import { DynamicObject } from "@/common/interfaces";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import CountdownTimer from "@/components/countdown";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function Page() {
  const dispatch = useAppDispatch();
  const reasonCM = useColorModeValue("red.200", "red.700");
  const quizAlertBg = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();

  const [quizOpen, openQuiz] = useState(false);
  const [quiz, setQuiz] = useState<TopicQuiz>();
  const [quizMark, setQuizMark] = useState<number>();
  const [remainingTime, setRemainingTime] = useState<number>(0);

  const loading = useAppSelector(selectLoading);
  const [data, setData] = useState<SyllabiTopicResponse | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const res = await api.get_syllabi_progress(router.query.topic as string);
      if (res.success) {
        setData(res.result.data!!);
      } else {
        toast({
          title: "Failed to load topic",
          description:
            "Please try again, if the problem persists contact our support team",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      dispatch(setLoading(false));
    })();
  }, [dispatch, toast, router.query.topic]);

  const { slug } = router.query;

  useEffect(() => {
    if (!data) return;
    setQuiz(undefined);
    openQuiz(false);
    setQuizMark(undefined);
    dispatch(
      setNavState(
        data.syllabi.topics.map((item) => {
          return {
            name: item.title,
            completed: false,
            link: `/app/curriculum/learn/${slug as string}/${item.slug}`,
          };
        })
      )
    );

    dispatch(setHeadState(data.syllabi.title));
  }, [dispatch, data, slug]);

  const toggleQuiz = async () => {
    openQuiz(!quizOpen);
    if (!quiz) {
      await loadQuiz();
    }
  };

  if (loading || !data) {
    return (
      <Box>
        <Skeleton height={"300px"} width={"100%"} mb={5} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box>
        <Text>Topic not found.</Text>
      </Box>
    );
  }

  const loadQuiz = async () => {
    const response = await api.get_topic_quiz(data.topic.slug);
    if (response.success) {
      if (response.result.data) {
        if (response.result.data.quiz.length != 0) {
          setQuiz(response.result.data);

          setQuizMark(response.result.data.mark);
          if (response.result.data.remaining_time != 0) {
            setRemainingTime(response.result.data.remaining_time);
          }
        }
        return;
      }
    }
    throw new Error("Can't load quiz!!");
  };

  const readings: ReactElement[] = [];

  data.topic.resources.forEach((item, index) => {
    if (item.rtype == ResourceType.Article) {
      readings.push(
        <ListItem key={index}>
          <Link as={"a"} color="blue.500" href={item.url} fontWeight={600}>
            {item.name}
          </Link>
        </ListItem>
      );
    }
  });

  const videos: ReactElement[] = [];
  data.topic.resources.forEach((item, index) => {
    if (item.rtype == ResourceType.Video) {
      videos.push(<VideoComponent key={index} resource={item} />);
    }
  });

  const getFormikInitial = (quiz: TopicQuiz) => {
    const initialValues: DynamicObject = {};
    quiz.quiz.forEach((item, index) => {
      initialValues[item.id.toString()] = "";
    });
    return initialValues;
  };

  return (
    <>
      <Head>
        <title>
          RoadflowAI - {data.syllabi.title} : {data.topic.title}
        </title>
      </Head>

      <Box display={!quizOpen ? "block" : "none"}>
        <Heading size={"md"}>{data.topic.title}</Heading>
        <Box className="topic-content" py={5}>
          <Text>{data.topic.description}</Text>

          {/* Articles */}
          <Box py={6}>
            <Heading size={"sm"} mb={3}>
              Readings
            </Heading>

            <UnorderedList listStyleType={"none"} m={0} spacing={2}>
              {readings.length > 0 ? readings : <Text>No Readings</Text>}
            </UnorderedList>
          </Box>

          {/* Videos */}
          <Box py={6}>
            <Heading size={"sm"} mb={3}>
              Videos
            </Heading>

            {videos.length > 0 ? (
              <Wrap spacing={5}>{videos}</Wrap>
            ) : (
              <Text>No Videos</Text>
            )}
          </Box>

          <Center mt={10}>
            <Button
              colorScheme={"blue"}
              size={"lg"}
              borderRadius={"full"}
              fontWeight={"bold"}
              fontSize={"md"}
              px={12}
              py={8}
              onClick={toggleQuiz}
            >
              Complete Lesson
            </Button>
          </Center>
        </Box>
      </Box>

      {/* Quiz */}

      <Box display={quizOpen ? "block" : "none"}>
        <HStack justifyContent={"space-between"}>
          <Heading size={"md"}>Lesson Quiz</Heading>
          <Button onClick={toggleQuiz}>Back</Button>
        </HStack>

        <Box className="topic-content" py={2}>
          <Text>
            <Highlight
              query={"80%"}
              styles={{
                bg: "green.200",
                rounded: "md",
                px: 1,
                py: "1px",
                fontWeight: 600,
              }}
            >
              Complete the Test below. Score 80% in test to complete this
              lesson.
            </Highlight>
          </Text>

          {quizMark != undefined && (
            <Card bg={quizAlertBg} mt={5}>
              <CardBody>
                <Heading size={"sm"} mb={3}>
                  Grade
                </Heading>
                <Text>{quizMark}%</Text>

                <Heading size={"sm"} mb={3} mt={5}>
                  Retake In
                </Heading>
                <Text>
                  {remainingTime == 0 ? (
                    "You can retake the quiz now."
                  ) : (
                    <CountdownTimer
                      setTime={setRemainingTime}
                      targetDate={Date.now() + remainingTime * 1000}
                    />
                  )}
                </Text>
              </CardBody>
            </Card>
          )}

          <Box>
            {quiz !== undefined && quiz.quiz.length == 0 && (
              <Card bg={quizAlertBg} mt={5}>
                <CardBody>
                  <Heading size={"md"} mb={3}>
                    No Quiz
                  </Heading>

                  <Text>
                    No Quiz for this lesson. You can go to next lesson.
                  </Text>
                </CardBody>
              </Card>
            )}
          </Box>

          {quiz !== undefined && quiz.quiz.length != 0 ? (
            <Formik
              initialValues={getFormikInitial(quiz)}
              onSubmit={async (values, { setFieldError }) => {
                // Validate
                let valid = true;
                quiz.quiz.forEach((item) => {
                  const key = item.id.toString();
                  if (!values[key]) {
                    setFieldError(key, "Required");
                    valid = false;
                  }
                });

                if (!valid) return;

                NProgress.set(0.3);
                const response = await api.submit_topic_quiz(
                  data.topic.slug,
                  values
                );
                NProgress.done();

                if (response.success) {
                  const data = response.result.data;
                  if (data) {
                    data.quiz.map((item) => {
                      const key = Object.keys(item)[0];
                      const itemData = item[key];
                      if (!itemData.is_correct) {
                        setFieldError(key, itemData.reason);
                      }
                    });
                    setQuizMark(data.mark);
                    setRemainingTime(data.remaining_time);
                  }
                }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <OrderedList spacing={10} my={10}>
                    {quiz.quiz.map((quiz_item, index) => {
                      return (
                        <ListItem key={index}>
                          <Text fontWeight={600}>{quiz_item.question}</Text>

                          <RadioGroup mt={5}>
                            <Stack spacing={3}>
                              {quiz_item.options.map((qOption, index) => {
                                return (
                                  <Box key={index}>
                                    <Field
                                      as={Radio}
                                      type="radio"
                                      name={quiz_item.id}
                                      value={qOption.id.toString()}
                                    >
                                      {qOption.option}
                                    </Field>
                                  </Box>
                                );
                              })}
                            </Stack>
                            {errors[quiz_item.id.toString()] ? (
                              <Box
                                bg={reasonCM}
                                p={3}
                                rounded={"md"}
                                maxW={"600px"}
                                mt={5}
                              >
                                {errors[quiz_item.id.toString()] as string}
                              </Box>
                            ) : (
                              <></>
                            )}
                          </RadioGroup>
                        </ListItem>
                      );
                    })}
                  </OrderedList>

                  {remainingTime == 0 && (
                    <Button colorScheme={"green"} size={"lg"} type="submit">
                      Submiz Quiz
                    </Button>
                  )}
                </Form>
              )}
            </Formik>
          ) : (
            <Stack py={10}>
              <Skeleton mb={5} h={12} w={"80%"}></Skeleton>
              <Skeleton h={70} w={"100%"}></Skeleton>
              <Skeleton h={70} w={"100%"}></Skeleton>
              <Skeleton h={70} w={"100%"}></Skeleton>
              <Skeleton h={70} w={"100%"}></Skeleton>
            </Stack>
          )}
        </Box>
      </Box>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LearnLayout>{page}</LearnLayout>;
};
