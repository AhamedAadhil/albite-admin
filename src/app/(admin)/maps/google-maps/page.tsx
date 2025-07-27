import type { Metadata } from 'next'
import AllGoogleMaps from './components/AllGoogleMaps'
import PageBreadcrumb from '@/components/PageBreadcrumb'

export const metadata: Metadata = { title: 'Google Maps' }

const GoogleMaps = () => {
  return (
    <>
      <PageBreadcrumb title="Google Maps" subName="Icons" />
      <AllGoogleMaps />
    </>
  )
}

export default GoogleMaps
