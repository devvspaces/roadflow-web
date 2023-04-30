import React, { ReactElement, useState, useEffect } from 'react'
import {
  Box,
  Heading,
  Text,
  Accordion,
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { EnrolledCurriculumPageResponse } from '@/common/interfaces/curriculum';
import { getAccessTokenServerSide } from '@/services/authenticate';
import { api } from '@/services/api';
import { SyllabiWeek } from '@/components/week';
import { useDispatch } from 'react-redux';
import { setHeadState, setNavState } from '@/store/learnNavSlice';


export default function Page({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNavState(data.syllabus.map((item, index) => {
      if (item.topics.length == 0) {
        throw new Error("Invalid response");
      }
      return {
        name: `Week ${index + 1}`,
        completed: item.completed,
        link: `/app/curriculum/learn/${data.slug}/${item.topics[0].slug}`
      }
    })));

    dispatch(setHeadState(data.name));
  }, [dispatch, data])

  return (
    <>
      <Head>
        <title>RoadFlow - {data.name}</title>
      </Head>


      <Box className='topic-content'
        py={5}>

        <Heading size={'md'} mb={4} textTransform={'uppercase'}>Description</Heading>
        <Text lineHeight={1.8}>
          {data.description}
        </Text>

        <Heading size={'md'} mt={10} mb={4} textTransform={'uppercase'}>Objective</Heading>
        <Text>
          {data.objective}
        </Text>

        <Heading size={'md'} mt={10} mb={4} textTransform={'uppercase'}>Prerequisites</Heading>
        <Text lineHeight={1.8}>
          {data.prerequisites}
        </Text>

        <Box mt={"3rem"}>
          <Box>
            <Heading textTransform={'uppercase'} size={'md'}>Syllabus</Heading>
          </Box>

          <Accordion mt={'3rem'} defaultIndex={[0]} allowMultiple>
            {
              data.syllabus.map((item, index) => {
                return (
                  <SyllabiWeek
                    key={index}
                    index={index + 1}
                    topic={item.title}
                    {...item}
                  />
                )
              })
            }
          </Accordion>

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
  data: EnrolledCurriculumPageResponse
}> = async ({ params, req }) => {

  if (!params) {
    return {
      notFound: true,
    }
  }

  const { slug } = params;
  api.getAccessToken = () => getAccessTokenServerSide(req)
  const response = await api.get_single_enrolled_curriculum(slug as string);
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

