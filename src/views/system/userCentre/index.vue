<template>
  <div class="flex-container" style="height: 85vh; margin: 0;">
    <!--  个人信息展示-->
    <el-card style="width: 30%;">
      <template #header>
        <div class="card-header">
          <span>个人信息</span>
        </div>
      </template>

      <div
        style="  text-align: center;"
      >
        <!-- 文件上传组件 -->
        <el-upload
            :auto-upload="false"
            @change="handleChange"
            :show-file-list="false"
        >
          <el-avatar
              shape="square"
              :size="200"
              :src="previewImage"
              class="hover-avatar"
          ></el-avatar>
        </el-upload>
        <el-button @click="saveAvatar" type="primary" plain>保存头像</el-button>
      </div>

      <div class="flex-text">
        <el-icon><User /></el-icon>
        <p>昵称:</p>
        <p class="user-right">{{userInfo.nickName}}</p>
      </div>
      <div class="flex-text">
        <el-icon><Male /></el-icon>
        <p>性别:</p>
<!--        //TODO 可以优化-->
        <p class="user-right">{{  parseInt(userInfo.sex) === 0 ? '男' : parseInt(userInfo.sex) === 1 ? '女' : '未知' }}</p>
      </div>
      <div class="flex-text">
        <el-icon><Iphone /></el-icon>
        <p>手机号码:</p>
        <p class="user-right">{{userInfo.phoneNumber}}</p>
      </div>
      <div class="flex-text">
        <el-icon><Message /></el-icon>
        <p>用户邮箱:</p>
        <p class="user-right">{{userInfo.email}}</p>
      </div>
      <div class="flex-text">
        <p>所属部门:</p>
        <p class="user-right">Test</p>
      </div>
      <div class="flex-text">
        <p>所属角色:</p>
        <p class="user-right">Test</p>
      </div>
    </el-card>

    <el-card style="width: 70%; ">
      <!-- 修改账号信息 和密码 -->
      <el-tabs type="border-card">
        <el-tab-pane label="修改资料">

          <el-form  label-width="80px">
            <el-form-item label="昵称" class="el-form-item-custom">
              <el-input v-model="userInfo.nickName"/>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="userInfo.sex">
                <el-option label="男" value="0" />
                <el-option label="女" value="1" />
                <el-option label="未知" value="2" />
              </el-select>
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input  v-model="userInfo.phoneNumber" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="userInfo.email" />
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="updateInfo">保存修改</el-button>
            <el-button type="success" @click="restoreInfo">恢复默认</el-button>
            </el-form-item>
          </el-form>

        </el-tab-pane>

        <el-tab-pane label="修改密码">
          <el-form label-width="80px">
            <el-form-item label="密码" class="el-form-item-custom">
              <el-input type="password" v-model="authPassword.oldPassword"/>
            </el-form-item>
            <el-form-item label="新密码" class="el-form-item-custom">
              <el-input type="password" v-model="authPassword.newPassword"/>
            </el-form-item>
            <el-form-item label="确认密码" class="el-form-item-custom">
              <el-input type="password" v-model="authPassword.confirmPassword"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserPassword">确定修改</el-button>
              <el-button type="success" @click="clearInputPassword">清空输入</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>

      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {getInfo, updateAvatar, updateById, updatePassword} from "@/api/system/userCentre/index.js";
import {ElMessage} from "element-plus";
import {Message,} from '@element-plus/icons-vue'
import {fileUpload} from "@/api/common/file/index.js";
import {reqImg} from "@/tuils/common/files.js";
import {mainStore} from '@/storm/modules/main.js';

const userInfo = ref(
    {
      nickName: '',
      sex: '',
      email: '',
      phoneNumber: '',
      createTime:'',
      avatar: '',
    }
);

const authPassword = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});


const getUserCarInfo = () => {
  getInfo().then(res => {
    userInfo.value = res.data.data;
    console.log("userInfo.value.avatar 获取到info请求头像地址",userInfo.value.avatar)
    getUserInfoAvatar(userInfo.value.avatar);
  });

};

onMounted(() => {
  // 同步操作
  getUserCarInfo();
  // 异步操作
  (async () => {
  })();
});

// const avatarData = ref();

async function getUserInfoAvatar(data){
  previewImage.value =  await reqImg(data);
};

const newAvatarData = ref();


const updateInfo = () => {
  updateById(userInfo.value).then(res => {
    if (res.data.code === 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
      });
      store.requestLoginUser()

    } else {
      ElMessage({
        showClose: true,
        message: '修改失败',
        type: 'error',
      });
    }
  });
};

const  restoreInfo = () => {
  getUserCarInfo();
  ElMessage({
    showClose: true,
    message: '恢复成功',
    type: 'success',
  });
};

const store = mainStore()

const updateUserPassword = () => {
  if (authPassword.value.newPassword !== authPassword.value.confirmPassword) {
    console.log("两次密码不一致")
    ElMessage({
      showClose: true,
      message: '两次密码不一致',
      type: 'error',
    });
    return;
  }
  updatePassword(authPassword.value).then(res => {
    if (res.data.code === 200) {
      ElMessage({
        showClose: true,
        message: '修改成功',
        type: 'success',
      });
      store.requestLoginUser()
    } else {
      ElMessage({
        showClose: true,
        message: '修改失败',
        type: 'error',
      });
    }
  });
}

const clearInputPassword = () => {
  authPassword.value.oldPassword = '';
  authPassword.value.newPassword = '';
  authPassword.value.confirmPassword = '';
}

//头像逻辑
const previewImage = ref("");
const chooseFile = ref(null);
const handleChange = (newFile) => {
  chooseFile.value = newFile.raw;
  if (newFile && newFile.raw) {
    previewImage.value = URL.createObjectURL(newFile.raw);
  }
};
const saveAvatar = () => {
  console.log("tjT进来了文件是", chooseFile.value);
  // 这里应调用实际的上传函数，并处理逻辑
  fileUpload(chooseFile.value, "avatar").then((res) => {
    console.log("上传成功", res);
    //调用接口修改user的头像
    userInfo.value.avatar = res.data.filePath;
    updateAvatar(userInfo.value).then((res) => {
      if (res.data.code === 200) {
        ElMessage({
          showClose: true,
          message: '保存成功',
          type: 'success',
        });
        store.requestLoginUser()
      } else {
        ElMessage({
          showClose: true,
          message: '保存失败',
          type: 'error',
        });
      }
    });
  });
};


</script>

<style lang="scss" scoped>

.flex-text {
  display: flex;
  align-items: center; /* 可选，保持垂直居中对齐 */
}

.user-right {
  margin-left: auto; /* 或 justify-content: flex-end; 在父元素为display:flex时生效 */
}

.flex-container {
  display: flex;
  /* 可选：添加其他 flex 属性以调整布局，如 justify-content、align-items 等 */
  gap: 50px;
}

.el-form-item-custom {
  min-width: 100px;
}

.avatar-container {
  text-align: center;
}


.hover-avatar {
  position: relative;
  transition: opacity 0.3s;
}

.hover-avatar:hover {
  opacity: 0.5;
  border: 2px dashed #007bff; /* 添加蓝色虚线边框 */
  border-radius: 4px; /* 添加圆角 */
}

.hover-avatar::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px; /* 增加宽度 */
  height: 40px; /* 增加高度 */
  font-size: 80px; /* 增大字体大小 */
  color: #444242;
  line-height: 40px; /* 与height保持一致 */
  text-align: center;
  display: none;
  font-family: Arial, sans-serif; /* 使用支持加号的字体 */
  font-weight: bold;
}

.hover-avatar:hover::before {
  content: '+';
  display: block;
}
</style>