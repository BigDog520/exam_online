<template>
  <div id="bg">
    <h1 id="title">exam_online</h1>
    <el-card class="box-card" id="login">
      <h2>登录</h2>
      <el-form
        :model="loginData"
        status-icon
        :rules="rules"
        ref="loginData"
        label-width="70px"
        class="loginForm"
      >
        <el-form-item label="学号" prop="num">
          <el-input v-model.number="loginData.num"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="loginData.pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="role">
          <div style="width:60%">
            <el-radio v-model="loginData.role" label="student">学生</el-radio>
            <el-radio v-model="loginData.role" label="teacher">教师</el-radio>
          </div>
          <div class="reg">
            没有账号？
            <router-link to="register">立即注册</router-link>
          </div>
        </el-form-item>
        <el-form-item style="margin:0 auto;">
          <el-button
            type="primary"
            @click="submitForm('loginData')"
            style="width: 45%;"
            :loading="loadingbtn"
          >登录</el-button>
          <el-button @click="resetForm('loginData')" style="width: 45%;">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkNum = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入学号"));
      } else if (!Number.isInteger(value)) {
        callback(new Error("请输入正确的学号"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loadingbtn: false,
      loginData: {
        num: "",
        pwd: "",
        role:"student"
      },
      rules: {
        pwd: [{ validator: validatePass, trigger: "blur" }],
        num: [{ validator: checkNum, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loadingbtn = true;
          var url = this.HOST + "/login";
          this.$axios({
            method: "get",
            url: url,
            params: this.loginData
          })
            .then(res => {
              this.loadingbtn = false;
              if (res.data == "success") {
                this.$router.push("/index");
              } else {
                this.$message.error("错误：" + res.data);
                // this.loginData.pwd = "";
              }
            })
            .catch(error => {
              this.loadingbtn = false;
              console.log(error);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
#bg {
  width: 100%;
  height: 100%;
  background: url("../assets/background.jpg") no-repeat 4px 5px;
}
#login {
  width: 450px;
  margin: 0 auto;
  position: relative;
  top: 10%;
  background-color: #f5f5f5;
}

#login h2 {
  text-align: center;
  margin-bottom: 10px;
}
#title {
  width: 100%;
  text-align: center;
  padding-top: 70px;
  color: #ffa217;
}
.reg {
  text-align: right;
  margin-right: 20px;
}
.reg a {
  text-decoration: none;
  color: #ffa217;
}
</style>