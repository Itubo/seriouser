<template>
  <div>
    <div class="letterHeadBar">
      <Navbar title="信 箱">
        <van-icon name="arrow-left" @click="toLogin" />
      </Navbar>
    </div>
    <div class="letterElement">
      <div @click="showPop(1)">留声机</div>
      <div @click="showPop(2)">树洞来信</div>
      <div @click="showPop(3)">许愿望</div>
    </div>
    <div>
      <van-dialog
        v-model="show_one"
        :title="title"
        show-cancel-button
        confirmButtonText="发送"
      >
      </van-dialog>
      <van-dialog v-model="show_two" :title="title" show-cancel-button>
        <div class="showTwo">
          <p>{{ getMailContent }}</p>
        </div>
      </van-dialog>
      <van-dialog
        v-model="show_three"
        :title="title"
        show-cancel-button
        @confirm="confirmThree"
      >
        <div class="showThree">
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            v-model="sendMail.content"
          ></textarea>
        </div>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/common/Navbar.vue";
export default {
  name: "Letter",
  data() {
    return {
      show_one: false,
      show_two: false,
      show_three: false,
      title: "树洞来信",
      getMailContent: "",
      sendMail: {
        uid: "",
        content: "",
      },
    };
  },
  components: {
    Navbar,
  },
  methods: {
    toLogin() {
      // console.log("打印!");
      this.$router.go(-1);
    },
    async showPop(e) {
      if (e === 1) {
        this.title = "留声机";
        this.show_one = !this.show_one;
      } else if (e === 2) {
        this.title = "树洞来信";
        await this.getContentHoleLetter();
        this.show_two = !this.show_two;
      } else {
        this.title = "许愿树";
        this.show_three = !this.show_three;
      }
    },
    getContentHoleLetter() {
      axios
        .post("/letter/getrandomletter")
        .then((res) => {
          console.log(res);
          this.getMailContent = res.data.data.content;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    confirmThree() {
      console.log("调用了！");
      axios.post("/letter/writeletter", this.sendMail).then((res) => {
        console.log(res);
        // Toast("发送成功,一年后方可再次查看！");
      });
    },
  },
  mounted() {
    this.sendMail.uid = this.$store.state.uid;
  },
};
</script>

<style scoped>
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
.letterHeadBar {
  width: 100%;
  height: 10vh;
}
.letterElement {
  width: 100%;
  height: 85vh;
  margin-top: -1.0625rem;
  /* background-color: pink; */
  background-image: url("../assets/background_letter.jpg");
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: rgb(1, 21, 36);
  position: relative;
}
.letterElement > div {
  display: inline-block;
}
.letterElement > div:nth-child(1) {
  width: 50px;
  height: 50px;
  background-color: green;
}
.letterElement > div:nth-child(2) {
  width: 50px;
  height: 50px;
  background-color: green;
}
.letterElement > div:nth-child(3) {
  width: 50px;
  height: 50px;
  background-color: green;
}
.showTwo p {
  padding: 20px;
  text-align: center;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
}
.showThree {
  text-align: center;
}
</style>
