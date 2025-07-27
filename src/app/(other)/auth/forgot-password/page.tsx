import React from 'react'
import ForgotPassword from './components/ForgotPassword'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Forgot-Password" }

const ForgotPasswordPage = () => {
  return (
    <ForgotPassword /> 
  )
}

export default ForgotPasswordPage