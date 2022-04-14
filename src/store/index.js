import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: '',
    username: '',
    email: '',
    uid: '',
    token: '',
    collectItem: "",
    // sex: '',
    // schoolYear: '',
  },
  mutations: {
    //记录token
    setTokenFromLocal(state) {
      let token = localStorage.getItem('token') || ""
      state.token = token === ""?"":JSON.parse(token);
      // console.log("我执行了！");
    },
    setUidFormLocal(state) {
      let uid = localStorage.getItem('uid') || ""
      state.uid = uid === ""?"":JSON.parse(uid);
    },
    //提价 简单表单
    setForm(state,payload) {
      //昵称
      console.log("payload",payload);
      state.nickname = payload.nickname;
      //账号
      state.username = payload.username;
      state.email = payload.email;
      state.uid = payload.uid;
      localStorage.setItem("uid",JSON.stringify(payload.uid));
      console.log("payload",payload);
      console.log(state);
      // state.uid = payload.uid;
    },
    //删除token
    deleteToken(state) {
      state.token = "";
      state.uid = "",
      localStorage.setItem("token",JSON.stringify(""));
      localStorage.setItem("uid",JSON.stringify(""));
    },
    setCollectItem(state,item) {
      console.log("这是 state中的",item);
      state.collectItem = item;
    }
  },
  actions: {
  },
  modules: {
  }
})
