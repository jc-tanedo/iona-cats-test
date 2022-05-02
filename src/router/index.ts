import { createRouter, createWebHistory } from 'vue-router';
import CatList from '../views/CatList.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'cat-list',
            component: CatList,
        },
        {
            path: '/details/:catId',
            name: 'cat-details',
            component: () => import('../views/CatDetails.vue')
        }
    ]
});

export default router;
