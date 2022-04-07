<template>
  <div class="nullBox">
    <van-empty :image="image" :description="title" />
    <div class="nullBox_tips">
      {{ tips }}
    </div>
  </div>
</template>

<script>
export default {
  name: "NullStatus",
  props: ["title", "image", "tips"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.nullBox_tips {
  text-align: center;
  font-size: 14px;
  color: rgb(222, 224, 226);
}
</style>
