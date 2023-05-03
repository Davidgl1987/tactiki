import { Box, Center } from '@chakra-ui/react'

import { UiButton } from '@/components'
import { useGameContext } from '@/context'
import { Phase } from 'shared'

export const Ui: React.FC = () => {
  const { game } = useGameContext()
  if (!game) return null

  const player = { name: '' },
    rival = { name: '' }
  if (!player || !rival) return null

  return (
    <>
      <UiTopLeft>
        <UiButton onClick={() => console.log('click')}>
          <span>Menú</span>
        </UiButton>
      </UiTopLeft>
      {/* <UiTopCenter>
        <Button colorScheme={'transparent'} onClick={() => console.log('click')}>
          <Image src="/src/assets/icons/play-white.svg" alt="menu" />
        </Button>
      </UiTopCenter> */}
      <UiTopRight>
        <UiButton onClick={() => console.log('click')}>
          <span>Ayuda</span>
        </UiButton>
      </UiTopRight>
      {/* <UiCenterLeft>
        <UiButton onClick={() => console.log('click')}>
          <Image src="/src/assets/icons/menu-white.svg" alt="menu" />
        </UiButton>
      </UiCenterLeft>
      <UiCenterCenter>
        <UiButton onClick={() => console.log('click')}>
          <Image src="/src/assets/icons/menu-white.svg" alt="menu" />
        </UiButton>
      </UiCenterCenter>
      <UiCenterRight>
        <UiButton onClick={() => console.log('click')}>
          <Image src="/src/assets/icons/menu-white.svg" alt="menu" />
        </UiButton>
      </UiCenterRight> */}
      <UiBottomLeft>
        <UiButton onClick={() => console.log('click')}>
          <span>{player.name}</span>
        </UiButton>
      </UiBottomLeft>
      <UiBottomCenter>
        <Center color="white" fontWeight="bold">
          Turns {game.currentPlayer === 'L' ? 'red' : 'blue'}{' '}
          {game.currentPlayerTurns}
        </Center>
        <Center color="white">{Phase[game.phase]}</Center>
      </UiBottomCenter>
      <UiBottomRight>
        <UiButton onClick={() => console.log('click')}>
          <span>{rival.name}</span>
        </UiButton>
      </UiBottomRight>
    </>
  )
}

type Props = {
  children?: JSX.Element | JSX.Element[] | React.ReactNode | string | string[]
}

const UiTopLeft: React.FC<Props> = ({ children }) => {
  return (
    <Box position={'absolute'} zIndex={9} m={5} top={0} left={0}>
      {children}
    </Box>
  )
}

const UiTopCenter: React.FC<Props> = ({ children }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={9}
      m={5}
      textAlign={'center'}
      top={0}
      left={'50%'}
      transform={'translateX(-100%)'}
    >
      {children}
    </Box>
  )
}

const UiTopRight: React.FC<Props> = ({ children }) => {
  return (
    <Box position={'absolute'} zIndex={9} m={5} top={0} right={0}>
      {children}
    </Box>
  )
}

const UiBottomLeft: React.FC<Props> = ({ children }) => {
  return (
    <Box position={'absolute'} zIndex={9} m={5} bottom={0} left={0}>
      {children}
    </Box>
  )
}

const UiCenterLeft: React.FC<Props> = ({ children }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={9}
      m={5}
      left={0}
      top={'50%'}
      transform={'translateY(-100%)'}
    >
      {children}
    </Box>
  )
}

const UiCenterRight: React.FC<Props> = ({ children }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={9}
      m={5}
      right={0}
      top={'50%'}
      transform={'translateY(-100%)'}
    >
      {children}
    </Box>
  )
}

const UiCenterCenter: React.FC<Props> = ({ children }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={9}
      m={5}
      left={'50%'}
      textAlign={'center'}
      top={'50%'}
      transform={'translate(-100%, -100%)'}
    >
      {children}
    </Box>
  )
}

const UiBottomCenter: React.FC<Props> = ({ children }) => {
  return (
    <Box
      position={'absolute'}
      zIndex={9}
      m={5}
      textAlign={'center'}
      bottom={0}
      left={'50%'}
      transform={'translateX(-100%)'}
    >
      {children}
    </Box>
  )
}

const UiBottomRight: React.FC<Props> = ({ children }) => {
  return (
    <Box position={'absolute'} zIndex={9} m={5} bottom={0} right={0}>
      {children}
    </Box>
  )
}
