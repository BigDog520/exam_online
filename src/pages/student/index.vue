<template>
  <div class="personal">
    <div class="welcome">{{name}}，欢迎您光临在线考试系统</div>
    <div class="info">{{num}}</div>
    <div class="info">您的身份为：{{role}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      num: 0,
      role: ""
    };
  },

  mounted() {
    let url = this.HOST + "/username";
    this.$axios({
      url,
      method: "get"
    })
      .then(res => {
        if (res.data == "login") {
          this.$router.push("/login");
        } else if (res.data.role == "student") {
          this.role = "学生";
          this.name = res.data.stu_name + "同学";
          this.num = "学号为：" + res.data.stu_name;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.personal {
  box-sizing: border-box;
  padding: 50px 30px;
  height: 90vh;
}
.welcome {
  font-size: 40px;
  padding-bottom: 15px;
}
.info {
  margin: 20px 0;
  font-size: 26px;
  color: #999;
}
</style>