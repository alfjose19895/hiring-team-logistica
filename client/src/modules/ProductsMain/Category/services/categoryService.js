import { apiProductCategorizationV1 } from '../endpoint/urlApi'
import { getHttp } from '@/utils/http'

/**
 * @description Contains the necessary service consumption functions for the management of the category module.
 * @returns { Functions } categoryService
 */
const categoryService = () => {

    /**
     * @description Consumes the api that returns the registered categories.
     * @returns { Object } api response
     */
    const getAllCategory = async () => {

        const response = await getHttp(apiProductCategorizationV1)
        return response
    }

    return {
        getAllCategory,
    }
}

export default categoryService