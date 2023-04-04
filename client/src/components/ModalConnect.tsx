import { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  useToast,
  Text,
  InputRightElement,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

import { useLobby } from '@/hooks'
import { useGameContext } from '@/context'

type Props = {
  isOpen: boolean
  onStart: () => void
}

export const ModalConnect: React.FC<Props> = ({ isOpen, onStart }) => {
  const [playerName, setPlayerName] = useState('')
  const [rivalName, setRivalName] = useState('')

  const { setGame } = useGameContext()

  const toast = useToast()

  const { room, joinRoom, updatePlayer, startGame, player, rival } = useLobby({
    onGameStarted: (game) => {
      setGame(game)
      onStart()
    },
  })

  useEffect(() => {
    setPlayerName(player?.player?.name || '')
    setRivalName(rival?.player?.name || '')
  }, [room])

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: 'Link copied to clipboard!',
      description: 'You can share this link with your friend',
      status: 'success',
      duration: 2000,
    })
  }

  const handleChangeName = (name: string) => {
    updatePlayer(name)
  }

  const handleStart = () => {
    startGame()
  }

  console.log('render modal', { isOpen, onStart, room, player, rival })

  return (
    <Modal isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Waiting for opponent...
          <Spinner float={'right'} />
        </ModalHeader>

        <ModalBody>
          <Stack>
            <FormControl>
              <FormLabel>Meanwhile you can enter your name</FormLabel>
              <InputGroup>
                <Input
                  isDisabled={player?.ready}
                  value={playerName}
                  onChange={(e) => handleChangeName(e.target.value)}
                />
                {player?.ready && (
                  <InputRightElement
                    children={<CheckIcon color="green.500" />}
                  />
                )}
              </InputGroup>
            </FormControl>
            {rivalName ? (
              <FormControl>
                <InputGroup>
                  <Input value={rivalName} isDisabled />
                  {rival?.ready && (
                    <InputRightElement
                      children={<CheckIcon color="green.500" />}
                    />
                  )}
                </InputGroup>
              </FormControl>
            ) : (
              <FormControl>
                <Text>
                  Copy and share this link to your friend to play with you
                </Text>
                <Button
                  color={'teal'}
                  size={'sm'}
                  aria-label="Copy link"
                  // rightIcon={<FaCopy />}
                  maxW={'full'}
                  onClick={copyLinkToClipboard}
                  variant={'outline'}
                >
                  <Text isTruncated>{window.location.href}</Text>
                </Button>
              </FormControl>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme={'teal'}
            onClick={handleStart}
            isDisabled={player?.ready}
          >
            Start!
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
