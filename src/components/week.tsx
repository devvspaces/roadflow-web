import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { CheckCircleIcon, TimeIcon } from "@chakra-ui/icons";
import React from "react";

export interface SyllabiWeekProps {
  index: number;
  topic: string;
  description: string;
  outlines: string[];
}

export const SyllabiWeek = (props: SyllabiWeekProps) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton py={5}>
          <Box as="span" flex="1" py={3} textAlign="left">
            <Heading fontSize={"1.4rem"} mb={3} fontWeight={"600"}>
              <Text
                as={"span"}
                color={"blue.700"}
                style={{
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  display: "flex",
                  marginBottom: "1rem",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* <TimeIcon w={12} h={12} color={"blue.400"} /> */}
                Week {props.index}: {props.topic}
              </Text>
            </Heading>
            <Text>{props.description}</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={0}>
        <List spacing={3}>
          {props.outlines.map((outline, index) => (
            <ListItem mb={6} key={index}>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {outline}
            </ListItem>
          ))}
        </List>
      </AccordionPanel>
    </AccordionItem>
  );
};
