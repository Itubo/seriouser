<template>
  <div class="elementBox">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
        :class="{ bgc: item.exist === true }"
        @click="getitem(item)"
      >
        <div class="list_body_ele_img">
          <img :src="item.imageaddress" alt="" />
        </div>
        <div>
          {{ item.bookname }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OwnCollectElementList",
  data() {
    return {};
  },
  props: ["list"],
  methods: {
    getitem(item) {
      console.log(item);
      if (item.exist === false) {
        Toast("此书已经被卖掉！");
        return;
      }
      this.$store.commit("setCollectItem", item);
      this.$router.push({
        path: "/owncollectelementdetail",
      });
    },
  },
};
</script>

<style scoped>
.elementBox {
  padding: 20px 20px;
  box-sizing: border-box;
}
.elementBox ul li {
  margin-bottom: 0.625rem;
  border-radius: 10px;
  height: 5rem;
  position: relative;
}
.elementBox ul li > div {
  display: inline-block;
  vertical-align: middle;
}
.elementBox ul li > div:nth-child(2) {
  margin-left: 2.5rem;
  position: absolute;
  top: 50%;
  left: 30%;
  transform: translate(0, -50%);
}
.list_body_ele_img img {
  height: 3.75rem;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(0, -50%);
}
.bgc {
  background-color: #c2e7b0;
}
</style>
