<template>
  <div class="category" grid m-8 p-3 rd-3>
    <ul :class="{ expand: categories.expand }" list-none flex="~ wrap" h-12 m-0 p-0 overflow-y-hidden>
      <li :class="{ active: categories.activeId === '' }" @click="pageArticles('', 1)" m-2 rd-2 cursor-pointer>
        <div p="x-3 y-2" w-16 text-center>全部</div>
      </li>
      <li v-for="category in categories.data" @click="pageArticles(category.id, 1)" flex m-2 rd-2 cursor-pointer>
        <div :class="{ active: categories.activeId === category.id }" p="x-3 y-2">{{ category.name }}</div>
        <b style="color: var(--text-accent)" p-2> {{ category.count }} </b>
      </li>
    </ul>

    <div @click="categories.expand = !categories.expand" m="l-4 t-2" cursor-pointer>
      <div v-if="!categories.expand" class="i-line-md-chevron-small-double-down expand-icon" />
      <div v-if="categories.expand" class="i-line-md-chevron-small-double-up expand-icon" />
    </div>
  </div>

  <ul class="article" grid="~ gap-8" list-none m-8 p-0>
    <template v-for="article in articles">
      <RouterLink :to="'/article/preview/' + article.id">
        <li h-full relative rd-3>
          <img :src="article.cover" h-60 w-full rd-3 />
          <div
            style="background: var(--main-gradient)"
            h-60
            w-full
            absolute
            top-0
            rd-3
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
    mt-8
  />

  <Footer v-if="articles.length > 0" />
</template>

<script setup lang="ts">
import { Category } from '@/views/website/blog/category/category';
import { Article } from '@/views/website/blog/article/article';
import { stringify } from 'qs';

const pagination = reactive({
  current: 1,
  size: 12,
  total: 12,
});

const categories = reactive({
  activeId: '',
  data: [] as Category[],
  expand: false,
});
function listCategories() {
  request
    .get('/fan/blog/category/listCategories?flag=Y')
    .then((res) => {
      categories.data = res.data;
    })
    .catch(() => {});
}
listCategories();

const articles = ref([] as Article[]);
function pageArticles(categoryId: string, current: number) {
  categories.activeId = categoryId;
  pagination.current = current;

  request
    .get(
      '/fan/blog/article/pageArticles?' +
        stringify({ currentPage: current, pageSize: pagination.size, categoryId: categoryId })
    )
    .then((res) => {
      pagination.total = res.data.total;
      articles.value = res.data.records;
    })
    .catch(() => {});
}
pageArticles('', 1);

function handleCurrentChange() {
  pageArticles(categories.activeId, pagination.current);
}
</script>

<style scoped lang="scss">
.category {
  grid-template-columns: minmax(0, 1fr) 4rem;
  background-color: var(--background-secondary);

  ul {
    li {
      background-color: var(--background-primary);

      div {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }

      &:hover {
        opacity: 0.5;
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

.expand-icon {
  height: 36px;
  width: 36px;

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
