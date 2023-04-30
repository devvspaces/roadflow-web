import React, { } from 'react'
import {
  Box,
  Text,
  WrapItem,
  AspectRatio,
  Badge,
  HStack,
} from '@chakra-ui/react';
import { Resource } from '@/common/interfaces/resource';

interface Props {
  resource: Resource
}

export const VideoComponent = ({ resource }: Props) => {
  return (
    <WrapItem
      maxW={'400px'}
    >
      <Box
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
            mb={3}>{resource.name}</Text>
          <HStack mb={5}>
            <Badge
              colorScheme='red'
              rounded={'full'}
              px={2}
            >
              {resource.provider}
            </Badge>
            <Badge
              colorScheme='purple'
              rounded={'full'}
              px={2}
            >
              {resource.author}
            </Badge>
          </HStack>
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
              title={resource.name}
              src={resource.url}
              allowFullScreen
            />
          </AspectRatio>
        </Box>
      </Box>
    </WrapItem>
  )
}
