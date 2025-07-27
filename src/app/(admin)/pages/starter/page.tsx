import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = { title: "Starter" }

const StarterPage = () => {
  return (
    <PageBreadcrumb title="Starter" subName="Pages" />
  )
}

export default StarterPage