<template>
  <div class="login">

    <div class="login-box">
      <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="accountInfo"
          status-icon
          :rules="rules"
          label-width="auto"
          class="demo-ruleForm"
      >
        <h2 class="login-box-title">vebasic</h2>

        <el-form-item label="账号" prop="username">
          <el-input v-model="accountInfo.username" type="username"/>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="accountInfo.password" type="password" autocomplete="off"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>


</template>

<script setup>
import {reactive, ref} from 'vue'
import {ElMessage} from 'element-plus'


import {useRouter} from "vue-router";
import {loadDynamicRouter} from "@/router/modules/dynamicRouter.js";
import {login} from "@/api/system/login/index.js";

const router = useRouter()
const ruleFormRef = ref()


// 验证输入账号规则
const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入账号'))
  } else {
    if (accountInfo.username !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password', () => null)
    }
    callback()
  }
}
// 验证输入密码规则
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== accountInfo.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

// 响应式对象ruleForm
const accountInfo = reactive({
  username: 'admin',
  password: 'admin',
})

const rules = reactive({
  username: [{validator: validateUsername, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
})

const submitForm = (formEl) => {
  if (!formEl)
    return
  formEl.validate((valid) => {
    console.log(valid);
    console.log("点击登录了");
    if (valid) {
      //清除token
      localStorage.removeItem('token');

      login(accountInfo).then(res => {
        console.log("获取登录返回数据")
        console.log(res)
        console.log("token" + res.data.token)
        if (res.data.code === 200) {
          //设置token
          localStorage.setItem('token', res.data.data.token);
          // //设置动态路由
          loadDynamicRouter();
          //跳转到首页
          router.push("/");
        } else if (res.code !== 200) {
          console.log("重置表单并弹出")
          resetForm();
          upErr();
        }
      })

    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  console.log('resetForm!')
  if (!formEl) return
  formEl.resetFields()
};

const upErr = () => {
  ElMessage({
    showClose: true,
    message: '账号或密码错误',
    type: 'error',
  })
}


</script>

<style lang="scss" scoped>

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url("../../../assets/login1.png");
  background-size: cover;
  background-color: #5698c3;
}

.login-box {
  .login-box-title {
    text-align: center; /* 文本居中对齐 */
    color: #00bd7e;
    display: flex;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    line-height: 80px;

  }

  width: 350px; /* 设置登录框宽度 */
  padding: 20px; /* 内边距 */
  background-color: #fffbfb; /* 背景颜色 */
  border-radius: 5px; /* 边角圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 水平垂直居中 */
  text-align: center; /* 文本居中对齐 */
}

</style>