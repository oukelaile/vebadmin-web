<template>
  <el-drawer
      :model-value="props.isShowDrawer"
      :title=" props.modeDrawer === 'edit' ? '编辑' : '新增'"
      direction="rtl"
      @close="handleCloseDrawer()"
      size="40%"
    >
    <el-form :model="currentDrawerData" label-width="auto" style="max-width: 700px">

      <el-form-item label="上级菜单" >
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
            style="width: 240px"
        />
      </el-form-item>
      <el-form-item label="菜单名">
        <el-input v-model="props.currentDrawerData.menuName" style="width: 240px" placeholder="请输入"/>
      </el-form-item>
      <el-form-item label="路径path">
        <el-input v-model="props.currentDrawerData.routerPath" style="width: 240px" placeholder="请输入"/>
      </el-form-item>

      <el-form-item label="菜单图标" >
        <el-button
            ref="buttonRef"
            style="width: 240px;  justify-content: start; text-align: left;"
            v-click-outside="onClickOutside"
        >
          <el-icon  style="width: 25px;">
            <component :is="props.currentDrawerData.menuIcon"/>
          </el-icon>
          {{props.currentDrawerData.menuIcon}}
        </el-button>

        <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            trigger="click"
            virtual-triggering
            width="450"
        >
            <el-input  placeholder="输入图标名称" />
            <el-scrollbar style="height: 300px;">
              <el-form
                  :inline=true
                  style="  padding-top: 10px"
              >
                <el-form-item
                    v-for="(item,index) in elementPlusIconList.values()"
                    @click="handleSelectIcon(item)"
                >

                  <el-button>
                  <el-icon  style="width: 25px;">
                    <component :is="item"/>
                  </el-icon>
                  <span style=" overflow: hidden;">{{item}}</span>
                  </el-button>

                </el-form-item>
              </el-form>

            </el-scrollbar>
        </el-popover>

      </el-form-item>

      <el-form-item label="显示/隐藏">
        <el-radio-group v-model="props.currentDrawerData.hide">
          <el-radio :value="0">显示</el-radio>
          <el-radio :value="1">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="类型">
          <el-radio-group v-model="props.currentDrawerData.menuType">
            <el-radio value="M" size="large" border>目录</el-radio>
            <el-radio value="C" size="large" border>菜单</el-radio>
            <el-radio value="F" size="large" border>按钮</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item label="组件path" v-if="props.currentDrawerData.menuType === 'C'">
        <el-input v-model="props.currentDrawerData.routerComponent"
                  :disabled="props.currentDrawerData.menuType === 'M' || props.currentDrawerData.menuType === 'F'"
                  :placeholder="props.currentDrawerData.menuType === 'M' || props.currentDrawerData.menuType === 'F'? '' : '请输入'"
                  style="width: 240px" />
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


//--点击图标弹出图标选择框
import {ClickOutside as vClickOutside, ElDrawer} from 'element-plus';
import {defineProps, ref, unref} from 'vue';
//获取elementPlus图标
import * as ElementPlusIconsVue from "@element-plus/icons-vue";


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
      routerComponent: '',
      menuType: '',
      hide: 0,
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

const buttonRef = ref()
const popoverRef = ref()
const onClickOutside = () => {
  unref(popoverRef).popperRef?.delayHide?.()
}

// ElementPlus图标库
const elementPlusIconList = ref([]);
for (const name in ElementPlusIconsVue) {
  elementPlusIconList.value.push(name);
}
//选择图标 赋值
const handleSelectIcon = (item) => {
  props.currentDrawerData.menuIcon = item;
};

</script>