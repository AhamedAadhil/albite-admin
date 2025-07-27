'use client'
import useToggle from '@/hooks/useToggle'
import {
  Offcanvas as BootstrapOffcanvas,
  Button
} from 'react-bootstrap'


type PlacementOption = {
  name: string
  placement?: 'start' | 'end' | 'top' | 'bottom'
}
const OffcanvasPlacement = ({ name, ...props }: PlacementOption) => {
  const [isOpen, toggle] = useToggle()
  return (
    <>
      <Button variant="primary" onClick={toggle} className="mt-2 me-2 mt-md-0">
        {' '}
        Toggle {name} offcanvas
      </Button>
      <BootstrapOffcanvas show={isOpen} onHide={toggle} {...props}>
        <BootstrapOffcanvas.Header closeButton>
          <BootstrapOffcanvas.Title>Offcanvas {name}</BootstrapOffcanvas.Title>
        </BootstrapOffcanvas.Header>

        <BootstrapOffcanvas.Body className="offcanvas-body">
          <div>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </div>
          <h5 className="mt-3">List</h5>
          <ul className="ps-3">
            <li>Nemo enim ipsam voluptatem quia aspernatur</li>
            <li>Neque porro quisquam est, qui dolorem</li>
            <li>Quis autem vel eum iure qui in ea</li>
          </ul>
        </BootstrapOffcanvas.Body>
      </BootstrapOffcanvas>
    </>
  )
}

export default OffcanvasPlacement