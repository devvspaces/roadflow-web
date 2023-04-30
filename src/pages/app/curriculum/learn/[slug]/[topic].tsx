import React, { ReactElement, useState, useEffect } from 'react'
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
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';
import { api } from '@/services/api';
import { getAccessTokenServerSide } from '@/services/authenticate';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { SyllabiTopicResponse } from '@/common/interfaces/curriculum';
import { useDispatch } from 'react-redux';
import { setHeadState, setNavState } from '@/store/learnNavSlice';
import { ResourceType } from '@/common/interfaces/resource';
import { VideoComponent } from '@/components/video';
import { TopicQuiz } from '@/common/interfaces/quiz';
import { Formik, Form, Field } from 'formik';
import { DynamicObject } from '@/common/interfaces';
import { useRouter } from 'next/router';

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const dispatch = useDispatch()
  const reasonCM = useColorModeValue('red.200', 'red.700')

  const router = useRouter()
  const { slug } = router.query

  useEffect(() => {
    dispatch(setNavState(data.syllabi.topics.map((item) => {
      return {
        name: item.title,
        completed: false,
        link: `/app/curriculum/learn/${slug as string}/${item.slug}`
      }
    })));

    dispatch(setHeadState(data.syllabi.title));
  }, [dispatch, data, slug])

  const [quizOpen, openQuiz] = useState(false)
  const [quiz, setQuiz] = useState<TopicQuiz>()
  const [quizMark, setQuizMark] = useState<number>()

  const toggleQuiz = async () => {
    openQuiz(!quizOpen);
    if (!quiz) {
      await loadQuiz()
    }
  }

  const loadQuiz = async () => {
    const response = await api.get_topic_quiz(data.topic.slug)
    if (response.success) {
      if (response.result.data) {
        setQuiz(response.result.data)
        return
      }
    }
    throw new Error("Can't load quiz!!")
  }

  const readings: ReactElement[] = []
  data.topic.resources.forEach((item, index) => {
    if (item.rtype == ResourceType.Article) {
      readings.push((
        <ListItem
          key={index}>
          <Link as={'a'} color='blue.500' href={item.url} fontWeight={600}>
            {item.name}
          </Link>
        </ListItem>
      ))
    }
  })

  const videos: ReactElement[] = []
  data.topic.resources.forEach((item, index) => {
    if (item.rtype == ResourceType.Video) {
      videos.push((
        <VideoComponent key={index} resource={item} />
      ))
    }
  })

  const getFormikIntial = (quiz: TopicQuiz) => {
    const initialValues: DynamicObject = {}
    quiz.quiz.forEach((item, index) => {
      initialValues[item.id.toString()] = ""
    })
    return initialValues
  }

  return (
    <>
      <Head>
        <title>RoadFlow - {data.syllabi.title} : {data.topic.title}</title>
      </Head>

      <Box
        display={!quizOpen ? 'block' : 'none'}
      >
        <Heading size={"md"}>{data.topic.title}</Heading>
        <Box className='topic-content'
          py={5}>
          <Text>
            {data.topic.description}
          </Text>


          {/* Articles */}
          <Box py={6}>
            <Heading size={'sm'} mb={3}>Readings</Heading>

            <UnorderedList listStyleType={'none'} m={0} spacing={2}>

              {
                readings.length > 0
                  ? readings
                  : <Text>No Readings</Text>
              }

            </UnorderedList>

          </Box>

          {/* Videos */}
          <Box py={6}>
            <Heading size={'sm'} mb={3}>Videos</Heading>

            {
              videos.length > 0
                ? (
                  <Wrap spacing={5}>
                    {videos}
                  </Wrap>
                )
                : <Text>No Videos</Text>
            }

          </Box>

          <Center
            mt={10}>
            <Button
              colorScheme={'blue'}
              size={'lg'}
              borderRadius={'full'}
              fontWeight={'bold'}
              fontSize={'md'}
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

      <Box
        display={quizOpen ? 'block' : 'none'}
      >

        <HStack justifyContent={'space-between'}>
          <Heading size={"md"}>Lesson Quiz</Heading>
          <Button
            onClick={toggleQuiz}
          >
            Back
          </Button>
        </HStack>

        <Box className='topic-content'
          py={2}>
          <Text>
            <Highlight query={"80%"} styles={{ bg: 'green.200', rounded: 'md', px: 1, py: '1px', fontWeight: 600 }}>
              Complete the Test below. Score 80% in test to complete this lesson.
            </Highlight>
          </Text>

          {
            quizMark != undefined && (
              <Text
                fontWeight={600}
                fontSize={'lg'}
                mt={5}
              >Result: {quizMark}%</Text>
            )
          }

          {
            quiz
              ? (
                <Formik
                  initialValues={getFormikIntial(quiz)}
                  onSubmit={async (values, { setFieldError }) => {
                    // Validate
                    let valid = true;
                    quiz.quiz.forEach((item) => {
                      const key = item.id.toString();
                      if (!values[key]) {
                        setFieldError(key, "Required")
                        valid = false;
                      }
                    })

                    if (!valid) return;

                    const response = await api.submit_topic_quiz(data.topic.slug, values);
                    if (response.success) {
                      const data = response.result.data
                      if (data) {
                        data.quiz.map((item) => {
                          const key = Object.keys(item)[0]
                          const itemData = item[key];
                          if (!itemData.is_correct) {
                            setFieldError(key, itemData.reason)
                          }
                        })
                        setQuizMark(data.mark)
                      }
                    }
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <OrderedList
                        spacing={10}
                        my={10}>

                        {
                          quiz.quiz.map((quiz_item, index) => {
                            return (
                              <ListItem key={index}>

                                <Text fontWeight={600}>
                                  {quiz_item.question}
                                </Text>

                                <RadioGroup mt={5}>
                                  <Stack spacing={3}>
                                    {
                                      quiz_item.options.map((qOption, index) => {
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
                                        )
                                      })
                                    }
                                  </Stack>
                                  {
                                    errors[quiz_item.id.toString()]
                                      ? (
                                        <Box
                                          bg={reasonCM}
                                          p={3}
                                          rounded={'md'}
                                          maxW={'600px'}
                                          mt={5}
                                        >
                                          {errors[quiz_item.id.toString()] as string}
                                        </Box>
                                      )
                                      : <></>
                                  }

                                </RadioGroup>

                              </ListItem>
                            )
                          })
                        }

                      </OrderedList>

                      <Button
                        colorScheme={'green'}
                        size={'lg'}
                        type='submit'
                      >
                        Submiz Quiz
                      </Button>
                    </Form>
                  )}

                </Formik>
              )
              : (
                <Stack py={10}>
                  <Skeleton mb={5} h={12} w={"80%"}></Skeleton>
                  <Skeleton h={70} w={"100%"}></Skeleton>
                  <Skeleton h={70} w={"100%"}></Skeleton>
                  <Skeleton h={70} w={"100%"}></Skeleton>
                  <Skeleton h={70} w={"100%"}></Skeleton>
                </Stack>
              )
          }

        </Box>

      </Box>

    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <LearnLayout>
      {page}
    </LearnLayout>
  )
}

export const getServerSideProps: GetServerSideProps<{
  data: SyllabiTopicResponse
}> = async ({ params, req }) => {

  if (!params) {
    return {
      notFound: true,
    }
  }

  const { topic } = params;
  api.getAccessToken = () => getAccessTokenServerSide(req)
  const response = await api.get_syllabi_progress(topic as string);
  if (!response.success) {
    return {
      notFound: true,
    }
  }

  const data = response.result.data;
  if (!data) {
    throw new Error("Invalid response");
  }

  return {
    props: {
      data
    },
  }
}
