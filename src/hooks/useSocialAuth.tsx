import { AlertType, addMessage } from "@/common/alerts";
import { HOME_URL, VERIFY_ACCOUNT_URL } from "@/router/routes";
import { api } from "@/services/api";
import { authenticate } from "@/services/authenticate";
import { Button, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
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
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import { setUser, setVerifyEmail } from "@/store/authSlice";
import { VERIFY_EMAIL_KEY } from "@/common/constants";

export function useSocialAuth() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<number | null>(null);
  const toast = useToast();
  const router = useRouter();

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
      toast({
        title: "Verify your email first",
        description: "Please check your email for otp to verify your account.",
        status: "success",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      dispatch(setVerifyEmail(data.user.email));
      // window.location.href = VERIFY_ACCOUNT_URL;
      router.push(VERIFY_ACCOUNT_URL);
      return;
    }
    addMessage(AlertType.Success, `Login successful! Welcome back!`);
    toast({
      title: "Login successful",
      description: "Welcome back!",
      status: "success",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
    dispatch(setUser(data.user));
    authenticate(data);
    // window.location.href = HOME_URL;
    router.push(HOME_URL);
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

  const buttonBg = useColorModeValue("gray.700", "gray.800");
  const buttonHoverBg = useColorModeValue("gray.900", "gray.900");

  const renderButtons = () => (
    <>
      <Button
        onClick={signUpWithGoogle}
        size="lg"
        bg={buttonBg}
        _hover={{
          bg: buttonHoverBg,
        }}
        colorScheme="blue"
        color={"white"}
        rightIcon={<FcGoogle />}
        isLoading={loading == 0}
      >
        Google
      </Button>
      <Button
        onClick={signUpWithGithub}
        size="lg"
        bg={buttonBg}
        _hover={{
          bg: buttonHoverBg,
        }}
        color={"white"}
        rightIcon={<FaGithub />}
        isLoading={loading == 2}
      >
        Github
      </Button>
      <Button
        onClick={signUpWithTwitter}
        size="lg"
        bg={buttonBg}
        _hover={{
          bg: buttonHoverBg,
        }}
        color={"white"}
        rightIcon={<BsTwitterX />}
        isLoading={loading == 1}
      >
        X (Formally Twitter)
      </Button>
    </>
  );

  return {
    renderButtons,
  };
}
