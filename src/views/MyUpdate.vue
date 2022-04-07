<template>
  <div class="list_body">
    <div>
      <Navbar title="我的上传记录">
        <van-icon name="arrow-left" @click="goBack" />
      </Navbar>
    </div>
    <div class="list_body_ele">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <div class="list_body_ele_img">
            <img :src="item.avatar_url" alt="" />
          </div>
          <div>
            {{ item.login }}
            <span @click="edit(item)">
              <van-icon name="delete-o" />
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
import request from "../network";
export default {
  name: "MyUpdate",
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    };
  },
  components: {
    Navbar,
  },
  methods: {
    goBack() {
      this.$router.back();
    },
    edit(value) {
      console.log("edit", value);
      this.list = this.list.filter((p) => {
        return p.login != value.login;
      });
    },
  },
  mounted() {
    request({
      url: "https://api.github.com/search/users?q=java",
    })
      .then((res) => {
        // 接收到后 无论如何，先清除定时器。
        clearTimeout(this.callNet);
        this.list = res.data.items;
        console.log(this.list);
        this.isLoading = false;
        //当请求列表为空时，显示固定图片
        if (res.data.items.length === 0) {
          this.$bus.$emit("getNull");
        }
      })
      .catch((err) => {
        this.$bus.$emit("getError", err);
        this.checkNet();
      });
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
</style>
