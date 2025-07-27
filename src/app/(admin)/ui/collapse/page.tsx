
import PageBreadcrumb from '@/components/PageBreadcrumb'
import {
  Col,
  Row
} from 'react-bootstrap'
import BasicCollapse from './components/BasicCollapse'
import HorizontalCollapse from './components/HorizontalCollapse'
import MultipleTargetsCollapse from './components/MultipleTargetsCollapse'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Collapse" }

const Collapse = () => {
  return (
    <>
      <PageBreadcrumb title="Collapse" subName="Base UI" />
      <Row>
        <Col xl={6}>
          <BasicCollapse />
        </Col>
        <Col xl={6}>
          <HorizontalCollapse />
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <MultipleTargetsCollapse />
        </Col>
      </Row>
    </>
  )
}

export default Collapse
