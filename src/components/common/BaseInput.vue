<template>
  <div>
    <van-cell-group>
      <van-form>
        <van-field
          v-model="form.username"
          label="账号"
          placeholder="请输入用户名"
          clearable
          left-icon="user-circle-o"
          :rules="rules.usernamerules"
        />
        <van-field
          v-model="form.passwd"
          label="密码"
          placeholder="请输入密码(8-16位)"
          type="password"
          clearable
          required
          left-icon="flag-o"
          :rules="rules.passwdrules"
        />
      </van-form>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  data() {
    return {
      form: {
        username: "",
        passwd: "",
      },
      rules: {
        usernamerules: [
          {
            // 自定义校验规则
            pattern: /^[a-zA-Z0-9_-]{4,16}$/,
            required: true,
            message: "请输入4-16位数字字母下划线的账号",
            trigger: "onBlur",
          },
        ],
        passwdrules: [
          {
            // 自定义校验规则
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
  //深度监控 form 的变化。
  watch: {
    form: {
      deep: true,
      handler(newValue, oldValue) {
        if (newValue.passwd.length >= 6) this.$emit("getInformation", newValue);
        // console.log(newValue,'我是base组件')
      },
    },
  },
};
</script>

<style>
.van-field {
  margin: 5px 0;
}
</style>
