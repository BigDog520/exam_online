<template>
  <el-menu
    default-active="StuPage"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :router="true"
  >
    <el-menu-item index="StuPage">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="ExamList">
      <i class="el-icon-tickets"></i>
      <span slot="title">在线考试</span>
    </el-menu-item>
    <!-- <el-menu-item index="Score">
      <i class="el-icon-printer"></i>
      <span slot="title">查看成绩</span>
    </el-menu-item> -->
  </el-menu>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
aside ul {
  height: 100%;
}
</style>