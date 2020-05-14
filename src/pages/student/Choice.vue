<template>
  <div>
    
    <el-card class="right-card">
      <h3 style="padding-bottom:10px;">题目：{{item.item_name}}</h3>
      <div class="option"  v-if="item.A_option">
        A.
        <span>{{item.A_option}}</span>
      </div>
      <div class="option"  v-if="item.B_option">
        B.
        <span>{{item.B_option}}</span>
      </div>
      <div class="option"  v-if="item.C_option">
        C.
        <span>{{item.C_option}}</span>
      </div>
      <div class="option"  v-if="item.D_option">
        D.
        <span>{{item.D_option}}</span>
      </div>
      <div class="option" v-if="item.E_option">
        E.
        <span>{{item.E_option}}</span>
      </div>
      <div class="option" v-if="item.F_option">
        F.
        <span>{{item.F_option}}</span>
      </div>
      <!-- <el-form ref="form" :model="form" label-width="80px" class="el-form">
        <el-form-item label="答案">
          <el-input type="input" v-model="form.answer"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin:50px 0 0 280px; ">
        <el-button type="success" circle>
          <i class="el-icon-back"></i>上一题
        </el-button>
        <el-button type="success" circle>
          下一题
          <i class="el-icon-right"></i>
        </el-button>
      </div> -->
    </el-card>
  </div>
</template>

<script>
export default {
    props: ["item"],
  data() {
    return {
    //   item: {
    //     item_name: "console有哪些常用方法?",
    //     A_option: "console.log/console.info",
    //     B_option: "console.error/console.warning",
    //     C_option: "console.time/console.timeEnd",
    //     D_option: "console.table"
    //   },
    };
  }
};
</script>

<style>
</style>