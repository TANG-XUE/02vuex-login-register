import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import UserList from "../components/UserList"
import OldUser from "../components/OldUser"
import NewUser from "../components/NewUser"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect:'/userlist', //访问admin路由时直接跳转到userlist下
      children:[
        {path:"/userlist",component:UserList},
        {path:"/olduser",component:OldUser},
        {path:"/newuser",component:NewUser}
      ]
    }
  ]
})
