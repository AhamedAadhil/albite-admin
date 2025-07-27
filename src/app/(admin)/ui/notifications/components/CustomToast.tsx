'use client'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Toast
} from 'react-bootstrap'

// images
import useToggle from '@/hooks/useToggle'



const CustomToast = () => {
  const [isOpenCustom1, hideCustom1] = useToggle(true)
  const [isOpenCustom2, hideCustom2] = useToggle(true)
  const [isOpenCustom3, hideCustom3] = useToggle(true)
  const [isOpenCustom4, hideCustom4] = useToggle(true)
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Custom content</h4>
        <p className="text-muted mb-0">
          Alternatively, you can also add additional controls and components to
          toasts.
        </p>
      </CardHeader>
      <CardBody>
        <Toast
          className="align-items-center mb-4"
          show={isOpenCustom1}
          onClose={hideCustom1}
          delay={3000}
          autohide
        >
          <div className="d-flex">
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            <Button
              variant=""
              onClick={hideCustom1}
              className="btn-close me-2 m-auto"
            />
          </div>
        </Toast>

        <Toast
          className="align-items-center text-white bg-primary border-0 mb-4"
          show={isOpenCustom2}
          onClose={hideCustom2}
          delay={6000}
          autohide
        >
          <div className="d-flex">
            <Toast.Body>Hello, world! This is a toast message.</Toast.Body>
            <Button
              variant=""
              onClick={hideCustom2}
              className="btn-close btn-close-white me-2 m-auto"
            />
          </div>
        </Toast>

        <Toast
          className="mb-4"
          show={isOpenCustom3}
          onClose={hideCustom3}
          delay={8000}
          autohide
        >
          <Toast.Body>
            Hello, world! This is a toast message.
            <div className="mt-2 pt-2 border-top d-flex flex-wrap gap-1">
              <Button variant="primary" className="btn-sm">
                Take action
              </Button>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={hideCustom3}
              >
                Close
              </Button>
            </div>
          </Toast.Body>
        </Toast>

        <Toast
          className="bg-primary"
          show={isOpenCustom4}
          onClose={hideCustom4}
          delay={10000}
          autohide
        >
          <Toast.Body className="text-white">
            Hello, world! This is a toast message.
            <div className="mt-2 pt-2 border-top d-flex flex-wrap gap-1">
              <Button variant="light" className="btn-sm">
                Take action
              </Button>
              <Button
                variant="secondary"
                className="btn-sm"
                onClick={hideCustom4}
              >
                Close
              </Button>
            </div>
          </Toast.Body>
        </Toast>
      </CardBody>
    </Card>
  )
}

export default CustomToast 