import PageBreadcrumb from '@/components/PageBreadcrumb'
// import VectorMaps from ''
import { Metadata } from 'next'
import dynamic from 'next/dynamic';

const BaseVectorMap = dynamic(() => import('./components/VectorMaps'), { ssr: false });
export const metadata: Metadata = { title: "Vector Maps" }

const VectorMapsPage = () => {
	return (
		<>
			<PageBreadcrumb title="Vector Maps" subName="Base UI" />
			{/* <clientonly> */}
				<BaseVectorMap />
			{/* </clientonly> */}
		</>
	)
}

export default VectorMapsPage
