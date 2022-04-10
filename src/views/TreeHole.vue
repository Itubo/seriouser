<template>
  <div>
    <!-- headerBar -->
    <div class="treeholeBar">
      <Navbar title="旧 . 树"> </Navbar>
      <div class="menu">
        <pop-list></pop-list>
      </div>
    </div>
    <div class="treeholeElement">
      <TreeHoleBox :list="list" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/common/Navbar.vue";
import PopList from "../components/common/PopList.vue";
import TreeHoleBox from "../components/treeholebox/TreeHoleBox.vue";
export default {
  name: "TreeHole",
  data() {
    return {
      baseURL:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg",
      list: [
        {
          img_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg",
          uid: "1",
          content:
            "这是内容内容很长，让给我用一生来演唱。请你给我机会，我会给你一个满意的回答",
          img_url_in: [
            "https://img01.yzcdn.cn/vant/cat.jpeg",
            "https://img01.yzcdn.cn/vant/cat.jpeg",
            "https://img01.yzcdn.cn/vant/cat.jpeg",
          ],
          likes: false,
          collected: false,
          show_message: false,
        },
        {
          img_url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg",
          uid: "2",
          content: "这是内容",
          img_url_in: [],
          likes: false,
          collected: false,
          show_message: false,
        },
      ],
      p: 1,
      //顶部弹出框
    };
  },
  components: {
    Navbar,
    TreeHoleBox,
    PopList,
  },
  methods: {
    showMessage(item) {
      // console.log("我调用你");
      this.list[this.list.indexOf(item)].show_message = !item.show_message;
    },
    //处理 顶部弹出框 弹出的事件
    onSelect(action) {
      Toast(action.text);
    },
  },
  mounted() {
    let _that = this;
    // console.log("我进入了！");
    axios
      .post("/treehole/showAll")
      .then((res) => {
        let comment = res.data.data.comment;
        let treehole = res.data.data.treehole;
        let arr = [];
        treehole.forEach((item, i) => {
          treehole[i].ccontent = [];
        });
        treehole.forEach((item, i) => {
          comment.forEach((value, j) => {
            if (value.tid === item.tid) {
              treehole[i].ccontent.unshift(value.ccontent);
              treehole[i].ctime = value.time;
            }
          });
        });
        _that.list = treehole;
        _that.list = _that.list.filter((p) => {
          p.img_url =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg";
          p.img_url_in = [];
          p.likes = false;
          p.collected = false;
          p.show_message = false;
          return true;
        });
      })
      .catch((err) => {
        console.log("出现错误！", err);
      });
    this.$bus.$on("showMessage", this.showMessage);
  },
};
</script>

<style>
.all {
  background-color: rgb(7, 193, 96);
  color: #fff;
}
.menu {
  position: absolute;
  top: 3vh;
  right: 2vh;
}
.treeholeElement {
  width: 100%;
  height: 85vh;
  overflow-y: auto;
  margin-top: -15px;
}
</style>
