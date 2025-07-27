import PageBreadcrumb from '@/components/PageBreadcrumb'
import ApexCharts from './component/ApexCharts'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Apex Charts" }

const ApexChartsPage = () => {
  return (
    <>
      <PageBreadcrumb title="Apex Charts" subName="chats" />
      <ApexCharts />
    </>
  )
}

export default ApexChartsPage


