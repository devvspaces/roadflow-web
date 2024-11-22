import React, { useState, useEffect } from "react";
import Head from "next/head";
import {
  Box,
  Center,
  Container,
  FormControl,
  HStack,
  Heading,
  IconButton,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import CurriculumCardComponent, {
  CurriculumCard,
} from "@/components/pages/curriculum/curriculum-card";
import { api } from "@/services/api";
import { getDifficulty } from "@/common/interfaces/curriculum";
import { useFormik } from "formik";
import { modifyUrl } from "@/common/url";
import { FaTimes } from "react-icons/fa";

export default function SearchCurriculum() {
  const [curriculums, setCurriculums] = useState<CurriculumCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const getCurriculums = async (searchTerm?: string) => {
    try {
      setLoading(true);
      const response = await api.get_curriculums({
        search: searchTerm || "",
      });

      if (response.success) {
        const items = response.result.data?.results || [];
        const processedItems = items.map((item) => ({
          ...item,
          level: getDifficulty(item.difficulty),
          duration: item.weeks,
          rating: item.rating,
        }));
        setCurriculums(processedItems);
      }
    } catch (error) {
      console.error("Error fetching curriculums:", error);
      setCurriculums([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParam =
      new URLSearchParams(window.location.search).get("search") || "";
    setSearch(searchParam);
    getCurriculums(searchParam);
  }, []);

  const formik = useFormik({
    initialValues: {
      search: search,
    },
    onSubmit: async (values) => {
      const urlParams = new URLSearchParams();
      urlParams.append("search", values.search);
      const url = `${window.location.origin}${
        window.location.pathname
      }?${urlParams.toString()}`;

      modifyUrl("search", url);
      setSearch(values.search);
      getCurriculums(values.search);
    },
  });

  const handleClearSearch = () => {
    formik.setFieldValue("search", "");
    setSearch("");
    modifyUrl("search", `${window.location.origin}${window.location.pathname}`);
    getCurriculums("");
  };

  return (
    <>
      <Head>
        <title>RoadFlowAI - Curriculums</title>
      </Head>

      <Container maxW={"5xl"}>
        <Stack as={Box} textAlign={"center"} spacing={{ base: 8 }} py={20}>
          <Heading fontWeight={600} fontSize={{ base: "4xl", sm: "5xl" }}>
            What would you like to learn today?
          </Heading>
          <Text color={"gray.500"}>
            Explore new courses here! Each one is labeled with its difficulty
            level and duration to help you find the perfect match for your
            goals.
          </Text>

          <form onSubmit={formik.handleSubmit}>
            <HStack gap={4} spacing={0} wrap={"wrap"} justify={"center"}>
              <FormControl id="search" maxW={"500px"}>
                <Input
                  h={14}
                  py={5}
                  px={5}
                  borderRadius={30}
                  type="text"
                  placeholder="Search for curriculums"
                  name="search"
                  onChange={formik.handleChange}
                  value={formik.values.search}
                  isRequired
                />
              </FormControl>

              <IconButton
                size={"md"}
                icon={<SearchIcon />}
                colorScheme="blue"
                aria-label={"Search database"}
                h={14}
                w={14}
                borderRadius={30}
                type={"submit"}
              />

              {search && (
                <IconButton
                  size={"md"}
                  icon={<FaTimes />}
                  colorScheme="red"
                  aria-label={"Clear search"}
                  h={14}
                  w={14}
                  borderRadius={30}
                  onClick={handleClearSearch}
                />
              )}
            </HStack>
          </form>
        </Stack>

        {loading && (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}

        {!loading && curriculums.length > 0 && (
          <Stack
            justify={"center"}
            gridGap={4}
            spacing={0}
            direction={"row"}
            flexWrap={"wrap"}
          >
            {curriculums.map((curriculum) => (
              <CurriculumCardComponent key={curriculum.slug} obj={curriculum} />
            ))}
          </Stack>
        )}

        {!loading && curriculums.length === 0 && (
          <Center>
            <Text fontSize={"xl"}>No courses found</Text>
          </Center>
        )}
      </Container>
    </>
  );
}
