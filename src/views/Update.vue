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
            <van-uploader :before-read="beforeRead" />
          </div>
        </div>
      </div>
      <div>
        <van-field v-model="bookName" label="书籍名称" placeholder="书籍名称" />
      </div>
      <div>
        <van-field v-model="press" label="出版社" placeholder="出版社" />
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
        <van-field v-model="edition" label="版次" placeholder="出版次数" />
      </div>
      <div>
        <van-field v-model="address" label="出书地址" placeholder="地址" />
      </div>
      <div>
        <van-field v-model="QQnumber" label="QQ" placeholder="QQ账号" />
      </div>
      <div>
        <van-field v-model="tel" label="联系电话" placeholder="联系电话" />
      </div>
    </div>
    <div class="submit">
      <van-button type="primary" block @click="submit">确认上传</van-button>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
export default {
  name: "Update",
  components: {
    Navbar,
  },
  data() {
    return {
      bookName: "", //书名
      author: "", //作者
      press: "", //出版社
      edition: "", // 版次
      address: "", // 地址
      QQnumber: "", // QQ 号
      tel: "", // 联系电话
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
    },
    // 选择时间完成
    onFinish({ selectedOptions }) {
      console.log("我完成了！");
      this.show = false;
      this.fieldValue = selectedOptions.map((option) => option.text).join("/");
    },
    submit() {},
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
