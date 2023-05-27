import { AspectRatio, Badge, Box, Card, CardBody, CardFooter, HStack, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import { EventResponse } from '@/common/interfaces/events';
import { ArrowUpIcon, ViewIcon } from '@chakra-ui/icons';

interface Props {
  event: EventResponse
}

function dateToLocaleString(date: string) {
  return (new Date(date)).toLocaleString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  )
}

export default function EventCard({ event }: Props) {

  return (
    <Card
      overflow='hidden'
      variant='filled'
      maxW={'450px'}
      width={'100%'}
      cursor={'pointer'}
      transition={'all .2s ease-in-out'}
      _hover={{
        boxShadow: 'xl',
        transform: 'translateY(-4px)',
      }}
      onClick={() => window.open(event.url, '_blank')}
    >
      <Stack>

        {/* Image */}
        <AspectRatio ratio={16 / 9}>
          <Image src={event.image} alt={event.title} objectFit='cover' />
        </AspectRatio>

        <CardBody>
          <Heading size='md' mb={3}>{event.title}</Heading>
          <Text py='2' mb={3}>{event.projectSummary}</Text>

          <HStack>
            <Badge colorScheme='orange' rounded={'full'} px={2} py={1}>{dateToLocaleString(event.start)}</Badge>
            <Text>-</Text>
            <Badge colorScheme='green' rounded={'full'} px={2} py={1}>{dateToLocaleString(event.end)}</Badge>
          </HStack>
        </CardBody>

        <CardFooter pt={0}>
          <HStack width={'100%'} justify={'space-between'}>
            <Text>
              {event.reading_time}
            </Text>

            {/* Upvotes and views icon */}
            <HStack gap={5}>
              <HStack>
                <IconButton
                  value={"Views"}
                  size={'sm'}
                  colorScheme='blue'
                  aria-label='Views'
                  icon={<ViewIcon />}
                />
                <Text>{event.views}</Text>
              </HStack>

              <HStack>
                <IconButton
                  value={"Upvotes"}
                  size={'sm'}
                  colorScheme='blue'
                  aria-label='Upvotes'
                  icon={<ArrowUpIcon />}
                />
                <Text>{event.upvotes}</Text>
              </HStack>

            </HStack>
          </HStack>
        </CardFooter>
      </Stack>
    </Card>
  )
}