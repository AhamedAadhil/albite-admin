'use client'
import { Button, Card, CardBody, CardHeader, CardText, CardTitle, Col, Placeholder, Row } from 'react-bootstrap'
import Img1 from '@/assets/images/small/small-1.jpg'
import Image from 'next/image'
import PageBreadcrumb from '@/components/PageBreadcrumb'

const BasicPlaceholders = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Placeholders</h4>
				<p className="text-muted mb-0">
					In the example below, we take a typical card component and recreate it
					with placeholders applied to create a “loading card”. Size and
					proportions are the same between the two.
				</p>
			</CardHeader>
			<CardBody>
				<Row>
					<Col md={6}>
						<Card className="border shadow-none mb-md-0">
							<Image width={364} className='card-img-top' height={243}  src={Img1} alt="..." />
							<CardBody>
								<CardTitle as="h5">Card title</CardTitle>
								<CardText>
									Some quick example text to build on the card title and make up
									the bulk of the card&apos;s content.
								</CardText>
								<Button variant="primary" as="a" href="#">
									Go somewhere
								</Button>
							</CardBody>
						</Card>
					</Col>

					<Col md={6}>
						<div className="card border shadow-none mb-0" aria-hidden="true">
							<svg
								className="bd-placeholder-img card-img-top"
								width="100%"
								height="180"
								xmlns="http://www.w3.org/2000/svg"
								role="img"
								aria-label="Placeholder"
								preserveAspectRatio="xMidYMid slice"
								focusable="false"
							>
								<title>Placeholder</title>
								<rect width="100%" height="100%" fill="#20c997" />
							</svg>
							<CardBody>
								<Placeholder
									as={Card.Title}
									animation="glow"
									className="placeholder-glow"
								>
									<Placeholder xs={6} />
								</Placeholder>
								<Placeholder as={Card.Text} animation="glow">
									<Placeholder xs={7} /> <Placeholder xs={4} />{' '}
									<Placeholder xs={4} /> <Placeholder xs={6} />{' '}
									<Placeholder xs={8} />
								</Placeholder>
								<Placeholder.Button
									variant="primary"
									xs={6}
								></Placeholder.Button>
							</CardBody>
						</div>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}

const PlaceholdersWithColor = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Color</h4>
				<p className="text-muted md-0">
					By default, the <code>placeholder</code> uses{' '}
					<code>currentColor</code>. This can be overriden with a custom color
					or utility class.
				</p>
			</CardHeader>
			<CardBody>
				<Placeholder xs={12} />
				<Placeholder xs={12} bg="primary" />
				<Placeholder xs={12} bg="secondary" />
				<Placeholder xs={12} bg="success" />
				<Placeholder xs={12} bg="danger" />
				<Placeholder xs={12} bg="warning" />
				<Placeholder xs={12} bg="info" />
				<Placeholder xs={12} bg="pink" />
				<Placeholder xs={12} bg="purple" />
				<Placeholder xs={12} bg="light" />
				<Placeholder xs={12} bg="dark" />
			</CardBody>
		</Card>
	)
}

const PlaceholdersWidth = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Width</h4>
				<p className="text-muted mb-0">
					You can change the <code>width</code> through grid column classes,
					width utilities, or inline styles.
				</p>
			</CardHeader>
			<CardBody>
				<Placeholder xs={6} />
				<Placeholder className="w-75" /> <br />
				<Placeholder style={{ width: '25%' }} />
			</CardBody>
		</Card>
	)
}

const PlaceholdersWithSizes = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Sizing</h4>
				<p className="text-muted mb-0">
					The size of <code>.placeholder</code>s are based on the typographic
					style of the parent element. Customize them with sizing modifiers:{' '}
					<code>.placeholder-lg</code>, <code>.placeholder-sm</code>, or{' '}
					<code>.placeholder-xs</code>.
				</p>
			</CardHeader>
			<CardBody>
				<Placeholder xs={12} size="lg" />
				<Placeholder xs={12} />
				<Placeholder xs={12} size="sm" />
				<Placeholder xs={12} size="xs" />
			</CardBody>
		</Card>
	)
}

const PlaceholdersConcept = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">How it works</h4>
				<p className="text-muted mb-0">
					Create placeholders with the <code>.placeholder</code> class and a
					grid column class (e.g., <code>.col-6</code>) to set the{' '}
					<code>width</code>. They can replace the text inside an element or as
					be added as a modifier class to an existing component.
				</p>
			</CardHeader>
			<CardBody>
				<p aria-hidden="true">
					<Placeholder xs={6} />
				</p>

				<Placeholder.Button xs={4} aria-hidden="true" />
			</CardBody>
		</Card>
	)
}

const PlaceholdersAnimation = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Animation</h4>
				<p className="text-muted mb-0">
					Animate placehodlers with <code>.placeholder-glow</code> or{' '}
					<code>.placeholder-wave</code> to better convey the perception of
					something being <em>actively</em> loaded.
				</p>
			</CardHeader>
			<CardBody>
				<Placeholder as="p" animation="glow">
					<Placeholder xs={12} />
				</Placeholder>
				<Placeholder as="p" animation="wave" className="mb-0">
					<Placeholder xs={12} />
				</Placeholder>
			</CardBody>
		</Card>
	)
}
const Placeholders = () => {
	return (
		<>
			<PageBreadcrumb title="Placeholders" subName="Base UI" />
			<Row>
				<Col xl={6}>
					<BasicPlaceholders />
				</Col>
				<Col xl={6}>
					<PlaceholdersWithColor />
					<PlaceholdersWidth />
				</Col>

				<Col xl={6}>
					<PlaceholdersWithSizes />
				</Col>

				<Col xl={6}>
					<PlaceholdersConcept />
				</Col>

				<Col xl={6}>
					<PlaceholdersAnimation />
				</Col>
			</Row>
		</>
	)
}

export default Placeholders
