<template>
    <!-- <body> -->
        <div id="page-container" class="sidebar-o enable-page-overlay side-scroll page-header-modern main-content-boxed side-trans-enabled">
            <div id="page-overlay"></div>
            <!-- Header -->
            <nav-header />
            <!-- END Header -->
    
            <!-- Main Container -->
            <main id="main-container" style="min-height: 146px;">
    
                <!-- Page Content -->
                <div class="content">
                    <!-- Material Design -->
                    <h2 class="content-heading">User Details</h2>
                    <div class="row">
                        <div class="col-md-12">
                            <!-- Static Labels -->
                            <div class="block">
                                <div class="block-content">
                                    <form action="be_forms_elements_material.html" method="post" onsubmit="return false;">
                                        <div class="form-group row">
                                            <div class="col-md-6">
                                                <div class="form-material">
                                                    <input type="text" class="form-control" id="material-text" name="material-text" placeholder="Please enter your first name">
                                                    <label for="material-text">First Name</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-material">
                                                    <input type="text" class="form-control" id="material-text" name="material-text" placeholder="Please enter your last name">
                                                    <label for="material-text">Last Name</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-material">
                                                    <input type="email" class="form-control" id="material-password" name="material-password" placeholder="Please enter your email">
                                                    <label for="material-password">Email</label>
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-material">
                                                    <input type="number" class="form-control" id="material-password" name="material-password" placeholder="Please enter your Phone Number">
                                                    <label for="material-password">Phone Number</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-12">
                                                <div class="form-material">
                                                    <textarea class="form-control" id="material-textarea-large" name="material-textarea-large" rows="8" placeholder="Please add your bio"></textarea>
                                                    <label for="material-textarea-large">Bio</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="form-group row">
                                            <div class="col-md-9">
                                                <button type="submit" class="btn btn-alt-primary">Submit</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <!-- END Static Labels -->
                        </div>
                    </div>
                    <!-- END Material Design -->
                </div>
                <!-- END Page Content -->
    
            </main>
            <!-- END Main Container -->
    
            <!-- Footer -->
            <foot />
            <!-- END Footer -->
        </div>
    
    <!-- </body> -->
</template>

<script>
import nav from "~/components/header.vue";
import foot from "~/components/footer.vue";

export default {
    components: {
        'nav-header': nav,
        foot,
    },
    data(){
        return{

        }
    },
    methods:{
        async getFormInputs() {
            await this.$axios.get("/api/v1/users/current-user", {
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
    mounted(){
        this.getFormInputs();
        // this.$swal('hello world')
    }
};
</script>