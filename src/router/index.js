import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

export const RouterMap = [
    { path: '/', component: () => import('@/views/main')},
    { path: '/success', component: () => import('@/views/success')},
];

const router = new VueRouter({
    scrollBehavior: () => ({ y: 0}),
    routes: RouterMap
});

export default router
