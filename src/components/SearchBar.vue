<template>
  <div class="box">
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      @blur="emitValue"
      @click="changeNullStatus"
      background="#4fc08d"
      shape="round"
    />
    <div class="button_right">
      <van-icon name="arrow-down" />
      <ul>
        <li>123456</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      value: "",
    };
  },
  methods: {
    emitValue() {
      this.$bus.$emit("getValue", this.value);
    },
    changeNullStatus() {
      this.$bus.$emit("setShowNullFalse");
    },
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
  height: 4rem;
  vertical-align: top;
  text-align: center;
  line-height: 4rem;
  font-size: 1.5625rem;
  color: #fff;
  background-color: rgb(79, 192, 141);
}
</style>
