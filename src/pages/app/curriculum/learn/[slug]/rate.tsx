import React, { ReactElement, useEffect } from 'react'
import {
  Wrap,
  WrapItem,
  AspectRatio,
  UnorderedList,
  ListItem,
  HStack,
  Badge,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { getAccessTokenServerSide } from '@/services/authenticate';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { CurriculumWithResources } from '@/common/interfaces/curriculum';
import { getResource } from '@/common/interfaces/resource';
import { useDispatch } from 'react-redux';
import { setHeadState, setNavState } from '@/store/learnNavSlice';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '@/services/api';
import { LOGIN_URL, VERIFY_ACCOUNT_URL } from '@/router/routes';
import { AlertType, addMessage } from '@/common/alerts';
import Cookies from 'js-cookie';
import { VERIFY_EMAIL_KEY } from '@/common/constants';

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

  const formik = useFormik({
    initialValues: {
      rating: "",
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .required('Required')
        .max(5)
        .min(1),
      review: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setFieldError, resetForm }) => {
      const response = await api.review(data.slug, values);
      if (response.success) {
        if (response.result.data) {
          window.location.reload()
          return
        }
        throw new Error('Invalid response')
      }

      const fields = Object.keys(values)
      fields.forEach(field => {
        if (response.result.data) {
          if (response.result.data[field]) {
            setFieldError(field, response.result.data[field].join(', '))
          }
        }
      })
    }
  });


  return (
    <>
      <Head>
        <title>RoadFlow - {data.name}</title>
      </Head>

      <Heading size={"md"}>Rate Curriculum</Heading>
      <Box className='topic-content'
        py={5}>
        <Text>
          You can rate the content on the curriculum here
        </Text>


        <Box py={6}>

          <Flex
            minH={'100vh'}
          >
            <Stack width={"100%"} maxW={'lg'} spacing={8}>
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl
                      id="rating"
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.rating && formik.touched.rating}
                    >
                      <FormLabel>Rating</FormLabel>
                      <Input type="number" />
                      <FormErrorMessage>{formik.errors.rating}</FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="review"
                      onChange={formik.handleChange}
                      isInvalid={!!formik.errors.review && formik.touched.review}
                    >
                      <FormLabel>Review</FormLabel>
                      <Textarea h={"10rem"} />
                      <FormErrorMessage>{formik.errors.review}</FormErrorMessage>
                    </FormControl>
                    <Stack pt={10}>
                      <Button
                        type='submit'
                        loadingText="Submitting"
                        size="md"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}>
                        Rate
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Flex>

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
  data: CurriculumWithResources
}> = async ({ params, req }) => {

  if (!params) {
    return {
      notFound: true,
    }
  }

  const { slug } = params;
  api.getAccessToken = () => getAccessTokenServerSide(req)
  const response = await api.get_curriculum_with_resources(slug as string);
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
