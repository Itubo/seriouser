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
            <van-uploader
              :max-count="2"
              v-model="fileList"
              :after-read="afterRead"
              :before-delete="beforeDelete"
            />
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
        <van-field v-model="form.price" label="价格" placeholder="价格" />
      </div>
      <div class="addressItem">
        <!-- <van-field v-model="form.address" label="出书地址" placeholder="地址" /> -->
        <van-cell is-link title="地址" @click="showAddressPop = true" />
        <div class="addressShow">
          {{ form.address }}
        </div>
        <van-action-sheet v-model="showAddressPop" title="地址">
          <van-cell title="" @click="changeTitle"></van-cell>
          <van-cell title="东苑" @click="changeTitle(1)"></van-cell>
          <van-cell title="北苑" @click="changeTitle(2)"></van-cell>
          <van-cell title="南苑" @click="changeTitle(3)"></van-cell>
          <van-cell title="华苑" @click="changeTitle(4)"></van-cell>
          <van-cell title="顺和" @click="changeTitle(5)"></van-cell>
          <van-cell title="郑州" @click="changeTitle(6)"></van-cell>
        </van-action-sheet>
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
        // {
        //   url: "https://img01.yzcdn.cn/vant/tree.jpg",
        // },
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
      //地址弹出：
      showAddressPop: false,
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
    beforeDelete() {
      if (this.fileList.length <= 1) {
        Toast({
          message: "无法删除",
          icon: "warning-o",
        });
        return false;
      }
      return true;
    },
    beforeRead() {
      return true;
    },
    changeTitle(title) {
      if (title === 1) {
        this.form.address = "东苑";
      } else if (title === 2) {
        this.form.address = "北苑";
      } else if (title === 3) {
        this.form.address = "南苑";
      } else if (title === 4) {
        this.form.address = "华苑";
      } else if (title === 5) {
        this.form.address = "顺和";
      } else {
        this.form.address = "郑州";
      }
      this.showAddressPop = false;
    },
    // 选择时间完成
    onFinish({ selectedOptions }) {
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    //上传：：

    afterRead(file) {
      //开始文件上传操作
      let multipartFile = new FormData();
      // multipartFile.append('multipartFile',this.dataURLtoFileFun(file.file,'multipartFile'));
      multipartFile.append("multipartFile", file.file);
      file.status = "uploading";
      file.message = "上传中...";
      axios
        .post("/book/uploadbookimage", multipartFile, {
          timeout: 5000,
        })
        .then((res) => {
          file.status = "done";
          file.message = "上传成功";
          //删除一个头像
          this.fileList.shift();
        })
        .catch((err) => {
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
      //处理图片：
      axios
        .post("/book/savebook", this.form)
        .then((res) => {
          console.log(res.data);
          if (res.data.flag) {
            Toast("上传成功！");
            this.$router.push("/user");
          } else {
            Toast("出现错误！");
          }
        })
        .catch((err) => {
          // console.log("上传失败", err);
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
  margin-top: -1.25rem;
}
.update_element div:first-child {
  margin: 5px 0;
  padding: 10px 10px;
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
  justify-content: space-around;
}
.submit {
  margin-top: 1.25rem;
}

/* 地址弹出 */
.content {
  padding: 16px 16px 160px;
}
.addressItem {
  position: relative;
}
.addressShow {
  position: absolute;
  top: 50%;
  left: 33%;
  transform: translate(-50%, -50%);
  font-size: 14px;
}
</style>
