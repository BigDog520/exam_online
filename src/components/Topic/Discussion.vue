<template>
  <div id="Discussion">
    <el-form
      :model="DiscussionTopic"
      :rules="rules"
      ref="DiscussionTopic"
      label-width="100px"
      class="DiscussionTopic"
    >
      <el-form-item label="题目" prop="title">
        <el-input type="textarea" v-model="DiscussionTopic.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('DiscussionTopic')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["subject"],
  data() {
    return {
      loadingbtn: false,
      DiscussionTopic: {
        title: "",
        answer: ""
      },
      rules: {
        title: [{ required: true, message: "题目不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.loadingbtn = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.HOST + "addJudge";
          this.DiscussionTopic.type = '简答题';
          this.DiscussionTopic.subject = this.subject;
          this.DiscussionTopic.date = new Date().getTime();
          this.$axios({
            url,
            method: "get",
            params: this.DiscussionTopic
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