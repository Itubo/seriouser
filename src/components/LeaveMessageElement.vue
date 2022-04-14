<template>
  <div class="messageBox">
    <ul>
      <li v-for="(item, index) of list" :key="index">
        {{
          item.look === true ? item.content : "距离开启还有 " + item.day + " 天"
        }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "LeaveMessageElement",
  data() {
    return {};
  },
  props: ["list"],
  methods: {},
  mounted() {
    console.log(this.list);
  },
};
</script>

<style scoped>
.messageBox ul li {
  height: 10vh;
  margin-bottom: 5px;
  text-align: center;
  line-height: 10vh;
  max-width: 100%;
  border-radius: 0.625rem;
  word-wrap: break-word;
  word-break: break-all;
  background-color: rgb(76, 175, 80);
  color: #fff;
}
</style>
