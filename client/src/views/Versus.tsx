import { useEffect, useState } from 'react'
import { useToast } from '@chakra-ui/react'

import { useGameContext } from '@/context'
import { ModalConnect, Game } from '@/components'

export function Versus() {
  const { mode, setMode, game } = useGameContext()
  const [modalOpen, setModalOpen] = useState(true)
  const toast = useToast()

  useEffect(() => {
    setMode('VERSUS')
  }, [])

  useEffect(() => {
    if (game) setModalOpen(false)
  }, [game])

  const handleOnStart = () => {
    if (game !== null) setModalOpen(false)
  }

  if (!mode) return null

  return (
    <>
      <ModalConnect isOpen={modalOpen} onStart={handleOnStart} />
      <Game />
    </>
  )
}
