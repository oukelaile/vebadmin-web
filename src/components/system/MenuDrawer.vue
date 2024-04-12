<template>
  <el-drawer
      :model-value="props.isShowDrawer"
      :title=" props.modeDrawer === 'edit' ? '编辑' : '新增'"
      direction="rtl"
      @close="handleCloseDrawer()"
      size="40%"
    >
    <el-form :model="currentDrawerData" label-width="auto" style="max-width: 600px">

      <el-form-item label="上级菜单">
        <el-cascader
            v-model="props.currentDrawerData.menuEchoItems"
            @change="getMenuId"
            :options="props.currentDrawerData.menuList"
            :props="{
              label: 'menuName', // 显示的标题字段，这里是 'name'
              value: 'menuId',   // 对应选中项的值字段，这里是 'id'
              children: 'children', // 子选项数组的字段名，这里假设是 'subItems'
              checkStrictly: true,
            }"
            :show-all-levels="false"
            placeholder="请选择"
        />
      </el-form-item>
      <el-form-item label="菜单名">
        <el-input v-model="props.currentDrawerData.menuName" style="width: 240px" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="路径path">
        <el-input v-model="props.currentDrawerData.routerPath" style="width: 240px" placeholder="请输入"/>
      </el-form-item>

      <el-form-item
          label="顺序(0排最前以此类推)"
          :rules="[
            { type: 'number', message: '请输入数字' },
          ]"
      >
        <el-input
            v-model="props.currentDrawerData.menuOrder"
            @input="validateInput"
            style="width: 240px"
            placeholder="请输入 "
            type="number"
            autocomplete="off"
        />
      </el-form-item>
    </el-form>

      <template #footer>
        <div style="flex: auto">
          <el-button @click="handleCloseDrawer()">取消</el-button>
          <el-button type="primary" @click="emit('submit',props.currentDrawerData)">保存</el-button>
        </div>
      </template>

  </el-drawer>
</template>

<script setup>

import {ElDrawer} from 'element-plus';
import {defineProps, ref} from 'vue';


const myShow = ref(false)

function openDrawerRef() {
  myShow.value = !myShow.value;
  console.log("openDrawerRef", myShow.value);
}


// 父组件传递过来的数据
const props = defineProps({
  isShowDrawer: {type: Boolean, required: true, default: false},
  modeDrawer: {type: String, required: true, default: ''},
  currentDrawerData: {type: Object,required: true, default: () => {
    return {
      menuId: 0,
      menuName: '',
      routerPath: '',
      menuOrder: 0,
      parentMenuId: 0,
      menuIcon: '',
      children: [],
      menuList: [],
      menuEchoItems: [],
    }}}
});


// 父组件传递过来的方法
const emit = defineEmits(
    ['handleClose', 'submit'],
);

// 调用父组件方法关闭抽屉
const handleCloseDrawer = () => {
  console.log("调用父组件方法handleClose 对应的方法");
  emit('handleClose');
};



const getMenuId = (oldId) => {
  console.log("getMenuId");
  // 单选模式下，selectedIds 是一个只包含一个元素的数组
  props.currentDrawerData.parentMenuId = oldId[oldId.length - 1];
};

function validateInput(event) {
  console.log("validateInput");
  props.currentDrawerData.menuOrder = event.target.value.replace(/[^0-9]/g, '');
}

</script>