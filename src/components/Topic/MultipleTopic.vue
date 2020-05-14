<template>
  <div id="MultipleTopic">
    <el-form
      :model="MultipleTopic"
      ref="MultipleTopic"
      label-width="100px"
      :rules="rules"
      class="MultipleTopic"
    >
      <el-form-item
        label="题目"
        prop="title"
        :rules="{
          required: true, message: '题目不能为空', trigger: 'blur'
        }"
      >
        <el-input type="textarea" v-model="MultipleTopic.title"></el-input>
      </el-form-item>

      <el-form-item
        v-for="(domain, index) in MultipleTopic.domains"
        :label="readyoption[index]"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{
          required: true, message: '选项不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="domain.value"></el-input>
        <el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>

      <el-form-item
        label="正确答案"
        prop="answer"
        :rules="{ required: true, message: '请选择答案', trigger: 'blur' }"
      >
        <el-checkbox-group v-model="MultipleTopic.answer">
          <el-checkbox
            v-for="(domain, index) in MultipleTopic.domains"
            :key="domain.key"
            :label="readyoption[index]"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('MultipleTopic')" :loading="loadingbut">立即添加</el-button>
        <el-button @click="addDomain">新增选项</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["subject"],
  data() {
    return {
      loadingbut: false,
      readyoption: ["A", "B", "C", "D", "E", "F"],
      MultipleTopic: {
        title: "",
        answer: [],
        domains: [
          {
            value: ""
          },
          {
            value: ""
          },
          {
            value: ""
          },
          {
            value: ""
          }
        ],
        email: ""
      },
      rules: {}
    };
  },
  methods: {
    submitForm(formName, e) {
      // this.loadingbut = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.HOST + "addSingle";
          this.MultipleTopic.type = "多选题";
          this.MultipleTopic.subject = this.subject;
          this.MultipleTopic.date = new Date().getTime();
          if ((this.MultipleTopic.domains.length = 4)) {
            this.MultipleTopic.domains[4] = null;
            this.MultipleTopic.domains[5] = null;
          }
          if ((this.MultipleTopic.domains.length = 5)) {
            this.MultipleTopic.domains[5] = null;
          }
          console.log(this.MultipleTopic);
          this.$axios({
            url,
            method: "get",
            params: this.MultipleTopic
          })
            .then(res => {
              // this.loadingbut = false;
              if (res.data == "success") {
                this.$message({
                  showClose: true,
                  message: "添加成功！",
                  type: "success"
                });
                this.MultipleTopic.domains.length = 4;
                this.$refs[formName].resetFields();
              } else {
                this.$message.error("错误：" + res.data);
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
    removeDomain(item) {
      if (this.MultipleTopic.domains.length <= 4) {
        this.$message({
          showClose: true,
          message: "删除选项失败，选项不能过少！",
          type: "error"
        });
      } else {
        var index = this.MultipleTopic.domains.indexOf(item);
        if (index !== -1) {
          this.MultipleTopic.domains.splice(index, 1);
        }
      }
    },
    addDomain() {
      if (this.MultipleTopic.domains.length >= this.readyoption.length) {
        this.$message({
          showClose: true,
          message: "添加选项失败，选项不能过多！",
          type: "error"
        });
      } else {
        this.MultipleTopic.domains.push({
          value: ""
        });
      }
    }
  }
};
</script>

<style scoped>
.el-input {
  width: 92%;
}
</style>