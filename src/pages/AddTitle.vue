<template>
  <div id="addTitle">
    <h1 class="TopTitle">新增试题</h1>
    <el-form label-width="80px">
      <el-form-item label="试题类型">
        <el-radio-group v-model="type">
          <el-radio border label="1">单选题</el-radio>
          <el-radio border label="2">多选题</el-radio>
          <el-radio border label="3">判断题</el-radio>
          <el-radio border label="4">填空题</el-radio>
          <el-radio border label="5">应用题</el-radio>
        </el-radio-group>
        <div style="float:right">
          <label>科目：</label>
          <el-select v-model="ChooseSubject" placeholder="请选择科目" >
            <el-option
              v-for="item in subject"
              :key="item.sub_id"
              :label="item.sub_name"
              :value="item.sub_id"
            ></el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>
    <keep-alive>
      <component :is="currentComponent" :subject="ChooseSubject"></component>
    </keep-alive>
  </div>
</template>


<script>
import SingleTopic from "@/components/Topic/SingleTopic";
import MultipleTopic from "@/components/Topic/MultipleTopic";
import JudgeTopic from "@/components/Topic/JudgeTopic";
import FillInTheBlank from "@/components/Topic/FillInTheBlank";
import Application from "@/components/Topic/Application";

export default {
  data() {
    return {
      type: "1",
      ChooseSubject: "",
      subject: [],
      currentComponent: SingleTopic
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
  watch: {
    type: {
      handler(n, o) {
        switch (n) {
          case "1":
            this.currentComponent = SingleTopic;
            break;
          case "2":
            this.currentComponent = MultipleTopic;
            break;
          case "3":
            this.currentComponent = JudgeTopic;
            break;
          case "4":
            this.currentComponent = FillInTheBlank;
            break;
          case "5":
            this.currentComponent = Application;
            break;
          default:
            break;
        }
      }
    }
  }
};
</script>

<style scoped>
#title {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}
</style>