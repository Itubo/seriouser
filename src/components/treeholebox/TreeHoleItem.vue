<template>
  <div>
    <div class="treehole_itemimg">
      <img :src="item.img_url" alt="" />
      <span>
        {{ item.nickname }}
      </span>
    </div>
    <div class="treehole_item_element" @click="detailInfo(item)">
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
        <input
          type="text"
          v-model="form.ccontent"
          placeholder="留言"
          @blur="submitComment"
        />
      </div>
      <div class="button">
        <van-icon name="like-o" style="z-index: -1px" />
        <van-icon name="star-o" />
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
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TreeHoleitem",
  data() {
    return {
      form: {
        ccontent: "",
        uid: "",
        tid: "",
      },
    };
  },
  props: ["item"],
  methods: {
    detailInfo(item) {
      this.item.show_message = !this.item.show_message;
      this.$bus.$emit("showMessage", item);
    },
    //添加 comment  请求：
    submitComment() {
      this.form.uid = this.$store.state.uid;
      this.form.tid = this.item.tid;
      axios
        .post("/comment/add", this.form)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log("报错!", err);
        });
    },
  },
  mounted() {
    console.log("我使用了！");
    this.messageList = this.item.ccontent;
  },
};
</script>

<style scoped>
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
}
.input input {
  width: 100%;
  height: 80%;
  outline: none;
  border-color: transparent;
}
.button {
  width: 20%;
  display: flex;
  justify-content: space-between;
  float: right;
  margin-right: 20px;
}
.leave_message > div {
  width: 100%;
}
.leave_message ul li {
  height: 1.5625rem;
  margin: 0;
  border: none;
}
.leave_message p:first-child {
  font-size: 12px;
  display: inline-block;
  margin: 0 0.625rem 0 0;
  line-height: 1.125rem;
}
.leave_message p:last-child {
  font-size: 12px;
  /* border-bottom: 1px solid; */
  display: inline-block;
  margin: 0;
  height: 100%;
  line-height: 1.125rem;
  white-space: nowrap;
  max-width: 16.25rem;
}
</style>
