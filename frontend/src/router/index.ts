import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home.vue";

const routes: RouteRecordRaw[] = [
    {
        path: "/:pathMatch(.*)*",
        name: "404Page",
        component: () => import("../views/404Page.vue"),
    },
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/about-this-website",
        name: "about-this-website",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/AboutWebsite.vue"),
    },
    {
        path: "/interactive-projects",
        name: "interactive-projects",
        component: () => import("../views/InteractiveDemos.vue"),
    },
    {
        path: "/gradquote",
        name: "gradquote",
        component: () => import("../views/GradQuote.vue"),
    },
    {
        path: "/github",
        name: "github",
        component: null,
        children: [],
        beforeEnter: () => {
            window.location.href = "https://github.com/justinburrill";
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
