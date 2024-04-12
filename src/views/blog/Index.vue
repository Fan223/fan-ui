<template>
  <div class="category" grid m-8 p-4 rd-4>
    <ul :class="{ expand: categories.expand }" list-none flex="~ wrap" h-12 m-0 p-0 overflow-y-hidden>
      <li :class="{ active: queryForm.categoryId === '' }" @click="handleCategoryChange('')" m-2 rd-2 cursor-pointer>
        <div p-2 w-16 text-center>全部</div>
      </li>
      <li v-for="category in categories.data" @click="handleCategoryChange(category.id)" flex m-2 rd-2 cursor-pointer>
        <div :class="{ active: queryForm.categoryId === category.id }" p-2>{{ category.name }}</div>
        <b style="color: var(--text-accent)" p-2> {{ category.count }} </b>
      </li>
    </ul>

    <div flex="~ items-center justify-center">
      <div @click="categories.expand = !categories.expand" cursor-pointer>
        <div v-if="!categories.expand" class="i-line-md-chevron-small-double-down hover-2" h-10 w-10 />
        <div v-if="categories.expand" class="i-line-md-chevron-small-double-up hover-2" h-10 w-10 />
      </div>
      <div class="i-ic-baseline-search hover-2" @click="dialog.visible = true" h-8 w-8 cursor-pointer />
    </div>
  </div>

  <ul class="article" grid="~ gap-8" list-none m-8 p-0>
    <template v-for="article in articles">
      <RouterLink :to="'/article/preview/' + article.id">
        <li h-full relative rd-4>
          <img :src="article.cover" h-60 w-full rd-4 />
          <div
            style="background: var(--main-gradient)"
            h-60
            w-full
            absolute
            top-0
            rd-4
            opacity-50
            mix-blend-screen
            pointer-events-none
          />
          <div style="background: var(--article-cover)" h-60 w-full absolute top-0 pointer-events-none />
          <h1 style="color: var(--text-bright)" mx-6 text-6>{{ article.title }}</h1>
          <p mx-6>{{ article.content }}</p>
        </li>
      </RouterLink>
    </template>
  </ul>

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
import { Category } from '@/views/website/blog/category/category';
import { Article } from '@/views/website/blog/article/article';
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

const categories = reactive({
  data: [] as Category[],
  expand: false,
});
function listCategories() {
  request
    .get('/fan/blog/category/listCategories?flag=Y')
    .then((res) => {
      categories.data = res.data;
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

const articles = ref([] as Article[]);
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
.category {
  grid-template-columns: minmax(0, 1fr) 6rem;
  background-color: var(--background-secondary);

  ul {
    li {
      background-color: var(--background-primary);
      &:hover {
        opacity: 0.5;
      }

      div {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }
    }

    &.expand {
      height: auto !important;
    }
  }
}

.active {
  background: var(--main-gradient);
  color: #ffffff;
}

.hover-2 {
  &:hover {
    opacity: 0.5;
  }
}

.article {
  grid-template-columns: repeat(3, 1fr);

  li {
    background-color: var(--background-secondary);

    p {
      word-break: break-word;

      &::after {
        content: '...';
      }
    }
  }
}

@media (max-width: 992px) {
  .article {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .article {
    grid-template-columns: 1fr;
  }
}
</style>
