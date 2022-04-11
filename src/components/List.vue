<template>
  <div class="showArea">
    <div v-if="!showDetails">
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
        success-text="刷新成功"
      >
        <ListItem :list="list"></ListItem>
      </van-pull-refresh>
      <div>
        <!-- <van-cell is-link title="基础用法" @click="show = true" /> -->
        <van-action-sheet
          v-model="show"
          :actions="actions"
          @select="onSelect"
        />
      </div>
    </div>

    <div v-if="showDetails">
      <router-view />
    </div>
  </div>
</template>

<script>
import request from "@/network/index.js";
import axios from "axios";
import ListItem from "@/components/ListItem";
export default {
  name: "List",
  data() {
    return {
      form: {
        bookname: "",
        address: "",
      },
      searchValue: "",
      searched: false,
      list: [],
      isLoading: false,
      callNet: {},
      showIndex: true,

      //列表弹出框
      show: false, // 是否展示弹出层
      actions: [
        { name: "东苑" },
        { name: "华苑" },
        { name: "北苑" },
        { name: "顺和" },
        { name: "郑州" },
      ],
    };
  },
  props: ["showDetails"],
  components: {
    ListItem,
  },
  methods: {
    //获取 搜索框输入后，进行搜索 调用 getList
    getValue(value) {
      this.searchValue = value;
      (this.searchValue === "" && this.form.address === "") || !this.searchValue
        ? this.getList()
        : this.getQueryList();
    },
    getList() {
      let _that = this;
      axios
        .post("/book/findAllBooks")
        .then((res) => {
          // 接收到后 无论如何，先清除定时器。
          clearTimeout(this.callNet);
          _that.list = res.data.data;
          // this.list = res.data.data;
          this.isLoading = false;
          //当请求列表为空时，显示固定图片
          if (res.data.data.length === 0) {
            this.$bus.$emit("getNull");
          }
        })
        .catch((err) => {
          this.$bus.$emit("getError", err);
          this.checkNet();
        });
    },
    getQueryList() {
      this.form.bookname = this.searchValue;
      let _that = this;
      axios
        .post("/book/findByQuery", this.form)
        .then((res) => {
          // 接收到后 无论如何，先清除定时器。
          clearTimeout(this.callNet);
          _that.list = res.data.data;
          // this.list = res.data.data;
          this.isLoading = false;
          //当请求列表为空时，显示固定图片
          if (res.data.data.length === 0) {
            this.$bus.$emit("getNull");
          }
        })
        .catch((err) => {
          this.$bus.$emit("getError", err);
          this.checkNet();
        });
    },
    onRefresh() {
      this.isLoading = true;
      this.getList();
    },
    checkNet() {
      this.callNet = setTimeout(() => {
        this.getList();
      }, 2000);
    },
    //动作弹出事件
    changeShowSelect() {
      this.show = true;
    },
    onSelect(item) {
      this.form.address = item.name;
      this.$bus.$emit("changRightElement", this.form.address);
      this.show = false;
    },
  },
  mounted() {
    // 获取搜索 框中传入的值
    this.$bus.$on("getValue", this.getValue);
    this.$bus.$on("showListPop", this.changeShowSelect);
    this.getValue();
  },
  beforeDestroy() {
    clearTimeout(this.callNet);
    this.$bus.$off("getValue");
  },
};
</script>

<style scoped>
.showArea {
  height: 83vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
