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
    <div>
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '25%' }"
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
export default {
  name: "TreeHoleBox",
  data() {
    return {
      show: false,
      message: "",
    };
  },
  props: ["list"],
  components: {
    TreeHoleitem,
  },
  methods: {
    addTreeHoleItem() {
      console.log("我点击了！");
      this.show = true;
    },
    //上传动态
    submitThink() {
      console.log(this.$store.state.uid, this.message);
      let obj = {
        uid: this.$store.state.uid,
        content: this.message,
        img_url:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg",
        img_url_in: [],
        likes: false,
        collected: false,
      };
      if (this.message === "") return;
      this.list.unshift(obj);
    },
  },
};
</script>

<style>
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
.content > div button {
  position: absolute;
  bottom: 1vh;
  left: 20vh;
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
</style>
