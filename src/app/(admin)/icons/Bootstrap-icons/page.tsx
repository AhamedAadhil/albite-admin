import { Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { bootstrapIconsList } from './data'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Bootstrap Icons" }

const BootstrapIcons = () => {
	return (
		<>
			<PageBreadcrumb title="Bootstrap Icons" subName="Icons" />
			<Row>
				<Col>
					<Card>
						<CardBody>
							<CardTitle as="h5">Icons</CardTitle>
							<p className="text-muted mb-2">
								Use class{' '}
								<code>&lt;i class=&quot;bi bi-123&quot;&gt;&lt;/i&gt;</code>
							</p>
							<Row className="icons-list-demo" id="bootstrap-icons">
								{(bootstrapIconsList || []).map((icon, idx) => {
									return (
										<Col key={idx} sm={6} md={4} lg={3}>
											<div className="icon-item d-flex align-items-center">
												<i className={`bi bi-${icon} fs-20 me-3`} />{' '}
												<span>{icon}</span>
											</div>
										</Col>
									)
								})}
							</Row>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default BootstrapIcons
