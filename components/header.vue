<template>
    <header id="page-header">
        <!-- Header Content -->
        <div class="content-header">
            <!-- Left Section -->
            <div class="content-header-section">
                <nuxt-link to="/home">
                    <img height="50px" src="/logo.png" alt="">
                </nuxt-link>
            </div>
            <!-- END Left Section -->
    
            <!-- Right Section -->
            <div class="content-header-section">
                <!-- User Dropdown -->
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-rounded btn-dual-secondary" id="page-header-user-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i class="fa fa-user d-sm-none"></i>
                                                <span class="d-none d-sm-inline-block">J. Smith</span>
                                                <i class="fa fa-angle-down ml-5"></i>
                                            </button>
                    <div class="dropdown-menu dropdown-menu-right min-width-200" aria-labelledby="page-header-user-dropdown">
                        <h5 class="h6 text-center py-10 mb-5 border-b text-uppercase">User</h5>
                        <nuxt-link class="dropdown-item" to="/profile">
                            <i class="si si-user mr-5"></i> Profile
                        </nuxt-link>
    
    
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="op_auth_signin.html">
                                                    <i class="si si-logout mr-5"></i> Sign Out
                                                </a>
                    </div>
                </div>
                <!-- END User Dropdown -->
    
            </div>
            <!-- END Right Section -->
        </div>
        <!-- END Header Content -->
    
        <!-- Header Search -->
        <div id="page-header-search" class="overlay-header">
            <div class="content-header content-header-fullrow">
                <form action="be_pages_generic_search.html" method="post">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <!-- Close Search Section -->
                            <!-- Layout API, functionality initialized in Template._uiApiLayout() -->
                            <button type="button" class="btn btn-secondary" data-toggle="layout" data-action="header_search_off">
                                                        <i class="fa fa-times"></i>
                                                    </button>
                            <!-- END Close Search Section -->
                        </div>
                        <input type="text" class="form-control" placeholder="Search or hit ESC.." id="page-header-search-input" name="page-header-search-input">
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-secondary">
                                                        <i class="fa fa-search"></i>
                                                    </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <!-- END Header Search -->
    
        <!-- Header Loader -->
        <!-- Please check out the Activity page under Elements category to see examples of showing/hiding it -->
        <div id="page-header-loader" class="overlay-header bg-primary">
            <div class="content-header content-header-fullrow text-center">
                <div class="content-header-item">
                    <i class="fa fa-sun-o fa-spin text-white"></i>
                </div>
            </div>
        </div>
        <!-- END Header Loader -->
    </header>
</template>

<script>
import axios from  'axios'
export default {
    data() {
        return {
            user: {}
        }
    },
    methods: {
        getAuthenticatedUser() {
            axios.get("http://fullstack-role.busara.io/api/v1/users/current-user", {
                    headers: {
                        'Accept-Language': 'en-US,en;q=0.8',
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(({ data }) => {
                   console.log(data);
                   //set user
                }).catch((error) => {
                    // console.log(error)
                })
        }
    },
    mounted() {
        this.getAuthenticatedUser();
    }
}
</script>