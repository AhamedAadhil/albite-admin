import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import React from 'react'
import { Button } from 'react-bootstrap'

export const metadata: Metadata = { title: "Error-404-alt" }

const error404alt = () => {
  return (
    <>
      <PageBreadcrumb title="404 Alt Error" subName="Pages" />
      <div className="row justify-content-center items">
        <div className="col-12">
          <div className="d-flex flex-column h-100">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="text-center">
                  <h1 className="text-error mb-4">404</h1>
                  <h2 className="text-uppercase text-danger mt-3">Page Not Found</h2>
                  <p className="text-muted mt-3">It&apos;s looking like you may have taken a wrong turn. Don&apos;t worry... it
                    happens to the best of us. Here&apos;s a
                    little tip that might help you get back on track.</p>
                  <Button variant='soft-danger' className="mt-3" href="/"><i className="ri-home-4-line me-1" /> Back to Home</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default error404alt