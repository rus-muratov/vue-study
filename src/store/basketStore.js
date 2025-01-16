import { defineStore } from "pinia";

export const useBasketStore = defineStore("basket", {
    state: () => ({
        orderData: JSON.parse(localStorage.getItem("orderData") || "[]"),
    }),
    getters: {
        count: (state) => state.orderData.length,
        totalPrice: (state) =>
            state.orderData.reduce((total, item) => total + item.price, 0),
    },
    actions: {
        addToOrder(item) {
            this.orderData.push(item);
            localStorage.setItem("orderData", JSON.stringify(this.orderData));

        },
        removeFromOrder(itemId) {
            this.orderData = this.orderData.filter((item) => item.id !== itemId);
            localStorage.setItem("orderData", JSON.stringify(this.orderData));
        },

        updateOrderData() {
            this.orderData = JSON.parse(localStorage.getItem("orderData") || "[]");
        }
    },
});
