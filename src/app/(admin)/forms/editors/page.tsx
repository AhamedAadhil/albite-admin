import PageBreadcrumb from '@/components/PageBreadcrumb'
import Editors from './component/Editors'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Editors" }

const EditorsPage = () => {
  return (
    <>
      <PageBreadcrumb title="Editors" subName="Forms" />
      <Editors />
    </>
  )
}

export default EditorsPage
