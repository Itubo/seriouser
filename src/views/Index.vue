<template>
  <div class="index">
    <div v-if="!showDetails">
      <SearchBar></SearchBar>
      <List v-if="showList" :showDetails="showDetails">
      </List>
      <NullStatus :title="title" :image="image" v-if="showNull" :tips="tips"></NullStatus>
      <van-loading
          v-if="atLoading"
          color="rgb(7, 193, 96)"
          vertical
          size="30px"
      >加载中...</van-loading>
    </div>
    <div class="detailsInfo" v-if="showDetails">
      <Details :item="this.detailsElement"></Details>
    </div>
  </div>
</template>

<script>
import List from "@/components/List";
import SearchBar from "@/components/SearchBar";
import NullStatus from "../components/common/NullStatus";
import Details from "../components/IndexDetails/Details";
  export default {
    name: 'FontPage',
    data() {
      return {
        showNull: false, //展示错误 或者空时的界面显示
        atLoading: false,  // 加载界面
        showList: true,   // 展示列表
        title: '搜索结果为空',
        image: 'search',
        tips: '下拉刷新',
        showDetails: false,
        detailsElement: {},
      }
    },
    components: {
      SearchBar,
      List,
      NullStatus,
      Details,
    },
    methods: {
      //网络错误
      getError() {
        console.log('我被调用了！');
        this.title = '网络错误';
        this.image = 'network';
        this.tips = '请检查网络设置';
        this.showNull = true;
        this.atLoading = !this.showNull;
        this.showList = !this.showNull;
      },
      //搜索结果为空
      getNull() {
        this.tips = '请重新输入内容';
        this.showNull = true;
        this.showList = false;
        this.atLoading = false;
      },
      //修改状态：
      setShowNullFalse() {
        this.showNull = false;
        this.showList = true;
        this.atLoading = false;
      },
      setLoading() {
        this.atLoading = true;
        this.showNull = false;
        this.showList = false;
      },
      //是否展示详情页
      changePageShow(boo,value) {
        this.showDetails = boo;
        if(value!=='') {
          this.setDetailElement(value);
        }
      },
      setDetailElement(value) {
        this.detailsElement = value;
      }
    },
    mounted() {
      //在bus 上 注册一个 获取网络错误的 事件
      this.$bus.$on('getError',this.getError);
      // 当返回结果为空时
      this.$bus.$on('getNull',this.getNull);
      //当 设置 图片
      this.$bus.$on('setShowNullFalse',this.setShowNullFalse);
      //设置 修改加载状态事件
      this.$bus.$on('setLoading',this.setLoading);
      // 选择展示 主界面 还是 详情页
      this.$bus.$on("changePageShow",this.changePageShow);
    },
    beforeDestroy() {
      // 解除事件绑定
      this.$bus.$off('getError');
      this.$bus.$off('getNull');
      this.$bus.$off('setShowNullFalse');
      this.$bus.$off('setLoading');
      this.$bus.$off('changePageShow');
    }
  }
</script>

<style scoped>
.index {
  height: 90vh;
}
.index>div {
  height: 100%;
}
</style>
