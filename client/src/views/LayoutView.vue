<script>
    import Footer from "../components/Layout/Footer.vue";
    import Sidebar from "../components/Layout/Sidebar.vue";
    import Navbar from "../components/Layout/Navbar.vue";

    export default {
        /**
         * @property component name
         */
        name: "LayoutView",

        components: {
            Footer,
            Sidebar,
            Navbar,
        },
    };
</script>

<template>
    <div class="wrapper">
        <Navbar />

        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <router-link :to="{ name: 'LayoutView' }" class="brand-link elevation-4">
                <img src="https://ui-avatars.com/api/?name=TeamLogistics" alt="TeamLogistics Logo" class="brand-image img-circle elevation-3" style="opacity: 0.8;" />
                <span class="brand-text font-weight-light">TeamLogistics</span>
            </router-link>

            <!-- <div class="sidebar">
                <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div class="image">
                        <img :src="`https://ui-avatars.com/api/?name=${user}`" class="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div class="info">
                        <router-link :to="{ name: 'LayoutView' }" class="d-block">
                            {{ user }}
                        </router-link>
                    </div>
                </div> -->

            <Sidebar />
            <!-- </div> -->
        </aside>

        <div class="content-wrapper">
            <section class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <router-view />
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <Footer />
    </div>
</template>
