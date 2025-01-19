import { createRouter, createWebHistory } from 'vue-router'
import Catalog from '../components/Catalog.vue'
import {useUserStore} from "../store/useUserStore.js";



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: () => import('../views/MainView.vue'),
            alias: '/main',
        },
        {
            path: '/catalog',
            name: 'Catalog',
            component: Catalog
        },
        {
            path: '/catalog/:id',
            name: 'CatalogItem',
            props: (route) => ({id: route.params.id}),
            component: () => import('../views/DetailProductView.vue'),
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../views/AdminView.vue')
        },

        {
            path: '/basket',
            name: 'Basket',
            component: () => import('../views/BasketView.vue')
        },

    ],
})

router.beforeEach(async (to, from) => {
    const userStore = useUserStore();
    if (
        !userStore.isLoggedIn &&
        to.name === 'Basket'
    ) {

        return { name: 'Login' }
    }
})

export default router