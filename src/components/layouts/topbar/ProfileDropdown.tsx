import { Dropdown } from 'react-bootstrap'
import { ProfileOption } from '../../Topbar'
import useToggle from '@/hooks/useToggle'
import Link from 'next/link'
import Image, { StaticImageData } from 'next/image'

type ProfileDropdownProps = {
	menuItems: Array<ProfileOption>
	userImage: StaticImageData
	username: string
}
const ProfileDropdown = ({
	menuItems,
	userImage,
	username,
}: ProfileDropdownProps) => {
	const [isOpen, toggleDropdown] = useToggle()
	return (
		<Dropdown show={isOpen} onToggle={toggleDropdown}>
			<Dropdown.Toggle
				className="nav-link dropdown-toggle arrow-none nav-user"
				href="#"
				role="button"
				as={Link}
				onClick={toggleDropdown}
			>
				<span className="account-user-avatar">
					<Image
						src={userImage}
						alt="user-image"
						width={32}
						className="rounded-circle"
					/>
				</span>
				<span className="d-lg-block d-none">
					<h5 className="my-0 fw-normal">
						{username}{' '}
						<i className="ri-arrow-down-s-line d-none d-sm-inline-block align-middle" />
					</h5>
				</span>
			</Dropdown.Toggle>
			<Dropdown.Menu
				align="end"
				className="dropdown-menu-animated profile-dropdown"
			>
				<div onClick={toggleDropdown}>
					<div className=" dropdown-header noti-title">
						<h6 className="text-overflow m-0">Welcome !</h6>
					</div>
					{/* item*/}

					{(menuItems || []).map((item, idx) => {
						return (
							<Link key={idx} href={item.redirectTo} className="dropdown-item">
								<i className={`${item.icon} fs-18 align-middle me-1`} />
								<span>{item.label}</span>
							</Link>
						)
					})}
				</div>
			</Dropdown.Menu>
		</Dropdown>
	)
}

export default ProfileDropdown
