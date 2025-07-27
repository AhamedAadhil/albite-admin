import React from 'react'
import SparklinesCharts from './components/SparklineCahrt'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Sparklines Charts" }

const SparklinesChartsPage = () => {
	return (
		<SparklinesCharts />
	)
}

export default SparklinesChartsPage