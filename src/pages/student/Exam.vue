<template>
  <div id="app">
    <div class="left">
      <h4>学生信息</h4>
      <el-card class="left-card">
        <div class="info">姓名：{{info.stu_name}}</div>
        <div class="info">学号：{{info.stu_num}}</div>
        <div class="info">科目：{{info.sub}}</div>
      </el-card>
      <div style="margin-top:200px;">
        <el-button type="success" circle>
          <i class="el-icon-back"></i>上一题
        </el-button>
        <el-button type="success" circle @click="nextTitle" v-if="next">
          下一题
          <i class="el-icon-right"></i>
        </el-button>
        <el-button type="info" @click="submit">提交</el-button>
      </div>
    </div>
    <div class="right">
      <h4>试题</h4>
      <Choice :item="item"></Choice>
      <el-form ref="form" :model="form" label-width="80px" class="el-form">
        <el-form-item label="答案" required>
          <el-input type="input" v-model="form.answer"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Choice from "@/pages/student/Choice";
export default {
  data() {
    return {
      score: 0,
      count: 1,
      next: true,
      info: {
        stu_name: "胡大洪",
        stu_num: 2016131608,
        sub: "Node"
      },
      item: {
        // item_name: "console有哪些常用方法?",
        // A_option: "console.log/console.info",
        // B_option: "console.error/console.warning",
        // C_option: "console.time/console.timeEnd",
        // D_option: "console.table"
      },
      form: { answer: "" }
    };
  },
  mounted() {
    var url = this.HOST + "/random";
    this.$axios({
      method: "get",
      url: url,
      params: {
        sub_id: this.$route.query.sub_id
      }
    })
      .then(res => {
        this.item = res.data[0];
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    submit: function() {
      this.$router.push({
        path: "/stuindex/ExamList",
        query: { disabled: "true", score: this.score }
      });
    },
    nextTitle: function() {
      this.count++;
      if (this.count > 5) {
        this.next = false;
      }
      if (this.item.item_answer == this.form.answer) {
        this.score += 20;
      }
      this.form.answer = "";
      var url = this.HOST + "/random";
      this.$axios({
        method: "get",
        url: url,
        params: {
          sub_id: this.$route.query.sub_id
        }
      })
        .then(res => {
          this.item = res.data[0];
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    Choice
  }
};
</script>

<style>
.left {
  float: left;
}
.right {
  float: right;
}
.text {
  font-size: 14px;
}
.item {
  padding: 18px 0;
}
.left-card {
  width: 300px;
}
.right-card {
  width: 750px;
  height: 350px;
}
h4 {
  padding-bottom: 10px;
  padding-left: 5px;
}
.info {
  font-size: 16px;
  padding: 5px 0;
}
.right-card .option {
  font-size: 16px;
  padding: 5px 0;
}
.el-form {
  padding-top: 50px;
  margin-left: -50px;
}
</style>