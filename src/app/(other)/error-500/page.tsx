import React from 'react'
import Error500 from './component/Error500'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Error-500" }

const Error500Page = () => {
  return (
    <Error500 />
  )
}

export default Error500Page