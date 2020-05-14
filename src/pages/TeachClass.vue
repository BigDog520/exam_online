<template>
  <div id="TeachClass">
    <h1 class="TopTitle">班级列表</h1>
    <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:10px;">
      <el-col :span="6">
        <el-button type="primary" @click="add_teach_class">点击添加所教班级</el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" class="name"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            @click="deletelist(scope.row.teach_class_id)"
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
      count: 0
    };
  },
  mounted() {
    var url = this.HOST + "/teachclass";
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
        this.count = res.data.len;
        this.tableData = res.data.row;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    add_teach_class() {
      this.$prompt("请输入班级", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\u4e00-\u9fa50-9]{2,10}/,
        inputErrorMessage: "班级不能为空"
      })
        .then(({ value }) => {
          var url = this.HOST + "/add_teach_class";
          this.$axios({
            method: "get",
            url: url,
            params: {
              class_name: value
            }
          })
            .then(res => {
              if (res.data == "success") {
                this.$message({
                  type: "success",
                  message: "添加所教班级成功"
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
      var url = this.HOST + "/teachclass";
      this.$axios({
        method: "get",
        url: url,
        params: {
          offsize: (val - 1) * 5,
          sreachClassName: this.sreachClassName
        }
      })
        .then(res => {
          this.count = res.data.len;
          this.tableData = res.data.row;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deletelist: function(id) {
      console.log(this.tableData)
      var url = this.HOST + "/deletelist";
      this.$axios({
        method: "get",
        url: url,
        params: {
          column: "teach_class_id",
          id: id,
          table: "teach_class_table"
        }
      })
        .then(res => {
          if (res.data == "success") {
            this.$message({
              message: "添加成功！",
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

