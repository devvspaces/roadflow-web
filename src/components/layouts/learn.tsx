import React from 'react'
import { CheckCircleIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  Container,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Head from 'next/head';
import { FaGraduationCap, FaProjectDiagram, FaUser, FaYoutube } from 'react-icons/fa';


interface LearnLayoutProps {
  children: React.ReactNode
}

export default function LearnLayout({ children }: LearnLayoutProps) {

  // use disclosure
  const { isOpen, onOpen, onClose } = useDisclosure()

  function getMenu() {
    return (
      <>
        <Stack
          spacing={3}>
          {
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
              <Box key={index}
                border={'1px'}
                display={'flex'}
                alignItems={'center'}
                gap={2}
                p={2}
                borderColor={'gray.400'}
                color={'gray.500'}
                rounded={'md'}
                cursor={'pointer'}
                transition={'all 0.3s ease'}
                _hover={{
                  bg: 'gray.200',
                  color: 'gray.700',
                }}
              >
                <CheckCircleIcon />
                <Text>Week {item}</Text>
              </Box>
            ))
          }
        </Stack>

        <Divider h={'1px'} my={8} bg='gray.400' />

        <Stack
          spacing={3}>
          {
            [
              {
                title: 'Grades',
                icon: <FaGraduationCap />
              },
              {
                title: 'Classmates',
                icon: <FaUser />
              },
              {
                title: 'Projects',
                icon: <FaProjectDiagram />
              },
              {
                title: 'External Courses',
                icon: <FaYoutube />
              },
            ].map((item, index) => (
              <Box key={index}
                display={'flex'}
                alignItems={'center'}
                gap={2}
                p={2}
                color={'gray.200'}
                rounded={'md'}
                cursor={'pointer'}
                bg={'purple.700'}
                transition={'all 0.3s ease'}
                boxShadow={'md'}
                _hover={{
                  bg: 'purple.800',
                }}
              >
                {item.icon}
                <Text>{item.title}</Text>
              </Box>
            ))
          }
        </Stack>
      </>
    )
  }

  const menu = getMenu();

  return (
    <Box width={"100%"}>
      <Drawer placement='right' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>Introduction to Web Development</DrawerHeader>
          <DrawerBody>
            {menu}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Container maxW={'1300px'} py={"3rem"} px={{ "lg": 0, 'md': 10, 'base': 5 }}>
        <HStack
        alignItems={'flex-start'}
        spacing={{
          "lg": 5, "md": 5, "base": 0
        }}>
          {/* Outlines box */}
          <Box
            width={"25%"}
            bg={'gray.100'}
            p={5}
            display={{ "lg": "block", "md": "block", "base": "none" }}
            id='learnMenu'
            borderRadius={10}>
            <Heading size={"md"} mb={7}>Introduction to Web Development</Heading>
            {menu}
          </Box>
          <Box
            width={{ "lg": "75%", "md": "75%", "base": "100%" }}
            p={{
              "lg": 5,
              "md": 5,
              "base": 0,
            }}
            pr={5}
            borderRadius={10}>
            <Flex
              mb={5}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Breadcrumb
                opacity={.8}>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href='#'>Breadcrumb</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <Button
                display={{ "lg": "none", "md": "none", "base": "block" }}
                bg={'purple.100'}
                p={2}
                borderRadius={10}
                cursor={'pointer'}
                transition={'all 0.3s ease'}
                _hover={{
                  bg: 'purple.200',
                }}
                onClick={onOpen}
                fontSize={'sm'}
              >
                <ChevronRightIcon />
                Menu
              </Button>
            </Flex>
            {children}
          </Box>
        </HStack>
      </Container>
    </Box >
  );
}