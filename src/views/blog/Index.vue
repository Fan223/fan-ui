<template>
  <!-- 推荐文章 -->
  <Article :articles="recommendArticles.slice(0, 1)" layout="vertical" />

  <div class="article-recommend" v-if="recommendArticles.length > 1">
    <!-- 推荐栏 -->
    <div style="background: var(--main-gradient)" p-1 rd-4>
      <div
        style="background-color: var(--background-secondary)"
        h-full
        w-full
        p-4
        rd-4
        flex="~ items-center justify-center"
        op-90
      >
        <div class="i-ic:round-recommend" h-8 w-8 />
        <b ml-2>推荐文章</b>
      </div>
    </div>

    <!-- 推荐文章 -->
    <Article :articles="recommendArticles.slice(1, 3)" :column="2" />
  </div>

  <!-- 分类 -->
  <Category
    :categories="categories"
    :selectId="queryForm.categoryId"
    @handleCategoryChange="handleCategoryChange"
    @handleDialogVisible="handleDialogVisible"
  />

  <!-- 文章 -->
  <Article :articles="articles" />

  <ElPagination
    layout="prev, pager, next"
    v-model:current-page="pagination.current"
    :page-size="pagination.size"
    :total="pagination.total"
    @current-change="handleCurrentChange"
    :pager-count="5"
    background
    hide-on-single-page
    flex="~ justify-center"
  />

  <Footer v-if="articles.length > 0" />
  <BlogSearch :dialog="dialog" :queryForm="queryForm" @pageArticles="pageArticles" />
</template>

<script setup lang="ts">
import BlogSearch from './BlogSearch.vue';
import Article from './Article.vue';
import { type Article as ArticleType } from '@/views/website/blog/article/article';
import Category from './Category.vue';
import { stringify } from 'qs';

const queryForm = reactive({
  categoryId: '',
  title: '',
});
const pagination = reactive({
  current: 1,
  size: 12,
  total: 12,
});
const dialog = reactive({
  visible: false,
});
function handleDialogVisible() {
  dialog.visible = true;
}

// 推荐文章
const recommendArticles = ref<ArticleType[]>([]);
function listRecommendArticles() {
  request.get('/fan/blog/article/listRecommendArticles').then((res) => {
    recommendArticles.value = res.data;
  });
}
listRecommendArticles();

const categories = ref([]);
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

function handleCategoryChange(categoryId: string) {
  queryForm.categoryId = categoryId;
  pageArticles();
}

const articles = ref([] as ArticleType[]);
function pageArticles() {
  let params = stringify({
    categoryId: queryForm.categoryId,
    title: queryForm.title,
    flag: 'Y',
    currentPage: pagination.current,
    pageSize: pagination.size,
  });

  request
    .get('/fan/blog/article/pageArticles?' + params)
    .then((res) => {
      articles.value = res.data.records;
      pagination.total = res.data.total;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
pageArticles();

function handleCurrentChange() {
  pageArticles();
}
</script>

<style scoped lang="scss">
.article-recommend {
  display: grid;
  gap: 2rem;
  margin: 2rem;
  grid-template-columns: auto 1fr;
}

@media (max-width: 992px) {
  .article-recommend {
    grid-template-columns: auto;
  }
}
</style>
