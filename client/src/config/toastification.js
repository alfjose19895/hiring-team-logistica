import Vue from "vue";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

/**
 * @description toastification configuration
 */
Vue.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 6,
    newestOnTop: true,
    filterBeforeCreate: (toast, toasts) => {
        if (toasts.filter((t) => t.type === toast.type).length !== 0) {
            // Returning false discards the toast
            return false;
        }
        // You can modify the toast if you want
        return toast;
    },
});

Vue.use(Toast);