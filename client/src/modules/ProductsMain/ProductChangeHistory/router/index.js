
const routes = [{
        path: '/main/product-change-history',
        name: "ProductChangeHistory",
        component: () => import("../views/ProductChangeHistory.vue"),
        meta: {
            requireAuth: true,
        },
    },
];

export default routes;
