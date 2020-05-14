
<template>
  <div id="NewCourse">
    <h1 class="TopTitle">新增科目</h1>

    <el-form :model="Course" :rules="rules" ref="Course" label-width="100px" class="Course">
      <el-form-item label="科目名称" prop="title">
        <el-input type="text" v-model="Course.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Course')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      Course: {
        title: ""
      },
      rules: {
        title: [
          { required: true, message: "科目名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loadingbtn = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = this.HOST + "/addCourse";
          this.$axios({
            method: "get",
            url,
            params: this.Course
          })
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
                this.$refs[formName].resetFields();
              } else {
                this.$message.error("错误：" + res.data);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>

