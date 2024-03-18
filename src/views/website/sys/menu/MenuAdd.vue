<template>
  <div>
    <ElDialog
      v-model="props.dialog.add"
      title="添加菜单"
      width="60%"
      :close-on-click-modal="false"
      @close="addFormRef.resetFields()"
    >
      <ElForm :model="addForm" ref="addFormRef" label-width="80px">
        <ElRow>
          <ElCol :span="12">
            <ElFormItem prop="parentId" label="上级菜单">
              <ElTreeSelect
                v-model="addForm.parentId"
                :data="props.menus"
                placeholder="请选择上级菜单"
                node-key="id"
                :props="{ label: 'name', children: 'children' }"
                show-checkbox
                check-strictly
                clearable
              />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem prop="position" label="位置">
              <ElSelect v-model="addForm.position" placeholder="请选择位置">
                <ElOption label="顶部" value="top" />
                <ElOption label="侧栏" value="aside" />
              </ElSelect>
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElRow>
          <ElCol :span="12">
            <ElFormItem prop="name" label="菜单名称">
              <ElInput v-model="addForm.name" placeholder="请输入菜单名称" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem prop="authority" label="权限编码">
              <ElInput v-model="addForm.authority" placeholder="请输入权限编码" clearable />
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElRow>
          <ElCol :span="12">
            <ElFormItem prop="path" label="菜单路径">
              <ElInput v-model="addForm.path" placeholder="请输入菜单路径" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem prop="component" label="组件">
              <ElInput v-model="addForm.component" placeholder="请输入组件" clearable />
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElRow>
          <ElCol :span="12">
            <ElFormItem prop="icon" label="图标">
              <ElInput v-model="addForm.icon" placeholder="请输入图标" clearable />
            </ElFormItem>
          </ElCol>
          <ElCol :span="12">
            <ElFormItem prop="flag" label="状态">
              <ElRadioGroup v-model="addForm.flag">
                <ElRadio label="Y"> 正常 </ElRadio>
                <ElRadio label="N"> 禁用 </ElRadio>
              </ElRadioGroup>
            </ElFormItem>
          </ElCol>
        </ElRow>

        <ElFormItem prop="type" label="类型">
          <ElRadioGroup v-model="addForm.type">
            <ElRadio :label="1"> 目录 </ElRadio>
            <ElRadio :label="2"> 菜单 </ElRadio>
            <ElRadio :label="3"> 按钮 </ElRadio>
            <ElRadio :label="4"> 链接 </ElRadio>
          </ElRadioGroup>
        </ElFormItem>

        <ElFormItem prop="orderNum" label="排序号">
          <ElInputNumber v-model="addForm.orderNum" :min="1" />
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton type="info" @click="props.dialog.add = false"> 取消 </ElButton>
        <ElButton type="primary" @click="addMenu"> 确定 </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Menu } from '@/router/menu';

const props = defineProps(['dialog', 'menus']);
const emit = defineEmits(['listMenus']);
const addForm = reactive({
  type: 1,
  flag: 'Y',
  orderNum: 1,
} as Menu);
const addFormRef = ref();

function addMenu() {
  request
    .post('/fan/sys/menu/addMenu', addForm)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('添加成功');
        props.dialog.add = false;
        emit('listMenus');
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch(() => {});
}
</script>

<style scoped lang="scss">
@media (max-width: 992px) {
  :deep(.el-dialog) {
    width: 80% !important;
  }
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }
}
</style>
