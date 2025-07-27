'use client'
import { useThemeContext } from '@/context/useThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const BoxedLayout = () => {
  const route = useRouter()
  const { updateLayout } = useThemeContext()
  useEffect(() => {
    updateLayout({ mode: 'boxed' })
    route.push('/dashboard')
  }, [])
  return (
    <></>
  )
}

export default BoxedLayout