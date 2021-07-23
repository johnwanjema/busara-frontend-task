import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        plugins: [createPersistedState()],
        state: {
            token: '',
            isAuthenticated: false,
        },
        getters: {
            token: state => state.token,
            isAuthenticated: state => state.isAuthenticated,
        },
        mutations: {
            SET_TOKEN: (state, token) => {
                state.token = token
            },
            SET_AUTHENTICATION: (state, value) => {
                state.isAuthenticated = value
            },
        },
        actions: {
        }
    })
}   

export default store;