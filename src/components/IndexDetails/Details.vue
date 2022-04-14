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
          <img :src="item.imageaddress" alt="" />
        </div>
        <div class="detail_element_title">
          <div>
            <h3>{{ item.login }}</h3>
            <van-icon
              name="like-o"
              v-show="!likesShow"
              @click="sendLike"
              :class="{ likes: likesShow }"
            />
            <van-icon
              name="like"
              v-show="likesShow"
              @click="sendLike"
              color="green"
            />
          </div>
          <ul>
            <li>
              <span> 书名 </span>
              <span>
                {{ item.bookname || "未知" }}
              </span>
            </li>
            <li>
              <span> 作者 </span>
              <span>
                {{ item.author || "未知" }}
              </span>
            </li>
            <li>
              <span> 出版社 </span>
              <span>
                {{ item.press || "未上传" }}
              </span>
            </li>
            <li>
              <span> 上传时间 </span>
              <span> {{ item.uploadbook }} </span>
            </li>
            <li>
              <span> 版次 </span>
              <span> 1 </span>
            </li>
          </ul>
        </div>
        <div class="detail_element_own">
          <div class="detail_element_gap"></div>
          <div class="detail_element_provider">
            <ul>
              <li>
                <span>提供者</span>
                <span>{{ nickname }}</span>
              </li>
              <li>
                <span>年级</span>
                <span>{{ grade }}</span>
              </li>
              <li>
                <span>院系</span>
                <span>{{ college }}</span>
              </li>
              <li>
                <span>QQ</span>
                <span>{{ item.qqnumber }}</span>
              </li>
              <li>
                <span>联系电话</span>
                <span>{{ item.tel }}</span>
              </li>
              <li>
                <span>出书地址</span>
                <span>{{ item.address }}</span>
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
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "Details",
  data() {
    return {
      likesShow: false,
      college: "",
      nickname: "",
      grade: "",
      //详细页进入后直接调用
      form: {
        id: 0,
        uidn: "",
      },
      //like 修改
      sendLi: {
        bid: 0,
        uid: "",
        like: "",
      },
    };
  },
  props: ["item"],
  components: {
    Navbar,
  },
  methods: {
    goBack() {
      this.$bus.$emit("changePageShow", false);
    },
    test() {
      console.log(this.item);
    },
    //请求收藏
    sendLike() {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("token") === ""
      ) {
        console.log("我进来了，准备跳到登录！");
        this.$router.push("/login");
        Toast("请先登录！");
        return;
      }
      this.likesShow = !this.likesShow;
      this.sendLi.bid = this.item.id;
      this.sendLi.uid = this.$store.state.uid;
      this.sendLi.like = this.likesShow;
      axios
        .post("/book/wantBuy", this.sendLi)
        .then((res) => {
          console.log("主页详情的请求：", res);
          Toast(res.data.message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    console.log(this.item);
    this.form.id = this.item.id;
    this.form.uidn = this.$store.state.uid;
    let _that = this;
    axios
      .post("/book/findOneBook", this.form)
      .then((res) => {
        console.log(res);
        _that.likesShow = res.data.data.like;
        _that.college = res.data.data.college;
        _that.nickname = res.data.data.nickname;
        _that.grade = res.data.data.garde;
        console.log(_that.likesShow);
      })
      .catch((err) => {
        console.log(err);
      });
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
.detail_element_title h3,
.detail_element_title p {
  margin: 0;
}
.detail_element_title h3 {
  font-weight: 500;
  font-size: 22px;
  letter-spacing: 1px;
  margin-bottom: 10px;
  display: inline-block;
}
.detail_element_title > div i {
  float: right;
}
.detail_element_title ul,
.detail_element_provider ul {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.detail_element_title ul li span:first-child,
.detail_element_provider ul li span:first-child {
  display: inline-block;
  width: 20%;
  font-size: 12px;
}
.detail_element_title ul li span:last-child,
.detail_element_provider ul li span:last-child {
  display: inline-block;
  font-size: 12px;
}
.detail_element_title ul li:before,
.detail_element_provider ul li:before {
  content: "";
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
