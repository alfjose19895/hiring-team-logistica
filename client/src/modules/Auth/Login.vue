<script>
import loginService from '../Auth/services/loginService'
const { authLogin } = loginService()

export default {
    /**
     * @property component name
     */
    name: "Login",

    data: () => ({
        params: {},
        msgStatusText: ''
    }),

    methods: {
         /**
         * @description Consumes the auth login api
         */
        async authenticateLogin(){

            this.msgStatusText = ''
            const objLoader = this.$loading.show();
            const response = await authLogin(this.params)
            objLoader.hide()
            if (response.status == 200) {

                localStorage.setItem('user', JSON.stringify(response.data))
                this.$router.push({ name: "LayoutView" }).catch(() => {})
            }else{
                this.msgStatusText = response.statusText ? `[${ response.status }] ${ response.statusText}` : 'Error logging in'
            }
        },
    },
    created(){
        // this.params.email = 'jonathan@example.com'
        // this.params.password = 'password'
    }
};
</script>

<template>
    <section class="ftco-section">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-12 col-lg-10">
                    <div class="wrap d-md-flex">
                        <div class="img" style="background-image: url(https://www.dispatchtrack.com/hubfs/logistics-technology-trends.webp);"></div>
                        <div class="login-wrap p-4 p-md-5">
                            <div class="d-flex">
                                <div class="w-100">
                                    <h3 class="mb-4">Sign In</h3>
                                </div>
                            </div>
                            <form action="#" class="signin-form" data-bitwarden-watching="1">
                                <div class="form-group mb-3">
                                    <label class="label" for="name">E-mail</label>
                                    <input v-model="params.email" type="text" class="form-control" placeholder="E-mail" required="" />
                                </div>
                                <div class="form-group mb-3">
                                    <label class="label" for="password">Password</label>
                                    <input v-model="params.password" type="password" class="form-control" placeholder="Password" required="" />
                                </div>
                                <div class="form-group">
                                    <button type="button" @click="authenticateLogin" class="form-control btn btn-primary rounded submit px-3">Sign In</button>
                                </div>
                                <div class="form-group d-md-flex">
                                </div>
                            </form>
                            <p class="text-center">Not a member? <a data-toggle="tab" href="#signup">Sign Up</a></p>

                            <div class="text-center callout callout-danger" v-if="msgStatusText">
                                <span >{{ msgStatusText }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped src="./css/style.css"></style>
