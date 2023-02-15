
const routes = [{
        path: '/main/category',
        name: "Category",
        component: () => import("../views/Category.vue"),
        meta: {
            requireAuth: true,
        },
    },
];

export default routes;
