import DropzoneFormInput from '@/components/form/DropzoneFormInput'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import React from 'react'
import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: "File Uploads" }

const page = () => {
  return (
    <>
      <PageBreadcrumb title="File Uploads" subName="Forms" />
      <Row>
        <Col xl={12}>
          <Card>
            <CardBody>
              <CardTitle as={'h5'} className="mb-1 anchor" id="overview">
                Overview
                <Button
                  variant="outline-success"
                  size="sm"
                  className="rounded-2 float-end"
                  href="https://www.npmjs.com/package/react-dropzone"
                  target="_blank">
                  Official Website
                </Button>
              </CardTitle>
              <p className="text-muted mb-3">Dropzone is a lightweight and powerful datetime picker.</p>
              <DropzoneFormInput
                // iconProps={{ icon: 'bx:cloud-upload', height: 36, width: 36 }}
                text="Drop files here or click to upload."
                helpText={
                  <span className="text-muted fs-13">
                    (This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)
                  </span>
                }
                showPreview
              />
            </CardBody>
          </Card>

        </Col>
      </Row>
    </>

  )
}

export default page