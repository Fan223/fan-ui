<template>
  <div>
    <ElDialog
      v-model="props.dialog.visible"
      title="发布文章"
      width="60%"
      :close-on-click-modal="false"
      :lock-scroll="false"
    >
      <ElCheckboxGroup v-model="checkedCategory.name" :min="0" :max="1" size="large" border>
        <ElCheckbox
          v-for="category in categories"
          :key="category.id"
          :label="category.name"
          @change="checkedCategory.id = category.id"
        />
      </ElCheckboxGroup>

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
const checkedCategory = reactive({
  id: '',
  name: [],
});

const categories = ref([] as Category[]);
function listCategories() {
  request
    .get('/fan/blog/category/listCategories?flag=Y')
    .then((res) => {
      categories.value = res.data;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
listCategories();

function publishArticle() {
  props.form.categoryId = checkedCategory.id;

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
