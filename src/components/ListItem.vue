<template>
  <div class="item">
    <div
      v-for="(list, index) in list"
      :key="index"
      class="element"
      @click="selectEle(list)"
    >
      <div class="inElement">
        <img :src="list.avatar_url" alt="" />
        <p>{{ list.login }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  data() {
    return {};
  },
  //接受来自 List 组件传入的信息
  props: ["list"],
  methods: {
    selectEle(ele) {
      this.$bus.$emit("changePageShow",true,ele);
    },
  },
};
</script>

<style scoped>
.element {
  width: 100%;
  height: 120px;
  position: relative;
  overflow: hidden;
  border: 1px solid #ccc;
  border-radius: 30px;
  margin-top: 5px;
}

.inElement {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.element img {
  width: 80px;
  position: unset;
  margin-left: 20px;
  vertical-align: middle;
}

.element p {
  margin-left: 20px;
  font-size: 20px;
  vertical-align: center;
}

.element img,
.element p {
  display: inline-block;
}
</style>