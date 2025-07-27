'use client'
import FormInput from '@/components/FormInput'
import React from 'react'
import { Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const BasicInputElements = () => {
  /*
	 * form methods
	 */
	const methods = useForm({
		defaultValues: {
			password: 'password',
			statictext: 'email@example.com',
			color: '#727cf5',
		},
	})
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = methods
  return (
    <Card>
			<CardHeader>
				<h4 className="header-title">Input Types</h4>
				<p className="text-muted mb-0">
					Most common form control, text-based input fields. Includes support
					for all HTML5 types: <code>text</code>, <code>password</code>,{' '}
					<code>datetime</code>, <code>datetime-local</code>, <code>date</code>,{' '}
					<code>month</code>, <code>time</code>, <code>week</code>,{' '}
					<code>number</code>, <code>email</code>, <code>url</code>,{' '}
					<code>search</code>, <code>tel</code>, and <code>color</code>.
				</p>
			</CardHeader>
			<CardBody>
				<Row>
					<Col lg={6}>
						<form onSubmit={handleSubmit(() => {})}>
							<FormInput
								label="Text"
								type="text"
								name="text"
								containerClass="mb-3"
								register={register}
								key="text"
								errors={errors}
								control={control}
							/>
							<FormInput
								label="Email"
								type="email"
								name="email"
								placeholder="Email"
								containerClass="mb-3"
								register={register}
								key="email"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Password"
								type="password"
								name="password"
								containerClass="mb-3"
								register={register}
								key="password"
								errors={errors}
								control={control}
								defaultValue="password"
							/>

							<FormInput
								label="Show/Hide Password"
								type="password"
								name="password2"
								placeholder="Enter Your Password"
								containerClass="mb-3"
								register={register}
								key="password2"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Placeholder"
								type="text"
								name="placeholder"
								placeholder="placeholder"
								containerClass="mb-3"
								register={register}
								key="placeholder"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Text area"
								type="textarea"
								name="textarea"
								rows={5}
								containerClass="mb-3"
								register={register}
								key="textarea"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Read only"
								type="text"
								name="text1"
								id="text1"
								placeholder="Readonly value"
								readOnly
								containerClass="mb-3"
								register={register}
								key="text1"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Disabled"
								type="text"
								name="text2"
								id="text2"
								placeholder="Disabled value"
								disabled
								containerClass="mb-3"
								register={register}
								key="text2"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Static control"
								type="text"
								name="statictext"
								placeholder="Disabled"
								readOnly
								containerClass="mb-3"
								register={register}
								key="statictext"
								errors={errors}
								control={control}
							/>
							<Form.Group>
								<Form.Label htmlFor="text3" className="form-label">
									Helping text
								</Form.Label>
								<Form.Control
									type="text"
									name="text"
									id="text3"
									placeholder="Helping text"
								/>
								<Form.Text>
									A block of help text that breaks onto a new line and may
									extend beyond one line.
								</Form.Text>
							</Form.Group>
						</form>
					</Col>

					<Col lg={6}>
						<form onSubmit={handleSubmit(() => {})}>
							<FormInput
								name="select"
								label="Input Select"
								type="select"
								containerClass="mb-3"
								className="form-select"
								register={register}
								key="select"
								errors={errors}
								control={control}
							>
								<option defaultValue="selected">1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</FormInput>

							<FormInput
								name="selectMulti"
								label="Multiple Select"
								type="select"
								multiple
								containerClass="mb-3"
								className="form-select"
								register={register}
								key="selectMulti"
								errors={errors}
								control={control}
							>
								<option defaultValue="selected">1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</FormInput>

							<FormInput
								label="Default file input"
								type="file"
								name="file"
								containerClass="mb-3"
								register={register}
								key="file"
								errors={errors}
								control={control}
							/>
							<FormInput
								label="Date"
								type="date"
								name="date"
								containerClass="mb-3"
								register={register}
								key="date"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Month"
								type="month"
								name="month"
								containerClass="mb-3"
								register={register}
								key="month"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Time"
								type="time"
								name="time"
								containerClass="mb-3"
								register={register}
								key="time"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Week"
								type="week"
								name="week"
								containerClass="mb-3"
								register={register}
								key="week"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Number"
								type="number"
								name="number"
								placeholder="Number placeholder"
								containerClass="mb-3"
								register={register}
								key="number"
								errors={errors}
								control={control}
							/>

							<FormInput
								label="Color"
								type="color"
								name="color"
								className="w-100"
								placeholder="Color placeholder"
								containerClass="mb-3"
								register={register}
								key="color"
								errors={errors}
								control={control}
							/>

							<Form.Group className="mb-0">
								<Form.Label htmlFor="exampleRange" className="form-label">
									Range
								</Form.Label>
								<Form.Range />
							</Form.Group>
						</form>
					</Col>
				</Row>
			</CardBody>
		</Card>
  )
}

export default BasicInputElements