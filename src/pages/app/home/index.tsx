import Head from 'next/head'
import { Badge, Box, Card, CardBody, CardHeader, Container, Divider, HStack, Heading, Highlight, Progress, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { BasicCard } from '@/components/homeCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getAccessTokenServerSide } from '@/services/authenticate';
import { api } from '@/services/api';
import { EnrolledCurriculumsResponse, getDifficulty } from '@/common/interfaces/curriculum';

export default function Page({ curriculums }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const heroBg = useColorModeValue('blue.100', 'blue.900');

  const user = useCurrentUser()

  return (
    <>
      <Head>
        <title>RoadFlow - Home</title>
      </Head>

      <Box width={"100%"}>
        <Container maxW={'1300px'} pt={10}>
          <Stack mb={10}>
            <Heading
              fontSize={'x-large'}
              mb={5}
            >Roadmap</Heading>

            <Card
              bg={'blue.100'}
              transition={'.3s ease'}
              cursor={'pointer'}
              _hover={{
                bg: 'blue.200',
                transform: 'translateY(-5px)',
                boxShadow: 'xl',
              }}
              maxW={'500px'}>
              <CardHeader>
                <Heading
                  fontWeight={600}
                  fontSize={'lg'}
                  mb={3}>
                  Software Engineering
                </Heading>

                <HStack>
                  <Badge colorScheme='purple'>
                    Weeks: 3 / 5
                  </Badge>
                  <Badge colorScheme='green'>
                    Curriculums: 3 / 15
                  </Badge>
                </HStack>
              </CardHeader>

              <CardBody>
                <Progress hasStripe rounded={'md'} h={2} colorScheme={'purple'} value={80} />
              </CardBody>
            </Card>
          </Stack>


          <Stack>
            <Heading
              fontSize={'x-large'}
              mb={5}>Curriculums</Heading>

            <HStack
              wrap={'wrap'}
              spacing={0}
              gap={8}>

              {
                curriculums.map((item, index) => {
                  return (
                    <BasicCard key={index} item={{
                      title: item.curriculum.name,
                      badge1: `weeks: ${item.completed_weeks}/${item.curriculum.weeks}`,
                      badge2: getDifficulty(item.curriculum.difficulty),
                      link: `/app/curriculum/learn/${item.curriculum.slug}/home`,
                      progress: item.progress
                    }} />
                  )
                })
              }

            </HStack>
          </Stack>

          {/* <Divider my={"3rem"} />

          <Stack>

            <Heading
              fontSize={'x-large'}
              mb={7}>
              Recommended Curriculums
            </Heading>

            <Stack
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
          </Stack> */}

        </Container>
      </Box>
    </>
  );
}


export const getServerSideProps: GetServerSideProps<{
  curriculums: EnrolledCurriculumsResponse[]
}> = async ({ req }) => {

  api.getAccessToken = () => getAccessTokenServerSide(req)
  const response = await api.get_enrolled_curriculums();
  if (!response.success) {
    return {
      notFound: true,
    }
  }

  const data = response.result.data;
  if (!data) {
    throw new Error("Invalid response");
  }

  data

  return {
    props: {
      curriculums: data.results
    },
  }
}


