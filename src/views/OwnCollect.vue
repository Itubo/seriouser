<template>
  <div>
    <div>
      <Navbar title="我的收藏">
        <van-icon name="arrow-left" @click="goBack" />
      </Navbar>
    </div>
    <div class="ownCollectElement">
      <OwnCollectElement :list="list"></OwnCollectElement>
    </div>
    <div v-if="list.length === 0" class="empty_me">
      <van-empty description="列表为空" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/common/Navbar.vue";
import OwnCollectElement from "../components/OwnCollectElement.vue";
export default {
  name: "OwnCollect",
  data() {
    return {
      form: {
        uid: "",
      },
      list: [],
    };
  },
  components: {
    Navbar,
    OwnCollectElement,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.form.uid = this.$store.state.uid;
    axios
      .post("/book/mywant", this.form)
      .then((res) => {
        this.list = res.data.data;
      })
      .catch((err) => {
        Toast("出现问题");
        console.log(err);
      });
  },
};
</script>

<style scoped>
.ownCollectElement {
  width: 100%;
  height: 85vh;
  /* background-color: pink; */
  margin-top: -1.25rem;
}
.empty_me {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
