'use client'
import useToggle from '@/hooks/useToggle'
import {
  Offcanvas as BootstrapOffcanvas,
  Button
} from 'react-bootstrap'


type BackdropOption = {
  name: string
  scroll: boolean
  backdrop: boolean
}



const OffCanvasWithBackdrop = ({ name, ...props }: BackdropOption) => {
  const [isOpen, toggle] = useToggle()
  return (
    <>
      <Button variant="primary" onClick={toggle} className="mt-2 me-2 mt-md-0">
        {name}
      </Button>

      <BootstrapOffcanvas
        show={isOpen}
        onHide={toggle}
        {...props}
        className="offcanvas-start"
      >
        <BootstrapOffcanvas.Header closeButton>
          <BootstrapOffcanvas.Title as="h5">{name}</BootstrapOffcanvas.Title>
        </BootstrapOffcanvas.Header>
        <BootstrapOffcanvas.Body>
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

          <ul className="ps-3">
            <li>At vero eos et accusamus et iusto odio dignissimos</li>
            <li>Et harum quidem rerum facilis</li>
            <li>Temporibus autem quibusdam et aut officiis</li>
          </ul>
        </BootstrapOffcanvas.Body>
      </BootstrapOffcanvas>
    </>
  )
}

export default OffCanvasWithBackdrop