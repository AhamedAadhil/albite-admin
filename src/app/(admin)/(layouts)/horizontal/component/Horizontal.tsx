'use client'
import { useThemeContext } from '@/context/useThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Horizontal = () => {
  const route = useRouter()
  const { updateLayout } = useThemeContext()
  useEffect(() => {
    updateLayout({ type: "horizontal" })
    route.push('/dashboard')
  }, [])
  return (
    <></>
  )
}

export default Horizontal