import { useCountdown } from '@/common/hooks/useCountdown';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';


const DateTimeDisplay = ({ value, type, isDanger }: { value: number, type: string; isDanger: boolean }) => {
  return (
    <VStack
    bg={'gray.200'}
    color="black"
    p={"10px 3px"}
    rounded={'md'}
    w={"70px"}>
      <Text fontSize={'1.5rem'}>{value}</Text>
      <Text fontWeight={'bold'} fontSize={'sm'}>{type}</Text>
    </VStack>
  )
};

const ShowCounter = ({ days, hours, minutes, seconds }: { [key: string]: number }) => {
  return (
    <HStack>
      <DateTimeDisplay value={days} type={'D'} isDanger={days <= 3} />
      <DateTimeDisplay value={hours} type={'H'} isDanger={false} />
      <DateTimeDisplay value={minutes} type={'M'} isDanger={false} />
      <DateTimeDisplay value={seconds} type={'S'} isDanger={false} />
    </HStack>
  );
};

const CountdownTimer = ({ targetDate, setTime }: { targetDate: number, setTime: React.Dispatch<React.SetStateAction<number>> }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
    setTime(0);
    return (
      <Box>
        <Text>Now</Text>
      </Box>
    );
  }

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
    />
  );
};

export default CountdownTimer;