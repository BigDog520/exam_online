<template>
  <div id="TitleList">
    <h1 class="TopTitle">题库列表</h1>

    <el-row type="flex" class="row-bg" justify="space-between" style="margin-bottom:10px;">
      <el-col :span="6">
        <label>科目：</label>
        <el-select v-model="ChooseSubject" placeholder="请选择科目">
          <el-option
            v-for="item in subject"
            :key="item.sub_id"
            :label="item.sub_name"
            :value="item.sub_id"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <label>题型：</label>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <!-- <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="sreachTitle"
          style="width:75%"
        ></el-input>
        <el-button type="primary" @click="sreachBtn">搜索</el-button>
      </el-col>-->
    </el-row>

    <el-table :data="tableData" style="width: 100%" hight="400">
      <el-table-column type="expand">
        <div slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="题目id">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="提交老师">
              <span>{{ props.row.teacher_id }}</span>
            </el-form-item>
            <el-form-item label="通过率">
              <span>{{ props.row.passrate }}</span>
            </el-form-item>
            <el-form-item label="题目">
              <span>{{ props.row.item_name }}</span>
            </el-form-item>
            <el-form-item label="A选项">
              <span>{{ props.row.A_option }}</span>
            </el-form-item>
            <el-form-item label="B选项">
              <span>{{ props.row.B_option }}</span>
            </el-form-item>
            <el-form-item label="C选项">
              <span>{{ props.row.C_option }}</span>
            </el-form-item>
            <el-form-item label="D选项">
              <span>{{ props.row.D_option }}</span>
            </el-form-item>
            <el-form-item label="E选项" v-if="props.row.E_option">
              <span>{{ props.row.E_option }}</span>
            </el-form-item>
            <el-form-item label="F选项" v-if="props.row.F_option">
              <span>{{ props.row.F_option }}</span>
            </el-form-item>
            <el-form-item label="答案">
              <span>{{ props.row.item_answer }}</span>
            </el-form-item>
          </el-form>
        </div>
      </el-table-column>
      <el-table-column label="日期" width="150">
        <div slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.item_date | filterDate }}</span>
        </div>
      </el-table-column>
      <el-table-column prop="item_name" label="题目" class="item_name"></el-table-column>
      <!-- <el-table-column prop="sub_id" label="科目" class="sub_id" width="180"></el-table-column> -->
      <el-table-column prop="item_type" label="类型" width="180">
        <el-tag
          :type="filterHandler(scope.row.item_type)"
          slot-scope="scope"
        >{{ scope.row.item_type }}</el-tag>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="100">
        <template slot-scope="scope">
        <el-button type="danger" @click="deletelist(scope.row.item_id)" icon="el-icon-delete" circle></el-button>
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
      ChooseSubject: "1",
      subject: "",
      count: 0,
      sreachTitle: "",
      value: "所有题型",
      options: [
        {
          value: "所有题型",
          label: "所有题型"
        },
        {
          value: "单选题",
          label: "单选题"
        },
        {
          value: "多选题",
          label: "多选题"
        },
        {
          value: "判断题",
          label: "判断题"
        },
        {
          value: "填空题",
          label: "填空题"
        },
        {
          value: "应用题",
          label: "应用题"
        }
      ],
      tableData: []
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

        // 查询 该科目的所有题
        var url = this.HOST + "itembank_mount";
        this.$axios({
          url,
          method: "get",
          params: {
            offsize: -1,
            type: this.value,
            subject: this.ChooseSubject
          }
        })
          .then(res => {
            console.log(res.data);
            if (res.data == "login") {
              this.$router.push("/login");
            } else {
              console.log(res.data);
              this.count = res.data.len;
              this.tableData = res.data.row;
            }
          })
          .catch(error => {
            throw error;
          });
      })
      .catch(err => {
        throw err;
      });
  },
  computed: {
    change() {
      const { value, ChooseSubject } = this;
      return {
        value,
        ChooseSubject
      };
    },
    filterHandler() {
      return function(tag) {
        if (tag == "单选题") {
          return "";
        } else if (tag == "多选题") {
          return "success";
        } else if (tag == "判断题") {
          return "info";
        } else if (tag == "填空题") {
          return "warning";
        } else if (tag == "应用题") {
          return "danger";
        }
      };
    }
  },
  methods: {
    // sreachBtn: function() {
    //   var url = this.HOST + "/itembank_mount";
    //   this.$axios({
    //     method: "get",
    //     url: url,
    //     params: {
    //       offsize: 0,
    //       type: this.value,
    //       subject: this.ChooseSubject
    //       // sreachTitle: this.sreachTitle
    //     }
    //   })
    //     .then(res => {
    //       this.count = res.data.len;
    //       this.tableData = res.data.row;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    changeclick: function(val) {
      var url = this.HOST + "/itembank_mount";
      this.$axios({
        method: "get",
        url: url,
        params: {
          offsize: (val - 1) * 5,
          type: this.value,
          subject: this.ChooseSubject
          // sreachTitle: this.sreachTitle
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
          column: "item_id",
          id: id,
          table: "itembank_table"
        }
      })
        .then(res => {
          if (res.data == "success") {
            this.$message({
              message: "添加成功！",
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
  },
  watch: {
    change: function(newValue, oldValue) {
      var url = this.HOST + "itembank_mount";
      this.$axios({
        url,
        method: "get",
        params: {
          offsize: -1,
          type: this.value,
          subject: this.ChooseSubject
        }
      })
        .then(res => {
          this.count = res.data.len;
          this.tableData = res.data.row;
        })
        .catch(error => {
          throw error;
        });
    }
  }
};
</script>

<style>
.demo-table-expand {
  font-size: 0;
}
.el-form-item__label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

