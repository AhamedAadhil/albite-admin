"use client";
import bgProfile from "@/assets/images/bg-profile.jpg";
import Link from "next/link";
import {
  Button,
  Card,
  CardBody,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContainer,
  TabContent,
  TabPane,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import getInitials from "@/helper/getInitials";
import { IUser } from "@/models/user";
import UserOrders from "./components/UserOrders";
import UserFavorites from "./components/UserFavorites";
import UserCart from "./components/UserCart";
import UserReviews from "./components/UserReviews";
import UserInfo from "./components/UserInfo";

const ProfilePages = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [ordersByMonth, setOrdersByMonth] = useState([]);
  const [categoryDistribution, setCategoryDistribution] = useState([]);
  const [orderStatusDistribution, setOrderStatusDistribution] = useState([]);

  const availableTabs = [];

  if (userData?.orders?.length) {
    availableTabs.push({
      key: "orders",
      label: `Orders (${userData?.orders?.length})`,
    });
  }
  if (userData?.favourites?.length) {
    availableTabs.push({
      key: "favorites",
      label: `Favorites (${userData?.favourites?.length})`,
    });
  }
  if (userData?.cart) {
    availableTabs.push({
      key: "cart",
      label: `Cart (Rs. ${(userData.cart as any).total})`,
    });
  }

  if (userData?.reviews?.length) {
    availableTabs.push({ key: "reviews", label: "Reviews" });
  }

  availableTabs.push({ key: "info", label: "Info" }); // always available

  useEffect(() => {
    const storedUserId = localStorage.getItem("viewUser_userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const fetchUserDetails = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`/api/protected/users/${userId}`);
      const data = await response.json();
      setUserData(data.data);
      setOrdersByMonth(data.ordersByMonth);
      setCategoryDistribution(data.categoryDistribution);
      setOrderStatusDistribution(data.orderStatusDistribution);
      console.log("User Data:", data.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  // If currentUser is set, render the profile page

  useEffect(() => {
    fetchUserDetails();
  }, [userId]);

  // console.log("User Data:", userData);

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
                    <div
                      className="avatar-lg rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                      style={{
                        width: 64,
                        height: 64,
                        fontWeight: "bold",
                        fontSize: 22,
                      }}
                    >
                      {getInitials(userData?.name)}
                    </div>
                  </div>
                  <div>
                    <h4 className="mt-4 fs-17 ellipsis">{userData?.name}</h4>
                    <p className="font-13">
                      {userData?.mobile} | {userData?.email}
                    </p>
                    <p className="text-muted mb-0">
                      <small>
                        {userData?.region ? userData?.region : "N/A"}
                      </small>
                    </p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    {/* Active / Inactive Button */}
                    <Button
                      type="button"
                      variant={userData?.isActive ? "success" : "secondary"}
                      className="d-flex align-items-center"
                    >
                      <i
                        className={`${
                          userData?.isActive
                            ? "ri-checkbox-circle-line"
                            : "ri-close-circle-line"
                        } align-text-bottom me-1 fs-16 lh-1`}
                      />
                      {userData?.isActive ? "Active" : "Inactive"}
                    </Button>

                    {/* Verified / Unverified Button */}
                    <Button
                      variant={userData?.isVerified ? "info" : "warning"}
                      className="d-flex align-items-center"
                    >
                      <i
                        className={`${
                          userData?.isVerified
                            ? "ri-shield-check-line"
                            : "ri-shield-cross-line"
                        } fs-18 me-1 lh-1`}
                      />
                      {userData?.isVerified ? "Verified" : "Unverified"}
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
                  <TabContainer defaultActiveKey={availableTabs[0]?.key}>
                    <Nav as="ul" justify className="nav-underline gap-0">
                      {availableTabs.map((tab) => (
                        <NavItem key={tab.key}>
                          <NavLink
                            eventKey={tab.key}
                            as={Link}
                            href="#"
                            type="button"
                          >
                            {tab.label}
                          </NavLink>
                        </NavItem>
                      ))}
                    </Nav>
                    <TabContent className="p-4">
                      <TabPane eventKey="orders">
                        <UserOrders orders={userData?.orders || []} />
                      </TabPane>

                      <TabPane eventKey="favorites">
                        <UserFavorites favorites={userData?.favourites || []} />
                      </TabPane>

                      <TabPane eventKey="cart">
                        <UserCart cart={userData?.cart} />
                      </TabPane>

                      <TabPane eventKey="reviews">
                        <UserReviews reviews={userData?.reviews || []} />
                      </TabPane>

                      <TabPane eventKey="info">
                        <UserInfo
                          userData={userData}
                          ordersByMonth={ordersByMonth}
                          categoryDistribution={categoryDistribution}
                          orderStatusDistribution={orderStatusDistribution}
                        />
                      </TabPane>
                    </TabContent>
                  </TabContainer>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfilePages;
