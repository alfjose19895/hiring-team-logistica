import { apiProductChageHistoryV1 } from '../endpoint/urlApi'
import { getHttp } from '@/utils/http'

/**
 * @description Contains the necessary service consumption functions for the management of the productChangeHistory module.
 * @returns { Functions } productChangeHistoryService
 */
const productChangeHistoryService = () => {

    /**
     * @description consumes the api that returns the information of the products that have been modified.
     * @returns { Object } api response
     */
    const getAllProductChangeHistory = async () => {

        const response = await getHttp(apiProductChageHistoryV1)
        return response
    }

    return {
        getAllProductChangeHistory,
    }
}

export default productChangeHistoryService