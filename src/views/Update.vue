<template>
  <div class="update_box">
    <div class="update_header">
      <Navbar title="上传旧书"></Navbar>
    </div>
    <div class="update_element">
      <div>
        <div>上传书籍照片</div>
        <div class="update_element_img">
          <div>
            <van-uploader :before-read="beforeRead" :after-read="afterRead" />
          </div>
        </div>
      </div>
      <div>
        <van-field
          v-model="form.bookname"
          label="书籍名称"
          placeholder="书籍名称"
        />
      </div>
      <div>
        <van-field v-model="form.press" label="出版社" placeholder="出版社" />
      </div>
      <div>
        <van-field
          v-model="fieldValue"
          is-link
          readonly
          label="出版时间"
          placeholder="请选择书籍出版时间"
          @click="show = true"
        />
        <van-popup v-model="show" round position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="请选择时间"
            :options="options"
            @close="show = false"
            @finish="onFinish"
          />
        </van-popup>
      </div>
      <div>
        <van-field v-model="form.price" label="价格" placeholder="出版次数" />
      </div>
      <div>
        <van-field v-model="form.address" label="出书地址" placeholder="地址" />
      </div>
      <div>
        <van-field v-model="form.qqnumber" label="QQ" placeholder="QQ账号" />
      </div>
      <div>
        <van-field v-model="form.tel" label="联系电话" placeholder="联系电话" />
      </div>
    </div>
    <div class="submit">
      <van-button type="primary" block @click="submit">确认上传</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/common/Navbar";
import { Toast } from "vant";
export default {
  name: "Update",
  components: {
    Navbar,
  },
  data() {
    return {
      statusBeginUpload: "uploading",
      messageBeginUpload: "上传中...",
      statusFailed: "failed",
      messageFailed: "上传失败",
      fileList: [
        {
          url: "https://img01.yzcdn.cn/vant/tree.jpg",
        },
      ],
      form: {
        uid: "",
        bookname: "", //书名
        press: "", //出版社
        address: "", // 地址
        qqnumber: "", // QQ 号
        tel: "", // 联系电话
        price: "", // 价格
      },
      show: false,
      fieldValue: "",
      cascaderValue: "", //出版时间
    };
  },
  computed: {
    // 级联选择框 构造出对象
    options() {
      let arr = [];
      for (let i = 2000; i < 2023; i++) {
        arr.push({ text: i + "年", value: i.toString() });
        arr[arr.length - 1].children = [];
        for (let j = 1; j < 13; j++) {
          arr[arr.length - 1].children.push({
            text: j + "月",
            value: j.toString(),
          });
        }
      }
      return arr;
    },
  },
  methods: {
    beforeRead() {
      console.log("开始调试！");
      return true;
    },
    // 选择时间完成
    onFinish({ selectedOptions }) {
      console.log("我完成了！");
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    //上传：：

    afterRead(file) {
      console.log("开始上传操作！");
      console.log(file);
      //开始文件上传操作
      let multipartFile = new FormData();
      // multipartFile.append('multipartFile',this.dataURLtoFileFun(file.file,'multipartFile'));
      multipartFile.append("multipartFile", file.file);
      console.log("这是原本的数据：：：", multipartFile);
      console.log(multipartFile.get("multipartFile"));
      console.log(typeof multipartFile);
      file.status = "uploading";
      file.message = "上传中...";
      axios
        .post("/book/uploadbookimage", multipartFile, {
          timeout: 5000,
        })
        .then((res) => {
          console.log(res);
          console.log("上传成功");
          file.status = "done";
          file.message = "上传成功";
          //删除一个头像
          this.fileList.shift();
        })
        .catch((err) => {
          console.log("出现问题！");
          console.log(err);
          file.status = "failed";
          file.message = "上传失败！";
          //删除没有上传的头像
          setTimeout(() => {
            this.fileList.pop();
          }, 1000);
        });
    },

    submit() {
      this.form.uid = this.$store.state.uid;
      console.log(this.form);
      //处理图片：
      axios
        .post("/book/savebook", this.form)
        .then((res) => {
          if (res.data.data.flag) {
            console.log(res);
            Toast("上传成功！");
          }
          Toast("出现错误！");
        })
        .catch((err) => {
          console.log("上传失败", err);
          Toast("上传失败！");
        });
    },
  },
};
</script>

<style scoped>
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
.update_element {
  box-sizing: border-box;
  width: 100%;
}
.update_element div:first-child {
  margin: 5px 0;
  padding: 10px 16px;
}
.update_element div:first-child > div {
  margin: 0;
  padding: 0;
  display: inline-block;
  font-size: 14px;
  color: rgb(100, 101, 102);
}
.update_element_img {
  width: 60%;
}
.update_element_img > div {
  display: flex;
  justify-content: center;
}
.submit {
  margin-top: 1.25rem;
}
</style>
