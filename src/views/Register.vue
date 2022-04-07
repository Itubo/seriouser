<template>
  <div>
    <Navbar title="注  册">
      <van-icon name="arrow-left" @click="toLogin" />
    </Navbar>
    <van-cell-group style="margin: 4.167vw 0">
      <van-field
        v-model="form.nickname"
        label="昵称"
        placeholder="请输入昵称"
        clearable
      />
    </van-cell-group>
    <BaseInput @getInformation="getBaseInputInformation"></BaseInput>
    <van-cell-group>
      <van-field
        v-model="passwdan"
        label="确定密码"
        type="password"
        placeholder="请再次输入密码"
        clearable
        @blur="checkUserName"
      />
      <van-form>
        <van-field
          v-model="form.email"
          label="邮箱"
          placeholder="请输入邮箱"
          clearable
          required
          :rules="rules.email"
        />
      </van-form>
    </van-cell-group>
    <van-field
      v-model="form.verifyinput"
      center
      clearable
      label="邮箱验证码"
      placeholder="请输入短信验证码"
      required
    >
      <template #button>
        <van-button size="small" type="primary" @click="checkEmail"
          >发送验证码</van-button
        >
      </template>
    </van-field>
    <div class="button_area">
      <van-button type="primary" @click="toLogin">去登陆</van-button>
      <van-button
        type="primary"
        color="linear-gradient(to right, #ff6034, #ee0a24)"
        @click="sendMessage"
        >立即注册</van-button
      >
    </div>
  </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
import Navbar from "../components/common/Navbar.vue";
import BaseInput from "../components/common/BaseInput.vue";
import request from "../network";
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "Register",
  data() {
    return {
      form: {
        nickname: "",
        username: "",
        passwd: "",
        email: "",
        verifyinput: "",
      },
      session: "",
      checked: false,
      rules: {
        email: [
          {
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            required: true,
            message: "请输入正确的邮箱号",
            trigger: "onBlur",
          },
        ],
      },
      passwdan: "",
      checkEmailInput: false,
      checkUserNameInput: false,
    };
  },
  components: {
    Navbar,
    BaseInput,
  },
  methods: {
    // 解构表达式，获取 子组件输入。
    getBaseInputInformation(value) {
      this.form = { ...this.form, ...value };
    },
    toLogin() {
      this.$router.go(-1);
    },
    //检测用户名是否重复
    checkUserName() {},
    //申请邮箱验证码；
    checkEmail() {
      console.log("开始申请邮箱验证码！");
      //首先判断 用户名 是否重复
      if (
        this.form.username === "" ||
        this.form.passwd === "" ||
        this.form.nickname === "" ||
        this.form.email === ""
      ) {
        Toast("请先完成邮箱以上表格。");
        return;
      }

      axios
        .post(
          // "http://116.205.137.0:80/sendMail/sendMailVerfityINput",
          "/sendMail/sendMailVerfityINput",
          {
            email: this.form.email,
          },
          { timeout: 5000 }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data.data);
          this.session = res.data.data;
          console.log("session:     ", this.session);
          this.checkEmailInput = true;
        })
        .catch((err) => {
          console.log("出问题了！", err);
        });
    },
    //发送注册请求：
    sendMessage() {
      this.checked = true;
      if (
        this.form.username === "" || //用户名
        this.form.passwd === "" || //密码
        this.form.email === "" || //邮箱
        this.form.verifyinput === "" //邮箱验证码
      ) {
        Toast("将数据项填写完整!");
        return;
      }
      if (this.form.passwd !== this.passwdan)
        return Toast("两次密码输入不一致,请确保两次密码输入一致！");
      console.log(this.form);
      console.log(this.checkEmailInput);
      console.log("session:" + this.session);
      if (this.checkEmailInput === true && this.checked) {
        axios
          .post("/user/register", this.form, {
            headers: {
              Authorization: this.session,
            },
          })
          .then((res) => {
            Toast(res.data.message);
          })
          .catch((err) => {
            console.log("上报错误1", err);
          });
      }
    },
  },
};
</script>

<style scoped="scoped">
.button_area {
  height: 70px;
  margin-top: 40px;
  display: flex;
  justify-content: space-around;
}
.button_area button {
  width: 100px;
  height: 50px;
  border-radius: 25px;
}
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
</style>
