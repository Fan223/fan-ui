<template>
  <div>
    <ElDialog
      v-model="props.dialog.add"
      title="添加导航"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="false"
      @close="addFormRef.resetFields()"
    >
      <ElForm :model="addForm" ref="addFormRef" label-width="80px">
        <ElFormItem prop="type" label="导航类型">
          <ElSelect v-model="addForm.type" placeholder="请选择导航类型" clearable>
            <ElOption label="前端" value="0" />
            <ElOption label="后端" value="1" />
            <ElOption label="其他" value="2" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem prop="name" label="导航名称">
          <ElInput v-model="addForm.name" placeholder="请输入导航名称" clearable />
        </ElFormItem>
        <ElFormItem prop="link" label="导航链接">
          <ElInput v-model="addForm.link" placeholder="请输入导航链接" clearable />
        </ElFormItem>
        <ElFormItem prop="icon" label="导航图标">
          <ElInput v-model="addForm.icon" placeholder="请输入导航图标" clearable />
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton type="info" @click="props.dialog.add = false"> 取消 </ElButton>
        <ElButton type="primary" @click="addNav"> 确定 </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Nav } from './nav';

const props = defineProps(['dialog']);
const emit = defineEmits(['pageNavs']);
const addForm = reactive({
  type: '0',
} as Nav);
const addFormRef = ref();

function addNav() {
  request
    .post('/fan/nav/addNav', addForm)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('添加成功');
        props.dialog.add = false;
        emit('pageNavs');
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
@media (max-width: 992px) {
  :deep(.el-dialog) {
    width: 75% !important;
  }
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }
}
</style>
