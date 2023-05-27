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
import { FaGraduationCap, FaHeart, FaProjectDiagram, FaUser, FaYoutube } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectHeadState, selectNavState } from '@/store/learnNavSlice';
import { useRouter } from 'next/router'
import NextLink from 'next/link';


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
  const navBottomLinkBg = useColorModeValue('gray.500', 'gray.900');
  const navBottomLinkBgHover = useColorModeValue('gray.700', 'gray.800');

  const router = useRouter()
  const { slug } = router.query

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
                icon: <FaGraduationCap />,
                link: `/app/curriculum/learn/${slug as string}/grades`
              },
              {
                title: 'External Courses',
                icon: <FaYoutube />,
                link: `/app/curriculum/learn/${slug as string}/courses`
              },
              {
                title: 'Rate',
                icon: <FaHeart />,
                link: `/app/curriculum/learn/${slug as string}/rate`
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
                onClick={(e) => {
                  router.push(item.link)
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
                  <BreadcrumbLink
                  as={NextLink}
                  href={`/app/curriculum/learn/${slug as string}/home`}
                  >Home</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <Button
                display={{ "lg": "none", "md": "none", "base": "block" }}
                bg={useColorModeValue('gray.200', 'gray.700')}
                p={2}
                borderRadius={10}
                cursor={'pointer'}
                transition={'all 0.3s ease'}
                onClick={onOpen}
                fontSize={'sm'}
              >
                <ChevronRightIcon mr={1} />
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