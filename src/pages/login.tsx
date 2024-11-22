import { AlertType, addMessage } from "@/common/alerts";
import { ERROR_CODES, VERIFY_EMAIL_KEY } from "@/common/constants";
import { HOME_URL, VERIFY_ACCOUNT_URL } from "@/router/routes";
import { api } from "@/services/api";
import { authenticate } from "@/services/authenticate";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import * as Yup from "yup";
import NextLink from "next/link";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  TwitterAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import { LoginResponse } from "@/common/interfaces/login";
import { app } from "../lib/firebase";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { BsTwitterX } from "react-icons/bs";

export default function Page() {
  const [loading, setLoading] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const response = await api.login(values.email, values.password);
      if (response.success) {
        if (response.result.data) {
          authenticate(response.result.data);
          window.location.href = HOME_URL;
        }
        throw new Error("Invalid response");
      }

      if (response.result.data) {
        const code = response.result.data.euid as any as string;
        if (code == ERROR_CODES.email_not_verified) {
          addMessage(
            AlertType.Success,
            `
          Verify your email first!
          Please check your email for otp to verify your account.
          `
          );
          Cookies.set(VERIFY_EMAIL_KEY, values.email);
          window.location.href = VERIFY_ACCOUNT_URL;
        }
      }

      const fields = ["email", "password"];
      fields.forEach((field) => {
        if (response.result.data) {
          if (response.result.data[field]) {
            setFieldError(field, response.result.data[field].join(", "));
          }
        }
      });
    },
  });

  const auth = getAuth(app);
  auth.useDeviceLanguage();
  function handle_login(data: LoginResponse) {
    console.log(data);
    const tokens = data.tokens;
    if (!tokens) {
      addMessage(
        AlertType.Success,
        `Sign-in successful! Please check your email for the OTP to verify your account and complete the process.`
      );
      Cookies.set(VERIFY_EMAIL_KEY, data.user.email);
      window.location.href = VERIFY_ACCOUNT_URL;
      return;
    }
    addMessage(AlertType.Success, `Login successful! Welcome back!`);
    // toast({
    //   title: "Login successful",
    //   description: "Welcome back!",
    //   status: "success",
    //   duration: 5000,
    //   position: "top",
    //   isClosable: true,
    // });
    authenticate(data);
    window.location.href = HOME_URL;
    // navigate.push(HOME_URL);
  }

  const googleProvider = new GoogleAuthProvider();
  googleProvider.addScope("https://www.googleapis.com/auth/userinfo.email");
  function signUpWithGoogle() {
    setLoading(0);
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await api.google(await user.getIdToken());
        setLoading(null);
        if (response.success) {
          if (response.result.data) {
            handle_login(response.result.data);
            return;
          }
        }
        throw new Error(
          "Login with Google failed. Please try again, or contact support if the issue persists."
        );
      })
      .catch((error) => {
        setLoading(null);
        console.error(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        toast({
          title: "Failed to sign in with Google",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const xProvider = new TwitterAuthProvider();
  xProvider.addScope("user:read");
  function signUpWithTwitter() {
    setLoading(1);
    signInWithPopup(auth, xProvider)
      .then(async (result) => {
        // For accessing the Twitter API.
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await api.twitter(await user.getIdToken());
        setLoading(null);
        if (response.success) {
          if (response.result.data) {
            handle_login(response.result.data);
            return;
          }
        }
        throw new Error(
          "Login with X (formally Twitter) failed. Please try again, or contact support if the issue persists."
        );
      })
      .catch((error) => {
        setLoading(null);
        console.error(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        console.log(email);
        // The AuthCredential type that was used.
        const credential = TwitterAuthProvider.credentialFromError(error);
        toast({
          title: "Failed to sign in with X (formally Twitter)",
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  }

  const githubProvider = new GithubAuthProvider();
  function signUpWithGithub() {
    setLoading(2);
    signInWithPopup(auth, githubProvider)
      .then(async (result) => {
        // For accessing the Github API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (!token) {
          throw new Error("Token not found");
        }
        const response = await api.github(await user.getIdToken(), token);
        setLoading(null);
        if (response.success) {
          if (response.result.data) {
            handle_login(response.result.data);
            return;
          }
        }
        throw new Error(
          "Login with Github failed. Please try again, or contact support if the issue persists."
        );
      })
      .catch((error) => {
        setLoading(null);
        console.error(error);
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        toast({
          title: "Failed to sign in with Github",
          description: errorMessage,
          status: "error",
          duration: 5000,
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
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
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
                id="email"
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="password"
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
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

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link
                    as={NextLink}
                    color={"blue.400"}
                    href="/password/forgot"
                    ms={"auto"}
                  >
                    Forgot password?
                  </Link>
                </Stack>
                <Stack spacing={2} pt={2}>
                  <Button
                    bg={"blue.400"}
                    color={"white"}
                    type="submit"
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    onClick={signUpWithGoogle}
                    size="lg"
                    colorScheme="gray"
                    color={"white"}
                    rightIcon={<FcGoogle />}
                    isLoading={loading == 0}
                  >
                    Google
                  </Button>
                  <Button
                    onClick={signUpWithGithub}
                    size="lg"
                    colorScheme="gray"
                    color={"white"}
                    rightIcon={<FaGithub />}
                    isLoading={loading == 2}
                  >
                    Github
                  </Button>
                  <Button
                    onClick={signUpWithTwitter}
                    size="lg"
                    colorScheme="gray"
                    color={"white"}
                    rightIcon={<BsTwitterX />}
                    isLoading={loading == 1}
                  >
                    X (Formally Twitter)
                  </Button>
                </Stack>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Don&apos;t have an account?{" "}
                  <Link as={NextLink} href="/signup" color={"blue.400"}>
                    Create an account
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
