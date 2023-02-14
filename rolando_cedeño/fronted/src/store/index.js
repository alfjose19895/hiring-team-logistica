import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    user:null,
    auth:false
  },
  getters: {
    user: state => {
      return state.user;
    }
  },
  mutations: {
    SET_USER(state, value){
      console.log('asa '+Boolean(value))
      state.user = value
      state.auth=Boolean(value)
      // localstorage.setItem('token',value)
    }
  },
  actions: {

    async login({dispatch},data){
      await axios.get("http://localhost:8000/sanctum/csrf-cookie")
    
      await axios.post("http://localhost:8000/api/login", data)
      // return dispatch("getUser")
    },
    getUser({commit}){
      axios.get("http://localhost:8000/api/user").then(res=>{
        console.log('getusuario '+res.data)
        commit('SET_USER', res.data)
      })
      .catch(()=>{
        commit('SET_USER', null)
      })
    }, 
    async logout({commit}){
      await axios.post("http://localhost:8000/api/logout")
      commit('SET_USER', null)
    }
  },
  modules: {
  }
})

