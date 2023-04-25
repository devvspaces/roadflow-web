import React, { ReactElement } from 'react'
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
  useDisclosure,
  Highlight,
  List,
  OrderedList,
  Radio,
  RadioGroup,
} from '@chakra-ui/react';
import Head from 'next/head';
import LearnLayout from '@/components/layouts/learn';

export default function Page() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [value, setValue] = React.useState('0')

  return (
    <>
      <Head>
        <title>RoadFlow - Introduction to Web Development</title>
      </Head>

      <Box
        display={isOpen ? 'block' : 'none'}
      >
        <Heading size={"md"}>What is the Web?</Heading>
        <Box className='topic-content'
          py={5}>
          <Text>
            The World Wide Web (WWW), commonly known as the Web, is an information system where documents and other web resources are identified by Uniform Resource Locators (URLs, such as https://example.com/), which may be interlinked by hypertext, and are accessible over the Internet.[1][2] The resources of the Web are transferred via the Hypertext Transfer Protocol (HTTP), may be accessed by users by a software application called a web browser, and are published by a software application called a web server. The World Wide Web is not synonymous with the Internet, which pre-dated the Web in some form by over two decades and upon which technologies the Web is built.
          </Text>


          {/* Articles */}
          <Box py={6}>
            <Heading size={'sm'} mb={3}>Readings</Heading>

            <UnorderedList listStyleType={'none'} m={0} spacing={2}>

              {
                [1, 2, 3].map((item, index) => (
                  <ListItem
                    key={index}>
                    <Link color='blue.500' href="" fontWeight={600}>
                      What is the Web?
                    </Link>
                  </ListItem>
                ))
              }

            </UnorderedList>

          </Box>

          {/* Videos */}
          <Box py={6}>
            <Heading size={'sm'} mb={3}>Videos</Heading>

            <Wrap spacing={5}>
              {
                [1, 2, 3,].map((item, index) => (
                  <WrapItem
                    maxW={'400px'}
                    key={index}>
                    <Box key={index}
                      display={'flex'}
                      alignItems={'center'}
                      gap={2}
                      p={4}
                      color={'gray.200'}
                      rounded={'md'}
                      cursor={'pointer'}
                      bg={'blue.700'}
                      transition={'all 0.3s ease'}
                      _hover={{
                        bg: 'blue.800',
                        boxShadow: 'xl',
                      }}
                      width={'100%'}
                    >
                      <Box>
                        <Text
                          fontWeight={'bold'}
                          mb={5}>Introduction to Web Development</Text>
                        <AspectRatio
                          h={'190px'}
                          rounded={'md'}
                          overflow={'hidden'}
                          width={'500px'}
                          maxW={{
                            "lg": "350px",
                            "md": "350px",
                            "base": "250px",
                          }}
                          ratio={1}>
                          <iframe
                            title='naruto'
                            src='https://www.youtube.com/embed/O_GWbkXIqEY'
                            allowFullScreen
                          />
                        </AspectRatio>
                      </Box>
                    </Box>
                  </WrapItem>
                ))
              }
            </Wrap>
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
            >
              Complete Lesson
            </Button>
          </Center>

        </Box>
      </Box>


      {/* Quiz */}

      <Box
        display={!isOpen ? 'block' : 'none'}
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
          >
            Complete Lesson
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
