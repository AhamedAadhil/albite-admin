import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: "EmbedVideo" }

const EmbedVideo = () => {
  return (
    <>
      <PageBreadcrumb title="EmbedVideo" subName="Base UI" />
      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title">Responsive embed video 21:9</h4>
              <p className="text-muted mb-0">Use class <code>.ratio-21x9</code></p>
            </CardHeader>
            <CardBody>
              <div className="ratio ratio-21x9">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"  />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="header-title">Responsive embed video 1:1</h4>
              <p className="text-muted mb-0">Use class <code>.ratio-1x1</code></p>
            </CardHeader>
            <CardBody>
              <div className="ratio ratio-1x1">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
              </div>
            </CardBody>
          </Card>
        </Col>
        <div className="col-xl-6">
          <Card>
            <CardHeader>
              <h4 className="header-title">Responsive embed video 16:9</h4>
              <p className="text-muted mb-0">Use class <code>.ratio-16x9</code></p>
            </CardHeader>
            <CardBody>
              <div className="ratio ratio-16x9">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <h4 className="header-title">Responsive embed video 4:3</h4>
              <p className="text-muted mb-0">Use class <code>.ratio-4x3</code></p>
            </CardHeader>
            <CardBody>
              <div className="ratio ratio-4x3">
                <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" />
              </div>
            </CardBody>
          </Card>
        </div>
      </Row>

    </>
  )
}

export default EmbedVideo
