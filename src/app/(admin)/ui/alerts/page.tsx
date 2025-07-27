import React from 'react'
import Alerts from './Component/Alerts'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Alert" }

const AlertPage = () => {
  return (
    <>
      <PageBreadcrumb title="Alerts" subName="Base UI" />
      <Alerts />
    </>
  )
}

export default AlertPage