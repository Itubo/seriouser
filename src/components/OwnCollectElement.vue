<template>
  <div class="box">
    <own :list="list"></own>
  </div>
</template>

<script>
import Own from "./OwnCollectElementList.vue";
export default {
  name: "OwnCollectElement",
  data() {
    return {};
  },
  props: ["list"],
  components: {
    Own,
  },
  methods: {

  },
  mounted() {
    console.log("我收到消息了！");
    console.log("+++++++++++++", this.list);
  },
};
</script>

<style scoped>
.box {
  /* background-color: pink; */
  overflow-y: auto;
  max-height: 85vh;
}
</style>
