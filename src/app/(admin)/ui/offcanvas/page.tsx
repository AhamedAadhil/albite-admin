import PageBreadcrumb from '@/components/PageBreadcrumb'
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row
} from 'react-bootstrap'
import LinkAndButtonOffcanvas from './components/LinkAndButtonOffcanvas'
import OffCanvasWithBackdrop from './components/OffCanvasWithBackdrop'
import OffcanvasPlacement from './components/OffcanvasPlacement'
import DarkOffcanvas from './components/DarkOffcanvas'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Offcanvas" }

type BackdropOption = {
  name: string
  scroll: boolean
  backdrop: boolean
}


type PlacementOption = {
  name: string
  placement?: 'start' | 'end' | 'top' | 'bottom'
}



const Offcanvas = () => {
  const options: BackdropOption[] = [
    {
      name: 'Enable body scrolling',
      scroll: true,
      backdrop: false,
    },
    {
      name: 'Enable backdrop (default)',
      scroll: false,
      backdrop: true,
    },
    {
      name: 'Enable both scrolling & backdrop',
      scroll: true,
      backdrop: true,
    },
  ]
  const placementOptions: PlacementOption[] = [
    {
      name: 'Top',
      placement: 'top',
    },
    {
      name: 'right',
      placement: 'end',
    },
    {
      name: 'bottom',
      placement: 'bottom',
    },
    {
      name: 'Left',
      placement: 'start',
    },
  ]
  return (
    <>
      <PageBreadcrumb title="Offcanvas" subName="Base UI" />
      <Row>
        <Col xl={12}>
          <LinkAndButtonOffcanvas />
          <Card>
            <CardHeader>
              <h4 className="header-title">Offcanvas Backdrop</h4>
              <p className="text-muted mb-0">
                Scrolling the <code>&lt;body&gt;</code> element is disabled when
                an offcanvas and its backdrop are visible. Use the{' '}
                <code>data-bs-scroll</code> attribute to toggle{' '}
                <code>&lt;body&gt;</code> scrolling and{' '}
                <code>data-bs-backdrop</code> to toggle the backdrop.
              </p>
            </CardHeader>
            <CardBody>
              {(options || []).map((props, idx) => (
                <OffCanvasWithBackdrop key={idx} {...props} />
              ))}
            </CardBody>
          </Card>
        </Col>

        <Col xl={12}>
          <Card>
            <CardHeader>
              <h4 className="header-title">Offcanvas Placement</h4>
              <p className="text-muted mb-0">
                Try the right and bottom examples out below.
              </p>
            </CardHeader>
            <CardBody>
              <ul className="text-muted ">
                <li>
                  <code>.offcanvas-start</code> places offcanvas on the left of
                  the viewport (shown above)
                </li>
                <li>
                  <code>.offcanvas-end</code> places offcanvas on the right of
                  the viewport
                </li>
                <li>
                  <code>.offcanvas-top</code> places offcanvas on the top of the
                  viewport
                </li>
                <li>
                  <code>.offcanvas-bottom</code> places offcanvas on the bottom
                  of the viewport
                </li>
              </ul>
              <div>
                {placementOptions.map((option, idx) => (
                  <OffcanvasPlacement
                    key={idx}
                    placement={option.placement}
                    name={option.name}
                  />
                ))}
              </div>
            </CardBody>
          </Card>
          <DarkOffcanvas />
        </Col>
      </Row>
    </>
  )
}

export default Offcanvas
