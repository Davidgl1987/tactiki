import { Link } from 'react-router-dom'
import { Image, Box, Button } from '@chakra-ui/react'
import shortUUID from 'short-uuid'
import { Slider } from '@/components'

export function Home() {
  const gid = shortUUID.generate()

  return (
    <Box display={'flex'} height="100vh" justifyContent={'center'}>
      <Slider />
      <Box
        width={'full'}
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
        flexDir={['column', 'row']}
      >
        <Image
          src={'./src/assets/tactiki.webp'}
          alt="Tactiki"
          boxSize={['40vh', '50vw', '30vw']}
          rounded={'md'}
          shadow={'lg'}
        />
        <Box display={'flex'} flexDir="column" gap={'5'}>
          <Link to={`/versus/${gid}`}>
            <Button size={'lg'} width={['25vh', '25vw']}>
              Versus
            </Button>
          </Link>
          <Link to={'/turns'}>
            <Button size={'lg'} width={['25vh', '25vw']}>
              Turns
            </Button>
          </Link>
          <Link to={'/cpu'}>
            <Button size={'lg'} width={['25vh', '25vw']}>
              Cpu
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
