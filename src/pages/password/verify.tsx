import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';

export default function ForgotPasswordOtpForm(): JSX.Element {
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
        p={6}
        my={12}>
        <Heading mb={4} lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
          Verify Reset Code
        </Heading>
        <Text
          fontSize={{ base: 'sm', sm: 'md' }}
          color={useColorModeValue('gray.800', 'gray.400')}>
          Enter the code sent to your email address to reset your password.
        </Text>
        <HStack justify={'center'} py={3}>
          <PinInput size={'lg'} placeholder='🔒'>
            <PinInputField width={20} height={20} />
            <PinInputField width={20} height={20}  />
            <PinInputField width={20} height={20}  />
            <PinInputField width={20} height={20}  />
          </PinInput>
        </HStack>
        <Stack spacing={6}>
          <Button
            bg={'blue.400'}
            color={'white'}
            mt={5}
            _hover={{
              bg: 'blue.500',
            }}>
            Verify
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}