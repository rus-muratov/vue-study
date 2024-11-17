const API_URL = 'https://fakestoreapi.com/products';

export async function getProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetch :', error);
        throw error;
    }
}