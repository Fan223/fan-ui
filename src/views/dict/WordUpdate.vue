<template>
  <div>
    <ElDialog
      v-model="props.dialog.update"
      title="修改单词"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="false"
      @open="updateForm.data = { ...props.updateRow }"
      @close="updateFormRef.resetFields()"
    >
      <ElForm :model="updateForm.data" ref="updateFormRef" label-width="80px">
        <ElFormItem prop="en" label="英文">
          <ElInput v-model="updateForm.data.en" placeholder="请输入英文" clearable />
        </ElFormItem>
        <ElFormItem prop="phonetic" label="发音">
          <ElInput v-model="updateForm.data.phonetic" placeholder="请输入发音" clearable />
        </ElFormItem>
        <ElFormItem prop="cn" label="中文">
          <ElInput type="textarea" v-model="updateForm.data.cn" placeholder="请输入中文" autosize clearable />
        </ElFormItem>
        <ElFormItem prop="type" label="状态">
          <ElSelect v-model="updateForm.data.type" placeholder="请选择状态" clearable>
            <ElOption label="掌握" value="0" />
            <ElOption label="熟悉" value="1" />
            <ElOption label="模糊" value="2" />
            <ElOption label="陌生" value="3" />
          </ElSelect>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton type="info" @click="props.dialog.update = false"> 取消 </ElButton>
        <ElButton type="primary" @click="updateWord"> 确定 </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Word } from './word';

const props = defineProps(['dialog', 'updateRow']);
const emit = defineEmits(['pageWords']);
const updateForm = reactive({
  data: {} as Word,
});
const updateFormRef = ref();

function updateWord() {
  request
    .put('/fan/word/updateWord', updateForm.data)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('修改成功');
        props.dialog.update = false;
        emit('pageWords');
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
