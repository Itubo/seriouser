<template>
  <div>
<!--    headerBar-->
    <div class="headerBar">
      <Navbar title="找回密码">
        <van-icon name="arrow-left" @click="toLogin"/>
      </Navbar>
    </div>
<!--    找回密码步骤条-->
    <div v-if="show">
      <BeforeFind></BeforeFind>
    </div>
    <div v-if="!show">
      <AfterFind></AfterFind>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
import BeforeFind from "../components/getPassword/BeforeFine";
import AfterFind from "../components/getPassword/AfterFind";
export default {
  name: "GetPassword",
  data() {
    return {
      show: true,
    }
  },
  components: {
    Navbar,
    BeforeFind,
    AfterFind,
  },
  methods: {
    // 路由返回 登录页面
    toLogin() {
      this.$router.back();
    },
    changeShow(value) {
      this.show = value;
    }
  },
  mounted() {
    this.$bus.$on('changeShow',this.changeShow);
  }
}
</script>

<style scoped>
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
.findSteps {
  margin-top: 5vh;
}
</style>