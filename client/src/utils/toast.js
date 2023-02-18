export function toastMessage(timeout=2000) {
    const toastMessage = {
        position: "top-right",
        timeout: timeout,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
    };
    return toastMessage;
}