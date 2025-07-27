import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import React from 'react'
import { BreadcrumbItem, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: "Breadcrumb" }

const Breadcrumb = () => {
  return (
    <>
    <PageBreadcrumb title="Breadcrumb" subName="Base UI" />
    <Row>
      <Col xs={12}>
        <Card>
          <CardHeader>
            <h4 className="header-title">Example</h4>
            <p className="text-muted mb-0">
              Indicate the current page’s location within a navigational hierarchy that automatically adds separators via CSS.
              Please read the official <a target="_blank" href="https://getbootstrap.com/docs/5.3/components/breadcrumb/">Bootstrap</a> documentation for more options.
            </p>
          </CardHeader>
          <CardBody>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 py-2">
                <BreadcrumbItem className="active" aria-current="page">Home</BreadcrumbItem>
              </ol>
            </nav>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 py-2">
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem className="active" aria-current="page">Library</BreadcrumbItem>
              </ol>
            </nav>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 py-2">
                <BreadcrumbItem><a href="#">Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                <BreadcrumbItem className="active" aria-current="page">Data</BreadcrumbItem>
              </ol>
            </nav>
          </CardBody>
        </Card>
      </Col>
      <Col xs={12}>
        <Card >
          <CardHeader>
            <h4 className="header-title">With Icons</h4>
            <p className="text-muted mb-0">
              Optionally you can also specify the icon with your breadcrumb item.
            </p>
          </CardHeader>
          <CardBody>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1 p-2 bg-light-subtle">
                <BreadcrumbItem className=" active" aria-current="page"><i className="ri-home-4-line me-1" />Home</BreadcrumbItem>
              </ol>
            </nav>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-1 p-2 bg-light-subtle">
                <BreadcrumbItem><a href="#"><i className="ri-home-4-line" /> Home</a></BreadcrumbItem>
                <BreadcrumbItem className=" active" aria-current="page">Library</BreadcrumbItem>
              </ol>
            </nav>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-2 bg-light-subtle">
                <BreadcrumbItem><a href="#"><i className="ri-home-4-line" /> Home</a></BreadcrumbItem>
                <BreadcrumbItem><a href="#">Library</a></BreadcrumbItem>
                <BreadcrumbItem className=" active" aria-current="page">Data</BreadcrumbItem>
              </ol>
            </nav>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </>


  )
}

export default Breadcrumb