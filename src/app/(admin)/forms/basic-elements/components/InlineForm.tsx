'use client'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, InputGroup, Row } from 'react-bootstrap'

const InlineForm = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Inline Form</h4>
        <p className="text-muted mb-0">
          Use the <code>.row-cols-lg-auto</code>, <code>.g-3</code> &{' '}
          <code>.align-items-center</code> class to display a series of
          labels, form controls, and buttons on a single horizontal row. Form
          controls within inline forms vary slightly from their default
          states. Controls only appear inline in viewports that are at least
          576px wide to account for narrow viewports on mobile devices.
        </p>
      </CardHeader>
      <CardBody>
        <Form className="row row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Form.Group className="mb-2 me-sm-2 mb-sm-0">
              <Form.Control
                readOnly
                type="email"
                name="email"
                id="exampleEmail4"
                bsPrefix="form-control-plaintext"
                placeholder="email@example.com"
              />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-2 me-sm-2 mb-sm-0">
              <Form.Control
                type="password"
                name="password"
                id="examplePassword5"
                placeholder="Password"
              />
            </Form.Group>
          </Col>

          <Col>
            <Button color="primary" type="submit">
              Confirm identity
            </Button>
          </Col>
        </Form>

        <h6 className="fs-13 mt-3">Auto-sizing</h6>
        <Form>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Name
              </Form.Label>
              <Form.Control
                className="mb-2"
                id="inlineFormInput"
                placeholder="Jane Doe"
              />
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                Username
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  id="inlineFormInputGroup"
                  placeholder="Username"
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Form.Check
                type="checkbox"
                id="autoSizingCheck"
                className="mb-2"
                label="Remember me"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" className="mb-2">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  )
}

export default InlineForm