import { Card, CardBody, CardGroup, CardHeader, CardLink, CardSubtitle, CardText, CardTitle, Col, ListGroup, Row } from 'react-bootstrap'

// constants
import { colorVariants, extendedColorVariants } from '@/constants/colorVariants'

// images
import cardImg from '@/assets/images/small/small-1.jpg'
import cardImg1 from '@/assets/images/small/small-2.jpg'
import cardImg3 from '@/assets/images/small/small-3.jpg'
import cardImg4 from '@/assets/images/small/small-4.jpg'
import Image, { StaticImageData } from 'next/image'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Cards" }

type CardGroupDetailsTypes = {
  id: number
  image: StaticImageData
  title: string
  text: string
  subtext: string
}

const CardWithImage = () => {
  return (
    <>
      <Card className="d-block">
        <Image width={390} height={260} className="card-img-top" src={cardImg} alt="Card image cap" />
        <CardBody>
          <CardTitle as="h4">Card title</CardTitle>
          <CardText className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content. Some quick example text to build on the
            card title and make up.
          </CardText>
          <Link href="#" className="btn btn-primary">
            Button
          </Link>
        </CardBody>
      </Card>
    </>
  )
}

const CardWithImage2 = () => {
  return (
    <>
      <Card className="d-block">
        <Image
          width={390} height={260}
          className="card-img-top"
          src={cardImg1}
          alt="Card image cap"
        />
        <CardBody>
          <CardText as="h4">Card title</CardText>
          <CardText>Some quick example text to build on the card..</CardText>
        </CardBody>

        <ListGroup variant="flush">
          <li className="list-group-item">Cras justo odio</li>
        </ListGroup>

        <CardBody>
          <CardLink href="#" className="text-custom">
            Card link
          </CardLink>
          <CardLink href="#" className="text-custom">
            Another link
          </CardLink>
        </CardBody>
      </Card>
    </>
  )
}

const CardWithImage3 = () => {
  return (
    <>
      <Card className="d-block">
        <Image
          width={390} height={260}
          className="card-img-top"
          src={cardImg3}
          alt="Card image cap"
        />
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content. Some quick example text to build on the
            card title and make up.
          </CardText>
          <Link href="#" className="btn btn-primary">
            Button
          </Link>
        </CardBody>
      </Card>
    </>
  )
}

const CardWithTitleAndImage = () => {
  return (
    <>
      <Card className="d-block">
        <CardBody>
          <CardText as="h4">Card title</CardText>
          <CardSubtitle as="h6" className="card-subtitle text-muted">
            Support card subtitle
          </CardSubtitle>
        </CardBody>
        <Image className="img-fluid"  src={cardImg4} alt="Card image cap" />
        <CardBody>
          <CardText>
            Some quick example text to build on the card title and make up the
            bulk of the card&apos;s content.
          </CardText>
          <CardLink href="#" className="text-custom">
            Card link
          </CardLink>
          <CardLink href="#" className="text-custom">
            Another link
          </CardLink>
        </CardBody>
      </Card>
    </>
  )
}

const CardWithSpecialTitle = () => {
  return (
    <>
      <Card as={CardBody}>
        <CardText as="h4">Special title treatment</CardText>
        <CardText>
          With supporting text below as a natural lead-in to additional content.
        </CardText>
        <Link href="#" className="btn btn-primary">
          Go somewhere
        </Link>
      </Card>
    </>
  )
}

const CardWithHeader = () => {
  return (
    <>
      <Card>
        <CardHeader as="h5" className="bg-light-subtle">
          Featured
        </CardHeader>
        <CardBody>
          <CardTitle as="h5">Special title treatment</CardTitle>
          <CardText>
            With supporting text below as a natural lead-in to additional
            content.
          </CardText>
          <Link href="#" className="btn btn-primary">
            Go somewhere
          </Link>
        </CardBody>
      </Card>
    </>
  )
}

const CardWithHeaderAndQuote = () => {
  return (
    <>
      <Card>
        <CardHeader className="bg-light-subtle">Quote</CardHeader>
        <CardBody>
          <blockquote className="card-bodyquote">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante.
            </p>
            <footer>
              Someone famous in <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </CardBody>
      </Card>
    </>
  )
}

const CardWithHeaderAndFooter = () => {
  return (
    <>
      <Card>
        <CardHeader className="bg-light-subtle">Featured</CardHeader>
        <CardBody>
          <Link href="#" className="btn btn-primary">
            Go somewhere
          </Link>
        </CardBody>
        <div className="card-footer border-top border-light text-muted">
          2 days ago
        </div>
      </Card>
    </>
  )
}
const ColoredCards = () => {
  const colors = [...extendedColorVariants]
  const removeindex = colors.indexOf('light')

  if (removeindex !== -1) {
    colors.splice(removeindex, 3)
  }

  return (
    <>
      <Col lg={4} sm={6}>
        <Card className="text-bg-secondary">
          <CardBody>
            <CardTitle as="h5" className="card-title">
              Special title treatment
            </CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <Link href="#" className="btn btn-primary btn-sm">
              Button
            </Link>
          </CardBody>
        </Card>
      </Col>
      {(colors || []).map((color, idx) => {
        return (
          <Col lg={4} sm={6} key={idx}>
            <Card className={`text-bg-primary bg-${color}`}>
              <CardBody>
                <blockquote className="card-bodyquote">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Integer posuere erat a ante.
                  </p>
                  <footer>
                    Someone famous in{' '}
                    <cite title="Source Title">Source Title</cite>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </Col>
        )
      })}
    </>
  )
}
const BorderdCards = () => {
  return (
    <>
      {(colorVariants || []).slice(0, 3).map((item, idx) => {
        return (
          <Col md={4} key={idx}>
            <Card className={`border border-${item}`}>
              <CardBody>
                <CardTitle as="h5">Special title treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Link href="#" className={`btn btn-${item} btn-sm`}>
                  Button
                </Link>
              </CardBody>
            </Card>
          </Col>
        )
      })}
    </>
  )
}

const HorizontalCards = () => {
  return (
    <>
      <Col lg={6}>
        <Card>
          <Row className="g-0 align-items-center">
            <Col md={4}>
              <Image
                src={cardImg4}
                className="img-fluid rounded-start"
                alt="..."
              />
            </Col>
            <Col md={8}>
              <CardBody>
                <CardTitle as="h5" className="card-title">
                  Card title
                </CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col lg={6}>
        <Card>
          <Row className="g-0 align-items-center">
            <Col md={8}>
              <CardBody>
                <CardTitle as="h5">Card title</CardTitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <CardText>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </CardText>
              </CardBody>
            </Col>
            <Col md={4}>
              <Image
                src={cardImg}
                className="img-fluid rounded-end"
                alt="..."
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  )
}

const CardwithstretchedLink = () => {
  return (
    <>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={cardImg1} width={390} height={260} className="card-img-top" alt="..." />
          <CardBody>
            <CardTitle as="h5">Card with stretched link</CardTitle>
            <Link href="#" className="btn btn-primary mt-2 stretched-link">
              Go somewhere
            </Link>
          </CardBody>
        </Card>
      </Col>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={cardImg3} width={390} height={260} className="card-img-top" alt="..." />
          <CardBody>
            <CardTitle as="h5">
              <Link href="#" className="text-success stretched-link">
                Card with stretched link
              </Link>
            </CardTitle>
            <CardText>
              Some quick example text to build on the card up the bulk of the
              card&apos;s content.
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={cardImg4} width={390} height={260} className="card-img-top" alt="..." />
          <CardBody>
            <CardTitle as="h5">Card with stretched link</CardTitle>
            <Link href="#" className="btn btn-info mt-2 stretched-link">
              Go somewhere
            </Link>
          </CardBody>
        </Card>
      </Col>
      <Col sm={6} lg={3}>
        <Card>
          <Image src={cardImg} width={390} height={260} className="card-img-top" alt="..." />
          <CardBody>
            <CardTitle as="h5">
              <Link href="#" className="stretched-link">
                Card with stretched link
              </Link>
            </CardTitle>
            <CardText>
              Some quick example text to build on the card up the bulk of the
              card&apos;s content.
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

const CardWithGroup = ({ item }: { item: CardGroupDetailsTypes }) => {
  return (
    <>
      <Card className="d-block">
        <Image
          className="card-img-top"
          src={item.image}
          width={540} height={360}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle as="h5" className="card-title">
            {item.title}
          </CardTitle>
          <CardText>{item.text}</CardText>
          <CardText>
            <small className="text-muted">{item.subtext}</small>
          </CardText>
        </CardBody>
      </Card>
    </>
  )
}

const Cards = () => {
  const CardGroupDetails: CardGroupDetailsTypes[] = [
    {
      id: 1,
      image: cardImg,
      title: 'Card title',
      text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
      subtext: 'Last updated 3 mins ago',
    },
    {
      id: 2,
      image: cardImg1,
      title: 'Card title',
      text: 'This card has supporting text below as a natural lead-in to additional content.',
      subtext: 'Last updated 3 mins ago',
    },
    {
      id: 3,
      image: cardImg3,
      title: 'Card title',
      text: 'This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.',
      subtext: 'Last updated 3 mins ago',
    },
  ]
  return (
    <>
      <PageBreadcrumb title="Cards" subName="Base UI" />
      <Row>
        <Col sm={6} lg={3}>
          <CardWithImage />
        </Col>

        <Col sm={6} lg={3}>
          <CardWithImage2 />
        </Col>

        <Col sm={6} lg={3}>
          <CardWithImage3 />
        </Col>
        <Col sm={6} lg={3}>
          <CardWithTitleAndImage />
        </Col>
      </Row>

      <Row>
        <Col sm={6}>
          <CardWithSpecialTitle />
        </Col>
        <Col sm={6}>
          <CardWithSpecialTitle />
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <CardWithHeader />
        </Col>
        <Col md={4}>
          <CardWithHeaderAndQuote />
        </Col>
        <Col md={4}>
          <CardWithHeaderAndFooter />
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-2">Card Colored</h4>
        </Col>
      </Row>
      <Row>
        <ColoredCards />
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-2">Card Bordered</h4>
        </Col>
      </Row>
      <Row>
        <BorderdCards />
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-2">Horizontal Card</h4>
        </Col>
      </Row>
      <Row>
        <HorizontalCards />
      </Row>

      <Row>
        <Col xs={12} className="col-12">
          <h4 className="mb-4 mt-2">Stretched link</h4>
        </Col>
      </Row>
      <Row>
        <CardwithstretchedLink />
      </Row>

      <Row>
        <Col xs={12}>
          <h4 className="mb-4 mt-2">Card Group</h4>
          <CardGroup>
            {(CardGroupDetails || []).map((item, idx) => (
              <CardWithGroup item={item} key={idx} />
            ))}
          </CardGroup>
        </Col>
      </Row>
    </>
  )
}

export default Cards
