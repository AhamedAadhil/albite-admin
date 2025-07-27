'use client'
import { useState } from 'react'
import { Card, Col, Collapse, Row } from 'react-bootstrap'

import { extendedColorVariants } from '@/constants/colorVariants'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Link from 'next/link'

type PortletProps = {
	children?: any
	cardTitle?: string
	titleClass?: string
	className?: string
}

const CustomCardPortlet = (props: PortletProps) => {
	const children = props['children'] || null
	const cardTitle = props['cardTitle'] || 'Card title'

	const [collapse, setCollapse] = useState<boolean>(true)
	const [loading, setLoading] = useState<boolean>(false)
	const [hidden, setHidden] = useState<boolean>(false)

	/**
	 * Toggle the body
	 */
	const toggleContent = () => {
		setCollapse(!collapse)
	}

	/**
	 * Reload the content
	 */
	const reloadContent = () => {
		setLoading(true)
		setTimeout(
			() => {
				setLoading(false)
			},
			500 + 300 * (Math.random() * 5)
		)
	}

	/**
	 * remove the portlet
	 */
	const remove = () => {
		setHidden(true)
	}
	return (
		<>
			{!hidden ? (
				<Card>
					{loading && (
						<div className="card-disabled">
							<div className="card-portlets-loader"></div>
						</div>
					)}
					<Card.Header className={props.className}>
						<div className="card-widgets">
							<Link href="#" onClick={reloadContent}>
								<i className="ri-refresh-line" />
							</Link>
							&nbsp;
							<Link href="#" onClick={toggleContent}>
								<i
									className={`ri ${collapse ? 'ri-subtract-line' : ''} ${
										!collapse ? 'ri-add-line' : ''
									}`}
								/>
							</Link>
							&nbsp;
							<Link href="#" onClick={remove}>
								<i className="ri-close-line" />
							</Link>
						</div>
						<h5 className={`mb-0 ${props.titleClass}`}>{cardTitle}</h5>
					</Card.Header>
					<Collapse in={collapse}>
						<Card.Body>{children}</Card.Body>
					</Collapse>
				</Card>
			) : null}
		</>
	)
}
const Portlets = () => {
	return (
		<>
			<PageBreadcrumb title="Portlets" subName="Extended UI" />
			<Row>
				{(extendedColorVariants || []).map((color, idx) => {
					return (
						<Col xl={4} sm={6} key={idx}>
							<CustomCardPortlet
								className={`${
									color === 'light' ? 'text-secondary' : 'text-white'
								}  bg-${color}`}
								cardTitle={`${
									color.charAt(0).toUpperCase() + color.slice(1)
								} Heading`}
								titleClass="card-title mb-0"
							>
								Some quick example text to build on the card title and make up
								the bulk of the card&apos;s content. Some quick example text to build
								on the card title and make up.
							</CustomCardPortlet>
						</Col>
					)
				})}
			</Row>
		</>
	)
}

export default Portlets
