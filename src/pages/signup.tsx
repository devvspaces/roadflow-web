import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "@/services/api";
import { LOGIN_URL, VERIFY_ACCOUNT_URL } from "@/router/routes";
import { AlertType, addMessage } from "@/common/alerts";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { VERIFY_EMAIL_KEY } from "@/common/constants";
import { FcGoogle } from "react-icons/fc";
import { app } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  initializeAuth,
} from "firebase/auth";

export default function SignupCard() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  const auth = getAuth(app);
  auth.useDeviceLanguage();

  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
      username: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const response = await api.register(values);
      if (response.success) {
        if (response.result.data) {
          addMessage(
            AlertType.Success,
            `
          Account created successfully!
          Please check your email for otp to verify your account.
          `
          );
          Cookies.set(VERIFY_EMAIL_KEY, values.email);
          window.location.href = VERIFY_ACCOUNT_URL;
        }
        throw new Error("Invalid response");
      }

      const fields = ["email", "password", "username"];
      fields.forEach((field) => {
        if (response.result.data) {
          if (response.result.data[field]) {
            setFieldError(field, response.result.data[field].join(", "));
          }
        }
      });
    },
  });

  function signUpWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(token);
        console.log(user);
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await api.google(await user.getIdToken());
        console.log(response);
        if (response.success) {
          if (response.result.data) {
            console.log(response.result.data);
          }
        } else {
          throw new Error("Invalid response");
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack width={"100%"} maxW={"lg"} spacing={8} mx={"auto"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy curated road maps ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={4}>
              <FormControl
                id="username"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.username && formik.touched.username}
              >
                <FormLabel>Username</FormLabel>
                <Input type="text" />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="email"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={2} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
                <Button
                  onClick={signUpWithGoogle}
                  loadingText="Submitting"
                  size="lg"
                  colorScheme="gray"
                  color={"white"}
                  leftIcon={<FcGoogle />}
                >
                  Sign up with Google
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href="/login" color={"blue.400"}>
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
