import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  FormLabel,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';


export default function ForgotPasswordForm(): JSX.Element {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        px={6}
        py={12}
        my={12}>
        <Heading lineHeight={1.1} mb={5} fontSize={{ base: '2xl', md: '3xl' }}>
          Reset your password
        </Heading>
        <FormControl id="new-password" isRequired>
          <FormLabel>New password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() =>
                  setShowPassword((showPassword) => !showPassword)
                }>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm password</FormLabel>
          <InputGroup>
            <Input type={showPassword ? 'text' : 'password'} />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() =>
                  setShowPassword((showPassword) => !showPassword)
                }>
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            mt={5}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Reset Password
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}