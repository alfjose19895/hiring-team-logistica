<script>
import auth from './modules/Auth/store/authInfo'
const { redirectionToLoginOrLayout } = auth()

export default {
    /**
     * @property component name
     */
    name: "App",

    computed: {
        /**
         * @description gets the current route
         */
        currentRouteName() {
            return this.$route.name;
        },
    },
    created(){
        redirectionToLoginOrLayout( this.currentRouteName )
    },

};
</script>

<template>
    <router-view />
</template>

<style lang="css" src="./assets/base.css"></style>



