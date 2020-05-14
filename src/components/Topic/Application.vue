<template>
  <div id="Application">
    <el-form
      :model="ApplicationTopic"
      :rules="rules"
      ref="ApplicationTopic"
      label-width="100px"
      class="ApplicationTopic"
    >
      <el-form-item label="题目" prop="title">
        <el-input type="textarea" v-model="ApplicationTopic.title"></el-input>
      </el-form-item>
      <el-form-item label="参考答案" prop="answer">
        <el-input type="textarea" v-model="ApplicationTopic.answer"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ApplicationTopic')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["subject"],
  data() {
    return {
      ApplicationTopic: {
        title: "",
        answer: ""
      },
      rules: {
        title: [{ required: true, message: "题目不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.HOST + "addJudge";
          this.ApplicationTopic.type = '应用题';
          this.ApplicationTopic.subject = this.subject;
          this.ApplicationTopic.date = new Date().getTime();
          this.$axios({
            url,
            method: "get",
            params: this.ApplicationTopic
          })
            .then(res => {
              if (res.data == 'success') {
                
                this.$message({
                  showClose: true,
                  message: "添加成功！",
                  type: "success"
                });
                this.$refs[formName].resetFields();
              }else{
                this.$message.error("错误："+res.data)
              }
            })
            .catch(error => {
              throw error;
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

<style>
</style>