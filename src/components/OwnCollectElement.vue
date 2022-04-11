<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "OwnCollectElement",
  data() {
    return {};
  },
  props: ["list"],
  methods: {},
  mounted() {
    console.log("我收到消息了！");
  },
};
</script>

<style scoped></style>
