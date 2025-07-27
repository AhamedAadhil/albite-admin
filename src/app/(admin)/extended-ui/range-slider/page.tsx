import React from 'react'
import RangeSlider from './components/RangeSlider'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "Range-slider" }

const RangeSliderPage = () => {
	return (
		<RangeSlider />
	)
}

export default RangeSliderPage