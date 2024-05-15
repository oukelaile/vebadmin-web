<template>
  <el-row style=" padding-top: 10px " :xs="23">
    <el-col :span="12" style="padding-right: 15px;overflow-y: auto;" :xs="24">
      <el-card style=" overflow-y: auto;">
          <el-tag class="tag-item" effect="dark">
            开发：
          </el-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>THQ</el-check-tag>
        <el-divider  class="divider"/>


        <el-tag class="tag-item" effect="dark">
            邮箱联系方式：
        </el-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>444057897@qq.com</el-check-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>tthhqq@88.com</el-check-tag>
        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark">
          GIT仓库：
        </el-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>https://github.com/oukelaile</el-check-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>https://gitee.com/oukelaile</el-check-tag>
        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark">
          QQ：
        </el-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>444035897</el-check-tag>
        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark" >
          后端git地址：
        </el-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>https://github.com/oukelaile/vebadmin-server</el-check-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;"  checked>https://gitee.com/oukelaile/vebadmin-server</el-check-tag>

        <el-divider class="divider" />

        <el-tag class="tag-item" effect="dark">
          前端git地址：
        </el-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>https://github.com/oukelaile/vebAdmin-web</el-check-tag>
        <el-check-tag class="check-tag-item" style="margin: 5px;" checked>https://gitee.com/oukelaile/vebAdmin-web</el-check-tag>

      </el-card>
    </el-col>
    <el-col :span="12" :xs="23">
      <el-card style="">
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
//---

import { reactive } from 'vue'

</script>

<style scoped>
.tag-item {
  display: flex; /* 设置弹性布局 */
  flex-wrap: wrap; /* 允许元素换行 */
  align-items: center; /* 水平居中 */
}

.check-tags {
  display: flex; /* 设置弹性布局 */
  flex-wrap: wrap; /* 允许元素换行 */
}

.check-tag-item {
  flex: 1; /* 让每个el-check-tag占据相等的空间 */
  margin-right: 5px; /* 添加右侧间距 */
  white-space: normal; /* 允许文本换行 */
  word-break: break-all; /* 在必要时强制单词断行 */
  max-width: 100%; /* 确保标签不超过其父元素宽度 */
  display: inline-block; /* 使标签作为行内元素显示 */
}

.divider {
  margin-top: 5px;
  margin-bottom: 5px;
}


</style>