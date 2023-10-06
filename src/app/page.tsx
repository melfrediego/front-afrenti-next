'use client'
import { Cart } from '@/components/Cart';
import { ProductList } from '@/components/ProductList';
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
	return (
		<>
			<div className='bg-white w-[75%] m-auto h-screen'>
				<ProductList />
				<Cart />
			</div>
		</>
	)
}
