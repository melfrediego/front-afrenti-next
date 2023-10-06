"use client"
import { useCart } from "@/contexts/CartContext";
import { fetchProducts } from "@/utils/api";
import { useEffect, useState } from "react";
import Product from "@/types/types";

// interface Product {
// 	id: number;
// 	name: string;
// 	price: number;
// }

// const products: Product[] = [
// 	{ id: 1, name: 'Produto 1', price: 10 },
// 	{ id: 2, name: 'Produto 2', price: 20 },
// 	{ id: 3, name: 'Produto 3', price: 30 },
// ];
export function ProductList(props: Product) {
	const { cartDispatch } = useCart();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		// Busque os produtos da API externa quando o componente for montado
		fetchProducts()
			.then(data => setProducts(data))
			.catch(error => console.error(error));
	}, []);

	const addToCart = (product: Product) => {
		cartDispatch({ type: 'ADD_TO_CART', item: { ...product, quantity: 1 } });
	};
	return (
		<>
			<div className="grid grid-cols-3 gap-4">
				{products.map(product => (
					<div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
						<h3 className="text-lg font-semibold mb-2">{product.name}</h3>
						<p className="text-gray-700">${product.price}</p>
						<button
							onClick={() => addToCart(product)}
							className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
						>
							Adicionar ao Carrinho
						</button>
					</div>
				))}
			</div>
		</>
	)
}