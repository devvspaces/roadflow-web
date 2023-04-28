import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Box, Container, FormControl, HStack, Heading, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';
import { api } from '@/services/api';
import { getDifficulty } from '@/common/interfaces/curriculum';
import { useFormik } from 'formik';
import { modifyUrl } from '@/common/url';

export default function SearchCurriculum() {
  const [curriculums, setCurriculums] = useState<CurriculumCard[]>([])

  const getCurriculums = async ({ search }: { search?: string }) => {
    const response = await api.get_curriculums({
      search: search || ""
    })
    if (response.success) {
      const items = response.result.data?.results || [];
      const pItems = items.map((item) => ({
        name: item.name,
        description: item.description,
        level: getDifficulty(item.difficulty),
        duration: item.weeks,
        rating: item.rating
      }))
      setCurriculums(pItems)
    }
    console.error("Error loading curriculums");
  }

  useEffect(() => {
    const search = new URLSearchParams(window.location.search)
    getCurriculums({
      search: search.get("search") || ""
    });
  }, [])

  const formik = useFormik({
    initialValues: {
      search: "",
    },
    onSubmit: async (values) => {
      const url_param = new URLSearchParams()
      url_param.append("search", values.search)
      const url = `${window.location.origin}/${window.location.pathname}?${url_param.toString()}`
      modifyUrl("search", url);
      getCurriculums({
        search: values.search
      });
    }
  });

  return (
    <>
      <Head>
        <title>RoadFlow - Curriculum</title>
      </Head>

      <Container maxW={'5xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8 }}
          py={20}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '4xl', sm: '5xl' }}
          >
            Find new Curriculums
          </Heading>
          <Text color={'gray.500'}>
            You can search for new curriculums here. There are labeled with difficulty level and duration.
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <HStack gap={4} spacing={0} wrap={'wrap'} justify={'center'}>
              <FormControl id='search' maxW={'500px'}>
                <Input
                  h={14}
                  py={5}
                  px={5}
                  borderRadius={30}
                  type='text'
                  placeholder='Search for curriculums'
                  onChange={formik.handleChange}
                  value={formik.values.search}
                  isRequired
                />
              </FormControl>

              <IconButton
                size={'md'}
                icon={<SearchIcon />}
                colorScheme='blue'
                aria-label={'Search database'}
                h={14}
                w={14}
                borderRadius={30}
                type={'submit'}
              />
            </HStack>
          </form>
        </Stack>

        <Stack
          justify={'center'}
          gridGap={4}
          spacing={0}
          direction={'row'}
          flexWrap={'wrap'}>
          {
            curriculums.map((obj, index) => {
              return (
                <CurriculumCardComponent key={index} obj={obj} />
              )
            })
          }
        </Stack>
      </Container>
    </>
  );
}
