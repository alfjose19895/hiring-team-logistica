import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_APP_ROOT_API;

 /**
 * @description get method for api queries
 * @param { String } url get type api url
 * @param { Object } params object to be consulted by means of the api
 * @return { Object }
 */
export const getHttp = async (url, params=null) => {
    return await axios.get(url, {params}).then(response => {
        return response
    }).catch(error => {
        return error.response
    });
}

/**
 * @description post method for sending data
 * @param { String } url post type api url
 * @param { Object } body object to be consulted by means of the api
 * @return { Object }
 */
export const postHttp = async function(url, body) {
    return await axios.post(url, body).then(response =>{
        return response
    }).catch(error => {
       return error.response
    });
}


 /**
 * @description put method for sending data
 * @param { String } url post type api url
 * @param { Object } body object to be consulted by means of the api
 * @return { Object }
 */
  export const putHttp = async function(url, body) {
    return await axios.put(url, body).then(response =>{
        return response
    }).catch(error => {
        return error.response
    });
}

 /**
 * @description http deletion method
 * @param { String } url post type api url
 * @param { Object } data object to be consulted by means of the api
 * @return { Object }
 */
  export const deleteHttp = async (url, data) => {
    return await axios.delete(url, {data}).then(response => {
        return response
    }).catch(error => {
        return error.response
    });
}