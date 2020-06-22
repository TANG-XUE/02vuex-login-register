import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    loginUser:localStorage.getItem('user'),
    userList:''
  },
  mutations:{
    saveLoginUser(state,value){
      state.loginUser = value
      //把登录名存入localstorage中
      localStorage.setItem('user',value)
    },
    savaUserList(state,value){
      state.userList = value
    }
  },
  actions:{
    getUserList(content){
      return new Promise((resolve,rej)=>{
        axios.get('/api/userlist').then((users)=>{
          content.commit('savaUserList',users.data)
          resolve()
        })
      })
    }
  },
  getters:{
    newUser(state) {
      return state.userList.filter(user => user.age < 30)
    },
    oldUser(state) {
      return state.userList.filter(user => user.age >= 30)
    }
  }
})
