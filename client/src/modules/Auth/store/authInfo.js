import router from "../../../router";

const authInfo = () => {
    /**
     * @description Validates the existence of the token user in the useAuth object to redirect to the LayoutView or login page.
     */
    const redirectionToLoginOrLayout = ( routeActual ) => {
        if (localStorage.getItem("user") == null) {
            return router.push({ name: "Login" }).catch(() => {});
        }
        // else {
        //     return router.push({ name: routeActual }).catch(() => {});
        // }
    };

    return {
        redirectionToLoginOrLayout,
    };
};

export default authInfo;
