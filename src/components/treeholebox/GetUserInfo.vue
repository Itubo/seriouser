<template>
  <div class="box">
    <ul>
      <li v-for="(value, key, index) of shen" :key="index">
        <div>
          {{ key }}
        </div>
        <div>
          {{ value }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GetUserInfo",
  data() {
    return {
      shen: {
        nickname: "shen",
        sex: "nam",
        des: "wu",
        dig: "123456",
        garde: 2,
        college: "今明",
        head: "1111111",
      },
    };
  },
  props: ["info"],
};
</script>

<style scoped>
.box ul {
  padding: 10px 15px;
}
.box ul li {
  height: 8vh;
  /* background-color: pink; */
  margin: 2px;
  position: relative;
}
.box ul li div {
  display: inline-block;
  height: 100%;
  line-height: 8vh;
  position: absolute;
}
.box ul li div:nth-child(2) {
  left: 30%;
}
</style>
