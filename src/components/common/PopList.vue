<template>
  <div class="box">
    <ul class="fatherElement" @click="listShow = !listShow">
      <li>
        <van-icon name="arrow-down" size="20px" color="rgb(244, 244, 244)" />
      </li>
    </ul>
    <div class="popElement" v-show="listShow">
      <ul>
        <li>聊天室</li>
        <li>漂流瓶</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopList",
  data() {
    return {
      listShow: false,
    };
  },
};
</script>

<style scoped>
.box {
  width: 100px;
  text-align: center;
  /* background-color: #c2e7b0; */
  display: inline-block;
}
.fatherElement {
  width: 50px;
  display: inline-block;
}
.fatherElement li {
  text-align: center;
}
.popElement {
  width: 100px;
  background-color: rgb(244, 244, 244);
  z-index: 99;
}
.popElement li {
  height: 50px;
  line-height: 50px;
}
.popElement li:hover {
  background-color: rgb(7, 193, 96);
}
</style>
