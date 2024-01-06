import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import("@/views/Dashboard.vue"),
    },
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/categories',
        name: 'Categories',
        component: () => import("@/views/Categories.vue"),
    },
    {
        path: '/category/:name',
        name: 'Category',
        component: () => import("@/views/Category.vue"),
    },
    {
        path: '/moral-lesson',
        name: 'MoralLesson',
        component: () => import("@/views/MoralLesson.vue"),
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import("@/views/Detail.vue"),
    },
    {
        path: '/authors',
        name: 'Authors',
        component: () => import("@/views/Authors.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Auth/Login.vue"),
    },
    {
        path: '/password-reset/:token/:email',
        name: 'ForgotPassword',
        component: () => import('@/views/Auth/ForgotPassword'),
    },
    {
        path: '/auth/google/callback',
        name: 'Callback',
        component: () => import("@/views/Callback.vue"),
    },
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
