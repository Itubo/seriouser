<template>
  <div class="find">
    <div class="findSteps">
      <van-steps :active="active - 1">
        <van-step>输入账号</van-step>
        <van-step>输入邮箱</van-step>
        <van-step>验证邮箱</van-step>
        <van-step>重置密码</van-step>
      </van-steps>
    </div>
    <div class="findElement">
      <transition-group name="hello" appear>
        <div v-show="active === 0" key="0" class="ele">
          <div>输入账号</div>
          <van-form>
            <van-field
              v-model="form.nickname"
              label="账号"
              placeholder="请输入用户名"
              clearable
              required
              :rules="rules.username"
            />
          </van-form>
        </div>
        <div v-show="active === 1" key="1" class="ele">
          <div>输入邮箱号</div>
          <van-form>
            <van-field
              v-model="form.email"
              label="邮箱"
              clearable
              required
              placeholder="请输入邮箱号"
              :rules="rules.email"
            />
          </van-form>
        </div>
        <div v-show="active === 2" key="2" class="ele">
          <div>输入验证码</div>
          <van-field
            v-model="form.verifycode"
            center
            clearable
            required
            label="邮箱验证码"
            placeholder="请输入邮箱验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="getsms"
                >发送验证码</van-button
              >
            </template>
          </van-field>
        </div>
        <div v-show="active === 3" key="3" class="ele">
          <div>输入新密码</div>
          <van-field
            v-model="form.password"
            label="密码"
            placeholder="请输入密码(8-16位)"
            type="password"
            clearable
            required
            :rules="rules.password"
          />
          <van-field
            v-model="form.passwordan"
            label="确定密码"
            placeholder="请再次输入密码"
            type="password"
            clearable
            required
          />
        </div>
      </transition-group>
    </div>
    <div class="findButton">
      <div class="findButtonIn">
        <van-button
          plain
          round
          type="primary"
          class="one"
          @click="lastStep"
          v-show="checkStepLast"
          >{{ firstButton }}</van-button
        >
        <van-button
          plain
          round
          type="primary"
          class="two"
          @click="nextStep"
          v-show="checkStepNext"
          >{{ secondButton }}</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  name: "BeforeFine",
  data() {
    return {
      active: 0,
      show: true,
      sessionID: "",
      checkform: {
        nickname: false,
        nickname_mail: false,
      },
      form: {
        nickname: "",
        email: "",
        verifycode: "",
        password: "",
        passwordan: "",
        session: "",
      },
      //用于判断验证码是否通过
      checked: false,
      firstButton: "上一步",
      secondButton: "下一步",
      pattern: {
        email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        username: /^[a-zA-Z0-9_-]{4,16}$/,
        password:
          /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/,
      },
      rules: {
        email: [
          {
            pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
            required: true,
            message: "请输入正确的邮箱号",
            trigger: "onBlur",
          },
        ],
        username: [
          {
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            required: true,
            message: "请输入4-16位数字字母下划线的账号",
            trigger: "onBlur",
          },
        ],
        password: [
          {
            required: true,
            pattern:
              /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$).{8,16}$/,
            message: "请输入包含数字和字母特殊符号（至少两种）的密码(8-16位)",
            trigger: "onBlur",
          },
        ],
      },
    };
  },
  methods: {
    //下一步
    nextStep() {
      console.log("我点击这个事件了！");
      if (this.active === 3) {
        this.firstButton = "完成";
      }
      if (this.active >= 4 || this.active < -1) return;
      if (
        !(
          (this.active === 0 &&
            this.pattern.username.test(this.form.nickname)) ||
          (this.active === 1 && this.pattern.email.test(this.form.email)) ||
          this.active === 2 ||
          this.active === 3
        )
      ) {
        console.log(this.pattern.email.test(this.form.email));
        console.log(this.form.email);
        return;
      }
      if (this.active === 0) {
        this.checkNickname();
      } else if (this.active === 1) {
        this.checkNicknameEmail();
      } else if (this.active === 2) {
        this.resetPassword();
      } else if (this.active === 3) {
        this.changePasswd();
      }
      this.active++;
    },
    //上一步
    lastStep() {
      //当 第一个按钮为 完成时，说明是最后一页。给主界面发信息，并且让其恢复 原来的数据。
      if (this.firstButton === "完成") {
        this.$bus.$emit("changeShow", false);
        this.firstButton = "上一步";
      }
      if (this.active <= 0 || this.active > 4) return;
      this.active--;
    },
    //最后一步点击事件：
    //检查nickname
    checkNickname() {
      if (this.form.nickname === "") return;
      let _that = this;
      axios
        .post("/user/checkNickname", { nickname: _that.form.nickname })
        .then((res) => {
          console.log(res);
          this.checkform.nickname = res.data.flag;
        })
        .catch((err) => {
          console.log("错误！");
          Toast("网络错误！");
        });
    },
    //检查nickname和email 是否一样
    checkNicknameEmail() {
      if (this.form.email === "") return;
      axios
        .post("/user/match", {
          // nickname: this.form.username,
          nickname: this.form.nickname,
          email: this.form.email,
        })
        .then((res) => {
          console.log(res);
          this.checkform.nickname_mail = res.data.data;
        })
        .catch((err) => {
          console.log("出现错误！");
          Toast("网络错误！");
        });
    },
    //查看 username 是否存在，并与email 校对
    checkUsernameAndEmail() {
      return this.checkform.nickname && this.checkform.nickname_mail;
    },
    //异步请求sms
    getsms() {
      console.log(this.checkUsernameAndEmail());
      if (this.checkUsernameAndEmail() === false) {
        Toast("邮箱或账号信息有误！");
        return;
      }
      axios
        .post(
          "/sendMail/sendMailAgain",
          {
            email: this.form.email,
            nickname: this.form.nickname,
          },
          { timeout: 5000 }
        )
        .then((res) => {
          this.checked = true;
          this.form.session = res.data;
          console.log(res.data);
        })
        .catch((err) => {
          console.log("出问题了！", err);
        });
    },
    //重置密码
    async resetPassword() {
      let _that = this;
      //首先验证验证码
      await axios
        .post(
          "/user/check",
          {
            nickname: this.form.nickname,
            verifyinput: this.form.verifycode,
          },
          { timeout: 5000 }
        )
        .then((res) => {
          console.log(res);
          //此处用于判断CODE 是否正确
          if (res.data.flag === true) {
            _that.checked = true;
          } else {
            _that.checked = false;
            Toast("验证码错误！");
          }
        })
        .catch((err) => {
          Toast("网络出现问题！");
          console.log("外层", err);
        });
    },
    changePasswd() {
      if (this.form.password !== this.form.passwordan) {
        Toast("两次密码输入不一样！");
        return;
      }
      if (this.form.password === "") return Toast("请输入密码！");
      axios
        .post("/user/modifypasswd", {
          nickname: this.form.nickname,
          passwd: this.form.password,
        })
        .then((res) => {
          if (res.data.flag === true) {
            Toast("密码重置成功！");
            this.$router.replace("/login");
          } else {
            Toast("重置失败！");
          }
        })
        .catch((err) => {
          Toast("网络出问题！");
          console.log(err);
        });
    },
  },
  computed: {
    checkStepLast() {
      return this.active > 0;
    },
    checkStepNext() {
      return this.active < 4;
    },
  },
};
</script>

<style scoped>
.find {
  position: relative;
}
.findSteps {
  margin-top: 5vh;
}
.ele {
  transition: 0.5s;
}
.ele div {
  text-align: center;
  margin-bottom: 5vh;
  font-size: 14px;
}
.hello-enter,
.hello-leave-to {
  transform: translateX(-100%);
}
.hello-enter-to,
.hello-leave {
  transform: translateX(0);
}
.findElement {
  margin-top: 5vh;
}
.findButton {
  width: 100%;
  position: absolute;
  top: 52vh;
}
.findButtonIn {
  padding: 0 20px;
  clear: both;
  display: flex;
  justify-content: space-around;
}
</style>
