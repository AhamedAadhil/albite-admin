import PageBreadcrumb from '@/components/PageBreadcrumb'
import Dropdowns from './components/Dropdowns'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Dropdown" }

const DropdownsPage = () => {
	return (
		<>
			<PageBreadcrumb title="Dropdowns" subName="Base UI" />
			<Dropdowns />
		</>
	)
}

export default DropdownsPage
