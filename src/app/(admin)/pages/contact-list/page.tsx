import {
  Button,
  Card,
  CardBody,
  Col,
  OverlayTrigger,
  Pagination,
  Row,
  Tooltip,
} from 'react-bootstrap'
import { splitArray } from '@/utils/array'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { contactList } from './data'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'
import { Metadata } from 'next'

type ContactListData = {
  name: string
  avatar: StaticImageData
}

export const metadata: Metadata = { title: "Contact List" }

const contactlist = contactList || []
const contactListChunks = splitArray(contactlist, 2)

const ContactLists = ({ avatar, name }: ContactListData) => {
  return (
    <Col md={6}>
      <Card>
        <CardBody>
          <div className="d-flex align-items-start justify-content-between">
            <div className="d-flex">
              <Link className="me-3" href="#">
                <Image alt='avatar' className="avatar-md rounded-circle bx-s" src={avatar} />
              </Link>
              <div className="info">
                <h5 className="fs-18 my-1">{name}</h5>
                <p className="text-muted fs-15">Graphics Designer</p>
              </div>
            </div>
            <div>
              <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
                <Button variant="success" size="sm" className="me-1">
                  {' '}
                  <i className="ri-pencil-fill" />{' '}
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Delete</Tooltip>}
              >
                <Button variant="danger" size="sm">
                  {' '}
                  <i className="ri-close-fill" />{' '}
                </Button>
              </OverlayTrigger>
            </div>
          </div>
          <hr />
          <ul className="social-list list-inline mt-3 mb-0">
            <li className="list-inline-item">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Facebook</Tooltip>}
              >
                <Link
                  className="social-list-item bg-dark-subtle text-secondary fs-16 border-0"
                  href=""
                >
                  <i className="ri-facebook-fill" />
                </Link>
              </OverlayTrigger>
            </li>
            <li className="list-inline-item">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Twitter</Tooltip>}
              >
                <Link
                  className="social-list-item bg-dark-subtle text-secondary fs-16 border-0"
                  href=""
                >
                  <i className="ri-twitter-fill" />
                </Link>
              </OverlayTrigger>
            </li>
            <li className="list-inline-item">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>LinkedIn</Tooltip>}
              >
                <Link
                  className="social-list-item bg-dark-subtle text-secondary fs-16 border-0"
                  href="#"
                >
                  <i className="ri-linkedin-box-fill" />
                </Link>
              </OverlayTrigger>
            </li>
            <li className="list-inline-item">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Skype</Tooltip>}
              >
                <Link
                  className="social-list-item bg-dark-subtle text-secondary fs-16 border-0"
                  href="#"
                >
                  <i className="ri-skype-fill" />
                </Link>
              </OverlayTrigger>
            </li>
            <li className="list-inline-item">
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Message</Tooltip>}
              >
                <Link
                  className="social-list-item bg-dark-subtle text-secondary fs-16 border-0"
                  href="#"
                >
                  <i className="ri-mail-open-line" />
                </Link>
              </OverlayTrigger>
            </li>
          </ul>
        </CardBody>
      </Card>
    </Col>
  )
}
const ContactList = () => {
  const items = []
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination
        key={number}
        className={`${number === 2 ? 'active' : ''}`}
      >
        {number}
      </Pagination>
    )
  }
  return (
    <>
      <PageBreadcrumb title="Contact List" subName="Pages" />
      <Row>
        <Col lg={8}>
          <Card>
            <CardBody>
              <div className="input-group">
                <input
                  type="text"
                  id="example-input1-group2"
                  name="example-input1-group2"
                  className="form-control"
                  placeholder="Search"
                />
                <span className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-primary rounded-start-0"
                  >
                    <i className="ri-search-line fs-16"></i>
                  </button>
                </span>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {(contactListChunks || []).map((chunk, idx) => {
        return (
          <Row key={idx}>
            {(chunk || []).map((item, idx) => {
              return (
                <ContactLists key={idx} avatar={item.avatar} name={item.name} />
              )
            })}
          </Row>
        )
      })}
      <div className="row">
        <div className="col-sm-12">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className="page-item"><a href="#" aria-label="Previous" className="page-link"> <i className="ri-arrow-left-s-line lh-sm" /></a></li>
              <li className="page-item"><a href="#" className="page-link">1</a></li>
              <li className="active page-item"><a href="#" className="page-link">2</a></li>
              <li className="page-item"><a href="#" className="page-link">3</a></li>
              <li className="disabled page-item"><a href="#" className="page-link">4</a></li>
              <li className="page-item"><a href="#" className="page-link">5</a></li>
              <li className="page-item"><a href="#" aria-label="Next" className="page-link"> <i className="ri-arrow-right-s-line lh-sm" /></a></li>
            </ul>
          </nav>
        </div>
      </div>

    </>
  )
}

export default ContactList
