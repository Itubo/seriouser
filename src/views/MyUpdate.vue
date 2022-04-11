<template>
  <div class="list_body">
    <div>
      <Navbar title="我的上传记录">
        <van-icon name="arrow-left" @click="goBack" />
      </Navbar>
    </div>
    <div class="list_body_ele" v-if="list.length != 0">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="list_body_ele_img">
            <img :src="item.imageaddress" alt="" />
          </div>
          <div>
            {{ item.bookname }}
            <span @click="edit(item)">
              <van-icon v-if="item.exist" name="success" />
              <van-icon v-if="!item.exist" name="cross" />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="list.length === 0" class="empty_me">
      <van-empty description="列表为空" />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
import { Dialog, Toast } from "vant";
import axios from "axios";
import request from "../network";
export default {
  name: "MyUpdate",
  data() {
    return {
      list: [],
      form: {
        id: 0,
      },
      uid: {
        uid: "",
      },
    };
  },
  components: {
    Navbar,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    //删除上传旧书信息！
    edit(value) {
      Dialog.confirm({
        title: "删除",
        message: "请确定是否删除,删除后不可恢复！",
      })
        .then(() => {
          this.form.id = value.id;
          // this.list = this.list.filter((p) => {
          //   return p.login != value.login;
          // });
          value.exist = false;
          let _that = this;
          axios
            .post("/book/changeBook", this.form)
            .then((res) => {
              Toast("成功！");
            })
            .catch((err) => {
              console.log("出现错误额！", err);
            });
          this.getList();
        })
        .catch(() => {});
    },
    getList() {
      let _that = this;
      this.uid.uid = this.$store.state.uid;
      axios
        .post("/book/showOnesBooks", this.uid)
        .then((res) => {
          // 接收到后 无论如何，先清除定时器。
          clearTimeout(_that.callNet);
          _that.list = res.data.data;
          _that.isLoading = false;
          //当请求列表为空时，显示固定图片
          if (res.data.data.length === 0) {
            this.$bus.$emit("getNull");
          }
        })
        .catch((err) => {
          this.$bus.$emit("getError", err);
        });
    },
  },

  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
  margin-bottom: 5px;
}
.list_body_ele {
  height: 90vh;
  overflow-y: auto;
}
.list_body_ele ul {
  height: 100%;
}
.list_body_ele ul li {
  height: 15%;
  padding: 0 3vh 0;
}
.list_body_ele ul li div {
  display: inline-block;
  vertical-align: middle;
}
.list_body_ele ul li div:first-child {
  margin-right: 5vh;
}
.list_body_ele ul li div:last-child {
  width: 60%;
}
.list_body_ele ul li div span {
  float: right;
}
.list_body_ele_img {
  height: 100%;
}
.list_body_ele_img img {
  height: 80%;
}
.empty_me {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.empty_me .van-empty__image {
}
</style>
