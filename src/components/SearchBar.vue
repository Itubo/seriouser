<template>
  <div class="box">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @click="changeNullStatus"
      @blur="emitValue"
      background="#4fc08d"
      shape="round"
    />
    <!-- 搜索框右边按钮 -->
    <div class="button_right">
      <van-icon name="arrow-down" @click="showListPop" />
      {{ address }}
    </div>
    <div class="searchBarList" v-show="show">
      <span class="icon" @click="setShowNull">
        <van-icon name="cross" />
      </span>
      <ul>
        <li
          v-show="!toShowList"
          v-for="(item, index) of searchList"
          :key="index"
          @click="getItem(item)"
        >
          {{ item }}
        </li>
        <li v-show="toShowList">暂无查询结果</li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "SearchBar",
  data() {
    return {
      value: "",
      oldValue: "",
      address: "",
      show: false,
      form: {
        bookname: "",
      },
      searchList: [],
    };
  },
  computed: {
    toShowList() {
      return !this.searchList || this.searchList.length === 0;
    },
  },
  methods: {
    emitValue() {
      if (this.oldValue === this.value) return;
      console.log("我成功了！");
      this.changeNullStatus();
      this.$bus.$emit("getValue", this.value);
      this.show = false;
    },
    changeNullStatus() {
      this.oldValue = this.value;
      this.$bus.$emit("setShowNullFalse");
      if (this.value !== "") {
        this.show = true;
      }
    },
    showListPop() {
      this.$bus.$emit("showListPop");
    },
    //修改图标：
    changRightElement(value) {
      this.address = value;
    },
    //获取每次点击的值
    getItem(item) {
      console.log(item);
      this.show = false;
      this.value = item;
      this.emitValue();
      console.log("我点击了！");
    },
    choseOneELment(item) {},
    setShowNull() {
      this.show = false;
    },
    getList() {
      axios
        .post("/book/suggestQuery", this.form)
        .then((res) => {
          // console.log(res);
          this.searchList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
          console.log("chuxian cuo!");
        });
    },
  },
  watch: {
    //对于输入输入框内容进行监听！
    value: {
      handler(newValue, oldValue) {
        this.form.bookname = newValue;
        this.show = true;
        console.log(newValue);
        this.getList();
        if (newValue === "") {
          this.show = false;
        }
      },
    },
  },
  mounted() {
    this.$bus.$on("changRightElement", this.changRightElement);
  },
};
</script>

<style scoped>
/*.van-search__content {*/
/*  border-radius: 5px;*/
/*}*/
.van-search {
  width: 80%;
  display: inline-block;
}
.button_right {
  width: 20%;
  display: inline-block;
  height: 3.375rem;
  vertical-align: top;
  text-align: center;
  line-height: 4rem;
  font-size: 1.25rem;
  color: #fff;
  background-color: rgb(79, 192, 141);
}
.searchBarList {
  padding: 0 1.25rem 0 2.5rem;
  width: 100%;
  box-sizing: border-box;
  background-color: rgb(244, 244, 244);
  position: relative;
  position: absolute;
  z-index: 99;
}
.icon {
  /* background-color: green; */
  position: absolute;
  right: 2%;
  top: 5%;
}
.searchBarList ul li {
  height: 8vh;
  line-height: 8vh;
}
</style>
