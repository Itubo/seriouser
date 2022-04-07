import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import PersonalCenter from '../views/PersonalCenter.vue'
import Index from '../views/Index'
import Information from '../views/Information'
import GetPassword from "../views/GetPassword";
import Address from "../views/Address";
import Update from "../views/Update";
import MyUpdate from "../views/MyUpdate";
import TreeHole from "../views/TreeHole";
import { Toast } from 'vant'
const routes = [
  {//第一次进入
    path: '/',
    name: 'Home',
    component: () => import("../views/Index"),
  },
  {//主界面
    path: '/home',
    name: 'Home',
    component: () => import("../views/Index"),
  },
  {
    path: '/treehole',
    name: 'TreeHole',
    component: () => import("../views/TreeHole"),
  },
  {
    path: '/update',
    name: 'Update',
    component: () => import("../views/Update"),
  },
  {//个人中心
    path: '/user',
    name: 'PersonalCenter',
    component: () => import('../views/PersonalCenter.vue'),
  },
  {//登陆
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {//注册
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {//找回密码
    path: '/getpassword',
    name: 'GetPassword',
    component: () => import("../views/GetPassword"),
  },
  {//个人信息
    path: '/information',
    name: 'Information',
    component: () => import('../views/Information'),
  },
  {
    path: '/myupdate',
    name: 'MyUpdate',
    component: () => import("../views/MyUpdate"),
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import("../views/Address"),
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let token = JSON.parse(localStorage.getItem('token')) === null ?"":JSON.parse(localStorage.getItem('token'));
  // console.log("我要跳转页面了",token);
  //token 不存在时跳转 login 页面
  if((to.path=='/update' || to.path=='/treehole') && token==="") {
    let msg = "登录后即可享受" + (to.path=='/update' ?'上传旧书信息服务！':'树洞空间');
    Toast(msg);
    next({path: '/login'});
  }
  next();
})
export default router;
