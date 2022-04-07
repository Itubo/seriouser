<template>
  <div>
    <router-view></router-view>
    <div>
      <van-tabbar
        v-model="active"
        active-color="rgb(7, 193, 96)"
        inactive-color="#000"
        route
      >
        <van-tabbar-item icon="home-o" to="/home">主页</van-tabbar-item>
        <van-tabbar-item icon="manager-o" to="/treehole">树洞</van-tabbar-item>
        <van-tabbar-item icon="edit" to="/update">我要上传</van-tabbar-item>
        <van-tabbar-item
          icon="friends-o"
          v-if="this.$store.state.token !== ''"
          to="/user"
          >个人中心</van-tabbar-item
        >
        <van-tabbar-item
          icon="user-circle-o"
          v-if="this.$store.state.token === ''"
          to="/login"
          >登录</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      active: 0,
    };
  },
  components: {},
  mounted() {
    //挂载完毕 在本地查看登录状态
    localStorage.setItem("token", JSON.stringify("this is token"));
    this.$store.commit("setTokenFromLocal");
    // this.$router.replace("/home");
    this.$router.replace(this.$router.history.current.path);
  },
};
</script>

<style>
html {
  height: 100%;
}
.van-tabbar {
  border-top: 1px solid rgb(7, 193, 96);
}
</style>
