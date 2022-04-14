<template>
  <div class="treeholebox">
    <ul>
      <li v-for="(item, index) in list" :key="index">
        <TreeHoleitem :item="item" />
      </li>
    </ul>
    <div class="addItem" @click="addTreeHoleItem">
      <div>
        <van-icon name="plus" size="2em" />
      </div>
    </div>
    <!-- 上传弹出框 -->
    <div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '40%' }"
      >
        <div class="content">
          <van-field
            v-model="message"
            rows="3"
            autosize
            label="一句话足矣:"
            type="textarea"
            placeholder="请输入感想"
            show-word-limit
            clearable
          />
          <van-uploader
            v-model="fileList"
            :max-count="3"
            :after-read="afterRead"
          />
          <div>
            <van-button round type="primary" @click="submitThink">
              上传动态
            </van-button>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import TreeHoleitem from "../treeholebox/TreeHoleItem.vue";
import request from "../../network/index";
import axios from "axios";
export default {
  name: "TreeHoleBox",
  data() {
    return {
      show: false,
      message: "",
      imgListLength: 0,
      fileList: [],
      form1: {
        multipartFile: {},
        uid: "",
      },
      form: {
        uid: "",
        content: "",
      },
    };
  },
  props: ["list"],
  components: {
    TreeHoleitem,
  },
  methods: {
    afterRead(file) {
      console.log(file);
      // 开始文件上传操作
      let multipartFile = new FormData();
      // multipartFile.append('multipartFile',this.dataURLtoFileFun(file.file,'multipartFile'));
      multipartFile.append("multipartFile", file.file);
      multipartFile.append("message", this.$store.state.uid);
      // this.form1.multipartFile = multipartFile;
      file.status = "uploading";
      file.message = "上传中...";
      this.form1.uid = this.$store.state.uid;
      let _that = this;
      axios
        .post("/treehole/uploadcommentimage", multipartFile)
        .then((res) => {
          // console.log(res);
          // console.log("上传成功");
          this.imgListLength++;
          file.status = "done";
          file.message = "上传成功";
        })
        .catch((err) => {
          console.log("出现问题！");
          console.log(err);
          file.status = "failed";
          file.message = "上传失败！";
        });
    },
    addTreeHoleItem() {
      console.log("我点击了！");
      this.show = true;
    },
    //上传动态
    submitThink() {
      console.log("我点击了！");
      this.form.uid = this.$store.state.uid;
      this.form.content = this.message;
      console.log(this.form);
      let obj = {
        nickname: this.$store.state.nickname,
        uid: this.$store.state.uid,
        content: this.message,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg",
        img_url_in: [],
        likes: false,
        collected: false,
      };
      console.log("obj======", obj);
      let _that = this;
      if (this.message === "") return;
      axios
        .post("/treehole/add", this.form)
        .then((res) => {
          console.log("这是box中申请", res);
          obj.img_url =
            res.data.data.img_url ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg";
          let str = res.data.data.addresses;
          let imageList = str.split(";");

          for (let i = 1; i <= this.imgListLength; i++) {
            obj.img_url_in.unshift(imageList[i]);
          }
          _that.show = false;
          this.list.unshift(obj);
        })
        .catch((err) => {
          console.log(err);
          console.log("报错!");
        });
    },
  },
};
</script>

<style scoped>
.treeholebox {
  height: 100%;
  margin: 0 10px;
  box-sizing: border-box;
}
.treeholebox ul li {
  padding: 10px 0 0 0;
  border-top: 1px solid rgb(244, 244, 244);
  box-sizing: border-box;
  padding: 5px;
  max-width: 100%;
  margin-bottom: 0.625rem;
  overflow: hidden;
}
.addItem {
  width: 8vh;
  height: 8vh;
  background-color: rgb(244, 244, 244);
  position: absolute;
  bottom: 11vh;
  right: 4vh;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
}
.addItem > div {
  position: relative;
  height: 100%;
  width: 100%;
}
.addItem i {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(199, 199, 199);
}
.content > div {
  position: relative;
}
.content > div button {
  position: absolute;
  left: 50%;
  top: 0.625rem;
  transform: translate(-50%);
}
.content {
  height: 6.25rem;
}
.van-field__body textarea {
  overflow: auto;
  height: 5rem;
  background-color: rgb(244, 244, 244);
  max-height: 6.25rem;
}

.van-uploader__wrapper {
  margin-left: 9.375rem;
}
</style>
