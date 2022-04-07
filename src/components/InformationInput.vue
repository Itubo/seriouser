<template>
  <div class="information_element">
    <!--    头像上传-->
    <div class="head_image">
      <div>头像</div>
      <form action="" enctype="multipart/form-data">
        <div>
          <van-uploader
            v-model="fileList"
            :after-read="afterRead"
            :before-delete="beforeDelete"
          />
        </div>
      </form>
    </div>
    <!--    中间输入部分-->
    <div>
      <van-field
        v-model="form.nickname"
        label="昵称"
        placeholder="新昵称"
        colon
      />
      <van-field
        v-model="form.description"
        label="个性签名"
        placeholder="我的个性由我做主"
        colon
      />
      <!-- 输入手机号，调起手机号键盘 -->
      <van-field
        v-model="form.sex"
        label="性别"
        placeholder="请输入性别"
        colon
      />
      <!-- 允许输入正整数，调起纯数字键盘 -->
      <van-field
        v-model="form.digit"
        type="digit"
        label="年龄"
        placeholder="请输入年龄"
        colon
      />
      <van-field
        v-model="form.grade"
        type="digit"
        label="年级"
        placeholder="请输入年级"
        colon
      />
      <van-field
        v-model="form.college"
        type="digit"
        label="学院"
        placeholder="请输入学院"
        colon
      />
      <div>
        <van-cell is-link title="选择地区" @click="show = true" />
        <van-action-sheet v-model="show" title="地区选择">
          <div class="content">
            <van-area
              title="地址"
              :area-list="areaList"
              :value="areaValue"
              @confirm="confirm"
              @cancel="cancel"
            />
          </div>
        </van-action-sheet>
        <div class="areaName" v-show="!showArea">
          <div>地址：</div>
          <div>{{ province }}--{{ town }}--{{ area }}</div>
        </div>
      </div>
    </div>

    <!--    提交按钮！-->
    <div class="button_area">
      <van-button type="primary" to="index">确定修改</van-button>
    </div>
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import axios from "axios";
import { Toast } from "vant";
import request from "../network";
export default {
  name: "InformationInput",
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
        nickname: "",
        sex: "",
        description: "",
        digit: "",
        grade: "",
        college: "",
      },
      show: false,
      areaList,
      areaValue: "110101",
      province: "",
      town: "",
      area: "",
    };
  },
  computed: {
    showArea() {
      return this.province === "" && this.town === "" && this.area === "";
    },
    areaName() {
      return this.province === this.town
        ? this.province + this.area
        : this.province + this.town + this.area;
    },
  },
  methods: {
    afterRead(file) {
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
        .post(
          "http://116.205.137.0:80/user/uploadheadportrait",
          multipartFile,
          {
            timeout: 5000,
          }
        )
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
      // request({
      //   url: '/user/uploadheadportrait',
      //   data: multipartFile,
      //   timeout: 5000,
      // })
      // .then(res => {
      //   console.log(res);
      //   console.log('上传成功');
      //   file.status = 'done';
      //   file.message = '上传成功';
      //   //删除一个头像
      //   this.fileList.shift();
      // })
      // .catch(err => {
      //   console.log('出现问题！');
      //   console.log(err);
      //   file.status = 'failed';
      //   file.message = '上传失败！';
      //   //删除没有上传的头像
      //   setTimeout(()=> {
      //     this.fileList.pop();
      //   },1000)
      // })
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
  },
};
</script>

<style scoped>
/deep/ .van-field__label {
  color: #000;
}

.information_element {
  overflow: auto;
}
.head_image {
  height: 15vh;
  margin: 5px 0;
  padding: 10px 16px;
  line-height: 100%;
}
.head_image > div {
  color: #000;
  line-height: 15vh;
  margin-right: 13%;
  font-size: 14px;
  display: inline-block;
}
.head_image form {
  display: inline-block;
  vertical-align: middle;
}
.head_image form > div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
}
/*上传图片*/
.preview-cover {
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  padding: 4px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
}
.content {
  padding: 16px 16px 160px;
}
.areaName {
  height: 10vh;
}
.areaName div {
  font-size: 14px;
  padding: 0 16px;
  float: left;
  line-height: 10vh;
}
.button_area {
  height: 70px;
  display: flex;
  justify-content: space-around;
}
.button_area button {
  width: 40vh;
  margin-top: 1vh;
  height: 50px;
  border-radius: 25px;
}
</style>
