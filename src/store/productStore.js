import { defineStore } from 'pinia';
import { apiRequest } from "../api/api";

const apiProduct = import.meta.env.VITE_PRODUCT_API_URL;

export const useProductStore = defineStore('product', {
    state: () => ({
        items: [], // Список продуктов
        order: JSON.parse(localStorage.getItem('orderData') || '[]'), // Заказ, загружаемый из localStorage
    }),
    actions: {
        async getProducts() {
            this.items = await apiRequest(apiProduct); // Загрузка продуктов
        },
        addProduct(product) {
            this.items.push(product); // Добавление продукта в список
        },
        addToOrder(product) {
            // Проверяем, есть ли уже продукт в заказе
            if (!this.order.some(item => item.id === product.id)) {
                this.order.push(product);
                localStorage.setItem('orderData', JSON.stringify(this.order));
            } else {
                console.warn("Product already exists in the order.");
            }
        },
        removeFromOrder(productId) {
            // Находим индекс продукта в заказе
            const index = this.order.findIndex(item => item.id === productId);
            if (index !== -1) {
                this.order.splice(index, 1);
                localStorage.setItem('orderData', JSON.stringify(this.order));
            } else {
                console.warn("Product not found in the order.");
            }
        },
        toggleOrder(product, add) {
            // Добавление или удаление продукта в зависимости от флага
            if (add) {
                this.addToOrder(product);
            } else {
                this.removeFromOrder(product.id);
            }
        },
    },
});
