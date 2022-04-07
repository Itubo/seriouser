<template>
  <div class="loginArea">
    <Navbar title="登  陆"></Navbar>
    <div class="formArea">
      <BaseInput @getInformation="getForm"></BaseInput>
      <van-field
        v-model="sms"
        center
        clearable
        label="邮箱验证码"
        placeholder="请输入邮箱验证码"
        required
        left-icon="manager-o"
      >
        <template #button>
          <van-button size="small" type="primary" @click="test"
            >发送验证码</van-button
          >
        </template>
      </van-field>
    </div>
    <div class="button_area">
      <van-button type="primary" @click="login">立即登录</van-button>
    </div>
    <div class="fogetPasswd">
      <a @click="getPasswd"> 忘记密码 </a>
    </div>
    <div class="toRegister">
      <a @click="toRegister"> 还没有账号，立即注册 </a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/common/Navbar.vue";
import BaseInput from "../components/common/BaseInput.vue";
import request from "../network";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        passwd: "",
      },
      sms: "",
      pattern: {
        username: /^[a-zA-Z0-9_-]{4,16}$/,
        password:
          /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/,
      },
    };
  },
  components: {
    Navbar,
    BaseInput,
  },
  methods: {
    getForm(value) {
      this.form = value;
      // console.log(this.form);
    },
    toRegister() {
      this.$router.push("/register");
      // console.log('nihao')
    },
    //发送验证码
    test() {},
    getPasswd() {
      this.$router.push("/getpassword");
    },
    login() {
      // if (
      //   !(
      //     this.pattern.username.test(this.form.username) ||
      //     this.pattern.password.test(this.form.passwd)
      //   )
      // ) {
      //   Toast("请输入正确账户信息！");
      //   return;
      // }
      console.log("开始登陆请求");
      let _that = this;
      axios
        .post("/user/login", this.form)
        .then((res) => {
          let token = res.data.data.token || "";
          localStorage.setItem(
            "token",
            token === "" ? "" : JSON.stringify(token)
          );
          _that.$store.commit("setTokenFromLocal");
          let obj = res.data.data.user;
          _that.$store.commit("setForm", {
            nickname: obj.nickname,
            username: obj.username,
            email: obj.email,
            uid: obj.uid,
          });
          _that.$router.replace("/home");
        })
        .catch((err) => {
          // console.log("出现问题！", err);
          Toast("登录失败！");
        });
    },
  },
};
</script>

<style scoped="scoped">
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
.formArea {
  margin-top: 20px;
}
.button_area {
  height: 70px;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
}
.button_area button {
  width: 150px;
  height: 50px;
  border-radius: 25px;
}
.fogetPasswd,
.toRegister {
  margin-right: 10px;
  font-size: 14px;
}
.toRegister a,
.fogetPasswd a {
  color: rgb(0, 161, 214);
}
.toRegister {
  float: right;
}
.fogetPasswd {
  float: left;
  margin-left: 10px;
}
</style>
