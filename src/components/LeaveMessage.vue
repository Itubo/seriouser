<template>
  <div>
    <div>
      <Navbar title="留声机">
        <van-icon name="arrow-left" @click="goBack" />
      </Navbar>
    </div>
    <div class="leaveMessageElement">
      <LeaveMessageElement :list="list"> </LeaveMessageElement>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar.vue";
import LeaveMessageElement from "../components/LeaveMessageElement.vue";
import axios from "axios";
export default {
  name: "LeaveMessage",
  data() {
    return {
      list: [],
      form: {
        uid: "",
      },
    };
  },
  components: {
    Navbar,
    LeaveMessageElement,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.form.uid = this.$store.state.uid;
    console.log("这个是留声机功能！");
    axios
      .post("/letter/getMyLetters", this.form)
      .then((res) => {
        console.log(res);
        this.list = res.data.data;
        console.log(this.list);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
.leaveMessageElement {
  height: 85vh;
  overflow-y: auto;
  margin-top: -20px;
  padding: 10px 20px;
  max-width: 100%;
}
</style>
