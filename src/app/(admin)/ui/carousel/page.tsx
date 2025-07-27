

// images
import Img1 from '@/assets/images/small/small-1.jpg'
import Img2 from '@/assets/images/small/small-2.jpg'
import Img3 from '@/assets/images/small/small-3.jpg'
import Img4 from '@/assets/images/small/small-4.jpg'
import Img5 from '@/assets/images/small/small-5.jpg'
import Img6 from '@/assets/images/small/small-6.jpg'
import Img7 from '@/assets/images/small/small-7.jpg'
import Image from 'next/image'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import SlidesWithIndicators from './components/SlidesWithIndicators'
import { Card, CardBody, CardHeader,Carousel as CarouselBootstrap, CarouselCaption, CarouselItem, Col, Row } from 'react-bootstrap'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "carousel" }

const DefaultSlides = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Slides Only</h4>
					<p className="text-muted mb-0">
						Here&apos;s a carousel with slides only. Note the presence of the{' '}
						<code>.d-block</code>
						&nbsp;and <code>.img-fluid</code> on carousel images to prevent
						browser default image alignment.
					</p>
				</CardHeader>
				<CardBody>
					<CarouselBootstrap indicators={false} controls={false}>
						<CarouselItem className="active">
							<Image className="d-block img-fluid" src={Img1} alt="First slide" />
						</CarouselItem>
						<CarouselItem>
							<Image className="d-block img-fluid" src={Img2} alt="Second slide" />
						</CarouselItem>
						<CarouselItem>
							<Image className="d-block img-fluid" src={Img3} alt="Third slide" />
						</CarouselItem>
					</CarouselBootstrap>
				</CardBody>
			</Card>
		</>
	)
}

const SlidesWithControls = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">With Controls</h4>
				<p className="text-muted mb-0">
					Adding in the previous and next controls:
				</p>
			</CardHeader>
			<CardBody>
				<CarouselBootstrap indicators={false}>
					<CarouselItem>
						<Image className="d-block img-fluid" src={Img4} alt="First slide" />
					</CarouselItem>
					<CarouselItem>
						<Image className="d-block img-fluid" src={Img1} alt="Second slide" />
					</CarouselItem>
					<CarouselItem>
						<Image className="d-block img-fluid" src={Img2} alt="Third slide" />
					</CarouselItem>
				</CarouselBootstrap>
			</CardBody>
		</Card>
	)
}



const SlidesWithCaptions = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">With Captions</h4>
					<p className="text-muted mb-0">
						Add captions to your slides easily with the{' '}
						<code>.carousel-caption</code> element within any{' '}
						<code>.carousel-item</code>.
					</p>
				</CardHeader>
				<CardBody>
					<CarouselBootstrap indicators={false}>
						<CarouselItem>
							<Image src={Img1} alt="First slide" className="img-fluid d-block" />
							<CarouselCaption className="d-none d-md-block">
								<h3 className="text-white">First slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</CarouselCaption>
						</CarouselItem>
						<CarouselItem>
							<Image src={Img3} alt="Second slide" className="img-fluid d-block" />
							<CarouselCaption className="d-none d-md-block">
								<h3 className="text-white">Second slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</CarouselCaption>
						</CarouselItem>
						<CarouselItem>
							<Image src={Img2}  alt="Third slide" className="img-fluid d-block" />
							<CarouselCaption className="d-none d-md-block">
								<h3 className="text-white">Third slide label</h3>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
							</CarouselCaption>
						</CarouselItem>
					</CarouselBootstrap>
				</CardBody>
			</Card>
		</>
	)
}

const CrossFade = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Crossfade</h4>
					<p className="text-muted mb-0">
						Add <code>.carousel-fade</code> to your carousel to animate slides
						with a fade transition instead of a slide.
					</p>
				</CardHeader>
				<CardBody>
					<CarouselBootstrap fade indicators={false}>
						<CarouselItem>
							<Image  className="d-block img-fluid" src={Img1} alt="First slide" />
						</CarouselItem>
						<CarouselItem>
							<Image
								
								className="d-block img-fluid"
								src={Img2}
								alt="Second slide"
							/>
						</CarouselItem>
						<CarouselItem>
							<Image
								
								className="d-block img-fluid"
								src={Img3}
								alt="Third slide"
							/>
						</CarouselItem>
					</CarouselBootstrap>
				</CardBody>
			</Card>
		</>
	)
}

const IndividualInterval = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Individual Interval</h4>
					<p className="text-muted mb-0">
						Add <code>data-bs-interval=&qout;&qout;</code> to a{' '}
						<code>.carousel-item</code> to change the amount of time to delay
						between automatically cycling to the next item.
					</p>
				</CardHeader>
				<CardBody>
					<CarouselBootstrap indicators={false}>
						<CarouselItem interval={1000}>
							<Image
								src={Img4}
								className="d-block w-100 img-fluid"
								alt="First slide"
							/>
						</CarouselItem>
						<CarouselItem interval={2000}>
							<Image
								src={Img2}
								className="d-block w-100 img-fluid"
								alt="Second slide"
							/>
						</CarouselItem>
						<CarouselItem>
							<Image
								src={Img1}
								className="d-block w-100 img-fluid"
								alt="Third slide"
							/>
						</CarouselItem>
					</CarouselBootstrap>
				</CardBody>
			</Card>
		</>
	)
}

const DarkVariant = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Dark variant</h4>
					<p className="text-muted mb-0">
						Add <code>.carousel-dark</code> to the <code>.carousel</code> for
						darker controls, indicators, and captions. Controls are inverted
						compared to their default white fill with the <code>filter</code>{' '}
						CSS property. Captions and controls have additional Sass variables
						that customize the <code>color</code> and{' '}
						<code>background-color</code>.
					</p>
				</CardHeader>
				<CardBody>
					<CarouselBootstrap className="carousel-dark" indicators={true}>
						<CarouselItem interval={1000}>
							<Image src={Img5} alt="First Slide" />
							<CarouselCaption className="d-none img-fluid d-md-block">
								<h5>First slide label</h5>
								<p>
									Some representative placeholder content for the first slide.
								</p>
							</CarouselCaption>
						</CarouselItem>
						<CarouselItem interval={2000}>
							<Image src={Img6} alt="Second Slide" />
							<CarouselCaption className="d-none img-fluid d-md-block">
								<h5>Second slide label</h5>
								<p>
									Some representative placeholder content for the second slide.
								</p>
							</CarouselCaption>
						</CarouselItem>
						<CarouselItem>
							<Image src={Img7} alt="Third Slide" />
							<CarouselCaption className="d-none img-fluid d-md-block">
								<h5>Third slide label</h5>
								<p>
									Some representative placeholder content for the third slide.
								</p>
							</CarouselCaption>
						</CarouselItem>
					</CarouselBootstrap>
				</CardBody>
			</Card>
		</>
	)
}
const Carousel = () => {
	return (
		<>
			<PageBreadcrumb title="Carousel" subName="Base UI" />
			<Row>
				<Col lg={6}>
					<DefaultSlides />
				</Col>

				<Col lg={6}>
					<SlidesWithControls />
				</Col>
			</Row>

			<Row>
				<Col lg={6}>
					<SlidesWithIndicators />
				</Col>
				<Col lg={6}>
					<SlidesWithCaptions />
				</Col>
			</Row>

			<Row>
				<Col lg={6}>
					<CrossFade />
				</Col>
				<Col lg={6}>
					<IndividualInterval />
				</Col>
			</Row>

			<Row>
				<Col lg={6}>
					<DarkVariant />
				</Col>
			</Row>
		</>
	)
}

export default Carousel
