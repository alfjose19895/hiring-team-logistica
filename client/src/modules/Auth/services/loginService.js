import { apiAuthLogin } from '../endpoint/urlApi'

import { postHttp } from '@/utils/http'

/**
 * @returns { Functions } authLogin
 */
const loginService = () => {

    /**
     * @description consumes the user authentication service
     * @returns { Object } api response
     */
    const authLogin = async ( request ) => {

        const response = await postHttp(apiAuthLogin, request)
        return response
    }

    return {
        authLogin,
    }
}

export default loginService