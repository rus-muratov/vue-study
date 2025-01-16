import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useBasketStore } from "../store/basketStore";
import Card from "../components/Card.vue";
import { createRouter, createWebHistory } from "vue-router";

describe("Add to Cart", () => {
    let basketStore;
    let router;
    let pinia;

    beforeEach(() => {
        pinia = createPinia();
        setActivePinia(pinia);
        basketStore = useBasketStore();


        vi.spyOn(basketStore, "addToOrder").mockImplementation((item) => {
            basketStore.orderData.push(item);
        });


        router = createRouter({
            history: createWebHistory(),
            routes: [
                { name: "Main", path: "/", component: { template: "<div>Main View</div>" } },
            ],
        });

        router.push("/");
    });

    it("adds to cart", async () => {
        const itemMock = {
            id: 1,
            title: "Test Product",
            price: 100,
            description: "Test description",
            image: "test-image.jpg",
            rate: 4.5,
            count: 10,
        };

        const wrapper = mount(Card, {
            props: { item: itemMock },
            global: {
                plugins: [pinia, router],
            },
        });


        await router.isReady();

        const addButton = wrapper.find(".add-btn");
        expect(addButton.exists()).toBe(true);
        expect(addButton.text()).toBe("Add");

        await addButton.trigger("click");

        await flushPromises();


        expect(basketStore.addToOrder).toHaveBeenCalledTimes(1);
        expect(basketStore.addToOrder).toHaveBeenCalledWith(expect.objectContaining(itemMock));
    });
});
