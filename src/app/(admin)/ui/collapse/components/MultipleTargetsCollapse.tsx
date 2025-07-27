'use client'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Collapse, Row } from 'react-bootstrap'

const MultipleTargetsCollapse = () => {
  const [isOpenFirst, toggleFirst] = useToggle(false)
	const [isOpenSecond, toggleSecond] = useToggle(false)
	const toggleBoth = () => {
		toggleFirst()
		toggleSecond()
	}
  return (
    <Card>
    <CardHeader>
      <h4 className="header-title">Multiple Targets</h4>
      <p className="text-muted mb-0">
        Multiple <code>&lt;button&gt;</code> or <code>&lt;a&gt;</code> can
        show and hide an element if they each reference it with their{' '}
        <code>href</code> or <code>data-bs-target</code> attribute
      </p>
    </CardHeader>
    <CardBody>
      <p className="d-flex flex-wrap gap-1">
        <Link href="#" className="btn btn-primary" onClick={toggleFirst}>
          Toggle first element
        </Link>
        <Button variant="primary" type="button" onClick={toggleSecond}>
          Toggle second element
        </Button>
        <Button variant="primary" type="button" onClick={toggleBoth}>
          Toggle both elements
        </Button>
      </p>
      <Row>
        <Col>
          <Collapse in={isOpenFirst}>
            <div>
              <Card className="mb-0">
                <Card.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </Card.Body>
              </Card>
            </div>
          </Collapse>
        </Col>
        <Col>
          <Collapse in={isOpenSecond}>
            <div>
              <Card className="mb-0">
                <Card.Body>
                  Anim pariatur cliche reprehenderit, enim eiusmod high life
                  accusamus terry richardson ad squid. Nihil anim keffiyeh
                  helvetica, craft beer labore wes anderson cred nesciunt
                  sapiente ea proident.
                </Card.Body>
              </Card>
            </div>
          </Collapse>
        </Col>
      </Row>
    </CardBody>
  </Card>
  )
}

export default MultipleTargetsCollapse