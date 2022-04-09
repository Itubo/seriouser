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
      searchValue: "python",
      list: [],
      isLoading: false,
      callNet: {},
      showIndex: true,
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
      this.getList();
    },
    getList() {
      if (this.searchValue === "") return alert("请输入查询内容");
      let _that = this;
      axios
        .post("/book/findAllBooks")
        .then((res) => {
          // 接收到后 无论如何，先清除定时器。
          clearTimeout(this.callNet);

          // let newArray = [];
          // for (let i in res.data.data) {
          //   for (let key in res.data.data[i].course) {
          //     //console.log("属性:"+key);
          //     this.$set(this.list, key, res.data.data[i].course[key]); //对象新增属性(使用Vue.$set())
          //     // newArray[i] = this.list;  //新建数组存放
          //     // this.list.push(i + ':' + JSON.stringify(res.data[k].course[i]));
          //   }
          //   // this.list = [];  //循环完必须清空,否则可能会覆盖
          //   console.log("这是list", this.list);

          console.log(res.data.data);
          console.log(typeof res.data.data);
          _that.list = res.data.data;
          // this.list = res.data.data;
          this.isLoading = false;
          //当请求列表为空时，显示固定图片
          if (res.data.data.length === 0) {
            this.$bus.$emit("getNull");
          }
        })
        .catch((err) => {
          console.log("出现错误！", err);
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
  },
  mounted() {
    // 获取搜索 框中传入的值
    this.$bus.$on("getValue", this.getValue);
    this.getList();
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
