<template>
  <div>
    <van-icon name="success" size="100" @click="toLogin"/>
    <span>success</span>
  </div>
</template>

<script>
export default {
  name: "AfterFind",
  data() {
    return {

    }
  },
  methods: {
    toLogin() {
      this.$bus.$emit('changeShow',true);
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
div {
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  color: rgb(7, 193, 96);
}
</style>