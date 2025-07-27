import React from 'react'
import Tabs from './component/Tabs'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Tab" }

const TabsPage = () => {
  return (
    <Tabs />
  )
}

export default TabsPage