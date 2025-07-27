'use client'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap'

const HorizontalForm = () => {
  return (
    <Card>
        <CardHeader>
          <h4 className="header-title">Horizontal form</h4>
          <p className="text-muted mb-0">
            Create horizontal forms with the grid by adding the{' '}
            <code>.row</code> class to form groups and using the{' '}
            <code>.col-*-*</code> classes to specify the width of your labels
            and controls. Be sure to add <code>.col-form-label</code> to your{' '}
            <code>&lt;label&gt;</code>s as well so they&apos;re vertically
            centered with their associated form controls.
          </p>
        </CardHeader>
        <CardBody>
          <Form>
            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="exampleEmail3" column sm={3}>
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  name="email"
                  id="exampleEmail3"
                  placeholder="Email"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="examplePassword3" column sm={3}>
                Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  name="password"
                  id="examplePassword3"
                  placeholder="Password"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label htmlFor="examplePassword4" column sm={3}>
                Re-Password
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="password"
                  name="password"
                  id="examplePassword4"
                  placeholder="Retype Password"
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalCheck"
            >
              <Col sm={{ span: 9, offset: 3 }}>
                <Form.Check label="Check me out !" id="checkmeout" />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-0"
              controlId="formHorizontalCheck"
            >
              <Col sm={{ span: 9, offset: 3 }}>
                <Button variant="info" type="submit">
                  Sign in
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </CardBody>
      </Card>
  )
}

export default HorizontalForm