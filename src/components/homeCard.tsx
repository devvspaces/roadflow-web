import { Badge, Card, CardBody, CardHeader, HStack, Heading, Link, Progress, useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';

export interface BasicCardItem {
  title: string;
  badge1: string;
  badge2: string;
  link: string;
  progress: number;
}

interface Props {
  item: BasicCardItem
}

export function BasicCard({ item }: Props) {

  const bg = useColorModeValue('blue.100', 'gray.700')

  return (
    <Link
      as={NextLink}
      href={item.link}
      width={'100%'}
      maxW={'400px'}
    >
      <Card
        transition={'.3s ease'}
        cursor={'pointer'}
        transformOrigin={'top'}
        transform={'scale(1)'}
        style={{
          transformStyle: 'preserve-3d',
        }}
        bg={bg}
        _hover={{
          transform: 'scale(1.02)',
          boxShadow: 'xl',
        }}
        width={'100%'}>
        <CardHeader>
          <Heading
            fontWeight={600}
            fontSize={'lg'}
            mb={3}>
            {item.title}
          </Heading>

          <HStack>
            <Badge colorScheme='purple'>
              {item.badge1}
            </Badge>
            <Badge colorScheme='green'>
              {item.badge2}
            </Badge>
          </HStack>
        </CardHeader>

        <CardBody>
          <Progress rounded={'md'} h={2} colorScheme={'blue'} value={item.progress} />
        </CardBody>
      </Card>
    </Link>
  )
}