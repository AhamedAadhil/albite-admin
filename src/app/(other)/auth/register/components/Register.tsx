"use client";
import { currentYear } from "@/context/constants";
import Image from "next/image";
import React, { useEffect } from "react";
import authImg from "@/assets/images/auth-img.jpg";
import logo from "@/assets/images/logo.png";
import logoDark from "@/assets/images/logo-dark.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";

const Register = () => {
  useEffect(() => {
    if (document.body) {
      document.body.classList.add("authentication-bg", "position-relative");
    }
    return () => {
      if (document.body) {
        document.body.classList.remove(
          "authentication-bg",
          "position-relative"
        );
      }
    };
  }, []);
  return (
    <>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xxl={8} lg={10}>
              <Card className="overflow-hidden bg-opacity-25">
                <Row className="g-0">
                  <Col lg={6} className="d-none d-lg-block p-2">
                    <Image
                      src={authImg}
                      alt="authImg"
                      className="img-fluid rounded h-100"
                    />
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
                        <h4 className="fs-20">Free Sign Up</h4>
                        <p className="text-muted mb-3">
                          Enter your email address and password to access
                          account.
                        </p>
                        <form action="#">
                          <div className="mb-3">
                            <label htmlFor="fullname" className="form-label">
                              Full Name
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              id="fullname"
                              placeholder="Enter your name"
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="emailaddress"
                              className="form-label"
                            >
                              Email address
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              id="emailaddress"
                              required
                              placeholder="Enter your email"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              className="form-control"
                              type="password"
                              required
                              id="password"
                              placeholder="Enter your password"
                            />
                          </div>
                          <div className="mb-3">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="checkbox-signup"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="checkbox-signup"
                              >
                                I accept{" "}
                                <a
                                  href="javascript: void(0);"
                                  className="text-muted"
                                >
                                  Terms and Conditions
                                </a>
                              </label>
                            </div>
                          </div>
                          <div className="mb-0 d-grid text-center">
                            <button
                              className="btn btn-primary fw-semibold"
                              type="submit"
                            >
                              Sign Up
                            </button>
                          </div>
                          <div className="text-center mt-4">
                            <p className="text-muted fs-16">Sign in with</p>
                            <div className="d-flex gap-2 justify-content-center mt-3">
                              <Button variant="soft-primary">
                                <i className="ri-facebook-circle-fill" />
                              </Button>
                              <Button variant="soft-danger">
                                <i className="ri-google-fill" />
                              </Button>
                              <Button variant="soft-info">
                                <i className="ri-twitter-fill" />
                              </Button>
                              <Button variant="soft-dark">
                                <i className="ri-github-fill" />
                              </Button>
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
          <Row>
            <Col xs={12} className="text-center">
              <p className="text-dark-emphasis">
                Already have account?{" "}
                <a
                  href="/auth/login"
                  className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"
                >
                  <b>Log In</b>
                </a>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      <footer className="footer footer-alt fw-medium">
        <span className="text-dark-emphasis">
          {currentYear} © Ahamed Aathil- A2Labz pvt ltd
        </span>
      </footer>
    </>
  );
};

export default Register;
