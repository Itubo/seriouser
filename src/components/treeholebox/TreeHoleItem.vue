<template>
  <div>
    <div class="treehole_itemimg">
      <img :src="item.img_url" alt="" />
      <span>
        {{ item.uid }}
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
        <input type="text" placeholder="留言" />
      </div>
      <div class="button">
        <van-icon name="like-o" />
        <van-icon name="star-o" />
      </div>
    </div>
    <!-- 留言模块！ -->
    <div class="leave_message" v-show="item.show_message">
      <div>
        <ul>
          <li v-for="message in messageList" :key="message">
            <p>匿名用户 :</p>
            <p>{{ message }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TreeHoleitem",
  data() {
    return {
      messageList: [
        "好诗好诗好诗好诗好诗好诗好诗好诗好诗好诗好诗好诗好诗好诗",
        "妙哉妙哉",
        "真棒真棒",
      ],
    };
  },
  props: ["item"],
  methods: {
    detailInfo(item) {
      this.$bus.$emit("showMessage", item);
    },
  },
  moutned() {
    console.log("我使用了！");
    console.log(this.item);
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
