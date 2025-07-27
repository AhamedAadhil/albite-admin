'use client'
import useToggle from '@/hooks/useToggle'
import {
  Offcanvas as BootstrapOffcanvas,
  Button,
  Card,
  CardBody,
  CardHeader
} from 'react-bootstrap'




const DarkOffcanvas = () => {

  const [isOpen, toggle] = useToggle()
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Dark Offcanvas</h4>
        <p className="text-muted mb-0">
          Change the appearance of offcanvases with utilities to better match
          them to different contexts like dark navbars. Here we add{' '}
          <code>.text-bg-dark</code> to the <code>.offcanvas</code> and{' '}
          <code>.btn-close-white</code> to <code>.btn-close</code> for proper
          styling with a dark offcanvas. If you have dropdowns within, consider
          also adding <code>.dropdown-menu-dark</code> to{' '}
          <code>.dropdown-menu</code>.
        </p>
      </CardHeader>
      <CardBody>
        <Button variant="primary" onClick={toggle} className="mt-2 mt-md-0">
          Dark offcanvas
        </Button>

        <BootstrapOffcanvas
          show={isOpen}
          onHide={toggle}
          className="offcanvas-start text-bg-dark"
        >
          <BootstrapOffcanvas.Header closeButton>
            <BootstrapOffcanvas.Title as="h5">
              Dark Offcanvas
            </BootstrapOffcanvas.Title>
          </BootstrapOffcanvas.Header>

          <BootstrapOffcanvas.Body>
            <div>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </div>
            <h5 className="mt-3">List</h5>
            <ul className="ps-3">
              <li>Nemo enim ipsam voluptatem quia aspernatur</li>
              <li>Neque porro quisquam est, qui dolorem</li>
              <li>Quis autem vel eum iure qui in ea</li>
            </ul>
          </BootstrapOffcanvas.Body>
        </BootstrapOffcanvas>
      </CardBody>
    </Card>
  )
}

export default DarkOffcanvas