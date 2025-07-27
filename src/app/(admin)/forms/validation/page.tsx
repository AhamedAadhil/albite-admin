import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Col, Row } from 'react-bootstrap'
import CustomStylesValidation from './components/CustomStylesValidation'
import TooltipsValidation from './components/TooltipsValidation'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Form Validation" }

const Validation = () => {
  return (
    <>
      <PageBreadcrumb title="Form Validation" subName="Forms" />
      <Row>
        <Col lg={6}>
          <CustomStylesValidation />
        </Col>

        <Col lg={6}>
          <TooltipsValidation />
        </Col>
      </Row>
    </>
  )
}

export default Validation
