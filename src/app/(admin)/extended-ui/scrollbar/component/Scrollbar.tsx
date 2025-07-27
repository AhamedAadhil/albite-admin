'use client'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import SimpleBar from 'simplebar-react'


const ScrollBar = () => {
	return (
		<>
			<PageBreadcrumb title="Scrollbar" subName="Extended UI" />
			<Row>
				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Default Scroll</h4>
							<p className="text-muted mb-0">
								Just use data attribute <code>data-simplebar</code> and add{' '}
								<code>max-height: **px</code> oh fix height
							</p>
						</CardHeader>
						<CardBody>
							<div>
								<SimpleBar style={{ maxHeight: 250 }}>
									SimpleBar does only one thing: replace the browser&apos;s default
									scrollbar with a custom CSS-styled one without losing
									performances. Unlike some popular plugins, SimpleBar doesn&apos;t
									mimic scroll with Javascript, causing janks and strange
									scrolling behaviours... You keep the awesomeness of native
									scrolling...with a custom scrollbar!
									<p>
										SimpleBar{' '}
										<strong>
											does NOT implement a custom scroll behaviour
										</strong>
										. It keeps the <strong>native</strong>{' '}
										<code>overflow: auto</code> scroll and <strong>only</strong>{' '}
										replace the scrollbar visual appearance.
									</p>
									<h5>Design it as you want</h5>
									<p>
										SimpleBar uses pure CSS to style the scrollbar. You can
										easily customize it as you want! Or even have multiple style
										on the same page...or just keep the default style (&qout;Mac OS&qout;
										scrollbar style).
									</p>
									<h5>Lightweight and performant</h5>
									<p>
										Only 6kb minified. SimpleBar doesn&apos;t use Javascript to
										handle scrolling. You keep the performances/behaviours of
										the native scroll.
									</p>
									<h5>Supported everywhere</h5>
									<p className="mb-0">
										SimpleBar has been tested on the following browsers: Chrome,
										Firefox, Safari, Edge, IE11.
									</p>
								</SimpleBar>
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">RTL Position</h4>
							<p className="text-muted mb-0">
								Just use data attribute{' '}
								<code>data-simplebar data-simplebar-direction=&apos;rtl&apos;</code> and
								add <code>max-height: **px</code> oh fix height
							</p>
						</CardHeader>
						<CardBody>
							<SimpleBar simplebar-direction="rtl" style={{ maxHeight: 250 }}>
								SimpleBar does only one thing: replace the browser&apos;s default
								scrollbar with a custom CSS-styled one without losing
								performances. Unlike some popular plugins, SimpleBar doesn&apos;t
								mimic scroll with Javascript, causing janks and strange
								scrolling behaviours... You keep the awesomeness of native
								scrolling...with a custom scrollbar!
								<p>
									SimpleBar{' '}
									<strong>does NOT implement a custom scroll behaviour</strong>.
									It keeps the <strong>native</strong>{' '}
									<code>overflow: auto</code> scroll and <strong>only</strong>{' '}
									replace the scrollbar visual appearance.
								</p>
								<h5>Design it as you want</h5>
								<p>
									SimpleBar uses pure CSS to style the scrollbar. You can easily
									customize it as you want! Or even have multiple style on the
									same page...or just keep the default style (&qout;Mac OS&qout; scrollbar
									style).
								</p>
								<h5>Lightweight and performant</h5>
								<p>
									Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle
									scrolling. You keep the performances/behaviours of the native
									scroll.
								</p>
								<h5>Supported everywhere</h5>
								<p className="mb-0">
									SimpleBar has been tested on the following browsers: Chrome,
									Firefox, Safari, Edge, IE11.
								</p>
							</SimpleBar>
						</CardBody>
					</Card>
				</Col>
			</Row>
			<Row>
				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Scroll Size</h4>
							<p className="text-muted mb-0">
								Just use data attribute <code>data-simplebar</code> and add{' '}
								<code>max-height: **px</code> oh fix height
							</p>
						</CardHeader>
						<CardBody>
							<div>
								<SimpleBar data-simplebar-lg style={{ maxHeight: 250 }}>
									SimpleBar does only one thing: replace the browser&qout;s default
									scrollbar with a custom CSS-styled one without losing
									performances. Unlike some popular plugins, SimpleBar doesn&qout;t
									mimic scroll with Javascript, causing janks and strange
									scrolling behaviours... You keep the awesomeness of native
									scrolling...with a custom scrollbar!
									<p>
										SimpleBar{' '}
										<strong>
											does NOT implement a custom scroll behaviour
										</strong>
										. It keeps the <strong>native</strong>{' '}
										<code> overflow: auto</code> scroll and{' '}
										<strong>only</strong> replace the scrollbar visual
										appearance.
									</p>
									<h5>Design it as you want</h5>
									<p>
										SimpleBar uses pure CSS to style the scrollbar. You can
										easily customize it as you want! Or even have multiple style
										on the same page...or just keep the default style (&qout;Mac OS&qout;
										scrollbar style).
									</p>
									<h5>Lightweight and performant</h5>
									<p>
										Only 6kb minified. SimpleBar doesn&apos;t use Javascript to
										handle scrolling. You keep the performances/behaviours of
										the native scroll.
									</p>
									<h5>Supported everywhere</h5>
									<p className="mb-0">
										SimpleBar has been tested on the following browsers: Chrome,
										Firefox, Safari, Edge, IE11.
									</p>
								</SimpleBar>
							</div>
						</CardBody>
					</Card>
				</Col>
				<Col xl={6}>
					<Card>
						<CardHeader>
							<h4 className="header-title">Scroll Color</h4>
							<p className="text-muted mb-0">
								Just use data attribute&nbsp;
								<code>data-simplebar data-simplebar-primary</code> and add{' '}
								<code>max-height: **px</code> oh fix height
							</p>
						</CardHeader>
						<CardBody>
							<SimpleBar data-simplebar-primary style={{ maxHeight: 250 }}>
								SimpleBar does only one thing: replace the browser&apos;s default
								scrollbar with a custom CSS-styled one without losing
								performances. Unlike some popular plugins, SimpleBar doesn&apos;t
								mimic scroll with Javascript, causing janks and strange
								scrolling behaviours... You keep the awesomeness of native
								scrolling...with a custom scrollbar!
								<p>
									SimpleBar{' '}
									<strong>does NOT implement a custom scroll behaviour</strong>.
									It keeps the <strong>native</strong>{' '}
									<code>overflow: auto</code> scroll and <strong>only</strong>{' '}
									replace the scrollbar visual appearance.
								</p>
								<h5>Design it as you want</h5>
								<p>
									SimpleBar uses pure CSS to style the scrollbar. You can easily
									customize it as you want! Or even have multiple style on the
									same page...or just keep the default style (&qout;Mac OS&qout; scrollbar
									style).
								</p>
								<h5>Lightweight and performant</h5>
								<p>
									Only 6kb minified. SimpleBar doesn&apos;t use Javascript to handle
									scrolling. You keep the performances/behaviours of the native
									scroll.
								</p>
								<h5>Supported everywhere</h5>
								<p className="mb-0">
									SimpleBar has been tested on the following browsers: Chrome,
									Firefox, Safari, Edge, IE11.
								</p>
							</SimpleBar>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default ScrollBar
