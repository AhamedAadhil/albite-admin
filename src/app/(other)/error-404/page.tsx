import React from 'react'
import Error404 from './component/Error404'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Error-404" }

const Error404Page = () => {
  return (
    <Error404 />
  )
}

export default Error404Page