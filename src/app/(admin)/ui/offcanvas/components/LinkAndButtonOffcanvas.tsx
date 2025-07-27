'use client'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import {
  Offcanvas as BootstrapOffcanvas,
  Button,
  Card,
  CardBody,
  CardHeader
} from 'react-bootstrap'



const LinkAndButtonOffcanvas = () => {
  const [isOpen, toggle] = useToggle()

  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Offcanvas</h4>
        <p className="text-muted mb-0">
          You can use a link with the <code>href</code> attribute, or a button
          with the <code>data-bs-target</code> attribute. In both cases, the{' '}
          <code>data-bs-toggle=&qout;offcanvas&qout;</code> is required.
        </p>
      </CardHeader>
      <CardBody>
        <div className="d-flex flex-wrap gap-2">
          <Link
            className="btn btn-primary"
            onClick={toggle}
            href="#"
            role="button"
          >
            Link with href
          </Link>
          <Button variant="primary" onClick={toggle}>
            Button with data-bs-target
          </Button>
        </div>

        <BootstrapOffcanvas
          show={isOpen}
          onHide={toggle}
          className="offcanvas-start"
          tabIndex={-1}
        >
          <BootstrapOffcanvas.Header closeButton>
            <BootstrapOffcanvas.Title as="h5">
              Offcanvas
            </BootstrapOffcanvas.Title>
          </BootstrapOffcanvas.Header>
          <BootstrapOffcanvas.Body className="offcanvas-body">
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

            <ul className="ps-3">
              <li>At vero eos et accusamus et iusto odio dignissimos</li>
              <li>Et harum quidem rerum facilis</li>
              <li>Temporibus autem quibusdam et aut officiis</li>
            </ul>
          </BootstrapOffcanvas.Body>
        </BootstrapOffcanvas>
      </CardBody>
    </Card>
  )
}

export default LinkAndButtonOffcanvas