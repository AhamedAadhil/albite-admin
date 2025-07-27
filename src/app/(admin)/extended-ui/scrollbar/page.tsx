import React from 'react'
import ScrollBar from './component/Scrollbar'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Scrollbar" }

const ScrollbarPage = () => {
  return (
    <ScrollBar />
  )
}

export default ScrollbarPage