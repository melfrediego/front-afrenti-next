// utils/api.ts
import Product from '../types/types'; // Crie um tipo Product para representar os produtos

const API_BASE_URL = 'https://fakestoreapi.com/products?limit=10'; // Substitua pela URL da sua API externa

export async function fetchProducts(): Promise<Product[]> {
    try {
        const response = await fetch(API_BASE_URL);

        if (!response.ok) {
            throw new Error('Erro ao buscar produtos');
        }

        const data = await response.json();
        return data as Product[];
    } catch (error) {
        throw new Error('Erro ao buscar produtos: ' + error.message);
    }
}
