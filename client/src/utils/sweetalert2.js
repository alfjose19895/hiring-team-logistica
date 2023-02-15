
export function setSwallWarning(title, text = null) {
    const warning = {
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Confirm!",
        cancelButtonText: "Cancel",
    };
    return warning;
}