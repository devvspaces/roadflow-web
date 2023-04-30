import React, { ReactElement, useState } from 'react'
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
  Button,
  Center,
  Highlight,
  OrderedList,
  Radio,
  RadioGroup,
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

export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {

  const dispatch = useDispatch()

  dispatch(setNavState(data.syllabi.topics.map((item, index) => {
    return {
      name: item.title,
      completed: data.completed,
      link: `/app/curriculum/learn/${data.syllabi.slug}/${item.slug}`
    }
  })));

  dispatch(setHeadState(data.syllabi.title));

  const [quizOpen, openQuiz] = useState(false)

  const toggleQuiz = () => {
    openQuiz(!quizOpen);
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

        <Heading size={"md"}>Lesson Quiz</Heading>

        <Box className='topic-content'
          py={5}>
          <Text>
            <Highlight query={"80%"} styles={{ bg: 'green.200', rounded: 'md', p: 1 }}>
              Complete the questions below. Score 80% in test to complete this lesson.
            </Highlight>
          </Text>

          <OrderedList
            spacing={10}
            my={10}>

            <ListItem>

              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci tempore doloremque velit. Voluptates ipsum nemo in earum quisquam reprehenderit ducimus
              </Text>

              <RadioGroup mt={5}>
                <Wrap spacing={5}>
                  <WrapItem>
                    <Radio value='1'> Adipisci tempore doloremque velit.</Radio>
                  </WrapItem>
                  <WrapItem>
                    <Radio value='2'>Voluptates ipsum nemo in earum</Radio>
                  </WrapItem>
                  <WrapItem>
                    <Radio value='3'>consectetur adipisicing elit.</Radio>
                  </WrapItem>
                  <WrapItem>
                    <Radio value='4'>adipisicing elit. Adipisci tempore doloremque velit.</Radio>
                  </WrapItem>
                </Wrap>
              </RadioGroup>

            </ListItem>

            <ListItem>

              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci tempore doloremque velit. Voluptates ipsum nemo in earum quisquam reprehenderit ducimus
              </Text>

              <RadioGroup mt={5}>
                <Wrap spacing={5}>
                  <WrapItem>
                    <Radio value='1'> Adipisci tempore doloremque velit.</Radio>
                  </WrapItem>
                  <WrapItem>
                    <Radio value='2'>Voluptates ipsum nemo in earum</Radio>
                  </WrapItem>
                  <WrapItem>
                    <Radio value='3'>consectetur adipisicing elit.</Radio>
                  </WrapItem>
                  <WrapItem>
                    <Radio value='4'>adipisicing elit. Adipisci tempore doloremque velit.</Radio>
                  </WrapItem>
                </Wrap>
              </RadioGroup>

            </ListItem>

          </OrderedList>

          <Button
            colorScheme={'green'}
            borderRadius={'full'}
            onClick={toggleQuiz}
          >
            Submiz Quiz
          </Button>

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
