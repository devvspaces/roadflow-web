import { AspectRatio, Badge, Button, Card, CardBody, CardFooter, HStack, Heading, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

interface RoleCardProps {
  role: RoleObject
}

export interface RoleObject {
  name: string
  description: string
  salary: {
    min: number,
    max: number
  },
  video: string,
}

export default function RoleCard({ role }: RoleCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card
      overflow='hidden'
      variant='filled'
      maxW={'450px'}
      width={'100%'}
    >
      <Stack>
        <CardBody>
          <Heading size='md' mb={3}>{role.name}</Heading>
          <Text py='2' mb={3}>{role.description}</Text>

          <HStack>
            <Badge colorScheme='orange'>${Number(role.salary.min).toLocaleString()}</Badge>
            <Text>-</Text>
            <Badge colorScheme='green'>${Number(role.salary.max).toLocaleString()}</Badge>
          </HStack>
        </CardBody>

        <CardFooter pt={0}>
          <HStack width={'100%'} justify={'space-between'}>
            <Button
              onClick={onOpen}
              variant='outline'
              colorScheme='blue'
            >
              Watch
            </Button>

            <IconButton
              value={"View Roadmap"}
              colorScheme='blue'
              aria-label='View Roadmap'
              icon={<ChevronRightIcon />}
            />
          </HStack>

          <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Who is a Data Engineer?</ModalHeader>
              <ModalCloseButton />
              <ModalBody py={10}>

                <AspectRatio overflow={'hidden'} borderRadius={10} mx={'auto'} maxH={'300px'} maxW='600px' ratio={1}>
                  <iframe
                    title='naruto'
                    src={role.video}
                    allowFullScreen
                  />
                </AspectRatio>
              </ModalBody>
            </ModalContent>
          </Modal>
        </CardFooter>
      </Stack>
    </Card>
  )
}