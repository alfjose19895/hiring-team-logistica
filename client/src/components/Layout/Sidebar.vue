<script>
    export default {
        /**
         * @property component name
         */
        name: "Sidebar",

        data: () => ({
            user: {},
        }),

        created() {
            if (localStorage.getItem("user") != null) {
                const { user } = JSON.parse(localStorage.getItem("user"));
                this.user = user.name;
            }
        },
    };
</script>

<template>
    <div class="sidebar">
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
            <div class="image">
                <img :src="`https://ui-avatars.com/api/?name=${user}`" class="img-circle elevation-2" alt="User Image" />
            </div>
            <div class="info">
                <router-link :to="{ name: 'LayoutView' }" class="d-block">
                    {{ user }}
                </router-link>
            </div>
        </div>

        <nav class="sidebar mt-2">
            <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <!-- <li class="nav-item menu-open">
                <a href="#" class="nav-link active">
                    <i class="nav-icon fas fa-copy"></i>
                    <p>
                        Layout Options
                        <i class="fas fa-angle-left right"></i>
                        <span class="badge badge-info right">6</span>
                    </p>
                </a>
            </li> -->

                <li class="nav-header">PRODUCTS</li>
                <li class="nav-item">
                    <router-link :to="{ name: 'Category' }" class="nav-link">
                        <i class="fas fa-circle nav-icon"></i>
                        <p>Category</p>
                    </router-link>
                    <router-link :to="{ name: 'Products' }" class="nav-link">
                        <i class="fas fa-circle nav-icon"></i>
                        <p>Product</p>
                    </router-link>
                    <router-link :to="{ name: 'ProductChangeHistory' }" class="nav-link">
                        <i class="fas fa-circle nav-icon"></i>
                        <p>Product Change History</p>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>
