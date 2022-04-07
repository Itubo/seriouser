<template>
  <div class="personal">
    <!--  渐变色背景  -->
    <div class="head_bgc">
      <p>个人中心</p>
    </div>
    <!-- 中间个人信息部分   -->
    <div class="personal_information">
      <div class="information_header">
        <a @click="changeInformation">
          <img :src="src" alt="头像" />
        </a>
        <div>
          <h5>{{ title }}</h5>
          <p>{{ dec }}</p>
        </div>
      </div>
      <div class="information_buttom">
        <ul>
          <li>
            <div>1</div>
            <p>留言</p>
          </li>
          <li>
            <div>2</div>
            <p>树洞值</p>
          </li>
          <li>
            <div>3</div>
            <p>历史记录</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 下面的导航格   -->
    <div class="personal_selector">
      <ul>
        <li @click="toHistory">上传记录</li>
        <li @click="toCollect">个人收藏</li>
        <li @click="toAddressManger">地址管理</li>
        <li @click="toExit">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant";

export default {
  name: "PersonalCenter",
  data() {
    return {
      src: "https://img01.yzcdn.cn/vant/cat.jpeg",
      title: "你的昵称",
      dec: "这个人很懒，什么也没留下.",
    };
  },
  methods: {
    //修改个人信息
    changeInformation() {
      this.$router.push("/information");
    },

    toHistory() {
      console.log("我点击这个历史记录了！");
      this.$router.push("/myupdate");
    },
    toCollect() {
      console.log("我点击这个个人收藏了");
    },
    toAddressManger() {
      console.log("我点击这个地址管理了!");
      this.$router.push("/address");
    },
    toExit() {
      this.$store.commit("deleteToken");
      Toast("退出成功！");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
/*字体css*/
@font-face {
  font-family: "icomoon";
  src: url("../assets/fonts/icomoon.eot?bjq6xb");
  src: url("../assets/fonts/icomoon.eot?bjq6xb#iefix")
      format("embedded-opentype"),
    url("../assets/fonts/icomoon.ttf?bjq6xb") format("truetype"),
    url("../assets/fonts/icomoon.woff?bjq6xb") format("woff"),
    url("../assets/fonts/icomoon.svg?bjq6xb#icomoon") format("svg");
  font-weight: normal;
  font-style: normal;
  font-display: block;
}

body {
  height: 100%;
}
.personal {
  background-color: rgb(244, 244, 244);
  height: 100vh;
  max-height: 100%;
  overflow: hidden;
}
.head_bgc {
  height: 25%;
  background-image: linear-gradient(
    to right,
    rgb(40, 216, 179),
    rgb(23, 161, 255)
  );
  overflow: hidden;
}
.head_bgc p {
  text-align: center;
  margin-top: 8%;
  color: #fff;
}
.personal_information {
  width: 90%;
  height: 25%;
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 15px 10px rgb(225, 227, 226);
  overflow: hidden;
}

.information_header,
.information_buttom {
  box-sizing: border-box;
  height: 50%;
  padding: 4% 4%;
  overflow: hidden;
}

.information_header img {
  height: 110%;
  width: 22%;
  border-radius: 50%;
  float: left;
  margin-right: 10px;
  vertical-align: bottom;
}
information_header div {
  display: inline-block;
}
.information_header div h5,
.information_header div p {
  margin: 0;
}

.information_header div h5 {
  margin-top: 13px;
  font-weight: 500;
  letter-spacing: 1px;
}
.information_header div p {
  font-size: 14px;
  color: rgb(205, 215, 219);
}
.information_buttom ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  text-align: center;
}
.information_buttom ul li {
  padding-top: 5px;
}

.information_buttom ul li p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: rgb(205, 215, 219);
}

.personal_selector {
  position: relative;
  top: 17%;
  background-color: #fff;
}
.personal_selector ul li {
  height: 8vh;
  line-height: 8vh;
  padding: 0 8%;
  font-size: 16px;
  border: 1px solid rgb(244, 244, 244);
  margin-top: -1px;
}
.personal_selector ul li:after {
  font-family: "icomoon";
  content: "";
  float: right;
}
.personal_selector ul li:first-child:before {
  font-family: "icomoon";
  content: "";
}
.personal_selector ul li:nth-child(2):before {
  font-family: "icomoon";
  content: "";
}
.personal_selector ul li:nth-child(3):before {
  font-family: "icomoon";
  content: "";
}
.personal_selector ul li:nth-child(4):before {
  font-family: "icomoon";
  content: "";
}
.personal_selector ul li:before {
  color: rgb(7, 193, 96);
  margin-right: 10px;
}
.personal_selector ul li:hover {
  background-color: rgb(244, 244, 244);
}
</style>
