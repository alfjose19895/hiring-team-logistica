<script>
import { setSwallWarning } from "@/utils/sweetalert2";

export default {
    /**
     * @property component name
     */
    name: "Navbar",

    methods: {
        logout() {
            this.$swal(setSwallWarning(`<h4>¿Confirm Log Out?</h4>`, "")).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    setTimeout(() => this.$router.push({ name: "Login" }), 1000);
                }
            });
        },
    },
};
</script>

<template>
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
        </ul>

        <!-- Right navbar links -->
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                    <i class="fas fa-expand-arrows-alt"></i>
                </a>
            </li>

            <li @click="logout" class="nav-item">
                <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                    <i class="fas fa-sign-out-alt" ></i>
                </a>
            </li>
        </ul>
    </nav>
</template>
