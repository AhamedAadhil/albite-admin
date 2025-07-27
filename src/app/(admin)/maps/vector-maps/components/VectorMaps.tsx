'use client'
import React from 'react'
import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'

// data
import {
	worldMapOpts,
	usaMapOpts,
	spainMapOpts,
	canadaMapOpts,
	russiaMapOpts,
	italyMapOpts,
	iraqMapOpts,
} from '../data'


import { CanadaVectorMap, IraqVectorMap, ItalyVectorMap, RussiaVectorMap, SpainVectorMap, UsaVectorMap, WorldMap } from '@/components/VectorMap'

const VectorMaps = () => {
  return (
    <>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">World Vector Map</h4>
            </CardHeader>
            <CardBody>
              <WorldMap height="360px" width="100%" options={worldMapOpts} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">USA Vector Map</h4>
            </CardHeader>
            <CardBody>
              <UsaVectorMap height="300px" width="100%" options={usaMapOpts} />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">Russia Vector Map</h4>
            </CardHeader>
            <CardBody>
              <RussiaVectorMap
                height="300px"
                width="100%"
                options={russiaMapOpts}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">Italy Vector Map</h4>
            </CardHeader>
            <CardBody>
              <ItalyVectorMap
                height="300px"
                width="100%"
                options={italyMapOpts}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">Canada Vector Map</h4>
            </CardHeader>
            <CardBody>
              <CanadaVectorMap
                height="300px"
                width="100%"
                options={canadaMapOpts}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">Iraq Vector Map</h4>
            </CardHeader>
            <CardBody>
              <IraqVectorMap
                height="300px"
                width="100%"
                options={iraqMapOpts}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl={6}>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">Spain Vector Map</h4>
            </CardHeader>
            <CardBody>
              <SpainVectorMap
                height="300px"
                width="100%"
                options={spainMapOpts}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default VectorMaps