<template>
  <div>
    <div class="treehole_itemimg">
      <img :src="item.img_url" alt="" @click="getMessage(item)" />
      <span>
        {{ item.nickname }}
      </span>
    </div>
    <div class="treehole_item_element">
      <p>{{ item.content }}</p>
      <div class="treehole_item_element_list">
        <img
          v-for="(url, index) in item.img_url_in"
          :key="index"
          :src="url"
          alt=""
        />
      </div>
    </div>
    <div class="treehole_item_bottom">
      <div class="input">
        <input type="text" v-model="form.ccontent" placeholder="留言" />
        <van-icon name="arrow" @click="submitComment" />
      </div>
      <div class="button">
        <van-icon name="like-o" style="z-index: -1px" />
        <van-icon name="star-o" />
      </div>
      <div class="isAnoymous">
        <label>
          <input type="checkbox" v-model="toAnoymous" />
          匿名发送
        </label>
      </div>
    </div>
    <!-- 留言模块！ -->
    <div class="leave_message">
      <div>
        <ul>
          <li v-for="(msg, index) in item.ccontent" :key="index">
            <p>匿名：</p>
            <p>{{ msg }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="popImg">
      <van-dialog
        v-model="show"
        title="个人信息"
        show-cancel-button
        confirmButtonColor="green"
      >
        <GetUserInfo :info="info"></GetUserInfo>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import GetUserInfo from "./GetUserInfo.vue";
export default {
  name: "TreeHoleitem",
  data() {
    return {
      show: false,
      info: {},
      id: 0,
      submitId: {
        id: "",
      },
      toAnoymous: false,
      form: {
        ccontent: "",
        uid: "",
        tid: "",
      },
    };
  },
  components: {
    GetUserInfo,
  },
  props: ["item"],
  methods: {
    // 展示留言
    // detailInfo(item) {
    //   // console.log(item);
    //   this.item.show_message = !this.item.show_message;
    //   this.$bus.$emit("showMessage", item);
    // },
    //添加 comment  请求：
    submitComment() {
      if (this.form.ccontent === "") return;
      this.form.uid = this.toAnoymous ? this.$store.state.uid : "";
      this.form.tid = this.item.tid;
      console.log(this.form);
      axios
        .post("/comment/add", this.form)
        .then((res) => {
          console.log(res);
          // this.$router.replace("/treehole");
          this.$forceUpdate();
        })
        .catch((err) => {
          console.log("报错!", err);
        });
    },
    getMessage(item) {
      this.submitId.id = item.id;
      axios.post("/treehole/findPeople", this.submitId).then((res) => {
        console.log("这是头像详情", res);
        // this.item.img_url = res.data.data.headportrait;
        this.info = res.data.data;
        // this.info = res.data.data;
      });
      this.show = true;
      console.log("我弹出了！", item);
    },
  },
  mounted() {
    this.messageList = this.item.ccontent;
    this.id = this.item.id;
    // console.log("这个id 是：", this.id);
    // console.log(this.item);
    // console.log(this.messageList, "messageList");
    // console.log(this.item);
  },
};
</script>

<style scoped>
.treehole_itemimg {
  margin-bottom: 0.625rem;
}
.treehole_itemimg img {
  height: 1.9rem;
  width: 1.9rem;
  border-radius: 50%;
  vertical-align: middle;
}
.treehole_itemimg span {
  margin-left: 20px;
  font-size: 14px;
  width: 200px;
  overflow: hidden;
}
.treehole_item_element p {
  margin-block: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
  padding: 0 0.3125rem;
}
.treehole_item_element img {
  height: 5.25rem;
  margin: 2px;
}
.treehole_item_element_list {
  width: 100%;
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
}
.treehole_item_bottom {
  width: 100%;
}
.input {
  width: 70%;
  height: 100%;
  display: inline-block;
  margin: 0.625rem 0;
  position: relative;
}
.input input {
  width: 80%;
  height: 80%;
  outline: none;
  border-color: transparent;
}
.input i {
  position: absolute;
  right: 10%;
  top: 50%;
  transform: translate(0, -50%);
  color: rgb(66, 130, 181);
}
.button {
  width: 20%;
  display: flex;
  justify-content: space-between;
  float: right;
  margin-right: 20px;
}
.isAnoymous {
  margin-bottom: 0.3125rem;
}
.leave_message > div {
  width: 100%;
}
.leave_message ul li {
  margin: 0;
  border: none;
  line-height: 1.5625rem;
}
.leave_message p:first-child {
  font-size: 12px;
  display: inline-block;
  margin: 0 0.625rem 0 0;
}
.leave_message p:last-child {
  font-size: 12px;
  /* border-bottom: 1px solid; */
  display: inline-block;
  margin: 0;
  height: 100%;
  white-space: nowrap;
  max-width: 16.25rem;
}
</style>
