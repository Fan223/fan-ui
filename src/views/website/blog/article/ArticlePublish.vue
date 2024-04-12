<template>
  <div>
    <ElDialog
      v-model="props.dialog.visible"
      title="发布文章"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="false"
    >
      <ElForm :model="props.form" ref="addFormRef" label-width="80px">
        <ElFormItem prop="categoryId" label="文章分类">
          <ElCheckboxGroup v-model="checkedCategory" :min="0" :max="1" size="large" border>
            <ElCheckbox v-for="category in categories" :value="category.id" :label="category.name" />
          </ElCheckboxGroup>
        </ElFormItem>

        <ElFormItem prop="cover" label="文章封面">
          <ElInput v-model="props.form.cover" placeholder="请输入文章封面" />
        </ElFormItem>
        <ElFormItem prop="flag" label="文章状态">
          <ElRadioGroup v-model="props.form.flag">
            <ElRadio value="Y"> 正常 </ElRadio>
            <ElRadio value="N"> 禁用 </ElRadio>
          </ElRadioGroup>
        </ElFormItem>
      </ElForm>

      <template #footer>
        <ElButton type="info" @click="props.dialog.visible = false"> 取消 </ElButton>
        <ElButton type="primary" @click="publishArticle"> 确定 </ElButton>
      </template>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
import { Category } from '../category/category';

const props = defineProps(['dialog', 'form']);
const checkedCategory = ref([]);

const categories = ref([] as Category[]);
function listCategories() {
  request
    .get('/fan/blog/category/listCategories')
    .then((res) => {
      categories.value = res.data;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
listCategories();

function publishArticle() {
  props.form.categoryId = checkedCategory.value[0];

  request
    .post('/fan/blog/article/saveArticle', props.form)
    .then((res: any) => {
      if (200 === res.code) {
        ElMessage.success('发布成功');
        router.push('/web/blog/article');
      } else {
        ElMessage.error(res.message);
      }
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}

defineExpose({
  checkedCategory,
});
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
