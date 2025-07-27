'use client'
import { extendedColorVariants } from '@/constants/colorVariants'
import React from 'react'
import { Button, ButtonGroup, Card, CardBody, CardHeader, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'


const SingleButtonDropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Single button dropdowns</h4>
        <p className="text-muted mb-0">
          Any single <code>.btn</code> can be turned into a dropdown toggle with
          some markup changes. Here&apos;s how you can put them to work with
          either <code>&lt;button&gt;</code> elements:
        </p>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle variant="light">Dropdown button</DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col xs="auto">
            <Dropdown>
              <DropdownToggle variant="secondary">
                Dropdown link
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const DropdownVariant = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Variant</h4>
        <p className="text-muted mb-0">
          The best part is you can do this with any button variant, too:
        </p>
      </CardHeader>
      <CardBody>
        {(extendedColorVariants || []).map((color, idx) => {
          return (
            <Dropdown key={idx} as={ButtonGroup} className="mb-2 me-1">
              <DropdownToggle variant={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">Separated link</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
        })}
      </CardBody>
    </Card>
  )
}

const AnimatedDropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Animated Dropdown</h4>
        <p className="text-muted mb-0">
          Add <code>.dropdown-menu-animated</code>to a{' '}
          <code>.dropdown-menu</code> to have animated dropdown menu.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup}>
          <DropdownToggle variant="light">Animated Dropdown</DropdownToggle>
          <DropdownMenu className="dropdown-menu-animated">
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const DropupVariationDropdowns = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Dropup variation</h4>
        <p className="text-muted mb-0">
          Trigger dropdown menus above elements by adding <code>.dropup</code>{' '}
          to the parent element.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup} className="me-1" drop="up">
          <DropdownToggle variant="light">Dropup</DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider />
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown as={ButtonGroup} drop="up">
          <Button variant="light">Split dropup</Button>
          <DropdownToggle variant="light" className="dropdown-toggle-split">
            <span className="visually-hidden">Toggle Dropdown</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const DropendVariationDropdowns = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Dropend variation</h4>
        <p className="text-muted mb-0">
          Trigger dropdown menus at the right of the elements by adding{' '}
          <code>.dropend</code> to the parent element.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup} drop="end" className="mb-2 me-1">
          <DropdownToggle variant="primary" type="button">
            Dropend
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown as={ButtonGroup} drop="end" className="mb-2">
          <Button variant="primary">Split Dropend</Button>
          <DropdownToggle variant="primary" className="dropdown-toggle-split">
            <span className="visually-hidden">Toggle Dropright</span>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const DisabledItemDropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Disabled Item</h4>
        <p className="text-muted mb-0">
          Add <code>.disabled</code> to items in the dropdown to{' '}
          <strong>style them as disabled</strong>.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup}>
          <DropdownToggle variant="primary">Disabled</DropdownToggle>
          <DropdownMenu className="dropdown-menu">
            <DropdownItem href="#">Regular link</DropdownItem>
            <DropdownItem disabled href="#">
              Disabled link
            </DropdownItem>
            <DropdownItem href="#">Another link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const Darkdropdowns = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Dark dropdowns</h4>
        <p className="text-muted mb-0">
          Opt into darker dropdowns to match a dark navbar or custom style by
          adding <code>.dropdown-menu-dark</code> onto an existing{' '}
          <code>.dropdown-menu</code>. No changes are required to the dropdown
          items.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown>
          <DropdownToggle variant="secondary">Dropdown button</DropdownToggle>
          <DropdownMenu as="ul" variant="dark">
            <li>
              <Dropdown.Item active href="#">
                Action
              </Dropdown.Item>
            </li>
            <li>
              <DropdownItem href="#">Another action</DropdownItem>
            </li>
            <li>
              <DropdownItem href="#">Something else here</DropdownItem>
            </li>
            <li>
              <DropdownDivider />
            </li>
            <li>
              <DropdownItem href="#">Separated link</DropdownItem>
            </li>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const Dropdownoptions = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Dropdown options</h4>
        <p className="text-muted mb-0">
          Use <code>data-bs-offset</code> or <code>data-bs-reference</code> to
          change the location of the dropdown.
        </p>
      </CardHeader>
      <CardBody>
        <div className="d-flex">
          <Dropdown className="me-1">
            <DropdownToggle variant="secondary">Offset</DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Action</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Another action</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Something else here</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
          <Dropdown as={ButtonGroup}>
            <Button variant="secondary">Reference</Button>
            <DropdownToggle
              variant="secondary"
              className="dropdown-toggle-split"
            >
              <span className="visually-hidden">Toggle Dropdown</span>
            </DropdownToggle>
            <DropdownMenu as="ul" className="dropdown-menu">
              <li>
                <DropdownItem href="#">Action</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Another action</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Something else here</DropdownItem>
              </li>
              <li>
                <DropdownDivider />
              </li>
              <li>
                <DropdownItem href="#">Separated link</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  )
}

const DropdownWithText = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Text</h4>
        <p className="text-muted mb-0">
          Place any freeform text within a dropdown menu with text and use
          spacing utilities. Note that you’ll likely need additional sizing
          styles to constrain the menu width.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup}>
          <DropdownToggle>Text Dropdown</DropdownToggle>
          <DropdownMenu className="p-3 text-muted" style={{ maxWidth: 200 }}>
            <p>
              Some example text that&apos;s free-flowing within the dropdown menu.
            </p>
            <p className="mb-0">And this is more example text.</p>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const DropdownMenuAlignment = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Menu alignment</h4>
        <p className="text-muted mb-0">
          Add <code>.dropdown-menu-end</code> to a <code>.dropdown-menu</code>{' '}
          to right align the dropdown menu.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown>
          <DropdownToggle variant="light">Right-aligned menu</DropdownToggle>
          <DropdownMenu align="end">
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const SplitColorVariantButtonDropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Split button dropdowns</h4>
        <p className="text-muted mb-0">
          Similarly, create split button dropdowns with virtually the same
          markup as single button dropdowns, but with the addition of{' '}
          <code>.dropdown-toggle-split</code> for proper spacing around the
          dropdown caret.
        </p>
      </CardHeader>
      <CardBody>
        {(extendedColorVariants || []).map((color, idx) => {
          return (
            <Dropdown key={idx} as={ButtonGroup} className="mb-2 me-1">
              <Button variant={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Button>
              <DropdownToggle
                variant={color}
                className="dropdown-toggle-split"
              >
                <span className="visually-hidden">Toggle Dropdown</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Action</DropdownItem>
                <DropdownItem href="#">Another action</DropdownItem>
                <DropdownItem href="#">Something else here</DropdownItem>
                <DropdownDivider></DropdownDivider>
                <DropdownItem href="#">Separated link</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
        })}
      </CardBody>
    </Card>
  )
}

const ButtonDropdownSizes = () => {
  const sizes = [
    {
      size: 'lg',
      name: 'Large button',
    },
    {
      size: 'sm',
      name: 'Small button',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Sizing</h4>
        <p className="text-muted mb-0">
          Button dropdowns work with buttons of all sizes, including default and
          split dropdown buttons.
        </p>
      </CardHeader>
      <CardBody>
        {(sizes || []).map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <Dropdown as={ButtonGroup} className="me-1" size={item.size}>
                <DropdownToggle variant="light">{item.name}</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Action</DropdownItem>
                  <DropdownItem href="#">Another action</DropdownItem>
                  <DropdownItem href="#">Something else here</DropdownItem>
                  <DropdownDivider></DropdownDivider>
                  <DropdownItem href="#">Separated link</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Dropdown
                as={ButtonGroup}
                className="me-1"
                size={item.size}
                key={idx}
              >
                <Button variant="light">{item.name}</Button>
                <DropdownToggle
                  variant="light"
                  className="dropdown-toggle-split"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Action</DropdownItem>
                  <DropdownItem href="#">Another action</DropdownItem>
                  <DropdownItem href="#">Something else here</DropdownItem>
                  <DropdownDivider></DropdownDivider>
                  <DropdownItem href="#">Separated link</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </React.Fragment>
          )
        })}
      </CardBody>
    </Card>
  )
}

const DropstartVariation = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Dropstart variation</h4>
        <p className="text-muted mb-0">
          Trigger dropdown menus at the right of the elements by adding{' '}
          <code>.dropleft</code> to the parent element.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup} drop="start" className="me-1">
          <DropdownToggle variant="secondary">Dropstart</DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
            <DropdownItem href="#">Something else here</DropdownItem>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">Separated link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown as={ButtonGroup}>
          <Dropdown as={ButtonGroup} drop="start">
            <DropdownToggle variant="secondary">
              <span className="visually-hidden">Toggle Dropstart</span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem href="#">Action</DropdownItem>
              <DropdownItem href="#">Another action</DropdownItem>
              <DropdownItem href="#">Something else here</DropdownItem>
              <DropdownDivider></DropdownDivider>
              <DropdownItem href="#">Separated link</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Button variant="secondary">Split dropstart</Button>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const ActiveItemDropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Active Item</h4>
        <p className="text-muted mb-0">
          Add <code>.active</code> to item in the dropdown to{' '}
          <strong>style them as active</strong>.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup}>
          <DropdownToggle variant="secondary">Active Item</DropdownToggle>
          <DropdownMenu>
            <DropdownItem href="#">Regular link</DropdownItem>
            <Dropdown.Item active href="#">
              Active link
            </Dropdown.Item>
            <DropdownItem href="#">Another link</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const Headersdropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Headers</h4>
        <p className="text-muted mb-0">
          Add a header to label sections of actions in any dropdown menu.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown as={ButtonGroup}>
          <DropdownToggle variant="secondary">Header</DropdownToggle>
          <DropdownMenu>
            <Dropdown.Header as="h5">Dropdown header</Dropdown.Header>
            <DropdownItem href="#">Action</DropdownItem>
            <DropdownItem href="#">Another action</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const Centereddropdowns = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Centered dropdowns</h4>
        <p className="text-muted mb-0">
          Make the dropdown menu centered below the toggle with{' '}
          <code>.dropdown-center</code> on the parent element.
        </p>
      </CardHeader>
      <CardBody>
        <div className="hstack gap-2">
          <Dropdown className="dropdown-center">
            <DropdownToggle variant="secondary">
              Centered dropdown
            </DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Action</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Action two</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Action three</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <Dropdown className="dropup-cented" drop="up">
            <DropdownToggle variant="secondary">
              Centered dropup
            </DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Action</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Action two</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Action three</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  )
}

const AutoCloseBehaviordropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Auto close behavior</h4>
        <p className="text-muted mb-0">
          By default, the dropdown menu is closed when clicking inside or
          outside the dropdown menu. You can use the <code>autoClose</code>{' '}
          option to change this behavior of the dropdown.
        </p>
      </CardHeader>
      <CardBody>
        <div className="hstack gap-2">
          <Dropdown autoClose as={ButtonGroup}>
            <DropdownToggle variant="secondary">
              Default dropdown
            </DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <Dropdown autoClose="inside" as={ButtonGroup}>
            <DropdownToggle variant="secondary">
              Clickable inside
            </DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <Dropdown autoClose="outside" as={ButtonGroup}>
            <DropdownToggle variant="secondary">
              Clickable outside
            </DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>

          <Dropdown autoClose="inside" as={ButtonGroup}>
            <DropdownToggle
              variant="secondary"
              className="btn btn-secondary"
              type="button"
            >
              Manual close
            </DropdownToggle>
            <DropdownMenu as="ul">
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
              <li>
                <DropdownItem href="#">Menu item</DropdownItem>
              </li>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  )
}

const CustomDropdown = () => {
  return (
    <Card>
      <CardHeader>
        <h4 className="header-title">Forms</h4>
        <p className="text-muted mb-0">
          Put a form within a dropdown menu, or make it into a dropdown menu,
          and use margin or padding utilities to give it the negative space you
          require.
        </p>
      </CardHeader>
      <CardBody>
        <Dropdown>
          <DropdownToggle variant="secondary">Form</DropdownToggle>
          <DropdownMenu>
            <form className="px-4 py-3">
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormEmail1"
                  className="form-label"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleDropdownFormEmail1"
                  placeholder="email@example.com"
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleDropdownFormPassword1"
                  className="form-label"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleDropdownFormPassword1"
                  placeholder="Password"
                />
              </div>
              <div className="mb-2">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="dropdownCheck"
                  />
                  <label className="form-check-label" htmlFor="dropdownCheck">
                    Remember me
                  </label>
                </div>
              </div>
              <Button variant="primary">Sign in</Button>
            </form>
            <DropdownDivider></DropdownDivider>
            <DropdownItem href="#">New around here? Sign up</DropdownItem>
            <DropdownItem href="#">Forgot password?</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardBody>
    </Card>
  )
}

const Dropdowns = () => {
  return (
    <Row>
      <Col xl={12}>
        <SingleButtonDropdown />
        <DropdownVariant />
        <AnimatedDropdown />
        <DropupVariationDropdowns />
        <DropendVariationDropdowns />
        <DisabledItemDropdown />
        <Darkdropdowns />
        <Dropdownoptions />
        <DropdownWithText />
      </Col>

      <Col xl={12}>
        <DropdownMenuAlignment />
        <SplitColorVariantButtonDropdown />
        <ButtonDropdownSizes />
        <DropstartVariation />
        <ActiveItemDropdown />
        <Headersdropdown />
        <Centereddropdowns />
        <AutoCloseBehaviordropdown />
        <CustomDropdown />
      </Col>
    </Row>
  )
}

export default Dropdowns