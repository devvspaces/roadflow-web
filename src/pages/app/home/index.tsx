import Head from 'next/head'
import { Badge, Box, Button, Card, CardBody, CardHeader, Container, Divider, HStack, Heading, Highlight, Progress, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';
import { BasicCard } from '@/components/homeCard';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { checkServerSideResponse, getAccessTokenServerSide } from '@/services/authenticate';
import { api } from '@/services/api';
import { EnrolledCurriculumsResponse, getDifficulty } from '@/common/interfaces/curriculum';
import { useRouter } from 'next/router';

export default function Page({ curriculums }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const heroBg = useColorModeValue('blue.100', 'blue.900');

  const router = useRouter()

  const user = useCurrentUser()

  return (
    <>
      <Head>
        <title>RoadflowAI - Home</title>
      </Head>

      <Box width={"100%"}>
        <Container maxW={'1300px'} pt={10}>
          {/* <Stack mb={10}>
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
          </Stack> */}


          <Stack>
            <Heading
              fontSize={'x-large'}
              mb={5}>Enrolled Curriculums</Heading>

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

              {
                curriculums.length === 0 && (
                  <Stack gap={5}>
                    <Text fontSize={'lg'}>You have not enrolled in any curriculums yet.</Text>
                    <Button
                      size={'lg'}
                      w={'fit-content'}
                      colorScheme={'blue'}
                      onClick={() => {
                        router.push('/app/curriculum/search')
                      }}
                    >Enroll Now</Button>
                  </Stack>
                )
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
} > = async ({ req }) => {

  api.getAccessToken = () => getAccessTokenServerSide(req)
  const response = await api.get_enrolled_curriculums();
  const check = checkServerSideResponse(response, req)
  if (check) {
    return check
  }

  const data = response.result.data;
  if (!data) {
    throw new Error("Invalid response");
  }

  return {
    props: {
      curriculums: data.results
    },
  }
}


