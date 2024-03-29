<template>
  <div>
    <ElDialog
      v-model="props.dialog.update"
      title="修改导航"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="false"
      @open="updateForm.data = { ...props.updateRow }"
      @close="updateFormRef.resetFields()"
    >
      <ElForm :model="updateForm.data" ref="updateFormRef" label-width="80px">
        <ElFormItem prop="type" label="导航类型">
          <ElSelect v-model="updateForm.data.type" placeholder="请选择导航类型" clearable>
            <ElOption label="前端" value="0" />
            <ElOption label="后端" value="1" />
            <ElOption label="其他" value="2" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem prop="name" label="导航名称">
          <ElInput v-model="updateForm.data.name" placeholder="请输入导航名称" clearable />
        </ElFormItem>
        <ElFormItem prop="link" label="导航链接">
          <ElInput v-model="updateForm.data.link" placeholder="请输入导航链接" clearable />
        </ElFormItem>
        <ElFormItem prop="icon" label="导航图标">
          <ElInput v-model="updateForm.data.icon" placeholder="请输入导航图标" clearable />
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton type="info" @click="props.dialog.update = false"> 取消 </ElButton>
        <ElButton type="primary" @click="updateNav"> 确定 </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Nav } from './nav';

const props = defineProps(['dialog', 'updateRow']);
const emit = defineEmits(['pageNavs']);
const updateForm = reactive({
  data: {} as Nav,
});
const updateFormRef = ref();

function updateNav() {
  request
    .put('/fan/nav/updateNav', updateForm.data)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('修改成功');
        props.dialog.update = false;
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
    width: 80% !important;
  }
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }
}
</style>
