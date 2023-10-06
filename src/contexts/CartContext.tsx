// contexts/CartContext.tsx
'use client'
import React, { createContext, useContext, useReducer, useEffect, useState, Dispatch } from 'react';

// Defina o formato de um item do carrinho
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Defina o formato do estado do carrinho
interface CartState {
  cart: CartItem[];
}

// Ações disponíveis para o carrinho
type CartAction =
  | { type: 'ADD_TO_CART'; item: CartItem }
  | { type: 'REMOVE_FROM_CART'; id: number }
  | { type: 'INCREMENT_QUANTITY'; id: number }
  | { type: 'DECREMENT_QUANTITY'; id: number }
  | { type: 'SET_CART'; cart: CartItem[] }; // Adicione a ação "SET_CART" ao tipo

// Função Reducer para gerenciar o estado do carrinho
function cartReducer(state: CartState, action: CartAction): CartState {
  // switch (action.type) {
  //   case 'ADD_TO_CART':
  //     // Verifique se o item já existe no carrinho
  //     const existingItem = state.cart.find(item => item.id === action.item.id);

  //     if (existingItem) {
  //       return {
  //         ...state,
  //         cart: state.cart.map(item =>
  //           item.id === action.item.id
  //             ? { ...item, quantity: item.quantity + 1 }
  //             : item
  //         ),
  //       };
  //     } else {
  //       return {
  //         ...state,
  //         cart: [...state.cart, { ...action.item, quantity: 1 }],
  //       };
  //     }

  //   case 'REMOVE_FROM_CART':
  //     return {
  //       ...state,
  //       cart: state.cart.filter(item => item.id !== action.id),
  //     };

  //   case 'INCREMENT_QUANTITY':
  //     return {
  //       ...state,
  //       cart: state.cart.map(item =>
  //         item.id === action.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       ),
  //     };

  //   case 'DECREMENT_QUANTITY':
  //     return {
  //       ...state,
  //       cart: state.cart.map(item =>
  //         item.id === action.id
  //           ? { ...item, quantity: Math.max(1, item.quantity - 1) }
  //           : item
  //       ),
  //     };

  //   default:
  //     return state;
  // }
  switch (action.type) {
    case 'ADD_TO_CART':
      // Lógica para adicionar um item ao carrinho
      const updatedCartAdd = [...state.cart, action.item];
      saveCartToLocalStorage(updatedCartAdd);
      return { ...state, cart: updatedCartAdd };

    case 'REMOVE_FROM_CART':
      // Lógica para remover um item do carrinho
      const updatedCartRemove = state.cart.filter(item => item.id !== action.id);
      saveCartToLocalStorage(updatedCartRemove);
      return { ...state, cart: updatedCartRemove };

    case 'INCREMENT_QUANTITY':
      // Lógica para incrementar a quantidade de um item no carrinho
      const updatedCartIncrement = state.cart.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      saveCartToLocalStorage(updatedCartIncrement);
      return { ...state, cart: updatedCartIncrement };

    case 'DECREMENT_QUANTITY':
      // Lógica para decrementar a quantidade de um item no carrinho
      const updatedCartDecrement = state.cart.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      saveCartToLocalStorage(updatedCartDecrement);
      return { ...state, cart: updatedCartDecrement };

    case 'SET_CART':
      // Atualize o carrinho com os dados do localStorage
      return { ...state, cart: action.cart };

    default:
      return state;
  }
}

// Contexto do Carrinho
const CartContext = createContext<{
  cartState: CartState;
  cartDispatch: React.Dispatch<CartAction>;
} | null>(null);

// Provedor do Contexto do Carrinho
export const CartProvider = ({ children }: any) => {
  // const [cartState, cartDispatch] = useReducer(cartReducer, { cart: [] });
  // const [cartRecovered, setCartRecovered] = useState(false);
  const [cartState, cartDispatch] = useReducer(cartReducer, { cart: getCartFromLocalStorage() });

  // Recupere o carrinho do localStorage quando o componente for montado
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      cartDispatch({ type: 'SET_CART', cart: JSON.parse(savedCart) });
    }
  }, []);

  // Salve o carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    saveCartToLocalStorage(cartState.cart);
  }, [cartState.cart]);

  return (
    <CartContext.Provider value={{ cartState, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );

  // // Recupere o carrinho do localStorage quando o componente for montado
  // useEffect(() => {
  //   console.log("Entrando para pegar Item em Local Storage")
  //   if (!cartRecovered) {
  //     const savedCart = localStorage.getItem('cart-item');
  //     if (savedCart) {
  //       cartDispatch({ type: 'SET_CART', cart: JSON.parse(savedCart) });
  //     }
  //     setCartRecovered(true);
  //   }
  // }, [cartRecovered]);

  // // Salve o carrinho no localStorage sempre que ele for atualizado
  // useEffect(() => {
  //   console.log("Salvando Item em Local Storage")
  //   localStorage.setItem('cart-item', JSON.stringify(cartState.cart));
  // }, [cartState.cart]);

  // return (
  //   <CartContext.Provider value={{ cartState, cartDispatch }}>
  //     {children}
  //   </CartContext.Provider>
  // );
};




// Hook personalizado para acessar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

// Função para recuperar o carrinho do localStorage
const getCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

// Função para salvar o carrinho no localStorage
const saveCartToLocalStorage = (cart: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};
