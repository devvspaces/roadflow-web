import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import { Box, Container, FormControl, HStack, Heading, IconButton, Input, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import CurriculumCardComponent, { CurriculumCard } from '@/components/pages/curriculum/curriculum-card';
import { api } from '@/services/api';
import { getDifficulty } from '@/common/interfaces/curriculum';


const Pagination = () => {
  return (
    <HStack
      justify={'center'}
      gridGap={4}
      mt={10}
      fontSize={'12px'}
      spacing={0}>
      <Box
        bg={'gray.100'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>First</Text>
      </Box>
      <Box
        bg={'gray.100'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>Prev</Text>
      </Box>
      <Box
        bg={'gray.100'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>1</Text>
      </Box>
      <Box
        bg={'blue.300'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>2</Text>
      </Box>
      <Box
        bg={'gray.100'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>3</Text>
      </Box>
      <Box
        bg={'gray.100'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>Next</Text>
      </Box>
      <Box
        bg={'gray.100'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        cursor={'pointer'}
        p={2}
        px={3}
        rounded={'md'}
      >
        <Text>Last</Text>
      </Box>

    </HStack>
  )
}

export default Pagination;