<template>
  <div class="box">
    <ul class="fatherElement" @click="listShow = !listShow">
      <li>
        <van-icon name="arrow-down" size="20px" color="rgb(244, 244, 244)" />
      </li>
    </ul>
    <div class="popElement" v-show="listShow">
      <ul>
        <li><a href="https://2a0e7195.cpolar.cn/chat.html">聊天室</a></li>
        <li @click="toLetter">漂流瓶</li>
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
  methods: {
    toLetter() {
      this.$router.push("/letter");
    },
  },
};
</script>

<style scoped>
.box {
  width: 100px;
  text-align: center;
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
.popElement li a {
  color: black;
}
</style>
