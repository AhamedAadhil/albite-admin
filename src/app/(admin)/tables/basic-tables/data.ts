
import avatar2 from '@/assets/images/users/avatar-2.jpg'
import avatar3 from '@/assets/images/users/avatar-3.jpg'
import avatar4 from '@/assets/images/users/avatar-4.jpg'
import avatar5 from '@/assets/images/users/avatar-5.jpg'
import { StaticImageData } from 'next/image'

type TableRecord = {
  id: number
  name: string
  phoneNo: string
  dob: string
  country: string
  accountNo: string
  image: StaticImageData
  cell: string
  activeClass?: string
}

type ExpandableRecord = {
	product: string
	courier: string
	variant: string
	now: number
	status: string
	price: string
	Quantity: string
	Amount: string
}

type NestedRecords = {
	name: string
	phoneNo: string
	dob: string
	country: string
	children?: NestedRecords[]
}




export const records: TableRecord[] = [
  {
    id: 1,
    name: 'Risa D. Pearson',
    phoneNo: '336-508-2157',
    dob: 'July 24, 1950',
    country: 'India',
    accountNo: 'AC336 508 2157',
    image: avatar2,
    cell: 'Cell',
    activeClass: 'table-active',
  },
  {
    id: 2,
    name: 'Ann C. Thompson',
    phoneNo: '646-473-2057',
    dob: 'January 25, 1959',
    country: 'USA',
    accountNo: 'SB646 473 2057',
    image: avatar3,
    cell: 'Cell',
  },
  {
    id: 3,
    name: 'Paul J. Friend',
    phoneNo: '281-308-0793',
    dob: 'September 1, 1939',
    country: 'Canada',
    accountNo: 'DL281 308 0793',
    image: avatar4,
    cell: 'Cell',
  },
  {
    id: 4,
    name: 'Linda G. Smith',
    phoneNo: '606-253-1207',
    dob: 'May 3, 1962',
    country: 'Brazil',
    accountNo: 'CA269 714 6825',
    image: avatar5,
    cell: 'Cell',
  },
]

export const expandablerecords: ExpandableRecord[] = [
	{
		product: 'ASOS Ridley High Waist',
		courier: 'FedEx',
		variant: 'success',
		now: 100,
		status: 'Delivered',
		price: '$79.49',
		Quantity: '82',
		Amount: '6,518.18',
	},
	{
		product: 'Marco Lightweight Shirt',
		courier: 'DHL',
		variant: 'warning',
		now: 50,
		status: 'Shipped',
		price: '$128.50',
		Quantity: '37',
		Amount: '4,754.50',
	},
	{
		product: 'Half Sleeve Shirt',
		courier: 'Bright',
		variant: 'info',
		now: 25,
		status: 'Order Received',
		price: '$39.99',
		Quantity: '64',
		Amount: '2,559.36',
	},
	{
		product: 'Lightweight Jacket',
		courier: 'FedEx',
		variant: 'success',
		now: 100,
		status: 'Delivered',
		price: '$20.00',
		Quantity: '184',
		Amount: '3,680.00',
	},
	{
		product: 'Cargo Pant & Shirt',
		courier: 'FedEx',
		variant: 'danger',
		now: 10,
		status: 'Payment Failed',
		price: '$28.49',
		Quantity: '69',
		Amount: '1,965.81',
	},
	{
		product: 'ASOS Ridley High Waist',
		courier: 'FedEx',
		variant: 'danger',
		now: 10,
		status: 'Payment Failed',
		price: '$79.49',
		Quantity: '82',
		Amount: '6,518.18',
	},
]

export const nestedrecords: NestedRecords[] = [
	{
		name: 'Risa D. Pearson',
		phoneNo: '336-508-2157',
		dob: 'July 24, 1950',
		country: 'india',
		children: [
			{
				name: 'Risa D. Pearson',
				phoneNo: '336-508-2157',
				dob: 'July 24, 1950',
				country: 'india',
			},
			{
				name: 'Ann C. Thompson',
				phoneNo: '646-473-2057',
				dob: 'January 25, 1959',
				country: 'Canada',
			},
		],
	},
	{
		name: 'Linda G. Smith',
		phoneNo: '606-253-1207',
		dob: 'September 2, 1939',
		country: 'Belgium',
	},
]
