import { useEffect } from 'react'
import { useGameContext } from '@/context'
import { Game } from '@/components'

export function Turns() {
  const { setMode } = useGameContext()

  useEffect(() => {
    setMode('TURNS')
  }, [])
  return (
    <>
      <Game />
    </>
  )
}
