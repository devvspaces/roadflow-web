import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { truncateString } from "@/common/string";

export interface CurriculumCardProps {
  obj: CurriculumCard;
}

export interface CurriculumCard {
  name: string;
  description: string;
  level: string;
  duration: number;
  rating: number;
  slug: string;
}

export default function CurriculumCardComponent({ obj }: CurriculumCardProps) {
  const cardColor = useColorModeValue("gray.100", "gray.600");
  const cardHoverColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Link
      href={{
        pathname: "/app/curriculum/[slug]",
        query: { slug: obj.slug },
      }}
    >
      <Card
        maxW={"450px"}
        bg={cardColor}
        transition={"all 0.2s ease-in-out"}
        cursor={"pointer"}
        _hover={{
          transform: "translateY(-2px)",
          bg: cardHoverColor,
        }}
      >
        <CardHeader pb={0}>
          <HStack spacing={4} justify="space-between">
            <Heading size="md">{obj.name}</Heading>
          </HStack>
        </CardHeader>

        <CardBody>
          <Text mb={5} lineHeight={2}>
            {truncateString(obj.description, 200)}
          </Text>

          <HStack spacing={10}>
            <Box>
              <Text fontWeight={600}>Level</Text>
              <Badge colorScheme="blue">{obj.level}</Badge>
            </Box>

            <Box>
              <Text fontWeight={600}>Duration</Text>
              <Badge colorScheme="teal">{obj.duration} weeks</Badge>
            </Box>
          </HStack>
        </CardBody>
      </Card>
    </Link>
  );
}
