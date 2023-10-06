'use client'
import { useCart } from "@/contexts/CartContext";
// import { saveCartToApi } from "@/utils/api";

interface CartProps {

}
export function Cart(props: CartProps) {
	const { cartState, cartDispatch } = useCart();

	const removeFromCart = (id: number) => {
		cartDispatch({ type: 'REMOVE_FROM_CART', id });
	};

	const incrementQuantity = (id: number) => {
		cartDispatch({ type: 'INCREMENT_QUANTITY', id });
	};

	const decrementQuantity = (id: number) => {
		cartDispatch({ type: 'DECREMENT_QUANTITY', id });
	};

	const calculateSubtotal = () => {
		return cartState.cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const calculateTotal = () => {
		return calculateSubtotal();
	};

	// const handleCheckout = () => {
	// 	// Chame a função para salvar o carrinho na API quando o usuário finalizar a compra
	// 	saveCartToApi(cartState.cart)
	// 		.then(() => {
	// 			// Lógica adicional após o carrinho ser salvo na API
	// 		})
	// 		.catch(error => console.error(error));
	// };

	return (
		<>
			<div>
				<h2 className="my-6">Carrinho de Compras</h2>
				<table className="min-w-full">
					<thead>
						<tr>
							<th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Produto</th>
							<th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Preço</th>
							<th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Quantidade</th>
							<th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">Subtotal</th>
							<th className="px-6 py-3 bg-gray-200 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider"></th>
						</tr>
					</thead>
					<tbody>
						{cartState.cart.map(item => (
							<tr key={item.id}>
								<td className="px-6 py-4 whitespace-no-wrap">{item.name}</td>
								<td className="px-6 py-4 whitespace-no-wrap">${item.price}</td>
								<td className="px-6 py-4 whitespace-no-wrap">
									<button onClick={() => decrementQuantity(item.id)}>-</button>
									{item.quantity}
									<button onClick={() => incrementQuantity(item.id)}>+</button>
								</td>
								<td className="px-6 py-4 whitespace-no-wrap">${item.price * item.quantity}</td>
								<td className="px-6 py-4 whitespace-no-wrap">
									<button onClick={() => removeFromCart(item.id)}>Remover</button>
								</td>
							</tr>
						))}
					</tbody>
					<tfoot>
						<tr>
							<td colSpan={3}></td>
							<td className="px-6 py-4 whitespace-no-wrap font-bold">Subtotal:</td>
							<td className="px-6 py-4 whitespace-no-wrap">${calculateSubtotal()}</td>
						</tr>
						<tr>
							<td colSpan={3}></td>
							<td className="px-6 py-4 whitespace-no-wrap font-bold">Total:</td>
							<td className="px-6 py-4 whitespace-no-wrap">${calculateTotal()}</td>
						</tr>
					</tfoot>
				</table>
				<button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Finalizar Compra
				</button>
			</div>
		</>
	)
}