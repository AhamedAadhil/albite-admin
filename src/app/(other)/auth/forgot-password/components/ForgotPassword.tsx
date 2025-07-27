'use client'
import { currentYear } from '@/context/constants'
import Image from 'next/image'
import React, { useEffect } from 'react'
import logo from '@/assets/images/logo.png'
import logoDark from '@/assets/images/logo-dark.png'
import authImg from '@/assets/images/auth-img.jpg'
import Link from 'next/link'
import { Card, Col, Container, Row } from 'react-bootstrap'

const ForgotPassword = () => {
  useEffect(() => {
    if (document.body) {
      document.body.classList.add('authentication-bg')
    }

    return () => {
      if(document.body) {
        document.body.classList.remove('authentication-bg')
      }
    }
  }, [])
  return (
    <>
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
                        <h4 className="fs-20">Forgot Password?</h4>
                        <p className="text-muted mb-3">Enter your email address and we&apos;ll send you an email with instructions to reset your password.</p>
                        <form action="#">
                          <div className="mb-3">
                            <label htmlFor="emailaddress" className="form-label">Email address</label>
                            <input className="form-control" type="email" id="emailaddress" required placeholder="Enter your email" />
                          </div>
                          <div className="mb-0 text-start">
                            <button className="btn btn-soft-primary w-100" type="submit"><i className="ri-loop-left-line me-1 fw-bold" /> <span className="fw-bold">Reset Password</span> </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center">
              <p className="text-dark-emphasis">Back To <a href="/auth/login" className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"><b>Log In</b></a></p>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer footer-alt fw-medium">
        <span className="text-dark-emphasis">{currentYear} © Velonic - Theme by Techzaa</span>
      </footer>
    </>

  )
}

export default ForgotPassword