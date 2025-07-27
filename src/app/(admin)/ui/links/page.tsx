import { Card, CardBody, CardHeader, Col, Row } from 'react-bootstrap'
import { extendedColorVariants } from '@/constants/colorVariants'
import Link from 'next/link'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Links" }

type Linkdata = {
	color: string
	opacity?: number
}
const linkdata: Linkdata[] = [
	{
		color: 'primary',
		opacity: 10,
	},
	{
		color: 'secondary',
		opacity: 25,
	},
	{
		color: 'success',
		opacity: 50,
	},
	{
		color: 'danger',
		opacity: 75,
	},
	{
		color: 'warning',
		opacity: 100,
	},
	{
		color: 'info',
	},
	{
		color: 'light',
	},
	{
		color: 'dark',
	},
]

const ColoredLinks = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Colored Links</h4>
				<p className="text-muted mb-0">
					You can use the <code>.link-*</code> classes to colorize links. Unlike
					the{' '}
					<Link href="/ui/utilities">
						<code>.text-*</code> classes
					</Link>
					, these classes have a <code>:hover</code> and <code>:focus</code>{' '}
					state. Some of the link styles use a relatively light foreground
					color, and should only be used on a dark background in order to have
					sufficient contrast.
				</p>
			</CardHeader>
			<CardBody>
				{(extendedColorVariants || []).map((color, idx) => {
					return (
						<p key={idx}>
							<Link href="#" className={`link-${color}`}>
								{color.charAt(0).toUpperCase() + color.slice(1)} link
							</Link>
						</p>
					)
				})}
				<p className="mb-0">
					<Link href="#" className="link-body-emphasis">
						Emphasis link
					</Link>
				</p>
			</CardBody>
		</Card>
	)
}

const UtilitiesLinks = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Link Utilities</h4>
				<p className="text-muted mb-0">
					<Link href="/ui/utilities">Colored link helpers</Link> have been updated
					to pair with our link utilities. Use the new utilities to modify the
					link opacity, underline opacity, and underline offset.
				</p>
			</CardHeader>
			<CardBody>
				{(extendedColorVariants || []).map((color, idx) => {
					return (
						<p key={idx}>
							<Link
								href="#"
								className={`link-${color} text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover`}
							>
								{color.charAt(0).toUpperCase() + color.slice(1)} link
							</Link>
						</p>
					)
				})}
				<p>
					<Link
						href="#"
						className="link-body-emphasis text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover"
					>
						Emphasis link
					</Link>
				</p>
			</CardBody>
		</Card>
	)
}

const OpacityLinks = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Link Opacity</h4>
				<p className="text-muted mb-0">
					Change the alpha opacity of the link <code>rgba()</code> color value
					with utilities. Please be aware that changes to a color&apos;s opacity
					can lead to links with <em>insufficient</em> contrast.
				</p>
			</CardHeader>
			<CardBody>
				{(linkdata || []).slice(0, 5).map((record, idx) => {
					return (
						<p key={idx}>
							<Link className={`link-opacity-${record.opacity}`} href="#">
								Link opacity {record.opacity}
							</Link>
						</p>
					)
				})}
			</CardBody>
		</Card>
	)
}

const LinkHoverOpacity = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Link Hover Opacity</h4>
				<p className="text-muted mb-0">
					You can even change the opacity level on hover.
				</p>
			</CardHeader>
			<CardBody>
				{(linkdata || []).slice(0, 5).map((record, idx) => {
					return (
						<p key={idx}>
							{' '}
							<Link className={`link-opacity-${record.opacity}-hover`} href="#">
								Link hover opacity {record.opacity}
							</Link>
						</p>
					)
				})}
			</CardBody>
		</Card>
	)
}

const UnderlineColor = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Underline Color</h4>
				<p className="text-muted mb-0">
					Change the underline’s color independent of the link text color.
				</p>
			</CardHeader>
			<CardBody>
				{(linkdata || []).map((record, idx) => {
					return (
						<p key={idx}>
							<Link
								href="#"
								className={`text-decoration-underline link-underline-${record.color}`}
							>
								{record.color.charAt(0).toUpperCase() + record.color.slice(1)}{' '}
								underline
							</Link>
						</p>
					)
				})}
			</CardBody>
		</Card>
	)
}

const UnderlineOpacity = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Underline Opacity</h4>
				<p className="text-muted mb-0">
					Change the underline&apos;s opacity. Requires adding{' '}
					<code>.link-underline</code> to first set an <code>rgba()</code> color
					we use to then modify the alpha opacity.
				</p>
			</CardHeader>
			<CardBody>
				<p>
					<Link
						className="text-decoration-underline link-offset-2 link-underline link-underline-opacity-0"
						href="#"
					>
						Underline opacity 0
					</Link>
				</p>
				{(linkdata || []).slice(0, 5).map((record, idx) => {
					return (
						<p key={idx}>
							<Link
								className={`text-decoration-underline link-offset-2 link-underline link-underline-opacity-${record.opacity}`}
								href="#"
							>
								Underline opacity {record.opacity}
							</Link>
						</p>
					)
				})}
			</CardBody>
		</Card>
	)
}

const UnderlineOffset = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Underline Offset</h4>
				<p className="text-muted mb-0">
					Change the underline’s opacity. Requires adding{' '}
					<code>.link-underline</code> to first set an <code>rgba()</code> color
					we use to then modify the alpha opacity.
				</p>
			</CardHeader>
			<CardBody>
				<p>
					<Link href="#">Default link</Link>
				</p>
				<p>
					<Link className="text-decoration-underline link-offset-1" href="#">
						Offset 1 link
					</Link>
				</p>
				<p>
					<Link className="text-decoration-underline link-offset-2" href="#">
						Offset 2 link
					</Link>
				</p>
				<p className="mb-0">
					<Link className="text-decoration-underline link-offset-3" href="#">
						Offset 3 link
					</Link>
				</p>
			</CardBody>
		</Card>
	)
}

const HoverVariants = () => {
	return (
		<Card>
			<CardHeader>
				<h4 className="header-title">Hover Variants</h4>
				<p className="text-muted mb-0">
					Just like the <code>.link-opacity-*-hover</code> utilities,{' '}
					<code>.link-offset</code> and <code>.link-underline-opacity</code>{' '}
					utilities include <code>:hover</code> variants by default. Mix and
					match to create unique link styles.
				</p>
			</CardHeader>
			<CardBody>
				<Link
					className="link-offset-2 link-offset-3-hover text-decoration-underline link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
					href="#"
				>
					Underline opacity 0
				</Link>
			</CardBody>
		</Card>
	)
}

const Links = () => {
	return (
		<>
			<PageBreadcrumb title="Links" subName="Base UI" />
			<Row>
				<Col xl={12}>
					<ColoredLinks />
				</Col>

				<Col xl={12}>
					<UtilitiesLinks />
				</Col>
			</Row>

			<Row>
				<Col xl={12}>
					<OpacityLinks />
				</Col>
				<Col xl={12}>
					<LinkHoverOpacity />
				</Col>
			</Row>

			<Row>
				<Col xl={12}>
					<UnderlineColor />
				</Col>
				<Col xl={12}>
					<UnderlineOpacity />
				</Col>
			</Row>

			<Row>
				<Col xl={12}>
					<UnderlineOffset />
				</Col>
				<Col xl={12}>
					<HoverVariants />
				</Col>
			</Row>
		</>
	)
}

export default Links
