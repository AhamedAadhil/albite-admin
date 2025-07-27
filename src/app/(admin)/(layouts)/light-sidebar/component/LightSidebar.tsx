"use client"
import { useThemeContext } from '@/context/useThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const LightSidebar = () => {
  const route = useRouter()
  const { updateSidebar } = useThemeContext()
  useEffect(() => {
    updateSidebar({ theme: "light" })
    route.push('/dashboard')
  }, [])
  return (
    <></>
  )
}

export default LightSidebar
