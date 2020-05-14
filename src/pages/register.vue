<template>
  <div id="bg">
    <h1 id="title">exam_online</h1>
    <el-card class="box-card" id="register">
      <h2>注册</h2>
      <el-form
        :model="registerData"
        status-icon
        :rules="rules"
        ref="registerData"
        label-width="80px"
        class="registerForm"
      >
        <el-form-item prop="role">
          <div style="width:60%">
            <el-radio v-model="registerData.role" label="student">学生</el-radio>
            <el-radio v-model="registerData.role" label="teacher">教师</el-radio>
          </div>
          <div class="login">
            已有账号？
            <router-link to="login">立即登录</router-link>
          </div>
        </el-form-item>
        <el-form-item label="学校" prop="school">
          <el-input v-model="registerData.school" placeholder="广东科技学院"></el-input>
        </el-form-item>
        <el-form-item v-if="registerData.role == 'student'" label="班级" prop="class">
          <el-input v-model="registerData.class" placeholder="16软件工程1班"></el-input>
        </el-form-item>
        <el-form-item :label="registerData.role == 'student'?'学号':'教工号'" prop="id">
          <el-input v-model.number="registerData.id" :placeholder="registerData.role == 'student'?'2016131608':'520131'"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="registerData.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input type="password" v-model="registerData.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="CheckPwd">
          <el-input type="password" v-model="registerData.CheckPwd"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="registerData.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width:100%;margin-top:20px;"
            @click="registerBtn('registerData')"
          >注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var CheckPass = (rule, value, callback) => {
      if (value !== this.registerData.pwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var isCellPhone = (rule, value, callback) => {
      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(value)) {
        callback(new Error("请输入正确的联系方式"));
      } else {
        callback();
      }
    };
    var CheckNum = (rule, value, callback) => {
      if(this.registerData.role == 'student'){
        if (!/^\d{10}$/.test(value)) {
          callback(new Error("请输入正确的学号"));
        } else {
          callback();
        }
      }else{
        if (!/^\d{6}$/.test(value)) {
          callback(new Error("请输入正确的教工号"));
        } else {
          callback();
        }
      }
    };
    return {
      iderrormsg: "",
      registerData: {
        id: "",
        school: "",
        name: "",
        class: "",
        pwd: "",
        CheckPwd: "",
        phone: "",
        role: "student"
      },
      rules: {
        school: [
          { trigger: "blur", required: true, message: "请输入您的学校" }
        ],
        id: [
          { trigger: "blur", required: true, message: "请输入您的学号" },
          {
            validator: CheckNum,
            trigger: "blur"
          }
        ],
        pwd: [{ trigger: "blur", required: true, message: "请输入您的密码" }],
        CheckPwd: [
          {
            trigger: "blur",
            required: true,
            message: "请再次输入您的密码"
          },
          {
            validator: CheckPass,
            trigger: "blur"
          }
        ],
        name: [{ trigger: "blur", required: true, message: "请输入您的姓名" }],
        class: [{ trigger: "blur", required: true, message: "请输入您的班级" }],
        phone: [
          { trigger: "blur", required: true, message: "请输入您的联系方式" },
          {
            validator: isCellPhone,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    registerBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.HOST + "/register";
          this.$axios({
            method: "get",
            url: url,
            params: this.registerData
          })
            .then(res => {
              if (res.data == "success") {
                this.$router.push("/login");
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
#bg {
  width: 100%;
  height: 100%;
  background: url("../assets/background.jpg") no-repeat 4px 5px;
}
#register {
  width: 450px;
  margin: 0 auto;
  position: relative;
  top: 10%;
  background-color: #f5f5f5;
}

#register h2 {
  text-align: center;
  margin-bottom: 10px;
}
#title {
  width: 100%;
  text-align: center;
  padding-top: 40px;
  color: #ffa217;
}
.login {
  text-align: right;
  margin-right: 20px;
}
.login a {
  text-decoration: none;
  color: #ffa217;
}
</style>