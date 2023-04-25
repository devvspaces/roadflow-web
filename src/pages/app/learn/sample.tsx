import React, { ReactElement } from 'react'
import { CheckCircleIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Text,
  ListItem,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  List,
  ListIcon,
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';


export default function Page() {

  return (
    <>
      <Head>
        <title>RoadFlow - Introduction to Web Development</title>
      </Head>

      <Heading textTransform={'uppercase'} size={"md"}>Objective</Heading>

      <Box className='topic-content'
        py={5}>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam in facere reprehenderit aperiam consectetur, distinctio repellat. Nisi excepturi dolorum tenetur quas, expedita voluptatibus, perspiciatis, dicta ex animi modi repellat accusamus?
        </Text>

        <Heading size={'md'} mt={10} mb={4} textTransform={'uppercase'}>Prerequisites</Heading>
        <Text lineHeight={1.8}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus voluptatem, natus vero, dicta dolor unde dolore iusto eligendi, velit facilis ipsam corporis delectus corrupti tenetur. Ab, corporis? Sed, dolorem veniam?
        </Text>


        <Box mt={"3rem"}>
          <Box>
            <Heading textTransform={'uppercase'} size={'md'}>Syllabus</Heading>
          </Box>

          <Accordion mt={'3rem'} allowMultiple>
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
