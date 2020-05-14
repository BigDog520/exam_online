<template>
  <div id="JudgeTopic">
    <el-form
      :model="JudgeTopic"
      :rules="rules"
      ref="JudgeTopic"
      label-width="100px"
      class="JudgeTopic"
    >
      <el-form-item label="题目" prop="title">
        <el-input type="textarea" v-model="JudgeTopic.title"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="answer">
        <el-radio-group v-model="JudgeTopic.answer">
          <el-radio label="正确"></el-radio>
          <el-radio label="错误"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('JudgeTopic')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["subject"],
  data() {
    return {
      JudgeTopic: {
        title: "",
        answer: ""
      },
      rules: {
        title: [{ required: true, message: "题目不能为空", trigger: "blur" }],
        answer: [{ required: true, message: "请选择答案", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.HOST + "addJudge";
          this.JudgeTopic.type = '判断题';
          this.JudgeTopic.subject = this.subject;
          this.JudgeTopic.date = new Date().getTime();
          this.$axios({
            url,
            method: "get",
            params: this.JudgeTopic
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
    },
  }
};
</script>

<style>
</style>