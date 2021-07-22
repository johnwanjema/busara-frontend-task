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
                                <form-wizard shape="circle" color="#3498db" ref="wizard" :hide-buttons="true">
                                    <h3 slot="title"><u>Busara Survey</u></h3>
                                    <p slot="subtitle">Complete setting up your account</p>
                                    <!-- <div > -->
                                    <tab-content v-for="(page,i) in pages" :key="i" :title="page.name">
                                        <!-- <h4>{{page.name}} </h4> -->
                                        <form class="js-validation-bootstrap" @submit.prevent="goNext(i)">
                                            <div v-if="page.sections">
                                                <div class="form-group row">
                                                    <div v-for="(question,i) in page.sections[0].questions" :key="i" class="col-md-6">
                                                        <div v-if="question.widget == 'select'">
                                                            <label class="col-12" for="example-select">Select {{question.column_match }}</label>
                                                            <select v-model="answers[i]" @change="setAnswers(question.column_match,answers[i],question.id)" class="form-control" :id="'example-select ' + i" name="example-select" required>
                                                                    <option v-for="(select,i)  in question.q_options" :key="i" :value="select.id" >{{select.name}}</option>
                                                            </select>
                                                        </div>
                                                        <div v-else class="form-material">
                                                            <input v-model="answers[i]" @change="setAnswers(question.column_match,answers[i],question.id)" type="text" class="form-control" :id="'material-text ' + i" name="material-text" :placeholder="'Enter '+question.column_match" required>
                                                            <label v-if="question.column_match == 'contact'" for="material-text">{{question.column_match | uppercaseText}}  format +254721000000</label>
                                                            <label v-else for="material-text">{{question.column_match | uppercaseText}}</label>

                                                        </div>
                                                        <div v-if="error && question.column_match == 'contact' " style="color:red" class=" animated fadeInDown">Invalid phone number format use +254721000000</div>
                                                    </div>
                                                </div>
                                                <div class="form-group row">
                                                    <div class="col-md-11">
                                                    </div>
                                                    <div class="col-md-1" style="float:right">
                                                        <button v-if="i == pages.length - 1" type="submit" class="btn btn-alt-primary">Finish</button>
                                                        <button v-else type="submit" class="btn btn-alt-primary">Next</button>
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
            majibu: [],
            survey: {
                ans: [],
                end_time: "",
                local_id: 0,
                location: {
                    "accuracy": 0,
                    "lat": 0,
                    "lon": 0
                },
                start_time: "",
                survey_id: ""
            }
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
                    this.survey.start_time = new Date();
                    this.survey.survey_id = data.forms[0].id;
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
                    // console.log(this.majibu.findIndex(q_id => q_id))
                    for (var i = 0; i < this.majibu.length; i++) {
                        if (this.majibu[i].q_id === q_id) {
                            // console.log(this.majibu[i].q_ans);
                            this.majibu[i].q_ans = q_ans;
                            // console.log(this.majibu[i].q_ans);
                        }
                    }

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
        goNext(i) {
            if (i !== this.pages.length - 1) {
                this.$refs.wizard.nextTab();
            } else {
                this.submitSurvey();
            }
        },
        async submitSurvey() {
            // // this.$swal('form complete');
            this.survey.end_time = new Date();
            this.survey.ans = this.majibu;
            var data = [this.survey]
            // console.log(data);
            await this.$axios.post("api/v1/recruitment/answers/submit/", data, {
                    headers: {
                        Authorization: 'Bearer ' + this.token,
                    }
                })
                .then(({ data }) => {
                    // console.log('message ni hii buuda'+data.message);
                    this.error = false;
                    if (data.message == 'details saved successfully') {
                        this.$swal({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Survey submitted',
                            showConfirmButton: true,
                        });
                        this.survey.ans = [];   
                        this.$refs.wizard.navigateToTab(0)
                    }
                }).catch((error) => {
                    console.log(error);
                    this.error = true;
                    this.$refs.wizard.navigateToTab(0)
                })
        }
    },
    mounted() {
        this.getFormInputs();
    }
};
</script>