import React from 'react'
import BasicTables from './Components/BasicTables'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Basic Tables" }

const BasicTablesPage = () => {
	return (
		<>
		<PageBreadcrumb title="Basic Tables" subName="Tables" />
		<BasicTables />
		</>
	)
}

export default BasicTablesPage