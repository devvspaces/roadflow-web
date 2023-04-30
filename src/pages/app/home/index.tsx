import Head from 'next/head'
import { Badge, Box, Card, CardBody, CardHeader, Container, Divider, HStack, Heading, Highlight, Progress, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';
import { useCurrentUser } from '@/common/hooks/useCurrentUser';

export default function Roles() {
  const heroBg = useColorModeValue('blue.100', 'blue.900');

  const user = useCurrentUser()

  const curriculums: CurriculumCard[] = [
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
    {
      name: 'Learn Python Beginners',
      description: 'Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.',
      level: 'beginner',
      duration: 3,
      rating: 4.5,
    },
  ]


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
                [1, 2, 3, 4, 5].map((item, index) => {
                  return (
                    <Card key={index}
                      bg={'pink.100'}
                      transition={'.3s ease'}
                      cursor={'pointer'}
                      transformOrigin={'top'}
                      transform={'scale(1)'}
                      style={{
                        transformStyle: 'preserve-3d',
                      }}
                      _hover={{
                        bg: 'pink.300',
                        transform: 'scale(1.02)',
                        boxShadow: 'xl',
                      }}
                      width={'100%'}
                      maxW={'500px'}>
                      <CardHeader>
                        <Heading
                          fontWeight={600}
                          fontSize={'lg'}
                          mb={3}>
                          Introduction to Web Development
                        </Heading>

                        <HStack>
                          <Badge colorScheme='purple'>
                            Weeks: 3 / 5
                          </Badge>
                          <Badge colorScheme='green'>
                            Beginner
                          </Badge>
                        </HStack>
                      </CardHeader>

                      <CardBody>
                        <Progress rounded={'md'} h={2} colorScheme={'blue'} value={80} />
                      </CardBody>
                    </Card>
                  )
                })
              }

            </HStack>
          </Stack>

          <Divider my={"3rem"} />

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
          </Stack>

        </Container>
      </Box>
    </>
  );
}
