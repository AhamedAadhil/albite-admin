
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FloatingLabel,
  Form,
  Row
} from 'react-bootstrap'

// constants
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { colorVariants } from '@/constants/colorVariants'
import BasicInputElements from './components/BasicInputElements'
import DefaultForm from './components/DefaultForm'
import FormRow from './components/FormRow'
import HorizontalForm from './components/HorizontalForm'
import InlineForm from './components/InlineForm'
import InputGroups from './components/InputGroups'
import InputSizes from './components/InputSizes'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Form Elements" }

const FloatingLabels = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Floating labels</h4>
        <p className="text-muted mb-0">
          Wrap a pair of <code>&lt;input class=&qout;form-control&qout;&gt;</code> and{' '}
          <code>&lt;label&gt;</code> elements in <code>.form-floating</code> to
          enable floating labels with Bootstrap&apos;s textual form fields. A{' '}
          <code>placeholder</code> is required on each{' '}
          <code>&lt;input&gt;</code> as our method of CSS-only floating labels
          uses the <code>:placeholder-shown</code> pseudo-element. Also note
          that the <code>&lt;input&gt;</code> must come first so we can utilize
          a sibling selector (e.g., <code>~</code>).
        </p>
      </CardHeader>
      <CardBody>
        <Row>
          <Col lg={6}>
            <h5 className="mb-3">Example</h5>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <h5 className="mb-3">Textareas</h5>
            <FloatingLabel controlId="floatingTextarea2" label="Comments">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </Col>

          <Col lg={6}>
            <h5 className="mb-3">Selects</h5>
            <FloatingLabel
              controlId="floatingSelect"
              label="Works with selects"
              className="mb-3"
            >
              <Form.Select aria-label="Floating label select example">
                <option defaultValue="selected">Open this select menu</option>
                <option defaultValue="1">One</option>
                <option defaultValue="2">Two</option>
                <option defaultValue="3">Three</option>
              </Form.Select>
            </FloatingLabel>

            <h5 className="mb-3 mt-4">Layout</h5>
            <div className="row g-2">
              <Col md>
                <FloatingLabel
                  controlId="floatingInputGrid"
                  label="Email address"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    defaultValue="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="Works with selects"
                >
                  <Form.Select aria-label="Floating label select example">
                    <option defaultValue="selected">
                      Open this select menu
                    </option>
                    <option defaultValue="1">One</option>
                    <option defaultValue="2">Two</option>
                    <option defaultValue="3">Three</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const SelectInput = () => {
  return (
    <>
      <h4 className="header-title">Select</h4>
      <p className="text-muted fs-14">
        <code>&lt;select&gt;</code> menus need only a custom class,{' '}
        <code>.form-select</code> to trigger the custom styles.
      </p>
      <Form.Select className="mb-3">
        <option defaultValue="selected">Open this select menu</option>
        <option defaultValue="1">One</option>
        <option defaultValue="2">Two</option>
        <option defaultValue="3">Three</option>
      </Form.Select>
      <Form.Select size="lg" className="mb-3">
        <option defaultValue="selected">Open this select menu</option>
        <option defaultValue="1">One</option>
        <option defaultValue="2">Two</option>
        <option defaultValue="3">Three</option>
      </Form.Select>
      <Form.Select size="sm" className="mb-3">
        <option defaultValue="selected">Open this select menu</option>
        <option defaultValue="1">One</option>
        <option defaultValue="2">Two</option>
        <option defaultValue="3">Three</option>
      </Form.Select>
      <div className="input-group mb-3">
        <label className="input-group-text" htmlFor="inputGroupSelect01">
          Options
        </label>
        <Form.Select>
          <option defaultValue="selected">Choose...</option>
          <option defaultValue="1">One</option>
          <option defaultValue="2">Two</option>
          <option defaultValue="3">Three</option>
        </Form.Select>
      </div>
      <div className="input-group">
        <Form.Select
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
        >
          <option defaultValue="selected">Choose...</option>
          <option defaultValue="1">One</option>
          <option defaultValue="2">Two</option>
          <option defaultValue="3">Three</option>
        </Form.Select>
        <Button className="btn-outline-secondary" type="button">
          Button
        </Button>
      </div>
    </>
  )
}

const Switches = () => {
  return (
    <>
      <h4 className="header-title mt-5 mt-lg-0">Switches</h4>
      <p className="text-muted fs-14">
        A switch has the markup of a custom checkbox but uses the{' '}
        <code>.form-switch</code> class to render a toggle switch. Switches also
        support the <code>disabled</code> attribute.
      </p>
      <Form>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Toggle this switch element"
        ></Form.Check>
        <Form.Check
          disabled
          type="switch"
          label="Disabled switch element"
          id="disabled-custom-switch"
          className="mt-1"
        />
      </Form>
    </>
  )
}

const Checkboxes = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="header-title mt-5 mt-lg-0">Checkboxes </h4>
          <p className="text-muted mb-0">
            Each checkbox and radio <code>&lt;input&gt;</code> and{' '}
            <code>&lt;label&gt;</code> pairing is wrapped in a{' '}
            <code>&lt;div&gt;</code> to create our custom control. Structurally,
            this is the same approach as our default <code>.form-check</code>.
          </p>
        </CardHeader>
        <CardBody>
          <h6 className="fs-15">Checkboxes</h6>
          <div className="mt-3">
            <Form.Check id="customCheck1" label="Check this custom checkbox" />
            <Form.Check id="customCheck2" label="Check this custom checkbox" />
          </div>
          <h6 className="fs-15 mt-3">Inline</h6>
          <div className="mt-2">
            <Form.Check
              className="form-check-inline"
              id="customCheck3"
              label="Check this custom checkbox"
            />
            <Form.Check
              className="form-check-inline"
              id="customCheck4"
              label="Check this custom checkbox"
            />
          </div>

          <h6 className="fs-15 mt-3">Disabled</h6>

          <div className="mt-2">
            <Form.Check
              defaultChecked
              disabled
              className="form-check-inline"
              id="customCheck5"
              label="Check this custom checkbox"
            />
            <Form.Check
              disabled
              className="form-check-inline"
              id="customCheck6"
              label="Check this custom checkbox"
            />
          </div>

          <h6 className="fs-15 mt-3">Colors</h6>
          {(colorVariants || []).map((item, idx) => {
            return (
              <Form.Check
                key={idx}
                label={`${item.charAt(0).toUpperCase() + item.slice(1)
                  } Checkbox`}
                type="checkbox"
                id={`basic-checkbox-${idx}`}
                className={`mb-2 form-checkbox-${item}`}
                aria-label="option 1"
                defaultChecked
              />
            )
          })}
        </CardBody>
      </Card>
    </>
  )
}
const Radios = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="header-title mt-5 mt-lg-0">Radios</h4>
          <p className="text-muted mb-0">
            Each checkbox and radio <code>&lt;input&gt;</code> and{' '}
            <code>&lt;label&gt;</code> pairing is wrapped in a{' '}
            <code>&lt;div&gt;</code> to create our custom control. Structurally,
            this is the same approach as our default <code>.form-check</code>.
          </p>
        </CardHeader>
        <CardBody>
          <h6 className="fs-15 mt-3">Radios</h6>
          <div className="mt-3">
            <Form.Check
              type="radio"
              id="customRadio1"
              name="customradio1"
              label="Toggle this custom radio"
            />
            <Form.Check
              type="radio"
              id="customRadio2"
              name="customradio1"
              label="Or toggle this other custom radio"
            />
          </div>

          <h6 className="fs-15 mt-3">Inline</h6>

          <div className="mt-2">
            <Form.Check
              inline
              type="radio"
              id="customRadio3"
              name="customradio2"
              label="Toggle this custom radio"
            />
            <Form.Check
              inline
              type="radio"
              id="customRadio4"
              name="customradio2"
              label="Or toggle this other custom radio"
            />
          </div>

          <h6 className="fs-15 mt-3">Disabled</h6>

          <div className="mt-2">
            <Form.Check
              inline
              type="radio"
              id="customRadio5"
              name="customradio3"
              label="Toggle this custom radio"
              disabled
            />
            <Form.Check
              inline
              defaultChecked
              type="radio"
              id="customRadio6"
              name="customradio3"
              label="Or toggle this other custom radio"
              disabled
            />
          </div>

          <h6 className="fs-15 mt-3">Colors</h6>
          {(colorVariants || []).map((item, idx) => {
            return (
              <Form.Check
                key={idx}
                label={`${item.charAt(0).toUpperCase() + item.slice(1)} Radio`}
                type="radio"
                id={`basic-radio-${idx}`}
                className={`mb-2 form-radio-${item}`}
                aria-label="option 1"
                defaultChecked
              />
            )
          })}
        </CardBody>
      </Card>
    </>
  )
}




const HorizontalFormLabelSizing = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <h4 className="header-title">Horizontal form label sizing</h4>
          <p className="text-muted mb-0">
            Be sure to use <code>.col-form-label-sm</code> or{' '}
            <code>.col-form-label-lg</code> to your <code>&lt;label&gt;</code>s
            or <code>&lt;legend&gt;</code>s to correctly follow the size of{' '}
            <code>.form-control-lg</code> and <code>.form-control-sm</code>.
          </p>
        </CardHeader>
        <CardBody>
          <Form>
            <Row className="mb-2">
              <label
                htmlFor="colFormLabelSm"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Email
              </label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  id="colFormLabelSm"
                  placeholder="col-form-label-sm"
                  size="sm"
                />
              </Col>
            </Row>
            <div className="mb-2 row">
              <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">
                Email
              </label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  id="colFormLabel"
                  placeholder="col-form-label"
                />
              </Col>
            </div>
            <Row>
              <label
                htmlFor="colFormLabelLg"
                className="col-sm-2 col-form-label col-form-label-lg"
              >
                Email
              </label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  id="colFormLabellg"
                  placeholder="col-form-label-lg"
                  size="lg"
                />
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  )
}

const BasicElements = () => {
  return (
    <>
      <PageBreadcrumb title="Form Elements" subName="Forms" />
      <Row>
        <Col>
          <BasicInputElements />
        </Col>
      </Row>

      <Row>
        <Col>
          <FloatingLabels />
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardHeader>
              <h4 className="header-title mb-0">Select &amp; Switches</h4>
            </CardHeader>
            <CardBody>
              <Row>
                <Col lg={6}>
                  <SelectInput />
                </Col>
                <Col lg={6}>
                  <Switches />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <Checkboxes />
        </Col>
        <Col lg={6}>
          <Radios />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <InputSizes />
        </Col>
        <Col lg={6}>
          <InputGroups />
        </Col>
      </Row>

      <Row>
        <Col lg={6}>
          <DefaultForm />
        </Col>

        <Col lg={6}>
          <HorizontalForm />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <InlineForm />
        </Col>
      </Row>

      <Row>
        <Col>
          <HorizontalFormLabelSizing />
        </Col>
      </Row>

      <Row>
        <Col>
          <FormRow />
        </Col>
      </Row>
    </>
  )
}

export default BasicElements
