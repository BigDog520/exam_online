<!-- 功能简略与classlist -->
<template>
  <div id="NewClass">
    <h1 class="TopTitle">考试列表</h1>

    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="exampaper_name" label="试卷名称"></el-table-column>
      <el-table-column prop="sub_id" label="科目"></el-table-column>
      <el-table-column prop="exampaper_start" label="开始时间"></el-table-column>
      <el-table-column prop="exampaper_end" label="结束时间"></el-table-column>
      <el-table-column prop="score" label="试卷得分"></el-table-column>
      <el-table-column label="操作" width="160">
        <el-button type="primary" @click="exam" :disabled="disabled">开始考试</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="5"
      :total="count"
      class="pagination"
      @current-change="changeclick"
    ></el-pagination>
  </div>
</template>


<script>
export default {
  data() {
    return {
      count: 0,
      tableData: [],
      count: 0,
      disabled:false
    };
  },
  mounted() {
    var data = this.$route.query
    if(data.disabled == 'true'){
      this.disabled = true
    }
    

    var url = this.HOST + "/examlist";
    this.$axios({
      method: "get",
      url: url,
      params: {
        offsize: 0
      }
    })
      .then(res => {
        if (res.data == "login") {
          this.$router.push("/login");
        }
        this.tableData = res.data;
        if(data.score){
          this.tableData[0].score = data.score
        }
        console.log(this.tableData)
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    changeclick: function(val) {
      // var url = this.HOST + "/examlist";
      // this.$axios({
      //   method: "get",
      //   url: url,
      //   params: {
      //     offsize: (val - 1) * 5,
      //   }
      // })
      //   .then(res => {
      //     this.count = res.data.len;
      //     this.tableData = res.data.row;
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    exam: function() {
      console.log(this.tableData[0].sub_id);
      this.$router.push({
        path: "/stuindex/Exam",
        query: { sub_id: this.tableData[0].sub_id }
      });
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.search {
  width: 40%;
  margin-bottom: 10px;
}
</style>

