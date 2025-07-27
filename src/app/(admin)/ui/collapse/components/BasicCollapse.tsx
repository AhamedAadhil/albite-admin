'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Collapse } from 'react-bootstrap'

const BasicCollapse = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true)
	const toggle = () => setIsOpen(!isOpen)
  return (
    <Card>
			<CardHeader>
				<h4 className="header-title">Collapse</h4>
				<p className="text-muted mb-0">
					Bootstrap&apos;s collapse provides the way to toggle the visibility of any
					content or element. Please read the official{' '}
					<Link
						href="https://getbootstrap.com/docs/5.2/components/collapse/"
						target="_blank"
					>
						Bootstrap
					</Link>{' '}
					documentation for a full list of options.
				</p>
			</CardHeader>
			<Card.Body>
				<p className="d-flex flex-wrap gap-1">
					<Link className="btn btn-primary" href="#" onClick={toggle}>
						Link with href
					</Link>
					<Button variant="primary" className="ms-1" onClick={toggle}>
						Button with data-bs-target
					</Button>
				</p>
				<Collapse in={isOpen}>
					<div>
						<Card className="mb-0">
							<CardBody>
								Anim pariatur cliche reprehenderit, enim eiusmod high life
								accusamus terry richardson ad squid. Nihil anim keffiyeh
								helvetica, craft beer labore wes anderson cred nesciunt sapiente
								ea proident.
							</CardBody>
						</Card>
					</div>
				</Collapse>
			</Card.Body>
		</Card>
  )
}

export default BasicCollapse