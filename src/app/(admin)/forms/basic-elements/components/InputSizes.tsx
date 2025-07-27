'use client'
import React from 'react'
import { Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap'

const InputSizes = () => {
  return (
    <>
     <Card>
        <CardHeader>
          <h4 className="header-title">Input Sizes</h4>
          <p className="text-muted mb-0">
            Set heights using classes like <code>.input-lg</code>, and set
            widths using grid column classes like <code>.col-lg-*</code>.
          </p>
        </CardHeader>
        <CardBody>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="small">Small</Form.Label>
              <Form.Control
                type="text"
                name="small"
                id="small1"
                placeholder=".input-sm"
                size="sm"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="small">Normal</Form.Label>
              <Form.Control
                type="text"
                name="Normal"
                id="Normal"
                placeholder="Normal"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="small">Large</Form.Label>
              <Form.Control
                type="text"
                name="Large"
                id="Large"
                placeholder=".input-lg"
                size="lg"
              />
            </Form.Group>

            <div className="mb-2">
              <label htmlFor="example-gridsize" className="form-label">
                Grid Sizes
              </label>
              <Row>
                <Col sm={4}>
                  <Form.Control
                    type="text"
                    name="text"
                    id="Large1"
                    placeholder=".col-sm-4"
                  />
                </Col>
              </Row>
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}

export default InputSizes