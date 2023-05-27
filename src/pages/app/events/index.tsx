import Head from 'next/head'
import { Box, Container, Heading, Stack, Text } from '@chakra-ui/react';
import EventCard from '@/components/pages/events/card';
import { useState, useEffect } from 'react';
import { EventResponse } from '@/common/interfaces/events';
import { api } from '@/services/api';

export default function Page() {
  const [events, setEvents] = useState<EventResponse[]>([])
  
  useEffect(() => {
    async function fetchData() {
      const response = await api.get_upcoming_events();
      if (response.success) {
        setEvents(response.result.data?.results || [])
      }
    }
    fetchData();
  }, [setEvents])

  return (
    <>
      <Head>
        <title>RoadFlow - Showwcase Events</title>
      </Head>

      <Container maxW={'5xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8 }}
          py={20}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: '4xl', sm: '5xl' }}
          >
            Upcoming Events
          </Heading>
          <Text color={'gray.500'}>
            Find Upcoming Events from Showwcase. Engage with the community and learn new things.
          </Text>
        </Stack>

        <Stack
        justify={'center'}
        gridGap={4}
        spacing={0}
        direction={'row'}
        flexWrap={'wrap'}>
          {
            events.map((obj, index) => (
              <EventCard key={index} event={obj} />
            ))
          }
        </Stack>
      </Container>
    </>
  );
}
