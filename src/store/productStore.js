import { defineStore } from 'pinia';
import { apiRequest } from "../api/api";

const apiProduct = import.meta.env.VITE_PRODUCT_API_URL;

export const useProductStore = defineStore('product', {
    state: () => ({
        items: [],
        order: JSON.parse(localStorage.getItem('orderData') || '[]'),
    }),
    actions: {
        async getProducts() {
            this.items = await apiRequest(apiProduct);
        },
        addProduct(product) {
            this.items.push(product);
        },
        addToOrder(product) {
            if (!this.order.some(item => item.id === product.id)) {
                this.order.push(product);
                localStorage.setItem('orderData', JSON.stringify(this.order));
            } else {
                console.warn("Product already exists in the order.");
            }
        },
        removeFromOrder(productId) {
            const index = this.order.findIndex(item => item.id === productId);
            if (index !== -1) {
                this.order.splice(index, 1);
                localStorage.setItem('orderData', JSON.stringify(this.order));
            } else {
                console.warn("Product not found in the order.");
            }
        },
        toggleOrder(product, add) {
            if (add) {
                this.addToOrder(product);
            } else {
                this.removeFromOrder(product.id);
            }
        },
    },
});
