<template>
  <div class="addressCenter">
    <!--    headerBar-->
    <div>
      <Navbar title="地址管理">
        <van-icon name="arrow-left" @click="toPersonCenter" />
      </Navbar>
    </div>
    <!--    element-->
    <div class="addressList">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"
          :class="{ colorGreen: item.checked }"
          @click="getListItem(item)"
        >
          <div class="addressListElement">
            <span class="addressListElementIcon">
              <van-icon name="location-o" />
            </span>
            <p>{{ item.address }}</p>
            <span
              class="addressListElementIconRightEdit"
              @click.stop="editAddress(item)"
            >
              <van-icon name="edit" />
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '30%' }"
        closeable
      >
        <div class="inputNewAddress">
          <div>修改地址</div>
          <van-field
            v-model="newAddressValue"
            rows="2"
            label="新地址"
            type="textarea"
            maxlength="50"
            placeholder="请输入新地址"
            show-word-limit
          />
          <div class="addressButtonBox">
            <van-button type="primary" @click="deleteAddress"
              >确定删除</van-button
            >
            <van-button type="primary" @click="changeAddress"
              >确定修改</van-button
            >
          </div>
        </div>
      </van-popup>
    </div>

    <div>
      <van-popup
        v-model="addShow"
        round
        position="bottom"
        :style="{ height: '30%' }"
        closeable
      >
        <div class="inputNewAddress">
          <div>添加地址</div>
          <van-field
            v-model="addAddressValue"
            rows="2"
            label="新地址"
            type="textarea"
            maxlength="50"
            placeholder="请输入新地址"
            show-word-limit
          />
          <div>
            <van-button type="primary" @click="additem">确定添加</van-button>
          </div>
        </div>
      </van-popup>
    </div>
    <!--    添加元素模块-->
    <div class="addressButton">
      <div>
        <van-button icon="plus" type="primary" size="large" @click="addAddress"
          >添加地址</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/common/Navbar";
export default {
  name: "AddressList",
  data() {
    return {
      list: [
        {
          address: "河南省开封市龙亭区河南大学金明校区",
          checked: true,
        },
        {
          address: "河南省开封市河南大学明伦校区",
          checked: false,
        },
      ],
      //新地址
      newAddressValue: "",
      addAddressValue: "",
      //展示弹出层
      show: false,
      addShow: false,
      //新建对象保存 选择对象，用以修改对象内容
      editObj: {},
    };
  },
  components: {
    Navbar,
  },
  methods: {
    toPersonCenter() {
      this.$router.back();
    },
    //选中元素，改变颜色
    getListItem(item) {
      this.list
        .filter((p) => {
          return p.address !== item.address;
        })
        .forEach((currentEle) => {
          currentEle.checked = false;
        });
      item.checked = true;
    },
    editAddress(item) {
      //弹出遮罩层。
      this.show = true;
      this.editObj = item;
    },
    changeAddress() {
      if (this.newAddressValue === "") return;
      this.editObj.address = this.newAddressValue;
      this.editObj = {};
    },
    deleteAddress() {
      this.list = this.list.filter((p) => {
        return p.address !== this.editObj.address;
      });
      this.editObj = {};
    },
    addAddress() {
      this.addShow = true;
    },
    async additem() {
      if (this.addAddressValue === "") return;
      let obj = {};
      obj.checked = false;
      obj.address = this.addAddressValue;
      let uid = "";
      let _that = this;
      await axios
        .post("http://116.205.137.0:80/user/addAddress", {
          uid: _that.$store.state.token,
          address: obj,
        })
        .then((res) => {
          if (res.r.flag === true) {
            this.list.unshift(obj);
          } else {
            Toast("添加失败！");
          }
        })
        .catch((err) => {
          Toast("出现错误！");
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
.addressList {
  width: 90%;
  margin: 0 auto;
}
.addressList ul li {
  width: 100%;
  border-top: 1px solid rgb(244, 244, 244);
  border-bottom: 1px solid rgb(244, 244, 244);
  margin-bottom: 10px;
  border-radius: 10px;
}
.addressListElement {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: left;
  margin: 15px 0;
  padding-top: 10px;
}
.addressListElementIcon {
  margin-right: 8%;
}
.addressListElementIconRightEdit {
  margin-left: 8%;
}
.inputNewAddress {
  margin-top: 2vh;
  text-align: center;
  font-size: 16px;
}
/*动态设置属性*/
.colorGreen {
  color: rgb(7, 193, 96);
}
.addressListElement p {
  width: 70%;
  font-size: 16px;
  margin: 0;
}
.addressButton {
  position: absolute;
  bottom: 1vh;
  width: 100%;
  z-index: 99;
}
.addressButtonBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
