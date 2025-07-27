'use client'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap'

const FormRow = () => {
  return (
    <Card>
        <CardHeader>
          <h4 className="header-title">Form Row</h4>
          <p className="text-muted mb-0">
            By adding <code>.row</code> & <code>.g-2</code>, you can have
            control over the gutter width in as well the inline as block
            direction.
          </p>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="g-2">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridPassword"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Address</Form.Label>
              <Form.Control placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Address 2</Form.Label>
              <Form.Control placeholder="Apartment, studio, or floor" />
            </Form.Group>

            <Row className="g-2">
              <Form.Group
                as={Col}
                md={6}
                className="mb-3"
                controlId="formGridCity"
              >
                <Form.Label>City</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group
                as={Col}
                md={4}
                className="mb-3"
                controlId="formGridState"
              >
                <Form.Label>State</Form.Label>
                <Form.Select defaultValue="Choose...">
                  <option defaultValue="selected">Choose...</option>
                  <option>...</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                md={2}
                className="mb-3"
                controlId="formGridZip"
              >
                <Form.Label>Zip</Form.Label>
                <Form.Control />
              </Form.Group>
            </Row>
            <Form.Group className="mb-2" id="formGridCheckbox">
              <Form.Check
                type="checkbox"
                label="Check this custom checkbox"
                id="customcheckbox-1"
              />
            </Form.Group>
            <Button  
              variant="primary"
              type="submit"
              className="waves-effect waves-light"
            >
              Sign in
            </Button>
          </Form>
        </CardBody>
      </Card>
  )
}

export default FormRow