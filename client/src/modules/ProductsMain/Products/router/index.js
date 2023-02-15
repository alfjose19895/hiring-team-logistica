
const routes = [{
        path: '/main/products',
        name: "Products",
        component: () => import("../views/Products.vue"),
        meta: {
            requireAuth: true,
        },
    },
];

export default routes;
