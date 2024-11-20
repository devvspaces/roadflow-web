import { VERIFY_EMAIL_KEY } from "@/common/constants";
import { LOGIN_URL } from "@/router/routes";
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
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import * as Yup from "yup";
import { useState } from "react";
import { AlertType, addMessage } from "@/common/alerts";

export default function ForgotPasswordOtpForm(): JSX.Element {
  const [otp, setOtp] = useState("");

  const formik = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("Required").min(6, "Invalid OTP"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      const email = Cookies.get(VERIFY_EMAIL_KEY);
      if (email == undefined) {
        throw new Error("Email cookie not found");
      }

      const response = await api.verify_account(email, values.otp);
      if (response.success) {
        if (response.result.data) {
          Cookies.remove(VERIFY_EMAIL_KEY);
          addMessage(
            AlertType.Success,
            "Account verified successfully! Please login to continue."
          );
          window.location.href = LOGIN_URL;
        }
        throw new Error("Invalid response");
      }

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
              size={"lg"}
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
          <Text fontSize={"sm"} color="red.300">
            {formik.errors.otp}
          </Text>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              type="submit"
              mt={5}
              _hover={{
                bg: "blue.500",
              }}
            >
              Verify
            </Button>
          </Stack>
        </Stack>
      </form>
    </Flex>
  );
}
