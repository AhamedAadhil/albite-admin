import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

export const metadata: Metadata = { title: "Accordions" }

const Accordions = () => {
	return (
		<>
			<PageBreadcrumb title="Accordions" subName="Base UI" />
			<Row>
				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Default Accordions</h4>
							<p className="text-muted mb-0">
								Click the accordions below to expand/collapse the accordion
								content.
							</p>
						</CardHeader>
						<CardBody>
							<Accordion defaultActiveKey="0">
								<AccordionItem eventKey="1">
									<AccordionHeader as="h2">Accordion Item #1</AccordionHeader>
									<AccordionBody>
										<strong>This is the first item&apos;s accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It&apos;s also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</AccordionBody>
								</AccordionItem>
								<AccordionItem eventKey="2">
									<AccordionHeader as="h2">Accordion Item #2</AccordionHeader>
									<AccordionBody>
										<strong>This is the first item&apos;s accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It&apos;s also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</AccordionBody>
								</AccordionItem>
								<AccordionItem eventKey="3">
									<AccordionHeader as="h2">Accordion Item #3</AccordionHeader>
									<AccordionBody>
										<strong>This is the first item&apos;s accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It&apos;s also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</AccordionBody>
								</AccordionItem>
							</Accordion>
						</CardBody>
					</Card>
				</Col>

				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Flush Accordions</h4>
							<p className="text-muted mb-0">
								Add <code>.accordion-flush</code> to remove the default{' '}
								<code>background-color</code>, some borders, and some rounded
								corners to render accordions edge-to-edge with their parent
								container.
							</p>
						</CardHeader>
						<CardBody>
							<Accordion flush defaultActiveKey="0">
								<AccordionItem eventKey="1">
									<AccordionHeader as="h2">Accordion Item #1</AccordionHeader>
									<AccordionBody className="accordion-body">
										Placeholder content for this accordion, which is intended to
										demonstrate the
										<code>.accordion-flush</code> class. This is the first
										item&apos;s accordion body.
									</AccordionBody>
								</AccordionItem>
								<AccordionItem eventKey="2">
									<AccordionHeader as="h2">Accordion Item #2</AccordionHeader>
									<AccordionBody className="accordion-body">
										Placeholder content for this accordion, which is intended to
										demonstrate the
										<code>.accordion-flush</code> class. This is the first
										item&apos;s accordion body.
									</AccordionBody>
								</AccordionItem>
								<AccordionItem eventKey="3">
									<AccordionHeader as="h2">Accordion Item #3</AccordionHeader>
									<AccordionBody className="accordion-body">
										Placeholder content for this accordion, which is intended to
										demonstrate the
										<code>.accordion-flush</code> class. This is the first
										item&apos;s accordion body.
									</AccordionBody>
								</AccordionItem>
							</Accordion>
						</CardBody>
					</Card>
				</Col>
			</Row>

			<Row>
				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Simple Card Accordions</h4>
							<p className="text-muted mb-0">
								Using the card component, you can extend the default collapse
								behavior to create an accordion. To properly achieve the
								accordion style, be sure to use <code>.accordion</code> as a
								wrapper.
							</p>
						</CardHeader>
						<CardBody>
							<Accordion defaultActiveKey="1" flush>
								<Card as={AccordionItem} eventKey="1" className="mb-0">
									<CardHeader as={AccordionHeader} className="p-0">
										<h5 className="m-0">
											<a className="text-reset d-block" href="#CardcollapseOne">
												Collapsible Group Item #1
											</a>
										</h5>
									</CardHeader>
									<AccordionBody aria-labelledby="CardheadingOne">
										<CardBody className="pt-0">
											Anim pariatur cliche reprehenderit, enim eiusmod high life
											accusamus terry richardson ad squid. 3 wolf moon officia
											aute, non cupidatat skateboard dolor brunch. Food truck
											quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
											tempor, sunt aliqua put a bird on it squid single-origin
											coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
											helvetica, craft beer labore wes anderson cred nesciunt
											sapiente ea proident. Ad vegan excepteur butcher vice
											lomo. Leggings occaecat craft beer farm-to-table, raw
											denim aesthetic synth nesciunt you probably haven&apos;t heard
											of them accusamus labore sustainable VHS.
										</CardBody>
									</AccordionBody>
								</Card>
								<Card as={AccordionItem} eventKey="2" className="mb-0">
									<CardHeader as={AccordionHeader} className="p-0">
										<h5 className="m-0">
											<a className="text-reset d-block" href="#CardcollapseTwo">
												Collapsible Group Item #2
											</a>
										</h5>
									</CardHeader>
									<AccordionBody>
										<CardBody className="pt-0">
											Anim pariatur cliche reprehenderit, enim eiusmod high life
											accusamus terry richardson ad squid. 3 wolf moon officia
											aute, non cupidatat skateboard dolor brunch. Food truck
											quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
											tempor, sunt aliqua put a bird on it squid single-origin
											coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
											helvetica, craft beer labore wes anderson cred nesciunt
											sapiente ea proident. Ad vegan excepteur butcher vice
											lomo. Leggings occaecat craft beer farm-to-table, raw
											denim aesthetic synth nesciunt you probably haven&apos;t heard
											of them accusamus labore sustainable VHS.
										</CardBody>
									</AccordionBody>
								</Card>
								<Card as={AccordionItem} eventKey="3" className="mb-0">
									<CardHeader as={AccordionHeader} className="p-0">
										<h5 className="m-0">
											<a
												className="text-reset d-block"
												href="#CardcollapseThree"
											>
												Collapsible Group Item #3
											</a>
										</h5>
									</CardHeader>
									<AccordionBody>
										<CardBody className="pt-0">
											Anim pariatur cliche reprehenderit, enim eiusmod high life
											accusamus terry richardson ad squid. 3 wolf moon officia
											aute, non cupidatat skateboard dolor brunch. Food truck
											quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon
											tempor, sunt aliqua put a bird on it squid single-origin
											coffee nulla assumenda shoreditch et. Nihil anim keffiyeh
											helvetica, craft beer labore wes anderson cred nesciunt
											sapiente ea proident. Ad vegan excepteur butcher vice
											lomo. Leggings occaecat craft beer farm-to-table, raw
											denim aesthetic synth nesciunt you probably haven&apos;t heard
											of them accusamus labore sustainable VHS.
										</CardBody>
									</AccordionBody>
								</Card>
							</Accordion>
						</CardBody>
					</Card>
				</Col>

				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Always Open Accordions</h4>
							<p className="text-muted mb-0">
								Omit the <code>data-bs-parent</code> attribute on each{' '}
								<code>.accordion-collapse</code> to make accordion items stay
								open when another item is opened.
							</p>
						</CardHeader>
						<CardBody>
							<Accordion defaultActiveKey="1">
								<AccordionItem eventKey="1">
									<AccordionHeader as="h2">Accordion Item #1</AccordionHeader>
									<AccordionBody>
										<strong>This is the first item&apos;s accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It&apos;s also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</AccordionBody>
								</AccordionItem>
								<AccordionItem eventKey="2">
									<AccordionHeader as="h2">Accordion Item #2</AccordionHeader>
									<AccordionBody>
										<strong>This is the first item&apos;s accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It&apos;s also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</AccordionBody>
								</AccordionItem>
								<AccordionItem eventKey="3">
									<AccordionHeader as="h2">Accordion Item #3</AccordionHeader>
									<AccordionBody>
										<strong>This is the first item&apos;s accordion body.</strong> It
										is shown by default, until the collapse plugin adds the
										appropriate classes that we use to style each element. These
										classes control the overall appearance, as well as the
										showing and hiding via CSS transitions. You can modify any
										of this with custom CSS or overriding our default variables.
										It&apos;s also worth noting that just about any HTML can go
										within the <code>.accordion-body</code>, though the
										transition does limit overflow.
									</AccordionBody>
								</AccordionItem>
							</Accordion>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default Accordions
