<template>
  <el-menu
    default-active="HomePage"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :router="true"
  >
    <el-menu-item index="HomePage">
      <i class="el-icon-setting"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-edit"></i>
        <span>题库管理</span>
      </template>
      <el-menu-item index="TitleList">题库列表</el-menu-item>
      <el-menu-item index="AddTitle">新增试题</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-printer"></i>
        <span>考生管理</span>
      </template>
      <el-menu-item index="StudentList">学生列表</el-menu-item>
      <el-menu-item index="TeachClass">所教班级</el-menu-item>
      <el-menu-item index="ClassList">班级列表</el-menu-item>
      <!-- <el-menu-item index="NewClass">新增班级</el-menu-item> -->
    </el-submenu>
    <el-menu-item index="CourseList">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">科目列表</span>
    </el-menu-item>
    <!-- <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span>科目管理</span>
      </template>
      <el-menu-item index="CourseList">科目列表</el-menu-item>
      <el-menu-item index="NewCourse">新增科目</el-menu-item>
    </el-submenu>-->
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-tickets"></i>
        <span>试卷管理</span>
      </template>
      <el-menu-item index="ExaminationList">试卷列表</el-menu-item>
      <el-menu-item index="NewExamination">新增试卷</el-menu-item>
    </el-submenu>
    <!-- <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-location-outline"></i>
        <span>考卷管理</span>
      </template>
      <el-menu-item index="6-1">学生考卷</el-menu-item>
    </el-submenu> -->
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