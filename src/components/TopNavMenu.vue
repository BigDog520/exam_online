<template>
  <el-row type="flex" class="row-bg" justify="space-between">
    <el-col>
      <h3 style="padding-left:20px;color:#FFB208;">exam_online</h3>
    </el-col>
    <img src="../assets/2.jpeg" class="photo" />
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#2B3643"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="1">
        <template slot="title">{{ username }}，您好</template>
        <router-link tag="el-menu-item" to="/login">退出</router-link>
      </el-submenu>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      username: ""
    };
  },
  mounted  () {
    let url = this.HOST + "/username";
    this.$axios({
      url,
      method: "get"
    })
      .then(res => {
        if (res.data == "login") {
          this.$router.push("/login");
        } else if (res.data.role == "teacher") {
          this.username = res.data.teacher_name + "老师";
          this.$router.push("/index");
        } else if (res.data.role == "student") {
          this.username = res.data.stu_name + "同学";
          this.$router.push("/stuindex");
        }
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
header ul {
  padding: 0 20px;
}
.photo {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-top: 15px;
  margin-right: -30px;
  z-index: 2;
}
</style>