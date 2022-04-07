import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nickname: '',
    username: '',
    email: '',
    uid: '85a8bfc97663df004efb2a4d8418d936',
    token: '',
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
    //提价 简单表单
    setForm(state,payload) {
      state.nickname = payload.nickname;
      state.username = payload.username;
      state.email = payload.email;
      // state.uid = payload.uid;
    },
    //删除token
    deleteToken(state) {
      state.token = "";
      localStorage.setItem("token",JSON.stringify(""));
    }
  },
  actions: {
  },
  modules: {
  }
})
