import Vue from 'vue'

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

/**
 * @description VueLoading configuration
 */
Vue.use(VueLoading, {
    loader: 'dots',
    opacity: 0.2,
}, {
    // slots
})