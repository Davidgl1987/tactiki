import { useEffect } from 'react'
import { useGameContext } from '@/context'
import { Game } from '@/components'

export function Cpu() {
  const { setMode } = useGameContext()

  useEffect(() => {
    setMode('CPU')
  }, [])

  return (
    <>
      <Game />
    </>
  )
}
