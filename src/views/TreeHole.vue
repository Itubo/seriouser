<template>
  <div>
    <!-- headerBar -->
    <div class="treeholeBar">
      <Navbar title="旧 . 树" />
    </div>
    <div class="treeholeElement">
      <TreeHoleBox :list="list" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../components/common/Navbar.vue";
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
    };
  },
  components: {
    Navbar,
    TreeHoleBox,
  },
  methods: {
    showMessage(item) {
      item.show_message = !item.show_message;
    },
  },
  mounted() {
    let _that = this;
    console.log("我进入了！");
    axios
      .post(`/treehole/page${this.p}`)
      .then((res) => {
        _that.list = res.data.data;
        console.log(_that.list);
        _that.list = _that.list.filter((p) => {
          p.img_url =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/%27Ommelozen_boom%27.jpg/250px-%27Ommelozen_boom%27.jpg";
          p.img_url_in = [];
          p.likes = false;
          p.collected = false;
          return true;
        });
        console.log(res.data);
      })
      .catch((err) => {
        // Toast("网络错误！");
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
.treeholeElement {
  width: 100%;
  height: 85vh;
  overflow-y: auto;
  margin-top: -15px;
}
</style>
