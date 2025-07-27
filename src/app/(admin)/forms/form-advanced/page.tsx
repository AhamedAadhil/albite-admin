
import PageBreadcrumb from '@/components/PageBreadcrumb'
import FormAdvanced from './component/FormAdvanced'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Form Advanced" }

const FormAdvancedPage = () => {
  return (
    <>
      <PageBreadcrumb title="Form Advanced" subName="Forms" />
      <FormAdvanced />
    </>
  )
}

export default FormAdvancedPage
