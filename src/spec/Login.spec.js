import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "../store/useUserStore";
import LoginComponent from "../views/AdminView.vue"; // Замените на фактический путь
import { createRouter, createWebHistory } from "vue-router";

describe("Login", () => {
    let router, userStore;

    beforeEach(() => {
        const localStorageMock = (() => {
            let store = {};
            return {
                getItem: (key) => store[key] || null,
                setItem: (key, value) => (store[key] = value.toString()),
                removeItem: (key) => delete store[key],
                clear: () => (store = {}),
            };
        })();

        Object.defineProperty(global, "localStorage", {
            value: localStorageMock,
            writable: true,
        });

        setActivePinia(createPinia());
        userStore = useUserStore();

        router = createRouter({
            history: createWebHistory(),
            routes: [
                { name: "AdminPanel", path: "/login", component: LoginComponent },
                { name: "Main", path: "/", component: () => import("../views/MainView.vue") },
            ],
        });
    });

    it("log with invalid credentials", async () => {
        const wrapper = mount(LoginComponent, {
            global: {
                plugins: [createPinia(), router],
            },
        });
        await wrapper.find('#login').setValue("wrong");
        await wrapper.find('#password').setValue("wrong");
        await wrapper.find(".btn-login").trigger("click");
        expect(userStore.isLoggedIn).toBe(false);
    });
});
