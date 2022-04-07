<template>
  <div>
    <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @blur="emitValue"
        @click="changeNullStatus"
        background="#4fc08d"
        shape="round"
    />
  </div>
</template>

<script>
  export default {
    name: 'SearchBar',
    data() {
      return {
        value: '',
      }
    },
    methods: {
      emitValue() {
        if(this.value === '') return;
        this.$bus.$emit('getValue',this.value);
      },
      changeNullStatus() {
        this.$bus.$emit('setShowNullFalse');
      }
    }
  }
</script>

<style scoped>
/*.van-search__content {*/
/*  border-radius: 5px;*/
/*}*/
</style>
