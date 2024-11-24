import { VERIFY_EMAIL_KEY } from "@/common/constants";
import { HOME_URL, LOGIN_URL } from "@/router/routes";
import { api } from "@/services/api";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  PinInput,
  PinInputField,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { AlertType, addMessage } from "@/common/alerts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectVerifyEmail, setUser, setVerifyEmail } from "@/store/authSlice";
import { useRouter } from "next/router";
import { authenticate } from "@/services/authenticate";

export default function ForgotPasswordOtpForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectVerifyEmail);
  const [otp, setOtp] = useState("");
  const toast = useToast();
  const router = useRouter();
  const [resendIn, setResendIn] = useState(60);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (resendIn > 0) {
        setResendIn(resendIn - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [resendIn]);

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Required").min(6, "Invalid OTP"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      if (!email) {
        toast({
          title: "Invalid OTP",
          status: "error",
          duration: 5000,
          position: "top",
          isClosable: true,
        });
        router.push(LOGIN_URL);
        return;
      }

      const response = await api.verify_account(email, values.otp);
      if (response.success) {
        if (response.result.data) {
          dispatch(setVerifyEmail(null));
          dispatch(setUser(response.result.data.user));
          authenticate(response.result.data);
          addMessage(
            AlertType.Success,
            "Account verified successfully! Please login to continue."
          );
          toast({
            title: "Congratulations!",
            description: "Start learning now!",
            status: "success",
            duration: 5000,
            position: "top",
            isClosable: true,
          });
          router.push(HOME_URL);
        }
        return;
      }

      toast({
        title: "Verification failed",
        description: "Invalid OTP",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });

      const fields = ["otp"];
      fields.forEach((field) => {
        if (response.result.data) {
          if (response.result.data[field]) {
            setFieldError(field, response.result.data[field].join(", "));
          }
        }
      });
    },
  });

  return (
    <Flex
      minH={"100vh"}
      mt={"3rem"}
      justify={"center"}
      px={4}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <form onSubmit={formik.handleSubmit} style={{ maxWidth: "100%" }}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading
            mb={4}
            lineHeight={1.1}
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Verify Reset Code
          </Heading>
          <Text
            fontSize={{ base: "sm", sm: "md" }}
            color={useColorModeValue("gray.800", "gray.400")}
          >
            Enter the code sent to your email address to reset your password.
          </Text>
          <HStack justify={"center"} py={3}>
            <PinInput
              id="otp"
              size={{ base: "md", md: "lg" }}
              placeholder="🔒"
              onChange={(value) => {
                setOtp(value);
                formik.setFieldValue("otp", value);
              }}
              isInvalid={!!formik.errors.otp && formik.touched.otp}
            >
              <PinInputField width={20} height={20} />
              <PinInputField width={20} height={20} />
              <PinInputField width={20} height={20} />
              <PinInputField width={20} height={20} />
              <PinInputField width={20} height={20} />
              <PinInputField width={20} height={20} />
            </PinInput>
          </HStack>
          <HStack justify={"space-between"} py={3}>
            <Text fontSize={"sm"} color="red.300">
              {formik.errors.otp}
            </Text>
            <Button
              size="sm"
              variant="link"
              isDisabled={resendIn > 0}
              isLoading={resending}
              onClick={() => {
                if (resendIn === 0) {
                  if (!email) {
                    toast({
                      title: "Error resending OTP",
                      description:
                        "Please try again later or contact our support team.",
                      status: "error",
                      duration: 5000,
                      position: "top",
                      isClosable: true,
                    });
                    router.push(LOGIN_URL);
                    return;
                  }
                  setResending(true);
                  api
                    .resend_otp(email)
                    .then((response) => {
                      setResending(false);
                      if (response.success) {
                        setResendIn(60);
                        toast({
                          title: "OTP Sent",
                          description: "Please check your email for the OTP.",
                          status: "success",
                          duration: 5000,
                          position: "top",
                          isClosable: true,
                        });
                      }
                    })
                    .catch(() => {
                      setResending(false);
                      toast({
                        title: "Error resending OTP",
                        description:
                          "Please try again later or contact our support team.",
                        status: "error",
                        duration: 5000,
                        position: "top",
                        isClosable: true,
                      });
                    });
                }
              }}
            >
              Resend OTP {resendIn > 0 ? `in ${resendIn}s` : ""}
            </Button>
          </HStack>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              type="submit"
              mt={5}
              _hover={{
                bg: "blue.500",
              }}
              isLoading={formik.isSubmitting}
            >
              Verify
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
}
