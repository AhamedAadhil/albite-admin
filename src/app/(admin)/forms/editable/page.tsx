import React from 'react'
import XEditable from './components/XEditable'
import { Metadata } from 'next'

export const metadata: Metadata = { title: "X Editable Uploads" }

const XEditablePage = () => {
	return (
		<XEditable />
	)
}

export default XEditablePage