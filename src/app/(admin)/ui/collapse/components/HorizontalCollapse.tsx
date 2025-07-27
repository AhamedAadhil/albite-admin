'use client'
import React, { useState } from 'react'
import { Button, Card, CardBody, CardHeader, Collapse } from 'react-bootstrap'

const HorizontalCollapse = () => {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Collapse Horizontal</h4>
        <p className="text-muted mb-0">
          The collapse plugin also supports horizontal collapsing. Add the{' '}
          <code>.collapse-horizontal</code> modifier class to transition the{' '}
          <code>width</code> instead of <code>height</code> and set a{' '}
          <code>width</code> on the immediate child element.
        </p>
      </CardHeader>
      <CardBody>
        <p>
          <Button
            onClick={() => setOpen(!open)}
            variant="primary"
            aria-expanded={open}
          >
            Toggle width collapse
          </Button>
        </p>
        <div style={{ minHeight: 112 }}>
          <Collapse in={open} dimension="width">
            <div>
              <Card className="mb-0" style={{ width: 300 }}>
                <CardBody>
                  This is some placeholder content for a horizontal collapse.
                  It&apos;s hidden by default and shown when triggered.
                </CardBody>
              </Card>
            </div>
          </Collapse>
        </div>
      </CardBody>
    </Card>
  )
}

export default HorizontalCollapse