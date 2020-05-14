<template>
  <div id="Courselist">
    <h1 class="TopTitle">科目列表</h1>
    <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:10px;">
      <el-col :span="6">
        <el-button type="primary" @click="add_course">新增科目</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column prop="sub_name" label="科目名称" class="sub_name"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <!-- <el-button type="info" icon="el-icon-edit" circle></el-button> -->
          <el-button
            type="danger"
            @click="deletelist(scope.row.sub_id)"
            icon="el-icon-delete"
            circle
          ></el-button>
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
      tableData: [],
      count: 0,
      sreachClassName: "",
      sreach: ""
    };
  },
  mounted() {
    var url = this.HOST + "/CourseList";
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
        this.count = res.data.count;
        this.tableData = res.data.row;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    add_course() {
      this.$prompt("请输入科目名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\u4e00-\u9fa5\w]{1,10}/,
        inputErrorMessage: "科目名称不能为空"
      })
        .then(({ value }) => {
          var url = this.HOST + "/addCourse";
          this.$axios({
            method: "get",
            url: url,
            params: {
              sub_name: value
            }
          })
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  type: "success",
                  message: "添加科目成功"
                });
                location.reload();
              } else {
                this.$message.error("错误：" + res.data);
              }
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加所教班级"
          });
        });
    },
    changeclick: function(val) {
      console.log(val);
      var url = this.HOST + "/CourseList";
      this.$axios({
        method: "get",
        url: url,
        params: {
          offsize: (val - 1) * 5
        }
      })
        .then(res => {
          this.tableData = res.data.row;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletelist: function(id) {
      var url = this.HOST + "/deletelist";
      this.$axios({
        method: "get",
        url: url,
        params: {
          column: "sub_id",
          id: id,
          table: "subject_table"
        }
      })
        .then(res => {
          if (res.data == "success") {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.$router.go(0);
          } else {
            this.$message.error(res.data);
          }
        })
        .catch(error => {
          console.log(error);
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

