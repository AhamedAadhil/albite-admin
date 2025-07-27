import React from 'react'
import Logout from './components/Logout'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Logout" }

const LogoutPage = () => {
  return (
    <Logout />
  )
}

export default LogoutPage