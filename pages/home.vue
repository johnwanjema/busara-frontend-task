<template>
    <!-- <body> -->
    <div id="page-container" class="sidebar-o enable-page-overlay side-scroll page-header-modern main-content-boxed side-trans-enabled">
        <div id="page-overlay"></div>
        <!-- Header -->
        <nav-header />
        <!-- END Header -->
    
        <!-- Main Container -->
        <main id="main-container" style="min-height: 146px;">
            <div class="content">
                <div class="row">
                    <div class="col-md-12">
                        <!-- Static Labels -->
                        <div class="block">
                            <div class="block-content">
                                <form-wizard shape="circle" color="#3498db" ref="wizard">
                                    <h2 slot="title">Welcome back</h2>
                                    <p slot="subtitle">Complete setting up your account</p>
                                    <!-- <div > -->
                                    <tab-content v-for="(page,i) in pages" :key="i" :title="page.name">
                                        <h4>{{page.name}} </h4>
                                        <form action="be_forms_elements_material.html" method="post" onsubmit="return false;">
                                            <div v-if="page.sections">
                                                <div class="form-group row">
                                                    <div v-for="(question,i) in page.sections[0].questions" :key="i" class="col-md-6">
                                                        <div v-if="question.widget == 'select'">
                                                            <label class="col-12" for="example-select">Select</label>
                                                            <select class="form-control" id="example-select" name="example-select">
                                                                    <option v-for="(select,i) in question.q_options" :key="i" :value="select.name">{{select.name}}</option>
                                                                </select>
                                                        </div>
                                                        <div v-else class="form-material">
                                                            <input v-model="answers[i]" @change="setAnswers(question.column_match,answers[i],question.id)" type="text" class="form-control" id="material-text" name="material-text" :placeholder="question.error_message">
                                                            <label for="material-text">{{question.column_match | uppercaseText}}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                        <!-- <hr> -->
                                    </tab-content>
                                    <!-- </div> -->
                                </form-wizard>
    
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
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import { FormWizard, TabContent } from 'vue-form-wizard'
import { mapGetters } from 'vuex'

export default {
    components: {
        'nav-header': nav,
        foot,
        FormWizard,
        TabContent
    },
    data() {
        return {
            pages: [{}],
            error: false,
            answers: [],
            majibu: []
        }
    },
    computed: {
        ...mapGetters(['token']),
    },
    methods: {
        async getFormInputs() {
            await this.$axios.get("/api/v1/recruitment/forms/?node_type=Both", {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    }
                })
                .then(({ data }) => {
                    this.pages = data.forms[0].pages;
                }).catch((error) => {
                    // console.log(error)
                })
        },
        setAnswers(column_match, q_ans, q_id) {
            // console.log(q_id)
            if (this.majibu.length === 0) {
                this.majibu.push({
                    column_match: column_match,
                    q_ans: q_ans,
                    q_id: q_id
                });
            } else {
                //check if answer exists already & update

                if (this.checkIfInArray(this.majibu, { q_id: q_id })) {
                    console.log(q_id)
                    console.log(this.majibu)
                    // console.log(this.majibu.findIndex(q_id => q_id))

                    for (var i = 0; i < this.majibu.length; i++) {
                        if (this.majibu[i].q_id === q_id) {
                            console.log(this.majibu[i].q_ans);
                            this.majibu[i].q_ans = q_ans;
                            console.log(this.majibu[i].q_ans);
                        }
                    }

                    // var index = this.majibu.findIndex(q_id => q_id);
                    // //update at this index
                    // //Update object's name property.
                    // this.majibu[index].q_ans = q_ans;
                } else {
                    //if not in array push
                    this.majibu.push({
                        column_match: column_match,
                        q_ans: q_ans,
                        q_id: q_id
                    });
                }
            };
            // console.log(this.majibu);
        },
        checkIfInArray(array, element) {
            for (var i = 0; i < array.length; i++) {
                if (array[i].q_id === element.q_id) {
                    return true;
                }
            }
            return false;
        },
    },
    beforeMount() {
        this.getFormInputs();
        // this.$swal('hello world')
    }
};
</script>