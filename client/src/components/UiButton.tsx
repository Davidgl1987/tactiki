import { Button } from '@chakra-ui/react'

type Props = {
  onClick?: React.MouseEventHandler
  children?: JSX.Element | JSX.Element[] | React.ReactNode | string | string[]
}
export const UiButton: React.FC<Props> = ({ children, onClick }) => {
  return (
    <Button
      colorScheme={'transparent'}
      transition="all .25s ease"
      _hover={{ transform: 'scale(1.25)', filter: 'brightness(125%)' }}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
