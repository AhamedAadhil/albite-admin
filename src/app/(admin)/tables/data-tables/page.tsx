import PageBreadcrumb from '@/components/PageBreadcrumb'
import type { Metadata } from 'next'
import { Col, Row } from 'react-bootstrap'
import AllDataTables from './components/AllDataTables'
import { dataTableRecords } from './data'

export const metadata: Metadata = { title: 'GridJs Tables' }

const GridJS = async () => {
  return (
    <>
      <PageBreadcrumb title="Data Tables" subName="Tables" />
      <Row>
        <Col xl={12}>
          {' '}
          <AllDataTables dataTableRecords={dataTableRecords} />
        </Col>
      </Row>
    </>
  )
}

export default GridJS
