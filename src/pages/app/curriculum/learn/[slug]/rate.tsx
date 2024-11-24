import React, { ReactElement, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  FormErrorMessage,
  Textarea,
  useToast,
  Skeleton,
  Select,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { CurriculumWithResources } from "@/common/interfaces/curriculum";
import {
  selectLoading,
  setHeadState,
  setLoading,
  setNavState,
} from "@/store/learnNavSlice";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "@/services/api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

export default function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const toast = useToast();

  const loading = useAppSelector(selectLoading);
  const [data, setData] = useState<CurriculumWithResources | null>(null);

  useEffect(() => {
    (async () => {
      dispatch(setLoading(true));
      const res = await api.get_curriculum_with_resources(
        router.query.slug as string
      );
      if (res.success) {
        setData(res.result.data!!);
      } else {
        toast({
          title: "Failed to load topic",
          description:
            "Please try again, if the problem persists contact our support team",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      dispatch(setLoading(false));
    })();
  }, [dispatch, toast, router.query.slug]);

  useEffect(() => {
    if (!data) return;
    dispatch(
      setNavState(
        data.syllabus.map((item, index) => {
          if (item.topics.length == 0) {
            throw new Error("Invalid response");
          }
          return {
            name: item.title,
            completed: item.completed,
            link: `/app/curriculum/learn/${data.slug}/${item.topics[0].slug}`,
          };
        })
      )
    );
    dispatch(setHeadState(data.name));
  }, [dispatch, data]);

  const formik = useFormik({
    initialValues: {
      rating: 5,
      review: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number().required("Required").max(5).min(1),
      review: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setFieldError, resetForm, setFieldValue }) => {
      const response = await api.review(data!!.slug, values);
      if (response.success) {
        if (response.result.data) {
          toast({
            title: "Thank You for Your Review!",
            description:
              "We appreciate your feedback and are pleased to inform you that your review has been successfully submitted. Your insights help us improve and serve you better.",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          resetForm();
        }
        return;
      }

      if (response.status !== 400) {
        toast({
          title: "Failed to submit review",
          description:
            "Please try again, if the problem persists contact our support team",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
      }

      const fields = Object.keys(values);
      fields.forEach((field) => {
        if (response.result.data) {
          if (response.result.data[field]) {
            setFieldError(field, response.result.data[field].join(", "));
          }
        }
      });
    },
  });

  if (loading || !data) {
    return (
      <Box>
        <Skeleton height={"300px"} width={"100%"} mb={5} />
      </Box>
    );
  }

  if (!data) {
    return (
      <Box>
        <Text>Course not found.</Text>
      </Box>
    );
  }

  const ratings: { [key: number]: string } = {
    1: "Very poor",
    2: "Poor",
    3: "Average",
    4: "Good",
    5: "Excellent",
  };

  return (
    <>
      <Head>
        <title>RoadflowAI - {data.name}</title>
      </Head>

      <Heading size={"md"}>Rate Curriculum</Heading>
      <Box className="topic-content" py={5}>
        <Text>You can rate the content on the curriculum here</Text>

        <Box py={6}>
          <Flex minH={"100vh"}>
            <Stack width={"100%"} maxW={"lg"} spacing={8}>
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl
                      id="rating"
                      isInvalid={
                        !!formik.errors.rating && formik.touched.rating
                      }
                    >
                      <FormLabel>Rating</FormLabel>
                      <Select
                        placeholder="Select rating"
                        value={formik.values.rating}
                        onChange={formik.handleChange}
                      >
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <option key={rating} value={rating}>
                            {rating} - {ratings[rating]}
                          </option>
                        ))}
                      </Select>
                      <FormErrorMessage>
                        {formik.errors.rating}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl
                      id="review"
                      isInvalid={
                        !!formik.errors.review && formik.touched.review
                      }
                    >
                      <FormLabel>Review</FormLabel>
                      <Textarea
                        h={"10rem"}
                        onChange={formik.handleChange}
                        value={formik.values.review}
                      />
                      <FormErrorMessage>
                        {formik.errors.review}
                      </FormErrorMessage>
                    </FormControl>
                    <Stack pt={10}>
                      <Button
                        type="submit"
                        size="md"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        isLoading={formik.isSubmitting}
                      >
                        Rate
                      </Button>
                    </Stack>
                  </Stack>
                </form>
              </Box>
            </Stack>
          </Flex>
        </Box>
      </Box>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LearnLayout>{page}</LearnLayout>;
};
