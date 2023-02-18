import Vue from "vue";
import VueRouter from "vue-router";

import LayoutView from "../views/LayoutView.vue";
import Login from "../modules/Auth/Login.vue";

//routes
import Category from "../modules/ProductsMain/Category/router";
import Product from "../modules/ProductsMain/Products/router";
import ProductChangeHistory from "../modules/ProductsMain/ProductChangeHistory/router";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: "/login",
            name: "Login",
            component: Login,
        },
        {
            path: "/",
            name: "LayoutView",
            component: LayoutView,
            meta: {
                requireAuth: true,
            },
            children: [
                ...Category,
                ...Product,
                ...ProductChangeHistory,
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    const routeAuth = to.matched.some((record) => record.meta.requireAuth);
    routeAuth && localStorage.getItem('user') === null ? next({ path: "/login" }) : next();
});

router.beforeEach((to, from, next) => {
    const routeName = to.name ? `- ${to.name}` : '';
    document.title = `${ import.meta.env.VITE_APP_TITLE } ${ routeName }`
    next()
})

export default router;
