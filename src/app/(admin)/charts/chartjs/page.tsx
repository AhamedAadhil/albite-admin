import PageBreadcrumb from '@/components/PageBreadcrumb'
import ChartJs from './components/ChartJs'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Chart js" }

const ChartjsCharts = () => {
  return (
    <>
      <PageBreadcrumb title="Chartjs" subName="Charts" />
      <ChartJs />
    </>
  )
}

export default ChartjsCharts
