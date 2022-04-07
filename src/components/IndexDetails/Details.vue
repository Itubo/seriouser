<template>
  <div class="detail">
    <div class="detail_header">
      <Navbar title="商品详情">
        <van-icon name="arrow-left" @click="goBack" />
      </Navbar>
    </div>
    <div class="detaile_element_box">
      <div class="detail_element">
        <div class="detail_element_img">
          <img :src="item.avatar_url" alt="">
        </div>
        <div class="detail_element_title">
          <div>
            <h3>{{item.login}}</h3>
            <van-icon name="like-o" @click="changelike" :class="{likes:likesShow}"/>
          </div>
          <ul>
            <li>
            <span>
              作者
            </span>
              <span>
              {{item.id}}
            </span>
            </li>
            <li>
            <span>
              出版社
            </span>
              <span>
              {{item.login}}
            </span>
            </li>
            <li>
            <span>
              出版时间
            </span>
              <span>
              2020-10
            </span>
            </li>
            <li>
            <span>
              版次
            </span>
              <span>
              1
            </span>
            </li>
          </ul>
        </div>
        <div class="detail_element_own">
          <div class="detail_element_gap">

          </div>
          <div class="detail_element_provider">
            <ul>
              <li>
                <span>提供者</span>
                <span>申祎明</span>
              </li>
              <li>
                <span>年级</span>
                <span>20</span>
              </li>
              <li>
                <span>院系</span>
                <span>计算机与信息工程学院</span>
              </li>
              <li>
                <span>QQ</span>
                <span>12345678910</span>
              </li>
              <li>
                <span>联系电话</span>
                <span>12345678910</span>
              </li>
              <li>
                <span>出书地址</span>
                <span>新区东苑</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../common/Navbar";
export default {
  name: "Details",
  data() {
    return {
      likesShow: false,
    }
  },
  props: ['item'],
  components: {
    Navbar,
  },
  methods: {
    goBack() {
      this.$bus.$emit("changePageShow",false);
    },
    test() {
      console.log(this.item);
    },
    changelike() {
      this.likesShow = !this.likesShow;
    }
  },
};
</script>

<style scoped>
.likes {
  color: rgb(7, 193, 96);
}
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
  margin: 0;
}
.detaile_element_box {
  height: 81vh;
  overflow-y: auto;
}
.detail_element_img {
  height: 30vh;
  display: flex;
  justify-content: center;
}
.detail_element_img img {
  height: 100%;
  margin-top: 2px;
}
.detail_element_title,
.detail_element_provider {
  padding: 3vh 4vh;
}
.detail_element_title h3,.detail_element_title p {
  margin: 0;
}
.detail_element_title h3 {
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 1px;
  margin-bottom: 10px;
  display: inline-block;
}
.detail_element_title>div i{
  float: right;
}
.detail_element_title ul,
.detail_element_provider ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.detail_element_title ul li span:first-child,
.detail_element_provider ul li span:first-child{
  display: inline-block;
  width: 20%;
  font-size: 12px;
}
.detail_element_title ul li span:last-child,
.detail_element_provider ul li span:last-child{
  display: inline-block;
  font-size: 12px;
}
.detail_element_title ul li:before,
.detail_element_provider ul li:before{
  content: '';
  display: inline-block;
  width: 1px;
  height: 10px;
  margin-right: 2vh;
  background-color: rgb(7, 193, 96);
}
.detail_element_gap {
  height: 2vh;
  background-color: rgb(244, 244, 244);
  margin: 0 3vh;
}
</style>