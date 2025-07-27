'use client'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Col, Dropdown, DropdownButton, Form, InputGroup, Row } from 'react-bootstrap'

const InputGroups = () => {
  return (
    <Card>
    <CardHeader>
      <h4 className="header-title">Input Group</h4>
      <p className="text-muted mb-0">
        Easily extend form controls by adding text, buttons, or button
        groups on either side of textual inputs, custom selects, and custom
        file inputs
      </p>
    </CardHeader>
    <CardBody>
      <Form>
        <div className="mb-3">
          <Form.Label className="form-label">Static</Form.Label>
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="basic-addon1">
              @
            </span>
            <Form.Control
              type="text"
              name="username"
              id="small"
              placeholder="Username"
            />
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="Dropdown">Dropdowns</Form.Label>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="primary"
              title="Dropdown"
              id="input-group-dropdown-1"
            >
              <Dropdown.Item href="#">Action</Dropdown.Item>
              <Dropdown.Item href="#">Another action</Dropdown.Item>
              <Dropdown.Item href="#">Something else here</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item>
            </DropdownButton>
            <Form.Control aria-label="Text input with dropdown button" />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="Button">Buttons</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <Button variant="dark" id="button-addon2">
              Button
            </Button>
          </InputGroup>
        </Form.Group>
        <Row className="g-2">
          <Col sm={6}>
            <Form.Group>
              <Form.Label htmlFor="file">File input</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group>
              <Form.Label htmlFor="formFileMultiple01">
                Multiple files input
              </Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>
  )
}

export default InputGroups