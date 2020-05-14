<!-- 功能简略与classlist -->
<template>
  <div id="NewClass">
    <h1 class="TopTitle">新增班级</h1>

    <el-form :model="Class" :rules="rules" ref="Class" label-width="100px" class="Class">
      <el-form-item label="班级名称" prop="classname">
        <el-input type="text" v-model="Class.classname"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('Class')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      Class: {
        classname: ""
      },
      rules: {
        classname: [
          { required: true, message: "班级名称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      console.log(this.Class.classname);
      this.loadingbtn = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = this.HOST + "/addClass";
          this.$axios({
            method: "get",
            url,
            params: this.Class
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

