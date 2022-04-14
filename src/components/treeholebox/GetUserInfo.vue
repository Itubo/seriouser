<template>
  <div class="box">
    <ul>
      <!-- <li v-for="(value, key, index) of info" :key="index">
        <div v-if="key !== uid">
          {{ key }}
        </div>
        <div v-if="key !== uid">
          {{ value }}
        </div>
      </li> -->
      <li>
        <div>nickname:</div>
        <div>{{ info.nickname }}</div>
      </li>
      <li>
        <div>sex:</div>
        <div>{{ info.sex }}</div>
      </li>
      <li>
        <div>description:</div>
        <div>{{ info.description }}</div>
      </li>
      <li>
        <div>digit:</div>
        <div>{{ info.digit }}</div>
      </li>
      <li>
        <div>grade:</div>
        <div>{{ info.garde }}</div>
      </li>
      <li>
        <div>college</div>
        <div>{{ info.college }}</div>
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
