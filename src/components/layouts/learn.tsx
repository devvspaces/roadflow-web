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
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGraduationCap, FaProjectDiagram, FaUser, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectHeadState, selectNavState } from '@/store/learnNavSlice';
import { useRouter } from 'next/router'


interface LearnLayoutProps {
  children: React.ReactNode
}

export interface LearnNav {
  name: string;
  link: string;
  completed: boolean;
}

export default function LearnLayout({ children }: LearnLayoutProps) {

  const navs = useSelector(selectNavState);
  const heading = useSelector(selectHeadState);

  const { isOpen, onOpen, onClose } = useDisclosure()
  const navBottomLinkBg = useColorModeValue('gray.500', 'gray.700');
  const navBottomLinkBgHover = useColorModeValue('gray.700', 'gray.500');

  const router = useRouter()

  function getMenu() {
    return (
      <>
        <Stack
          spacing={3}>
          {
            navs.map((item, index) => (
              <Box key={index}
                border={'1px'}
                display={'flex'}
                alignItems={'center'}
                gap={2}
                p={3}
                pl={4}
                borderColor={'gray.400'}
                color={'gray.500'}
                rounded={'md'}
                cursor={'pointer'}
                transition={'all 0.3s ease'}
                _hover={{
                  bg: 'gray.200',
                  color: 'gray.700',
                }}
                onClick={(e) => {
                  router.push(item.link)
                }}
              >
                <CheckCircleIcon color={item.completed ? 'green.500': 'gray.400'} />
                <Text>{item.name}</Text>
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
              // {
              //   title: 'Projects',
              //   icon: <FaProjectDiagram />
              // },
              {
                title: 'External Courses',
                icon: <FaYoutube />
              },
            ].map((item, index) => (
              <Box key={index}
                display={'flex'}
                alignItems={'center'}
                gap={2}
                p={3}
                pl={4}
                color={'gray.200'}
                rounded={'md'}
                cursor={'pointer'}
                bg={navBottomLinkBg}
                transition={'all 0.3s ease'}
                boxShadow={'md'}
                _hover={{
                  bg: navBottomLinkBgHover,
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
          <DrawerHeader borderBottomWidth='1px'>{heading}</DrawerHeader>
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
            bg={useColorModeValue('gray.100', 'gray.900')}
            p={5}
            display={{ "lg": "block", "md": "block", "base": "none" }}
            id='learnMenu'  
            borderRadius={10}>
            <Heading size={"md"} mb={7}>{heading}</Heading>
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