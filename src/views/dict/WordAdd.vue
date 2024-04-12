<template>
  <div>
    <ElDialog
      v-model="props.dialog.add"
      title="添加单词"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="false"
      @close="addFormRef.resetFields()"
    >
      <ElForm :model="addForm" ref="addFormRef" label-width="80px">
        <ElFormItem prop="en" label="英文">
          <ElInput v-model="addForm.en" placeholder="请输入英文" clearable />
        </ElFormItem>
        <ElFormItem prop="phonetic" label="发音">
          <ElInput v-model="addForm.phonetic" placeholder="请输入发音" clearable />
        </ElFormItem>
        <ElFormItem prop="cn" label="中文">
          <ElInput type="textarea" v-model="addForm.cn" placeholder="请输入中文" autosize clearable />
        </ElFormItem>
        <ElFormItem prop="type" label="单词状态">
          <ElSelect v-model="addForm.type" placeholder="请选择状态" clearable>
            <ElOption label="掌握" value="0" />
            <ElOption label="熟悉" value="1" />
            <ElOption label="模糊" value="2" />
            <ElOption label="陌生" value="3" />
          </ElSelect>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton type="info" @click="props.dialog.add = false"> 取消 </ElButton>
        <ElButton type="primary" @click="addWord"> 确定 </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Word } from './word';

const props = defineProps(['dialog']);
const emit = defineEmits(['pageWords']);
const addForm = reactive({
  type: '3',
} as Word);
const addFormRef = ref();

function addWord() {
  request
    .post('/fan/word/addWord', addForm)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('添加成功');
        props.dialog.add = false;
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
