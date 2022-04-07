<template>
  <div class="changeInformation">
    <div class="changInformationBar">
      <Navbar title="编辑个人信息" class="all">
        <van-icon name="arrow-left" @click="toLogin" />
      </Navbar>
    </div>
    <div class="informationElement">
      <InformationInput></InformationInput>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar.vue";
import InformationInput from "../components/InformationInput";

export default {
  name: "Information",
  data() {
    return {};
  },
  components: {
    Navbar,
    InformationInput,
  },
  methods: {
    toLogin() {
      this.$router.go(-1);
    },
    afterRead(file) {
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.status = "failed";
        file.message = "上传失败";
      }, 1000);
    },
    confirm(value) {
      this.province = value[0].name;
      this.town = value[1].name;
      this.area = value[2].name;
      this.show = false;
      console.log(this.areaName);
    },
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.all {
  color: #fff;
  background-color: rgb(79, 192, 141);
  margin-bottom: 0px;
}
.changInformationBar {
  height: 50px;
}
.informationElement {
  height: 88vh;
  overflow: auto;
}
</style>
