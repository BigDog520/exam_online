<!-- 功能简略与classlist -->
<template>
  <div id="NewExamination">
    <h1 class="TopTitle">新增试卷</h1>

    <el-form
      :model="Examination"
      :rules="rules"
      ref="Examination"
      label-width="100px"
      class="Examination"
    >
      <el-form-item label="试卷名称" prop="Examinationname">
        <el-input type="text" v-model="Examination.Examinationname"></el-input>
      </el-form-item>
      <el-form-item label="科目" prop="ChooseSubject">
        <el-select v-model="Examination.ChooseSubject" placeholder="请选择科目">
          <el-option
            v-for="item in subject"
            :key="item.sub_id"
            :label="item.sub_name"
            :value="item.sub_id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="考试时间" required>
        <el-col :span="11">
          <el-form-item prop="start_time">
            <el-date-picker
              type="datetime"
              placeholder="开始时间"
              :picker-options="start_time"
              value-format="timestamp"
              v-model="Examination.start_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="1">-</el-col>
        <el-col :span="11">
          <el-form-item prop="end_time">
            <el-date-picker
              type="datetime"
              placeholder="结束时间"
              :picker-options="end_time"
              value-format="timestamp"
              v-model="Examination.end_time"
              style="width: 100%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('Examination')">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      subject: "",
      Examination: {
        Examinationname: "",
        ChooseSubject: "",
        start_time: "",
        end_time: ""
      },
      start_time: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      end_time: {
        disabledDate: time => {
          //   if (this.Examination.start) {
          //     return time.getTime() < this.Examination.start;
          //   }
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      rules: {
        Examinationname: [
          { required: true, message: "试卷名称不能为空", trigger: "blur" }
        ],
        ChooseSubject: [
          { required: true, message: "科目不能为空", trigger: "blur" }
        ],
        start_time: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        end_time: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  mounted() {
    var url = this.HOST + "/subject_list";
    this.$axios({
      url,
      method: "get"
    })
      .then(res => {
        if (res.data == "success") {
          this.$router.push("/login");
        }
        this.subject = res.data;
        this.ChooseSubject = res.data[0].sub_id;
      })
      .catch(err => {
        throw err;
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let url = this.HOST + "/addExamination";
          this.$axios({
            method: "get",
            url,
            params: this.Examination
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
#NewExamination {
  margin: 20px auto;
  width: 60%;
}
.line {
  text-align: center;
}
</style>

