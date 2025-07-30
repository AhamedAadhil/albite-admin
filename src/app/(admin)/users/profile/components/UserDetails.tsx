import Link from "next/link";
import React from "react";
import { Button, Col, Row, TabContent, TabPane } from "react-bootstrap";
import { profileActivity } from "../data";
import Image from "next/image";
import FormInput from "@/components/FormInput";
import { IUser } from "@/models/user";

interface Props {
  userData: IUser | null;
}

const UserDetails: React.FC<Props> = ({ userData }) => {
  {
    userData ? (
      <UserDetails userData={userData} />
    ) : (
      <div className="text-center py-5">Loading user info...</div>
    );
  }

  return (
    <TabContent className="m-0 p-4">
      <TabPane eventKey="About" id="aboutme" tabIndex={0}>
        <div className="profile-desk">
          <h5 className="text-uppercase fs-17 text-dark">Johnathan Deo</h5>
          <div className="designation mb-4">
            PRODUCT DESIGNER (UX / UI / Visual Interaction)
          </div>
          <p className="text-muted fs-16">
            I have 10 years of experience designing for the web, and specialize
            in the areas of user interface design, interaction design, visual
            design and prototyping. I’ve worked with notable startups including
            Pearl Street Software.
          </p>
          <h5 className="mt-4 fs-17 text-dark">Contact Information</h5>
          <table className="table table-condensed mb-0 border-top">
            <tbody>
              <tr>
                <th scope="row">Url</th>
                <td>
                  <Link href="" className="ng-binding">
                    www.example.com
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>
                  <Link href="" className="ng-binding">
                    jonathandeo@example.com
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Phone</th>
                <td className="ng-binding">(123)-456-7890</td>
              </tr>
              <tr>
                <th scope="row">Skype</th>
                <td>
                  <Link href="" className="ng-binding">
                    jonathandeo123
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </TabPane>
      <TabPane eventKey="Activities" id="user-activities">
        <div className="timeline-2">
          {(profileActivity || []).map((activity, idx) => {
            return (
              <div key={idx} className="time-item">
                <div className="item-info ms-3 mb-3">
                  <div className="text-muted">{activity.time}</div>
                  <p>
                    <Link href="#" className="text-info">
                      {activity.name}
                    </Link>{" "}
                    {activity.title}
                    {activity.subName && (
                      <React.Fragment>
                        <Link href="#" className="text-success">
                          John Doe
                        </Link>
                        .
                      </React.Fragment>
                    )}
                  </p>
                  {activity.image &&
                    (activity.image || []).map((image, idx) => {
                      return (
                        <Image
                          alt="img"
                          key={idx}
                          src={image}
                          height={40}
                          width={60}
                          className="rounded-1 me-1"
                        />
                      );
                    })}
                  {!activity.image && (
                    <p>
                      <em>
                        &qout;Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Aliquam laoreet tellus ut tincidunt euismod.
                        &qout;
                      </em>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </TabPane>
      <TabPane eventKey="Settings" id="edit-profile">
        <div className="user-profile-content">
          <form>
            <Row className="row-cols-sm-2 row-cols-1">
              <FormInput
                name="fullName"
                label="Full Name"
                type="text"
                containerClass="mb-2"
                defaultValue="John Doe"
              />
              <FormInput
                name="email"
                label="Email"
                type="text"
                containerClass="mb-3"
                defaultValue="first.last@example.com"
              />
              <FormInput
                name="WebUrl"
                label="Website"
                type="text"
                containerClass="mb-3"
                defaultValue="Enter website url"
              />
              <FormInput
                name="UserName"
                label="Username"
                type="text"
                containerClass="mb-3"
                defaultValue="john"
              />
              <FormInput
                name="Password"
                label="Password"
                type="password"
                containerClass="mb-3"
                placeholder="6 - 15 Characters"
              />
              <FormInput
                name="Password2"
                label="Re-Password"
                type="password"
                containerClass="mb-3"
                placeholder="6 - 15 Characters"
              />
              <FormInput
                style={{ height: 125 }}
                name="About"
                label="About Me"
                type="textarea"
                containerClass="col-sm-12 mb-3"
                defaultValue={
                  "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat."
                }
              />
            </Row>
            <Button variant="primary" type="submit">
              <i className="ri-save-line me-1 fs-16 lh-1" /> Save
            </Button>
          </form>
        </div>
      </TabPane>
      <TabPane eventKey="Projects" id="projects">
        <Row className="m-t-10">
          <Col md={12}>
            <div className="table-responsive">
              <table className="table table-bordered mb-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Project Name</th>
                    <th>Start Date</th>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th>Assign</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Velonic Admin</td>
                    <td>01/01/2015</td>
                    <td>07/05/2015</td>
                    <td>
                      <span className="badge bg-info">Work in Progress</span>
                    </td>
                    <td>Techzaa</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Velonic Frontend</td>
                    <td>01/01/2015</td>
                    <td>07/05/2015</td>
                    <td>
                      <span className="badge bg-success">Pending</span>
                    </td>
                    <td>Techzaa</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Velonic Admin</td>
                    <td>01/01/2015</td>
                    <td>07/05/2015</td>
                    <td>
                      <span className="badge bg-pink">Done</span>
                    </td>
                    <td>Techzaa</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Velonic Frontend</td>
                    <td>01/01/2015</td>
                    <td>07/05/2015</td>
                    <td>
                      <span className="badge bg-purple">Work in Progress</span>
                    </td>
                    <td>Techzaa</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>Velonic Admin</td>
                    <td>01/01/2015</td>
                    <td>07/05/2015</td>
                    <td>
                      <span className="badge bg-warning">Coming soon</span>
                    </td>
                    <td>Techzaa</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </TabPane>
    </TabContent>
  );
};

export default UserDetails;
