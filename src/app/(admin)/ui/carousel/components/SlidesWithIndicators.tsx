'use client'
import Img1 from '@/assets/images/small/small-1.jpg'
import Img2 from '@/assets/images/small/small-2.jpg'
import Img3 from '@/assets/images/small/small-3.jpg'
import Image from "next/image"
import { Card, CardBody, CardHeader, Carousel, CarouselItem } from "react-bootstrap"

import { useState } from 'react'

const SlidesWithIndicators = () => {
  const [index, setIndex] = useState<number>(0)

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex)
  }
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">With Indicators</h4>
        <p className="text-muted mb-0">
          You can also add the indicators to the carousel, alongside the
          controls, too.
        </p>
      </CardHeader>
      <CardBody>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <CarouselItem>
            <Image className="d-block img-fluid" src={Img3} alt="First slide" />
          </CarouselItem>
          <CarouselItem>
            <Image className="d-block img-fluid" src={Img2} alt="Second slide" />
          </CarouselItem>
          <CarouselItem>
            <Image className="d-block img-fluid" src={Img1} alt="Third slide" />
          </CarouselItem>
        </Carousel>
      </CardBody>
    </Card>
  )
}

export default SlidesWithIndicators
