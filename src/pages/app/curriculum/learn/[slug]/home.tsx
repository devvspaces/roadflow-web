import React, { ReactElement, useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Accordion,
  Container,
  Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import LearnLayout from "@/components/layouts/learn";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { EnrolledCurriculumPageResponse } from "@/common/interfaces/curriculum";
import {
  checkServerSideResponse,
  getAccessTokenServerSide,
} from "@/services/authenticate";
import { api } from "@/services/api";
import { SyllabiWeek } from "@/components/week";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  fetchEnrolledCurriculum,
  selectEnrolledCurriculum,
  selectFetchingEnrolledCurriculum,
} from "@/store/curriculumThunk";
import { useRouter } from "next/router";
import { setLoading, setHeadState, setNavState } from "@/store/learnNavSlice";

export default function Page() {
  const dispatch = useAppDispatch();
  const curriculum = useAppSelector(selectEnrolledCurriculum);
  const fetching = useAppSelector(selectFetchingEnrolledCurriculum);
  const router = useRouter();

  useEffect(() => {
    dispatch(setLoading(true));
    // @ts-ignore
    dispatch(fetchEnrolledCurriculum(router.query.slug as string))
      .unwrap()
      .then(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, router.query.slug]);

  useEffect(() => {
    if (!curriculum) return;
    dispatch(
      setNavState(
        curriculum.syllabus.map((item, index) => {
          if (item.topics.length == 0) {
            throw new Error("Invalid response");
          }
          return {
            name: item.title,
            completed: item.completed,
            link: `/app/curriculum/learn/${curriculum.slug}/${item.topics[0].slug}`,
          };
        })
      )
    );
    dispatch(setHeadState(curriculum.name));
  }, [dispatch, curriculum]);

  if (fetching || !curriculum) {
    return (
      <Box>
        <Skeleton height={"300px"} width={"100%"} mb={5} />
      </Box>
    );
  }

  if (!curriculum) {
    return (
      <Box>
        <Text>Curriculum not found.</Text>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>RoadflowAI - {curriculum.name}</title>
      </Head>

      <Box className="topic-content">
        <Heading size={"md"} mb={4} textTransform={"uppercase"}>
          Description
        </Heading>
        <Text lineHeight={1.8}>{curriculum.description}</Text>

        <Heading size={"md"} mt={10} mb={4} textTransform={"uppercase"}>
          Objective
        </Heading>
        <Text>{curriculum.objective}</Text>

        <Heading size={"md"} mt={10} mb={4} textTransform={"uppercase"}>
          Prerequisites
        </Heading>
        <Text lineHeight={1.8}>{curriculum.prerequisites}</Text>

        <Box mt={"3rem"}>
          <Box>
            <Heading textTransform={"uppercase"} size={"md"}>
              Syllabus
            </Heading>
          </Box>

          <Accordion mt={"3rem"} defaultIndex={[0]} allowMultiple>
            {curriculum.syllabus.map((item, index) => {
              return (
                <SyllabiWeek
                  key={index}
                  index={index + 1}
                  topic={item.title}
                  {...item}
                />
              );
            })}
          </Accordion>
        </Box>
      </Box>
    </>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <LearnLayout>{page}</LearnLayout>;
};
