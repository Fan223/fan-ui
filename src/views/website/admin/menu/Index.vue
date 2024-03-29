<template>
  <!-- Query area -->
  <ElForm :model="queryForm" ref="queryFormRef" label-width="70px" inline @keyup.enter="listMenus">
    <ElFormItem prop="name" label="菜单名称">
      <ElInput v-model="queryForm.name" placeholder="请输入菜单名称" clearable />
    </ElFormItem>
    <ElFormItem prop="type" label="菜单类型">
      <ElSelect v-model="queryForm.type" placeholder="请选择菜单类型" clearable>
        <ElOption label="目录" value="1" />
        <ElOption label="菜单" value="2" />
        <ElOption label="按钮" value="3" />
        <ElOption label="链接" value="4" />
      </ElSelect>
    </ElFormItem>
    <ElFormItem prop="position" label="菜单位置">
      <ElSelect v-model="queryForm.position" placeholder="请选择菜单位置" clearable>
        <ElOption label="顶部" value="top" />
        <ElOption label="侧栏" value="aside" />
      </ElSelect>
    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary" size="small" @click="listMenus"> 查询 </ElButton>
      <ElButton type="info" size="small" @click="queryFormRef.resetFields()"> 重置 </ElButton>
    </ElFormItem>
  </ElForm>

  <div flex="~ justify-between">
    <b ml--4> 查询结果 </b>
    <div>
      <ElButton type="primary" size="small" @click="dialog.add = true"> 新增 </ElButton>
      <ElPopconfirm
        v-if="multipleSelection.length > 0"
        title="确认删除吗？"
        confirm-button-type="info"
        confirm-button-text="取消"
        cancel-button-type="danger"
        cancel-button-text="删除"
        @cancel="batchDeleteMenus(multipleSelection)"
      >
        <template #reference>
          <ElButton type="danger" size="small"> 批量删除 </ElButton>
        </template>
      </ElPopconfirm>
    </div>
  </div>

  <!-- Result area -->
  <ElTable :data="menus" row-key="id" max-height="470px" @selection-change="handleSelectionChange">
    <ElTableColumn type="selection" />
    <ElTableColumn prop="name" label="名称" min-width="140px" />
    <ElTableColumn prop="position" label="位置" align="center" min-width="65px">
      <template #default="{ row }">
        <ElTag v-if="row.position === 'top'" effect="dark" type="primary" size="small"> 顶部 </ElTag>
        <ElTag v-else-if="row.position === 'aside'" effect="dark" type="success" size="small"> 侧栏 </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="path" label="路径" align="center" min-width="160px" />
    <ElTableColumn prop="authority" label="权限编码" align="center" min-width="150px" />
    <ElTableColumn prop="component" label="组件" align="center" min-width="185px" />
    <ElTableColumn prop="type" label="类型" align="center" min-width="65px">
      <template #default="{ row }">
        <ElTag v-if="row.type === 1" effect="dark" type="info" size="small"> 目录 </ElTag>
        <ElTag v-else-if="row.type === 2" effect="dark" type="info" size="small"> 菜单 </ElTag>
        <ElTag v-else-if="row.type === 3" effect="dark" type="info" size="small"> 按钮 </ElTag>
        <ElTag v-else-if="row.type === 4" effect="dark" type="info" size="small"> 链接 </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="icon" label="图标" align="center" min-width="55px">
      <template #default="{ row }">
        <div :class="row.icon" h-4 w-4 ma />
      </template>
    </ElTableColumn>
    <ElTableColumn prop="orderNum" label="排序" align="center" min-width="55px" />
    <ElTableColumn prop="flag" label="状态" align="center" min-width="65px">
      <template #default="{ row }">
        <ElTag v-if="row.flag === 'Y'" effect="dark" type="success" size="small"> 正常 </ElTag>
        <ElTag v-else-if="row.flag === 'N'" effect="dark" type="danger" size="small"> 禁用 </ElTag>
      </template>
    </ElTableColumn>
    <ElTableColumn prop="createTime" label="创建时间" align="center" min-width="105px" />

    <ElTableColumn fixed="right" label="操作" align="center" min-width="135px">
      <template #default="{ row }">
        <ElButton type="primary" size="small" @click="updateMenu(row)"> 编辑 </ElButton>
        <ElPopconfirm
          title="确认删除吗？"
          confirm-button-type="info"
          confirm-button-text="取消"
          cancel-button-type="danger"
          cancel-button-text="删除"
          @cancel="batchDeleteMenus(row.id)"
        >
          <template #reference>
            <ElButton type="danger" size="small"> 删除 </ElButton>
          </template>
        </ElPopconfirm>
      </template>
    </ElTableColumn>
  </ElTable>

  <MenuAdd :dialog="dialog" :menus="menus" @listMenus="listMenus" />
  <MenuUpdate :dialog="dialog" :menus="menus" @listMenus="listMenus" :updateRow="updateRow" />
</template>

<script setup lang="ts">
import MenuAdd from './MenuAdd.vue';
import MenuUpdate from './MenuUpdate.vue';
import { Menu } from '@/router/menu';
import { stringify } from 'qs';

const queryForm = reactive({
  name: '',
  type: '',
  position: '',
});
const queryFormRef = ref();
const dialog = reactive({
  add: false,
  update: false,
});

const multipleSelection = ref([] as string[]);
function handleSelectionChange(selection: any[]) {
  multipleSelection.value = selection.map((select: any) => select.id);
}

const menus = ref([] as Menu[]);
function listMenus() {
  let params = stringify({
    name: queryForm.name,
    type: queryForm.type,
    position: queryForm.position,
  });

  request
    .get('/fan/admin/menu/listMenus?' + params)
    .then((res) => {
      menus.value = res.data;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
listMenus();

const updateRow = ref({} as Menu);
function updateMenu(row: Menu) {
  dialog.update = true;
  updateRow.value = row;
}

function batchDeleteMenus(id: string | string[]) {
  request
    .delete('/fan/admin/menu/batchDeleteMenus/' + id)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('删除成功');
        listMenus();
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
</script>

<style scoped lang="scss">
.el-form {
  .el-form-item {
    margin: 0.5rem 2rem 1rem 0;
  }

  .el-input,
  .el-select {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .el-form {
    .el-input,
    .el-select {
      width: 100px;
    }
  }
}
</style>
