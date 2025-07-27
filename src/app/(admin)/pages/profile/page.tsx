'use client'
import bgProfile from '@/assets/images/bg-profile.jpg'
import avatar1 from '@/assets/images/users/avatar-1.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { Button, Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer } from 'react-bootstrap'
import UserDetails from './components/UserDetails'



const ProfilePages = () => {
  return (
    <>
      <div>
        <Row>
          <Col sm={12}>
            <div
              className="profile-bg-picture"
              style={{ backgroundImage: `url(${bgProfile.src})` }}
            >
              <span className="picture-bg-overlay" />
            </div>
            <div className="profile-user-box">
              <Row>
                <Col sm={6}>
                  <div className="profile-user-img">
                    <Image
                      src={avatar1}
                      className="avatar-lg rounded-circle"
                      alt="user"
                    />
                  </div>
                  <div>
                    <h4 className="mt-4 fs-17 ellipsis">Michael A. Franklin</h4>
                    <p className="font-13"> User Experience Specialist</p>
                    <p className="text-muted mb-0">
                      <small>California, United States</small>
                    </p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <Button type="button" variant="soft-danger">
                      <i className="ri-settings-2-line align-text-bottom me-1 fs-16 lh-1" />{' '}
                      Edit Profile
                    </Button>
                    <Button variant="soft-info">
                      {' '}
                      <i className="ri-check-double-fill fs-18 me-1 lh-1" />{' '}
                      Following
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Card className="p-0">
              <CardBody className="p-0">
                <div className="profile-content">
                  <TabContainer defaultActiveKey="About">
                    <Nav as="ul" justify className="nav-underline gap-0">
                      <NavItem as="li">
                        <NavLink
                          as={Link}
                          href="#"
                          eventKey="About"
                          type="button"
                        >
                          About
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          eventKey="Activities"
                          href="#"
                          as={Link}
                          type="button"
                        >
                          Activities
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          as={Link}
                          type="button"
                          href="#"
                          eventKey="Settings"
                        >
                          Settings
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          type="button"
                          as={Link}
                          href="#"
                          eventKey="Projects"
                        >
                          Projects
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <UserDetails />
                  </TabContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ProfilePages
