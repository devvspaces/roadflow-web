import Head from 'next/head'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Badge, Box, Button, Container, FormControl, HStack, Heading, IconButton, Input, List, ListIcon, ListItem, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import { CheckCircleIcon, SearchIcon, StarIcon, TimeIcon } from '@chakra-ui/icons';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';

export default function Roles() {
  const heroBg = useColorModeValue('blue.200', 'blue.900');

  return (
    <>
      <Head>
        <title>RoadFlow - Curriculum Single</title>
      </Head>

      <Box width={"100%"} bgGradient='linear(to-l, #7928CA, blue.600)'>
        <Container maxW={'1300px'} py={"3rem"} px={{ "lg": 0, 'md': 10, 'sm': '10' }}>
          <HStack>
            <Box>
              <Text
                textTransform={"uppercase"}
                fontSize={"sm"}
                fontWeight={400}
                mb={5}
                color={'white'}
              >Curriculum</Text>
              <Heading color={'white'} mb={5}>Neural Networks and Deep Learning</Heading>
              <HStack mb={6} spacing={10}>
                <HStack>
                  <HStack spacing={1} mr={2}>
                    <StarIcon color={'orange'} />
                    <StarIcon color={'orange'} />
                    <StarIcon color={'orange'} />
                    <StarIcon color={'orange'} />
                    <StarIcon color={'orange'} />
                  </HStack>
                  <Text
                    color={'orange'}
                    fontWeight={600}
                  >4.9</Text>
                </HStack>

                <Text
                  fontWeight={600}
                  color={'white'}
                >14,990 ratings</Text>
              </HStack>


              <HStack spacing={10} mb={10}>
                <Badge colorScheme='red'>Beginner</Badge>
                <Badge colorScheme='teal'>14 weeks</Badge>
              </HStack>


              <Button
                transition={'0.3s'}
                bgGradient='linear(to-l, purple.700, #FF0080)'
                colorScheme='red'
                rounded={'5px'}
                p={6}
                py={8}>
                Enroll for free
              </Button>
            </Box>
          </HStack>

        </Container>
      </Box>

      <Container maxW={'1300px'} py={"3rem"} px={{ "lg": 0, 'md': 10, 'sm': '10' }}>

        <HStack
        wrap={'wrap'}
        gap={10}
        spacing={0}
        mb={10}
        justifyContent={'space-between'}
        alignItems={'self-start'}>
          <Box maxWidth={"750px"}>
            <Heading size={'md'} mb={4} textTransform={'uppercase'}>OBJECTIVE</Heading>
            <Text lineHeight={1.8}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus voluptatem, natus vero, dicta dolor unde dolore iusto eligendi, velit facilis ipsam corporis delectus corrupti tenetur. Ab, corporis? Sed, dolorem veniam?
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus voluptatem, natus vero, dicta dolor unde dolore iusto eligendi, velit facilis ipsam corporis delectus corrupti tenetur. Ab, corporis? Sed, dolorem veniam?
            </Text>

            <Heading size={'md'} mt={10} mb={4} textTransform={'uppercase'}>Prerequisites</Heading>
            <Text lineHeight={1.8}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus voluptatem, natus vero, dicta dolor unde dolore iusto eligendi, velit facilis ipsam corporis delectus corrupti tenetur. Ab, corporis? Sed, dolorem veniam?
            </Text>
          </Box>

          <Box
            width={"100%"}
            border={"1px"}
            borderColor={'gray.300'}
            rounded={'md'}
            p={5}
            maxW={'400px'}>
            <Heading size={'.9rem'} mb={6} color={'gray.600'} textTransform={'uppercase'}>Associated Roles</Heading>
            <HStack gap={3} spacing={0} mt={5} wrap={'wrap'}>
              <Badge p={1} px={2} colorScheme='gray'>Software Engineer</Badge>
              <Badge p={1} px={2} colorScheme='gray'>Artificial Engineer</Badge>
              <Badge p={1} px={2} colorScheme='gray'>Software Engineer</Badge>
              <Badge p={1} px={2} colorScheme='gray'>Artificial Engineer</Badge>
            </HStack>
          </Box>
        </HStack>


        <Box mt={"5rem"}>
          <Box textAlign={'center'}>
            <Heading fontSize={'1.5rem'}>Syllabus - What you stand to gain</Heading>
            <Text mt={4}>
              Content Rating: 89%
            </Text>
          </Box>

          <Accordion mt={'3rem'} defaultIndex={[0]} allowMultiple>
            {
              [1, 2, 3, 4].map((item, index) => {
                return (
                  <AccordionItem key={index}>
                    <h2>
                      <AccordionButton py={5}>
                        <Box
                          as="span"
                          flex='1'
                          py={5}
                          textAlign='left'>
                          <Heading
                            fontSize={"1.4rem"}
                            mb={3}
                            fontWeight={'600'}>
                            <Text
                              as={'span'}
                              color={'blue.700'}
                              style={{
                                fontWeight: 700,
                                fontSize: '1.8rem',
                                display: 'flex',
                                marginBottom: '2rem',
                                alignItems: 'center',
                                gap: '1rem'
                              }}>

                              <TimeIcon w={12} h={12} color={'blue.400'} />

                              Week {item}</Text>
                            <span>
                              Introduction to Deep Learning
                            </span>
                          </Heading>
                          <Text>
                            Analyze the major trends driving the rise of deep learning, and give examples of where and how it is applied today.
                          </Text>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      <List spacing={3}>
                        <ListItem mb={6}>
                          <ListIcon as={CheckCircleIcon} color='green.500' />
                          Welcome
                        </ListItem>
                        <ListItem mb={6}>
                          <ListIcon as={CheckCircleIcon} color='green.500' />
                          What is a Neural Network?
                        </ListItem>
                        <ListItem mb={6}>
                          <ListIcon as={CheckCircleIcon} color='green.500' />
                          Supervised Learning with Neural Networks
                        </ListItem>
                        <ListItem mb={6}>
                          <ListIcon as={CheckCircleIcon} color='green.500' />
                          Why is Deep Learning taking off?
                        </ListItem>
                      </List>
                    </AccordionPanel>
                  </AccordionItem>
                )
              })
            }
          </Accordion>

        </Box>


      </Container>

    </>
  );
}
