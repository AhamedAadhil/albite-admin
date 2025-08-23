"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/assets/images/logo.png";
import logoDark from "@/assets/images/logo-dark.png";
import authImg from "@/assets/images/auth-img.jpg";
import shieldImg from "@/assets/images/svg/shield.gif";
import { Card, Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import { currentYear } from "@/context/constants";

const Logout = () => {
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
                  <Col lg={6} className="col-lg-6">
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
                        <div className="my-auto">
                          <div className="text-center">
                            <h4 className="mt-0 fs-20">See You Again !</h4>
                            <p className="text-muted mb-4">
                              You are now successfully sign out.
                            </p>
                          </div>
                          <div className="logout-icon m-auto">
                            <Image
                              src={shieldImg}
                              alt="shieldImg"
                              className="img-fluid"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <div className="row">
            <div className="col-12 text-center">
              <p className="text-dark-emphasis">
                Back To{" "}
                <a
                  href="/auth/login"
                  className="text-dark fw-bold ms-1 link-offset-3 text-decoration-underline"
                >
                  <b>Log In</b>
                </a>
              </p>
            </div>
          </div>
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

export default Logout;
