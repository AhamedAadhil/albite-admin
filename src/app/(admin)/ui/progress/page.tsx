import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import { Row, Col, Card, ProgressBar, CardHeader, CardBody } from 'react-bootstrap'

export const metadata: Metadata = { title: "Progress" }

const Example = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Examples</h4>
					<p className="text-muted mb-0">
						A progress bar can be used to show a user how far along he/she is in
						a process.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar className="mb-2" now={0} />
					<ProgressBar className="mb-2" now={25} />
					<ProgressBar className="mb-2" now={50} />
					<ProgressBar className="mb-2" now={75} />
					<ProgressBar className="progress" now={100} />
				</CardBody>
			</Card>
		</>
	)
}

const HeightProgressBar = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Height</h4>
					<p className="text-muted mb-0">
						We only set a <code>height</code> value on the{' '}
						<code>.progress</code>, so if you change that value the inner{' '}
						<code>.progress-bar</code> will automatically resize accordingly.
						Use <code>.progress-sm</code>,<code>.progress-md</code>,
						<code>.progress-lg</code>,<code>.progress-xl</code> classes.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar
						now={25}
						variant="danger"
						className="mb-2"
						style={{ height: 1 }}
					/>
					<ProgressBar
						now={25}
						variant="primary"
						className="mb-2"
						style={{ height: 3 }}
					/>
					<ProgressBar
						now={25}
						variant="success"
						className="mb-2 progress-sm"
					/>
					<ProgressBar now={50} variant="info" className="mb-2 progress-md" />
					<ProgressBar
						now={75}
						variant="warning"
						className="progress-lg mb-2"
					/>
					<ProgressBar now={38} variant="success" className="progress-xl" />
				</CardBody>
			</Card>
		</>
	)
}

const MultipleBars = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Multiple bars</h4>
					<p className="text-muted mb-0">
						Include multiple progress bars in a progress component if you need.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar className="progress">
						<ProgressBar now={15}></ProgressBar>
						<ProgressBar now={30} variant="success" className="bg-success" />
						<ProgressBar now={20} variant="info" className="bg-info" />
					</ProgressBar>
				</CardBody>
			</Card>
		</>
	)
}

const AnimatedStripes = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Animated stripes</h4>
					<p className="text-muted mb-0">
						The striped gradient can also be animated. Add{' '}
						<code>.progress-bar-animated</code> to <code>.progress-bar</code> to
						animate the stripes right to left via CSS3 animations.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar now={75} animated className="progress" />
				</CardBody>
			</Card>
		</>
	)
}

const LabelsBar = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Labels</h4>
					<p className="text-muted mb-0">
						Add labels to your progress bars by placing text within the{' '}
						<code>.progress-bar</code>.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar now={25} label="25%" />
				</CardBody>
			</Card>
		</>
	)
}

const BackgroundBar = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Backgrounds</h4>
					<p className="text-muted mb-0">
						Use background utility classes to change the appearance of
						individual progress bars.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar now={25} variant="success" className="mb-2" />
					<ProgressBar now={50} variant="info" className="mb-2" />
					<ProgressBar now={75} variant="warning" className="mb-2" />
					<ProgressBar now={100} variant="danger" className="mb-2" />
					<ProgressBar now={85} variant="pink" className="mb-2" />
					<ProgressBar now={85} variant="purple" className="mb-2" />
					<ProgressBar now={65} variant="dark" className="mb-2" />
					<ProgressBar now={50} variant="secondary" />
				</CardBody>
			</Card>
		</>
	)
}

const StripedBar = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<h4 className="header-title">Striped</h4>
					<p className="text-muted mb-0">
						Add <code>.progress-bar-striped</code> to any{' '}
						<code>.progress-bar</code> to apply a stripe via CSS gradient over
						the progress bar’s background color.
					</p>
				</CardHeader>
				<CardBody>
					<ProgressBar now={10} striped className="mb-2" />
					<ProgressBar now={25} striped variant="success" className="mb-2" />
					<ProgressBar now={50} striped variant="info" className="mb-2" />
					<ProgressBar now={75} striped variant="warning" className="mb-2" />
					<ProgressBar now={100} striped variant="danger" className="mb-2" />
					<ProgressBar now={100} striped variant="pink" />
				</CardBody>
			</Card>
		</>
	)
}

const Progress = () => {
	return (
		<>
			<PageBreadcrumb title="Progress" subName="Base UI" />
			<Row>
				<Col xl={6}>
					<Example />
					<HeightProgressBar />
					<MultipleBars />
					<AnimatedStripes />
				</Col>

				<Col xl={6}>
					<LabelsBar />
					<BackgroundBar />
					<StripedBar />
				</Col>
			</Row>
		</>
	)
}

export default Progress
