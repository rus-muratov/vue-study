import { describe, expect, it, vi, beforeEach } from "vitest";
import { createPinia, setActivePinia, defineStore } from "pinia";
const apiProduct = import.meta.env.VITE_PRODUCT_API_URL;

vi.mock("../api/api", () => ({
    apiRequest: vi.fn(),
}));

import { apiRequest } from "../api/api";

describe("fetchProducts", () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it("fetches products and updates the state", async () => {
        const productsMock = [
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
            },
            { id: 2, title: "Mens Casual Premium Slim Fit T-Shirts ", price: 22.3 },
        ];

        apiRequest.mockResolvedValue({ data: productsMock });

        const useProductStore = defineStore("product", {
            state: () => ({
                items: [],
            }),
            actions: {
                async getProducts() {
                    const response = await apiRequest(apiProduct);
                    this.items = response.data;
                },
            },
        });

        const productStore = useProductStore();

        await productStore.getProducts();

        expect(productStore.items).toEqual(productsMock);
    });
});
