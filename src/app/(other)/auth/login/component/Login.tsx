'use client'
import authImg from '@/assets/images/auth-img.jpg'
import logoDark from '@/assets/images/logo-dark.png'
import logo from '@/assets/images/logo.png'
import { currentYear } from '@/context/constants'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const Login = () => {
  useEffect(() => {
    if (document.body) {
      document.body.classList.add('authentication-bg', 'position-relative')
    }
    return () => {
      if (document.body) {
        document.body.classList.remove('authentication-bg', 'position-relative')
      }
    }
  }, [])
  return (
    <div>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xxl={8} lg={10}>
              <Card className="overflow-hidden">
                <Row className="g-0">
                  <Col lg={6} className="d-none d-lg-block p-2">
                    <Image src={authImg} alt='authImg' className="img-fluid rounded h-100" />
                  </Col>
                  <Col lg={6}>
                    <div className="d-flex flex-column h-100">
                      <div className="auth-brand p-4">
                        <Link href="/" className="logo-light">
                          <Image src={logo} alt="logo" height={22} />
                        </Link>
                        <Link href="/" className="logo-dark">
                          <Image src={logoDark} alt="dark logo" height={22} />
                        </Link>
                      </div>
                      <div className="p-4 my-auto">
                        <h4 className="fs-20">Sign In</h4>
                        <p className="text-muted mb-3">Enter your email address and password to access
                          account.
                        </p>
                        <form action="#">
                          <div className="mb-3">
                            <label htmlFor="emailaddress" className="form-label">Email address</label>
                            <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                          </div>
                          <div className="mb-3">
                            <a href="/auth/forgot-password" className="text-muted float-end"><small>Forgot
                              your
                              password?</small></a>
                            <label htmlFor="password" className="form-label">Password</label>
                            <input className="form-control" type="password" required id="password" placeholder="Enter your password" />
                          </div>
                          <div className="mb-3">
                            <div className="form-check">
                              <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                              <label className="form-check-label" htmlFor="checkbox-signin">Remember
                                me</label>
                            </div>
                          </div>
                          <div className="mb-0 text-start">
                            <button className="btn btn-soft-primary w-100" type="submit"><i className="ri-login-circle-fill me-1" /> <span className="fw-bold">Log
                              In</span> </button>
                          </div>
                          <div className="text-center mt-4">
                            <p className="text-muted fs-16">Sign in with</p>
                            <div className="d-flex gap-2 justify-content-center mt-3">
                              <Button variant='soft-primary'><i className="ri-facebook-circle-fill" /></Button>
                              <Button variant='soft-danger'><i className="ri-google-fill" /></Button>
                              <Button variant='soft-info'><i className="ri-twitter-fill" /></Button>
                              <Button variant='soft-dark'><i className="ri-github-fill" /></Button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-dark-emphasis">Don&apos;t have an account? <a href="auth-register.html" className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"><b>Sign up</b></a>
              </p>
            </div>
          </div>
        </Container>
      </div>
      <footer className="footer footer-alt fw-medium">
        <span className="text-dark">
          {currentYear} © Velonic - Theme by Techzaa
        </span>
      </footer>
    </div>
  )
}

export default Login