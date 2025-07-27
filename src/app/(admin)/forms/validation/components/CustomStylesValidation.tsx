'use client'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Form, InputGroup } from 'react-bootstrap'

const CustomStylesValidation = () => {
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
				<h4 className="header-title">Custom styles</h4>
				<p className="text-muted mb-0">
					Custom feedback styles apply custom colors, borders, focus styles, and
					background icons to better communicate feedback. Background icons
					for&nbsp;
					<code>&lt;select&gt;</code>s are only available with&nbsp;
					<code>.form-select</code>, and not <code>.form-control</code>.
				</p>
			</CardHeader>
			<CardBody>
				<Form noValidate validated={validated} onSubmit={handleSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>First name</Form.Label>
						<Form.Control
							type="text"
							id="validationCustom01"
							placeholder="First name"
							defaultValue="Mark"
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Last name</Form.Label>
						<Form.Control
							type="text"
							id="validationCustom02"
							placeholder="Last name"
							defaultValue="Otto"
							required
						/>
						<Form.Control.Feedback>Looks good!</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Username</Form.Label>
						<InputGroup>
							<InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
							<Form.Control
								type="text"
								id="validationCustomUsername"
								placeholder="Username"
								required
							/>
							<Form.Control.Feedback type="invalid">
								Please choose a username.
							</Form.Control.Feedback>
						</InputGroup>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>City</Form.Label>
						<Form.Control
							type="text"
							id="validationCustom03"
							placeholder="City"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid city.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>State</Form.Label>
						<Form.Control
							type="text"
							id="validationCustom04"
							placeholder="State"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid state.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Zip</Form.Label>
						<Form.Control
							type="text"
							id="validationCustom05"
							placeholder="Zip"
							required
						/>
						<Form.Control.Feedback type="invalid">
							Please provide a valid zip.
						</Form.Control.Feedback>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Check
							id="invalidCheck"
							required
							label="Agree to terms and conditions"
							feedback="You must agree before submitting."
							feedbackType="invalid"
						/>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit form
					</Button>
				</Form>
			</CardBody>
		</Card>
  )
}

export default CustomStylesValidation