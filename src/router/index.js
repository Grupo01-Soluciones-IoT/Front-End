import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    redirect: '/auth/login',  // Redirige al login cuando la ruta es '/'
                },
                {
                    path: '/dashboard',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/profile/edit-profile',
                    name: 'EditProfile',
                    component: () => import('@/views/harvest/EditProfile.vue')
                },
                {
                    path: '/harvest',
                    name: 'harvest',
                    component: () => import('@/views/harvest/CreateHarvestView.vue')
                },
                {
                    path: '/harvest/news',
                    name: 'tree',
                    component: () => import('@/views/harvest/NewsView.vue')
                }
            ]
        },
        {
            path: '/profile/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        }
    ]
});

export default router;
