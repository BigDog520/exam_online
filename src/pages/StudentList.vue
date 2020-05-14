<template>
  <div id="StudentList">
    <h1 class="TopTitle">学生列表</h1>
    <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:10px;">
      <el-col :span="6">
        <el-select v-model="ChooseClass" placeholder="请选择班级">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column prop="stu_num" label="学号" class="num"></el-table-column>
      <el-table-column prop="stu_name" label="姓名" class="name"></el-table-column>
      <el-table-column prop="class_name" label="班级" class="class"></el-table-column>
      <el-table-column prop="stu_phone" label="联系方式" class="phone"></el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="7"
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
      ChooseClass: "",
      options: [
        {
          value: "",
          label: "所有班级"
        }
      ],
      tableData: []
    };
  },
  mounted() {
    let url = this.HOST + "/teach_calss_mount";
    this.$axios({
      url,
      method: "get"
    })
      .then(res => {
        if (res.data == "login") {
          this.$router.push("/login");
        }
        this.count = res.data.count;
        console.log(this.count);
        this.options = this.options.concat(res.data.option);
        this.tableData = res.data.student;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    changeclick: function(val) {
      var url = this.HOST + "/studentlist";
      this.$axios({
        method: "get",
        url: url,
        params: {
          offsize: (val - 1) * 7,
          ChooseClass: this.ChooseClass
        }
      })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  watch: {
    ChooseClass: function(newValue, oldValue) {
      let url = this.HOST + "/teach_calss_mount";
      this.$axios({
        url,
        method: "get",
        params: { ChooseClass: this.ChooseClass }
      })
        .then(res => {
          if (res.data == "login") {
            this.$router.push("/login");
          }
          this.count = res.data.count;
          this.tableData = res.data.student;
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
</style>

