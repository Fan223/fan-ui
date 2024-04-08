<template>
  <div class="v-header" h-12 flex="~ items-center justify-between" p="l-4 r-8">
    <div @click="$router.push('/web/blog/article')" flex="~ items-center" cursor-pointer>
      <div class="i-line-md-chevron-small-left" h-8 w-8 />
      <ElButton style="padding-left: 0" text> <b font-size-4> 文章管理 </b> </ElButton>
    </div>

    <ElForm :model="updateForm" w-full mx-4>
      <ElFormItem prop="title" style="margin: 0">
        <ElInput
          style="height: 2.5rem"
          v-model="updateForm.data.title"
          placeholder="请输入标题"
          clearable
          maxlength="100"
          show-word-limit
        />
      </ElFormItem>
    </ElForm>

    <div
      @click="
        () => {
          dialog.visible = true;
          updateForm.data.content = vditorRef.vditor.getValue();
        }
      "
      flex="~ items-center"
      cursor-pointer
    >
      <ElButton style="padding-right: 0.5rem" text> <b font-size-4> 发布 </b> </ElButton>
      <div class="i-line-md-telegram" h-5 w-5 />
    </div>
  </div>

  <Vditor ref="vditorRef" :form="updateForm" />
  <ArticlePublish ref="articlePublishRef" :dialog="dialog" :form="updateForm.data" />
</template>

<script setup lang="ts">
import Vditor from '@/vditor/Vditor.vue';
import ArticlePublish from './ArticlePublish.vue';
import { Article } from './article';

const updateForm = reactive({
  data: {
    title: '',
    content: '',
  } as Article,
});
const vditorRef = ref();
const articlePublishRef = ref();
const dialog = reactive({
  visible: false,
});

onMounted(() => {
  router.isReady().then(() => {
    request
      .get('/fan/blog/article/getArticle/' + router.currentRoute.value.params.id)
      .then((res) => {
        updateForm.data = res.data;
        vditorRef.value.vditor.setValue(res.data.content);
        articlePublishRef.value.checkedCategory.push(updateForm.data.categoryId);
      })
      .catch((error) => {
        ElMessage.error(error.message);
      });
  });
});
</script>

<style scoped lang="scss">
.v-header {
  background-color: var(--background-primary);

  > div:hover {
    color: var(--text-accent);

    .el-button {
      color: var(--text-accent) !important;
    }
  }

  .el-button {
    background-color: var(--background-primary) !important;
    color: var(--text-normal) !important;
  }
}
</style>
