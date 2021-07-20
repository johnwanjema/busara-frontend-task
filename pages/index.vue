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
                                    Get Inspired and Create.
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
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <div class="form-material floating">
                                                <input required type="text" class="form-control" id="login-username" name="login-username">
                                                <label for="login-username">Username</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <div class="form-material floating">
                                                <input required type="password" class="form-control" id="login-password" name="login-password">
                                                <label for="login-password">Password</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <div class="col-12">
                                            <div class="custom-control custom-checkbox">
                                                <input type="checkbox" class="custom-control-input" id="login-remember-me" name="login-remember-me">
                                                <label class="custom-control-label" for="login-remember-me">Remember Me</label>
                                            </div>
                                        </div>
                                    </div>
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
export default {
    data() {
        return {
            Form : new Form({
                id:'',
                passoword:''
            })
        }
    },
    methods: {
        login() {
            console.log('login')
        }
    }
}
</script>


