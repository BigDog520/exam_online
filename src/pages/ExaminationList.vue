<template>
  <div id="ExaminationList">
    <h1 class="TopTitle">试卷列表</h1>

    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column prop="exampaper_name" label="试卷名称" class="name"></el-table-column>
      <el-table-column prop="exampaper_degree" label="难易度" class="facility" width="120"></el-table-column>
      <el-table-column label="开始时间" class="start" width="180">
        <div slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.exampaper_start | filterDate }}</span>
        </div>
      </el-table-column>
      <el-table-column prop="sub_id" label="科目" class="subject" width="120"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <!-- <el-button size="mini">编辑</el-button> -->
          <el-button type="primary" size="mini" @click="AddStudent(scope.row.exampaper_id)">添加考生</el-button>
          <el-button type="danger" size="mini" @click="deletelist(scope.row.exampaper_id)">删除</el-button>
        </template>
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
      count: 1,
      tableData: []
    };
  },
  mounted() {
    var url = this.HOST + "/examinationlist";
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
        // this.count = res.data.len;
        this.tableData = res.data.row;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    changeclick: function(val) {
      // var url = this.HOST + "/classlist";
      // this.$axios({
      //   method: "get",
      //   url: url,
      //   params: {
      //     offsize: (val - 1) * 5,
      //     sreachClassName: this.sreachClassName
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
    AddStudent: function(id) {
      this.$router.push({
        path: "/index/AddStudent",
        query: { exampaper_id: id }
      });
    },
    deletelist: function(exampaper_id) {
      var url = this.HOST + "/deletelist";
      this.$axios({
        method: "get",
        url: url,
        params: {
          column: "exampaper_id",
          id: exampaper_id,
          table: "exampaper_table"
        }
      })
        .then(res => {
          if (res.data == "success") {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.$router.go(0)
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  filters: {
    filterDate(val) {
      val = parseInt(val);
      var date = new Date(val);
      console.log(date, val);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
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
</style>

