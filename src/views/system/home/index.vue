<template>

  <el-row style=" padding-top: 10px ">
    <el-col :span="12">
      <el-card style="max-width: 650px; height: 390px">

          <el-tag class="tag-item" effect="dark">
            开发：
          <el-check-tag class="check-tag-item" checked>THQ</el-check-tag>
          </el-tag>
        <el-divider  class="divider"/>

        <el-tag class="tag-item" effect="dark">
            邮箱联系方式：
          <el-check-tag class="check-tag-item" checked>444057897@qq.com</el-check-tag>
          <el-check-tag class="check-tag-item" checked>tthhqq@88.com</el-check-tag>
          </el-tag>
        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark">
          GIT仓库：
          <el-check-tag class="check-tag-item" checked>https://github.com/oukelaile</el-check-tag>
          <el-check-tag class="check-tag-item" checked>https://gitee.com/oukelaile</el-check-tag>
        </el-tag>
        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark">
          QQ：
          <el-check-tag class="check-tag-item" checked>444035897</el-check-tag>
        </el-tag>
        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark" style="height: 80px">
          后端git地址：
          <div>
            <el-check-tag class="check-tag-item" style="margin-top: 5px;" checked>https://github.com/oukelaile/vebadmin-server</el-check-tag>
            <br/>
            <el-check-tag class="check-tag-item" style="margin-top: 5px;"  checked>https://gitee.com/oukelaile/vebadmin-server</el-check-tag>
          </div>
        </el-tag>
        <el-divider class="divider" />
        <el-tag class="tag-item" effect="dark" style="height: 80px">
          前端git地址：
          <div>
            <el-check-tag class="check-tag-item" style="margin-top: 5px;" checked>https://github.com/oukelaile/vebAdmin-web</el-check-tag>
            <br/>
            <el-check-tag class="check-tag-item" style="margin-top: 5px;"  checked>https://gitee.com/oukelaile/vebAdmin-web</el-check-tag>
          </div>
        </el-tag>

        <el-divider class="divider" />

      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="max-width: 650px; height: 390px">
        <div style=" text-align: center;">
          <span style="font-weight: bold;  font-size: 39px;">vebAdmin 技术栈</span>
        </div>
        <div >
          <h3 style="margin-top: 30px; font-size: 25px; ">后端技术栈:</h3>
          <el-tag style="  margin-right: 8px; height: 36px; " type="primary" v-for="(backendTech, index) in backendTechStack" :key="index" :closable="false">
            {{ backendTech }}
          </el-tag>
          <h3 style="margin-top: 30px; font-size: 25px; ">前端技术栈:</h3>
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
.tag-item {
  height: 36px;
}

.check-tag-item {
  height: 10px;
  margin-right: 10px;
}

.divider {
  margin-top: 5px;
  margin-bottom: 5px;
}


</style>