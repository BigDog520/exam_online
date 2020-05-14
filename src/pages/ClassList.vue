<template>
  <div id="ClassList">
    <h1 class="TopTitle">班级列表</h1>

    <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:10px;">
      <el-col :span="6">
        <el-button type="primary" @click="add_class">新增班级</el-button>
      </el-col>

      <el-col :span="8">
        <el-input
          placeholder="请输入班级"
          prefix-icon="el-icon-search"
          v-model="sreach"
          style="width:75%"
        ></el-input>
        <el-button type="primary" @click="sreachBtn">搜索</el-button>
      </el-col>
    </el-row>

    <!-- <div class="search">
      <el-input placeholder="请输入班级" prefix-icon="el-icon-search" v-model="sreach" style="width:75%"></el-input>
      <el-button type="primary" @click="sreachBtn">搜索</el-button>
    </div>-->
    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column type="index" width="150"></el-table-column>
      <el-table-column prop="class_name" label="班级名称" class="name"></el-table-column>
      <el-table-column label="操作" width="100">
        <!-- <el-button type="info" icon="el-icon-edit" circle></el-button> -->
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
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
    var url = this.HOST + "/classlist";
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
    add_class() {
      this.$prompt("请输入班级", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\u4e00-\u9fa50-9]{2,10}/,
        inputErrorMessage: "班级不能为空"
      })
        .then(({ value }) => {
          var url = this.HOST + "/addClass";
          this.$axios({
            method: "get",
            url: url,
            params: {
              classname: value
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
    sreachBtn: function() {
      this.sreachClassName = this.sreach;
      var url = this.HOST + "/classlist";
      this.$axios({
        method: "get",
        url: url,
        params: {
          offsize: 0,
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
    changeclick: function(val) {
      var url = this.HOST + "/classlist";
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

