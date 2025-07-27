'use client'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Form, InputGroup } from 'react-bootstrap'

const TooltipsValidation = () => {
  const [validated, setValidated] = useState(false)

	const handleSubmit = (event: any) => {
		const form = event.currentTarget
		if (form.checkValidity() === false) {
			event.preventDefault()
			event.stopPropagation()
		}
		setValidated(true)
	}

  return (
    <Card>
    <CardHeader>
      <h4 className="header-title">Tooltips</h4>
      <p className="text-muted mb-0">
        If your form layout allows it, you can swap the&nbsp;
        <code>.{`{valid|invalid}`}-feedback</code> classes for&nbsp;
        <code>.{`{valid|invalid}`}-tooltip</code> classes to display
        validation feedback in a styled tooltip. Be sure to have a parent with{' '}
        <code>position: relative</code> on it for tooltip positioning. In the
        example below, our column classes have this already, but your project
        may require an alternative setup.
      </p>
    </CardHeader>
    <CardBody>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="position-relative mb-3">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            id="validationTooltip01"
            placeholder="First name"
            defaultValue="Mark"
            required
          />
          <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid" tooltip>
            Please enter first name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            id="validationTooltip02"
            placeholder="Last name"
            defaultValue="Otto"
            required
          />
          <Form.Control.Feedback tooltip>Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid" tooltip>
            Please enter last name.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <InputGroup.Text id="validationTooltipUsernamePrepend">
              @
            </InputGroup.Text>
            <Form.Control
              type="text"
              id="validationTooltipUsername"
              placeholder="Username"
              required
            />
            <Form.Control.Feedback type="invalid" tooltip>
              Please choose a unique and valid username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            id="validationTooltip03"
            placeholder="City"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            id="validationTooltip04"
            placeholder="State"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="position-relative mb-3">
          <Form.Label>Zip</Form.Label>
          <Form.Control
            type="text"
            id="validationTooltip05"
            placeholder="Zip"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit form
        </Button>
      </Form>
    </CardBody>
  </Card>
  )
}

export default TooltipsValidation