'use client'
import { useThemeContext } from '@/context/useThemeContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const CollapsedSidebar = () => {
  const route = useRouter()
  const { updateSidebar } = useThemeContext()
  useEffect(() => {
    updateSidebar({ size: 'compact' })
    route.push('/dashboard')
  }, [])
  return (
    <></>
  )
}

export default CollapsedSidebar