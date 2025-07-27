'use client'
import React from 'react'
import { Button, Card, CardBody, CardHeader, Form } from 'react-bootstrap'

const DefaultForm = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Basic Example</h4>
        <p className="text-muted mb-0">
          Here&apos;s a quick example to demonstrate Bootstrap&apos;s form
          styles. Keep reading for documentation on required classes, form
          layout, and more.
        </p>
      </CardHeader>
      <CardBody>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="exampleEmail2">Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              id="exampleEmail2"
              placeholder="Enter email"
            />
            <Form.Text>
              We&apos;ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="examplePassword2">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              id="examplePassword2"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              id="formGridCheckbox"
              label="Check me out !"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default DefaultForm