import Vue from "vue";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

/**
 * @description VueSweetalert2 configuration
 */
const options = {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674",
    customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
    reverseButtons: true,
};

Vue.use(VueSweetalert2, options);