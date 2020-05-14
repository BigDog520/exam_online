<template>
  <div id="app">
    <el-container>
      <el-header>
        <TopNavMenu />
      </el-header>
      <el-container>
        <el-aside width="200px"  height="100%">
          <LeftNavMenu/>
        </el-aside>
        <el-main>
          <router-view />  
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LeftNavMenu from "@/components/LeftNavMenu";
import TopNavMenu from "@/components/TopNavMenu";
export default {
  name: "App",
  components: {
    LeftNavMenu,
    TopNavMenu
  }
};
</script>

<style scope>
*{margin:0;padding:0;}
.el-header {
    background-color: #2B3643;
    color: white;
    text-align: left;
    line-height: 60px;
    padding:0;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    height: 565px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>


<style>
.TopTitle {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}
</style>