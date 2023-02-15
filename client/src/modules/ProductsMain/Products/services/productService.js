import { apiGetAllProductsV1, apiProductV1Create, apiProductV1Update } from '../endpoint/urlApi'
import { getHttp, postHttp, putHttp } from '@/utils/http'

/**
 * @description Contains the necessary service consumption functions for the management of the product module.
 * @returns { Functions } getAllProducts, saveProduct, updateProduct
 */
const productService = () => {

    /**
     * @description consumes the api to obtain all registered products
     * @returns { Object } api response
     */
    const getAllProducts = async () => {

        const response = await getHttp(apiGetAllProductsV1)
        return response
    }

     /**
     * @description consumes the api to save a product
     * @param { Object } request
     * @returns { Object } api response
     */
    const saveProduct = async (request) => {

        const response = await postHttp(apiProductV1Create, request)
        return response
    }

     /**
     * @description consumes the api to register a product
     * @param { Object } request
     * @returns { Object } api response
     */
    const updateProduct = async (request) => {

        const response = await putHttp(apiProductV1Update, request)
        return response
    }


    return {
        getAllProducts,
        saveProduct,
        updateProduct,
    }
}

export default productService