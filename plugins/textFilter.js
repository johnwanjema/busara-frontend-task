import Vue from 'vue'

export default () => {
    Vue.filter('uppercaseText', function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    });
}