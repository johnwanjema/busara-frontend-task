<template>
    <body>
        <div id="page-container" class="main-content-boxed side-trans-enabled">
            <!-- Main Container -->
            <main id="main-container" style="min-height: 476px;">
                <!-- Page Content -->
                <div class="bg-image" style="background-image: url('/work_with_us.png');">
                    <div class="row mx-0 bg-black-op">
                        <div class="hero-static col-md-6 col-xl-8 d-none d-md-flex align-items-md-end">
                            <div class="p-30 js-appear-enabled animated fadeIn" data-toggle="appear">
                                <p class="font-size-h3 font-w600 text-white">
                                    Our minds are far less independent than we would like to believe.
                                </p>
                                <p class="font-italic text-white-op">
                                    Copyright © <span class="js-year-copy js-year-copy-enabled">2021</span>
                                </p>
                            </div>
                        </div>
                        <div class="hero-static col-md-6 col-xl-4 d-flex align-items-center bg-white js-appear-enabled animated fadeInRight" data-toggle="appear" data-class="animated fadeInRight">
                            <div class="content content-full">
                                <!-- Header -->
                                <div class="px-30 py-10">
                                    <img src="/Busara_Logo.svg" alt="Busara Logo">
                                    <h4 class=" mt-30 mb-10">Welcome to Your Dashboard</h4>
                                    <h2 class="h5 font-w400 text-muted mb-0">Please sign in</h2>
                                </div>
                                <!-- END Header -->
    
                                <form class="px-30" @submit.prevent="login">
                                    <div class="form-group row" :class="error ? 'row is-invalid':''">
                                        <div class="col-12">
                                            <div class="form-material ">
                                                <input v-model="form.username" required type="email" class="form-control" id="login-username" name="login-username">
                                                <label for="login-username">Username</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row" :class="error ? 'row is-invalid':''">
                                        <div class="col-12">
                                            <div class="form-material ">
                                                <input v-model="form.password" required type="password" class="form-control" id="login-password" name="login-password">
                                                <label for="login-password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                   <div v-if="error" style="color:red" class=" animated fadeInDown">Invalid credentials</div>
                                   <br>
                                    <div class="form-group">
                                        <button type="submit" class="btn btn-sm btn-hero btn-alt-primary">
                                                                <i class="si si-login mr-10"></i> Sign In
                                                            </button>
                                    </div>
                                </form>
                                <!-- END Sign In Form -->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END Page Content -->
    
            </main>
            <!-- END Main Container -->
        </div>
    </body>
</template>

<script>
import Form from 'vform'
import { mapGetters, mapActions } from "vuex";

export default {
    data() {
        return {
            form: new Form({
                username: '',
                password: ''
            }),
            error:false
        }
    },
    methods: {
        login() {
            var querystring = require('querystring');

            const data = querystring.stringify({
                grant_type: 'password',
                'client_id': 'zVs3J7FZupB3TLPskQOy1xHLwYTRkzUSf2rdTDCu',
                'client_secret': 'Zv19oWmm416sTyjWT5Sx2r1gRwjWrXU3P5dWledQpYjxEvavS58SPtz03M8wvsgajaVLhcimmJIUUYUDad06V6HQosmPoj3TPRNjg7bgniQlooIwyFWfz8KfkM5Tdh7R',
                username: this.form.username,
                password: this.form.password,
            });
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'cache-control': "no-cache",
            };
            this.$axios.post(
                '/api/v1/oauth/token/',
                data,
                headers
            ).then(({ data }) => {
                // console.log(data);
                this.$store.commit("SET_TOKEN", data.access_token);
                this.$store.commit("SET_AUTHENTICATION", true);
                this.$router.push('/home');
            }).catch((error) => {
                // console.log(error)
                // console.log(error.message)
                this.error = true;
                this.form.password = '';
            });
        }
    }
}
</script>


