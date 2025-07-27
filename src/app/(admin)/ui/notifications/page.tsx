import {
	Col,
	Row
} from 'react-bootstrap'

// images
import PageBreadcrumb from '@/components/PageBreadcrumb'
import CustomToast from './components/CustomToast'
import DefaultToasts from './components/DefaultToasts'
import PlacementToast from './components/PlacementToast'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Notification" }


const Notifications = () => {
	return (
		<>
			<PageBreadcrumb title="Notifications" subName="Base UI" />
			<Row>
				<Col xs={12}>
					<DefaultToasts />
				</Col>
			</Row>

			<Row>
				<Col lg={6}>
					<CustomToast />
				</Col>

				<Col lg={6}>
					<PlacementToast />
				</Col>
			</Row>
		</>
	)
}

export default Notifications
