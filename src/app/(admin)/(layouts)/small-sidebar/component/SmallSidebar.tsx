'use client'
import { useThemeContext } from '@/context/useThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const SmallSidebar = () => {
  const route = useRouter()
  const { updateSidebar } = useThemeContext()
  useEffect(() => {
    updateSidebar({ size: 'condensed' })
    route.push('/dashboard')
  }, [])
  return (
    <></>
  )
}

export default SmallSidebar
