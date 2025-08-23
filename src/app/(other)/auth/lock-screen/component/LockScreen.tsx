"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import authImg from "@/assets/images/auth-img.jpg";
import logo from "@/assets/images/logo.png";
import logoDark from "@/assets/images/logo-dark.png";
import avatar1 from "@/assets/images/users/avatar-1.jpg";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { currentYear } from "@/context/constants";

const LockScreen = () => {
  useEffect(() => {
    if (document.body) {
      document.body.classList.add("authentication-bg");
    }
    return () => {
      if (document.body) {
        document.body.classList.remove("authentication-bg");
      }
    };
  }, []);
  return (
    <>
      <div className="account-pages pt-2 pt-sm-5 pb-4 pb-sm-5 position-relative">
        <Container>
          <Row className="justify-content-center">
            <Col xxl={8} lg={10}>
              <Card className="overflow-hidden">
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
                        <div className="text-center w-75 m-auto">
                          <Image
                            src={avatar1}
                            height={64}
                            alt="user-image"
                            className="rounded-circle img-fluid img-thumbnail avatar-xl"
                          />
                          <h4 className="text-center mt-3 fw-bold fs-20">
                            Hi ! Thomson{" "}
                          </h4>
                          <p className="text-muted mb-4">
                            Enter your password to access the admin.
                          </p>
                        </div>
                        <form action="#">
                          <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                              Password
                            </label>
                            <input
                              className="form-control"
                              type="email"
                              id="password"
                              required
                              placeholder="Enter your password"
                            />
                          </div>
                          <div className="mb-0 text-start">
                            <button
                              className="btn btn-soft-primary w-100"
                              type="submit"
                            >
                              <i className="ri-login-circle-fill me-1" />{" "}
                              <span className="fw-bold">Log In</span>{" "}
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
                Back To{" "}
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

export default LockScreen;
