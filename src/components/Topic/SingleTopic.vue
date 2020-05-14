<template>
  <div id="SingleTopic">
    <el-form
      :model="SingleTopic"
      :rules="rules"
      ref="SingleTopic"
      label-width="100px"
      class="SingleTopic"
    >
      <el-form-item label="题目" prop="title">
        <el-input type="textarea" v-model="SingleTopic.title"></el-input>
      </el-form-item>
      <el-form-item label="A" prop="topicA">
        <el-input v-model="SingleTopic.topicA"></el-input>
      </el-form-item>
      <el-form-item label="B" prop="topicB">
        <el-input v-model="SingleTopic.topicB"></el-input>
      </el-form-item>
      <el-form-item label="C" prop="topicC">
        <el-input v-model="SingleTopic.topicC"></el-input>
      </el-form-item>
      <el-form-item label="D" prop="topicD">
        <el-input v-model="SingleTopic.topicD"></el-input>
      </el-form-item>
      <el-form-item label="正确答案" prop="answer">
        <el-radio-group v-model="SingleTopic.answer">
          <el-radio label="A"></el-radio>
          <el-radio label="B"></el-radio>
          <el-radio label="C"></el-radio>
          <el-radio label="D"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('SingleTopic')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["subject"],
  data() {
    return {
      SingleTopic: {
        title: "",
        topicA: "",
        topicB: "",
        topicC: "",
        topicD: "",
        answer: ""
      },
      rules: {
        title: [{ required: true, message: "题目不能为空", trigger: "blur" }],
        topicA: [{ required: true, message: "A选项不能为空", trigger: "blur" }],
        topicB: [{ required: true, message: "B选项不能为空", trigger: "blur" }],
        topicC: [{ required: true, message: "C选项不能为空", trigger: "blur" }],
        topicD: [{ required: true, message: "D选项不能为空", trigger: "blur" }],
        answer: [{ required: true, message: "请选择正确答案", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.HOST + "addSingle";
          this.SingleTopic.type = '单选题';
          this.SingleTopic.subject = this.subject;
          this.SingleTopic.date = new Date().getTime();
          console.log(this.SingleTopic)
          this.$axios({
            url,
            method: "get",
            params: this.SingleTopic
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