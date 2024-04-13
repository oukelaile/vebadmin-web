<template>

  <el-row style=" padding-top: 10px ">
    <el-col :span="12">
      <el-card style="max-width: 650px; height: 233px">
        <el-tag style="height: 36px;"> 开发：THQ</el-tag>
        <el-divider style="margin-top: 5px; margin-bottom: 5px;" />


        <el-tag style="height: 36px;">邮箱联系方式：444057897@qq.com / tthhqq@88.com</el-tag>

        <el-divider style="margin-top: 5px; margin-bottom: 5px;" />

        <el-tag style="height: 36px;">Github：https://github.com/oukelaile</el-tag>
        <el-divider style="margin-top: 5px; margin-bottom: 5px;" />


        <el-tag style="height: 36px;">QQ：444035897</el-tag>
        <el-divider style="margin-top: 5px; margin-bottom: 5px;" />

      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="max-width: 650px; height: 233px">
        <div >
          <span >veb-Admin 技术栈</span>
        </div>
        <div >
          <h3>后端技术栈</h3>
          <el-tag style="  margin-right: 8px; height: 36px; " type="primary" v-for="(backendTech, index) in backendTechStack" :key="index" :closable="false">
            {{ backendTech }}
          </el-tag>
          <h3 style="margin-top: 20px;">前端技术栈</h3>
          <el-tag style="  margin-right: 8px; height: 36px;" type="success" v-for="(frontendTech, index) in frontendTechStack" :key="index" :closable="false">
            {{ frontendTech }}
          </el-tag>
        </div>
      </el-card>
    </el-col>
  </el-row>



</template>

<script>export default {
  data() {
    return {
      backendTechStack: ['SpringBoot','Maven', 'Security', 'JWT' , 'MybatisPlus', 'Mysql', 'Redis'],
      frontendTechStack: ['Vue3', 'VueRouter', 'Pinia', 'ElementPlus', 'Axios', 'Vite']
    };
  }
};
</script>

<style scoped>



</style>