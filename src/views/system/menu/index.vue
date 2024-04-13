<template >

    <!--搜索选项   -->
    <div  ref="searchBox"
          class="search-box"
          :class="{ 'hide-section-search': unfoldOrFoldSearch }"
          v-show="showSearch"
    >
      <el-row :gutter="0">
        <el-col :span="23">
          <el-form
              :inline=true
              :model="searchFromParams"
          >
            <el-form-item label="菜单名称" style="padding-top: 5px;">
              <el-input placeholder="请输入菜单名称" v-model="searchFromParams.menuName" />
            </el-form-item>
          </el-form>
        </el-col>

        <el-col :span="1">
          <el-form-item style="margin-left: auto; padding-top: 5px;" v-show="hideUnfoldOrFoldSearch" >
            <el-tooltip  content="展开/收起更多搜索选项"   :show-after="1200" :auto-close="1500" >
              <el-button type="primary" @click="toggleShowSearch"  >
                <el-icon>
                  <CaretTop v-if="!unfoldOrFoldSearch" />
                  <CaretBottom v-else />
                </el-icon>
              </el-button>
            </el-tooltip>
          </el-form-item>
        </el-col>

      </el-row>
    </div>

    <!--分割线    -->
    <el-divider  style="margin-top: 0; margin-bottom: 0;"   v-show="showSearch" />

    <!-- 操作按钮 -->
    <div style="padding-top: 10px">
      <el-button type="primary" plain @click="addDrawer">添加</el-button>
      <el-button type="danger" plain @click="topDeleteMenu" :disabled="selectedMenuIds.length === 0 ">删除</el-button>

      <!--最右边     -->
      <el-button :icon="Refresh" circle style="float: right;" @click="refreshTable" />
      <el-button :icon="Search" circle style="float: right;" @click="updateShowSearch" />
      <el-button type="primary" style="float: right;" @click="searchFormHandler">搜索</el-button>
    </div>

    <!--table列表-->
    <div style="padding-top: 10px">
      <el-table
          :data="tableData"
          style="width: 100%;"
          border
          row-key="menuId"
          @selection-change="onSelectionChange"
      >
        <el-table-column prop="menuId" type="selection" label="菜单id" width="50"/>
        <el-table-column prop="menuName" label="菜单名称" width="200"/>
        <el-table-column prop="menuIcon" label="图标" width="100">
          <template #default="scope:any">
            <el-icon :size="20" :color="scope.row.menuIcon">
              <component :is="scope.row.menuIcon" />
            </el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="menuType" label="菜单类型" width="100">
          <template #default="scope:any">
            <el-tag :type="scope.row.menuType === 'M' ? 'success' : 'danger'">
              {{ scope.row.menuType === 'M' ? '目录' : '菜单' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="routerPath" label="路径path" width="200"/>
        <el-table-column prop="routerComponent" label="组件path" width="200"/>
        <el-table-column prop="hide" label="显示/隐藏" width="100">
          <template #default="scope:any">
            <el-tag :type="scope.row.hide === 0 ? 'primary' : 'warning' ">
              {{ scope.row.hide === 0 ? '显示' : '隐藏' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="menuOrder" label="顺序" width="100"/>

        <el-table-column>
          <template #default="scope:any">
            <el-button type="primary" @click="editDrawer(scope.row.menuId)" plain>编辑</el-button>
            <el-button type="primary" plain @click="tableDeleteMenu(scope.row.menuId)"> 删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--table页脚-->
<!--    <div style="padding-top: 10px">-->
<!--      <el-pagination-->
<!--          background-->
<!--          @size-change="handleSizeChange"-->
<!--          @current-change="handleCurrentChange"-->
<!--          :page-size="searchFromParams.pageSize"-->
<!--          :total="total"-->
<!--          layout="total, sizes, prev, pager, next, jumper"-->
<!--      />-->
<!--    </div>-->

    <!-- 添加和修改抽屉-->
    <SharedDrawer
        ref="sharedDrawerRef"
        :isShowDrawer="isShow"
        :modeDrawer="mode"
        :currentDrawerData="currentDrawerData"
        @handleClose="closeDrawer"
        @submit="submitHandle"
    />
</template>

<script lang="ts" setup>
import {onMounted, ref, vShow} from "vue";

import SharedDrawer from '@/views/system/menu/components/MenuDrawer.vue';
import {ElMessageBox} from "element-plus";
import {mainStore} from '@/storm/modules/main';
import {Refresh, Search} from '@element-plus/icons-vue';
import  * as menuApis from "@/api/system/menu";



//----
const emits = defineEmits(['getLatestMenu']);

const getLatestMenu = () => {
  emits('getLatestMenu');
}

//-----


/**
 * 抽屉是否可见
 */
const isShow = ref(false);
/**
 * 抽屉模式
 */
const mode = ref('');
/**
 * 抽屉里的数据
 */
const currentDrawerData = ref({
  parentMenuId: '',
  menuName: '',
  routerPath: '',
  routerComponent: '',
  menuType: '',
  menuOrder: '',
  menuList: [],
  menuEchoItems: [],
});


/**
 * 打开抽屉  添加模式
 */
const addDrawer = () => {
  //设置抽屉为可见状态 模式为add 设置抽屉里可以选择的父级菜单列表
  isShow.value = true
  mode.value = 'add'
  currentDrawerData.value.menuList = handleDrMenu(tableData);
}

/**
 * 打开抽屉  编辑模式
 * @param menuId  菜单id
 */
const editDrawer = (menuId) => {

  isShow.value = true
  mode.value = 'edit'
  //调用查询方法
  menuApis.getMenuById(menuId).then(res => {
    currentDrawerData.value = res.data.data
    //编辑时 选择父级菜单手动处理添加顶级菜单选项   tableDat为当前列表的菜单 避免再次请求后台获取列表接口 手动给他添加上顶级菜单选项
    currentDrawerData.value.menuList = handleDrMenu(tableData);
    //设置父级菜单的回显    根据整个menuId的值找到父级菜单并回显
    currentDrawerData.value.menuEchoItems = findMenuItemWithAncestors(currentDrawerData.value.menuList, menuId);
  })
};

/**
 * 传入菜单列表 在菜单列表集合最前面添加顶级菜单
 * @param data
 */
function handleDrMenu(data) {
  const drawerMenuList = [];
  for (let i = 0; i < data.value.length; i++) {
    drawerMenuList.push(data.value[i]);
  }
  drawerMenuList.unshift({
    menuId: 0,
    menuName: '顶级菜单',
    children: []
  })
  return drawerMenuList;
}

/**
 * 根据整个menuId的值找到父级菜单并回显
 * 例子  menuID为3  他的父为2 2的父为1 1的父为0  回显需要 [0,1,2]   他上级的所有的父级菜单id的集合
 * @param menuList 菜单数据
 * @param targetMenuId 菜单menuID
 * @param ancestorIds 返回父菜单接口 比如 [0, 1, 2]
 */
function findMenuItemWithAncestors(menuList, targetMenuId, ancestorIds = []) {
  // 遍历 menuList 查找 targetMenuId 对应的菜单项
  const targetMenuItem = menuList.find((item) => item.menuId === targetMenuId);
  // 如果targetMenuId的父级菜单id为0 需要返回[0] 直接进行返回不需要再递归查找
  if (targetMenuItem && targetMenuItem.parentMenuId === 0) {
    return [0];
  }
  // 继续执行原有递归查找逻辑
  for (const menuItem of menuList) {
    if (menuItem.menuId === targetMenuId) {
      return [...ancestorIds];
    }
    if (menuItem.children) {
      const result = findMenuItemWithAncestors(menuItem.children, targetMenuId, [...ancestorIds, menuItem.menuId]);
      if (result.length > 0) {
        return result;
      }
    }
  }
  return [];
}


/**
 * 关闭抽屉  清空抽屉内数据
 */
const closeDrawer = () => {
  isShow.value = false;
  //关闭抽屉清空数据
  currentDrawerData.value = {
    parentMenuId: '',
    menuName: '',
    routerPath: '',
    menuOrder: '',
  }
  console.log("关闭了抽屉")
}


/**
 * 传递给抽屉子组件的方法  当抽屉组件点击提交时 根据mode判断是编辑还是新增
 * @param data 抽屉组件传来的数据
 */
const submitHandle = (data) => {
  //判断mode add 为新增  edit 为编辑
  if (mode.value === 'add') {
    subAddMenu(data);
  } else if (mode.value === 'edit') {
    subUpdateMenu(data);
  } else {
    console.log("submitHandle意料之外");
  }
};


/**
 * 执行新增的方法
 * @param data 抽屉里填写新增的数据
 */
const subAddMenu = (data) => {
  //发送请求添加数据
  menuApis.addMenu(data).then(res => {
    if (res.data.code !== 200) {
      //添加失败打印错误信息
      console.log("添加失败");
    } else {
      //添加成功关闭抽屉
      closeDrawer();
      //获取最新的数据
      getLatestInterface();
    }
  })
};

/**
 * 执行编辑修改的逻辑
 * @param data 抽屉里填写编辑的数据
 */
const subUpdateMenu = (data) => {
  menuApis.updateMenu(data).then(res => {
    if (res.data.code !== 200) {
      //添加失败打印错误信息
      console.log("修改失败");
    } else {
      //添加成功关闭抽屉
      closeDrawer();
      getLatestInterface();
    }
  })
};


function addMenuHandle(data) {
  menuApis.addMenu(data).then(res => {
    console.log("addMenu", res);
    if (res.data.code === 200) {
      getMenuTableData();
    }
  })
}


//页面table 数据
const tableData = ref();

//用来获取搜索的div的高度
const searchBox = ref(null);
const hideUnfoldOrFoldSearch = ref(false);

//默认隐藏更多搜索
const unfoldOrFoldSearch = ref(false);
//切换搜索框隐藏状态
const toggleShowSearch = () => {
  unfoldOrFoldSearch.value = !unfoldOrFoldSearch.value;
};

const hideSearchOtherAndLineHandlers = () => {
  const boxHeight = searchBox.value ? searchBox.value.offsetHeight : 0;
  hideUnfoldOrFoldSearch.value = boxHeight > 65;
  if (hideUnfoldOrFoldSearch.value) {
    unfoldOrFoldSearch.value = true;
  }
  console.log("boxHeight",boxHeight);
  console.log("hideUnfoldOrFoldSearch",hideUnfoldOrFoldSearch.value ,boxHeight > 60)
};

onMounted(() => {
  getMenuTableData()
  hideSearchOtherAndLineHandlers();
});





const getMenuTableData = () => {
  console.log("searchParams", searchFromParams.value);
  menuApis.getMenuList(searchFromParams.value).then(res => {
    console.log("res:", res.data);
    if (res.data != null) {
      console.log(" tableData  MenuList:", res.data.data);
      tableData.value = res.data.data;
      total.value = parseInt(res.data.data.total);
      searchFromParams.value.currentPage = parseInt(res.data.data.current);
    }
  });
}


// 删除行数据的函数，这里仅作示意，实际应指向具体的删除功能逻辑
const tableDeleteMenu = (menuId) => {
  console.log("删除按钮的MenuID", menuId);
  ElMessageBox.confirm(
      '是否确定删除',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '返回',
        type: 'warning',
      }
  ).then(() => {

    menuApis.logicalDelete([].concat(menuId)).then(res => {
      console.log("tableDeleteMenu", res)
      if (res.data.code == 200) {
        console.log("删除成功刷新最新 列表和菜单")
        getLatestInterface();
      }
    })
  }).catch((error) => {
    console.log(error);
  });
}


const store = mainStore()


/**
 * 获取最新的界面  动态菜单 和  form表单
 */
const getLatestInterface = () => {

  // getLatestMenu();
  // console.log("获取了最新的");
  //使用pinia的方法直接重新获取
  //-----------
  //获取列表
  getMenuTableData();
  //重新获取数据渲染左侧动态菜单
  store.requestMenuList();
};


// 监听表格的选择变化事件
const selectedMenuIds = ref([]);
const onSelectionChange = (selected) => {
  // 提取选中的menuId列表
  selectedMenuIds.value = selected.map(row => row.menuId);
};

const topDeleteMenu = () => {
  menuApis.logicalDelete(selectedMenuIds.value).then(res => {
    console.log("topDeleteMenu", res)
    console.log("topDeleteMenu", res.data.code)
    if (res.data.code == 200) {
      console.log("topDeleteMenu刷新");
      getMenuTableData()
    }
  })
};


//----分页
const total = ref(0);
// 查询参数
const searchFromParams = ref({
  menuName: '',
  currentPage: 1, // 第几页
  pageSize: 10, // 每页显示多少条
});

function handleSizeChange(newPageSize) {
  console.log("handleSizeChange", newPageSize);
  searchFromParams.value.pageSize = newPageSize;
  searchFromParams.value.currentPage = 1; // 重置当前页码为第一页
  getMenuTableData();
}

function handleCurrentChange(newCurrentPage) {
  searchFromParams.value.currentPage = newCurrentPage;
  getMenuTableData();
}


const searchFormHandler = () => {
  getMenuTableData();
}
//----只显示table
const showSearch = ref(true);

const updateShowSearch = () => {
  showSearch.value = !showSearch.value;
};


//刷新按钮
const refreshTable = () => {
  getMenuTableData();
}

</script>

<style lang="scss" scoped>

.search-box {
  padding-top: 10px
}
.hide-section-search {
  height: 50px; /* 设置您想要的高度 */
  overflow: hidden; /* 隐藏超出部分 */
}

</style>