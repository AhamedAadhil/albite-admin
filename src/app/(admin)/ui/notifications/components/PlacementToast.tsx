'use client'
import React, { useState } from 'react'
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  Toast,
  ToastContainer,
  ToastContainerProps,
  ToastHeader
} from 'react-bootstrap'

// images
import smLogo from '@/assets/images/logo-sm.png'
import Image from 'next/image'



const PlacementToast = () => {
  const [position, setPosition] =
    useState<ToastContainerProps['position']>('top-start')

  const positions: ToastContainerProps['position'][] = [
    'top-start',
    'top-center',
    'top-end',
    'middle-start',
    'middle-center',
    'middle-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
  ]
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Placement</h4>
        <p className="text-muted mb-0">
          Place toasts with custom CSS as you need them. The top right is often
          used for notifications, as is the top middle. If you’re only ever
          going to show one toast at a time, put the positioning styles right on
          the
          <code>.toast</code>.
        </p>
      </CardHeader>
      <CardBody>
        <Form>
          <div className="mb-3">
            <label htmlFor="selectToastPlacement">Toast placement</label>
            <Form.Select
              className="mt-2"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPosition(
                  e.currentTarget.value as ToastContainerProps['position']
                )
              }
              id="selectToastPlacement"
            >
              {(positions || []).map((position, idx) => (
                <option key={idx} value={position}>
                  {position}
                </option>
              ))}
            </Form.Select>
          </div>
        </Form>
        <div
          aria-live="polite"
          aria-atomic="true"
          className="bg-light position-relative bd-example-toasts"
          style={{ minHeight: 294 }}
        >
          <ToastContainer
            className="position-absolute p-3"
            position={position}
            id="toastPlacement"
          >
            <Toast>
              <ToastHeader closeButton={false}>
                <Image
                  src={smLogo}
                  alt="brand-logo"
                  height="16"
                  className="me-1"
                />
                <strong className="me-auto">Velonic</strong>
                <small>11 mins ago</small>
              </ToastHeader>
              <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      </CardBody>
    </Card>
  )
}

export default PlacementToast


