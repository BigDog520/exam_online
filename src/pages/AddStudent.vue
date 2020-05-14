
<template>
  <div id="AddStudent">
    <h1 class="TopTitle">新增考生</h1>
    <el-transfer
      filterable
      :filter-method="filterMethod"
      filter-placeholder="请输入搜索班级名称"
      v-model="value"
      :data="data"
      :titles="['您的所教班级', '该试卷考试班级']"
    >
      <el-popover placement="right" width="300" trigger="click" slot="left-footer">
        <el-table :data="gridData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="145" property="gropeid" label="分组ID"></el-table-column>
          <el-table-column width="100" property="grope" label="分组名字"></el-table-column>
        </el-table>
        <!-- <div style="margin-top: 20px">
          <el-button @click="handleSelectionChange">确定</el-button>
        </div>-->
      </el-popover>
      <el-popover placement="right" width="300" trigger="click" slot="right-footer">
        <el-table :data="gridData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column width="145" property="gropeid" label="分组ID"></el-table-column>
          <el-table-column width="100" property="grope" label="分组名字"></el-table-column>
        </el-table>
      </el-popover>
    </el-transfer>
    <el-button style="float:right" type="info" @click="examhandle">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    const generateData = _ => {
      const data = [];
      var name = [
        "16软件工程1班",
        "16软件工程2班",
        "16软件工程3班",
        "16软件工程4班"
      ];
      var num = [
        "16软件工程1班",
        "16软件工程2班",
        "16软件工程3班",
        "16软件工程4班"
      ];
      name.forEach((name, index) => {
        data.push({
          label: name,
          key: index,
          num: num[index]
        });
      });
      return data;
    };
    return {
      gridData: [],
      data: [],
      value: [],
      filterMethod(query, item) {
        if (query === "" || query == null) {
          return <span>item.name</span>;
        }
        if (!isNaN(query)) {
          return item.num.indexOf(query) > -1;
        } else {
          return item.label.indexOf(query) > -1;
        }
      }
    };
  },
  mounted() {
    // this.$refs.multipleTable.toggleRowSelection(this.tableData3[2],true);
    var url = this.HOST + "/exam_class";
    this.$axios({
      method: "get",
      url: url,
      params: {
        exampaper_id: this.$route.query.exampaper_id
      }
    })
      .then(res => {
        var _ = [];
        var v = [];
        res.data.forEach((val, index) => {
          if(val.exampaper_id == this.$route.query.exampaper_id){
            v.push(val.class_id)
          }
          _.push({
            label: val.class_name,
            key: val.class_id,
            num: val.class_name
          });
        });
        this.data = _;
        this.value = v;
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    examhandle() {
      var url = this.HOST + "/insert_exam_class";
      this.$axios({
        method: "get",
        url: url,
        params: {
          exampaper_id: this.$route.query.exampaper_id,
          values: this.value
        }
      })
        .then(res => {
          if (res.data == "success") {
            this.$message({
              message: "添加成功！",
              type: "success"
            });
            this.$router.push('/index/ExaminationList');
          } else {
            this.$message.error("错误：" + res.data);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.el-transfer {
  margin-left: 220px;
}
.el-transfer-panel {
  width: 300px;
  height: 450px;
}
.el-checkbox-group,
.el-transfer-panel__body {
  height: 100% !important;
}
</style>

