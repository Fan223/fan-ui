<template>
  <Aurora p-1 rd-4 m="x-8 y-4">
    <div style="background-color: var(--background-secondary)" p-2 rd-4>
      <div class="nav-header">
        <ul>
          <li
            v-for="type in types"
            :key="type.code"
            :class="{ active: queryForm.type === type.code }"
            @click="handleTypeChange(type.code)"
          >
            <b> {{ type.name }} </b>
          </li>
        </ul>

        <div mr-4>
          <ElInput
            v-model="queryForm.name"
            placeholder="资源搜索"
            clearable
            @keyup.enter="pageNavs"
            style="width: 12rem"
          >
            <template #prefix>
              <div class="i-ic-baseline-search" h-6 w-6 cursor-pointer @click="pageNavs" />
            </template>
          </ElInput>
        </div>
      </div>

      <ElCarousel height="auto" trigger="click" :autoplay="false" @change="handleCurrentChange">
        <ElCarouselItem v-for="item in Math.ceil(pagination.total / pagination.size)" :key="item">
          <div>
            <ul class="nav" grid="~ gap-8" list-none m-0 p="x-4 y-8" rd-4>
              <a v-for="nav in navs" :href="nav.link" :key="nav.id" cursor-pointer>
                <li flex="~ col items-center">
                  <img :src="nav.icon" h-10 w-10 />
                  <div style="color: var(--text-accent)" mt-2>{{ nav.name }}</div>
                </li>
              </a>
            </ul>
          </div>
        </ElCarouselItem>
      </ElCarousel>
    </div>
  </Aurora>

  <Footer />
</template>

<script setup lang="ts">
import { Nav } from '@/views/website/nav/nav';
import { stringify } from 'qs';

const types = [
  { code: 0, name: '前端' },
  { code: 1, name: '后端' },
  { code: 2, name: '其他' },
];

const queryForm = reactive({
  name: '',
  type: 1,
});

function handleTypeChange(code: number) {
  queryForm.type = code;
  pageNavs();
}

const pagination = reactive({
  current: 1,
  size: 12,
  total: 12,
});

const navs = ref([] as Nav[]);
function pageNavs() {
  let params = stringify({
    currentPage: pagination.current,
    pageSize: pagination.size,
    name: queryForm.name,
    type: queryForm.type,
  });

  request
    .get('/fan/nav/pageNavs?' + params)
    .then((res) => {
      navs.value = res.data.records;
      pagination.total = res.data.total;
      pagination.current = res.data.current;
      pagination.size = res.data.size;
    })
    .catch((error) => {
      ElMessage.error(error.message);
    });
}
pageNavs();

function handleCurrentChange(index: number) {
  pagination.current = index + 1;
  pageNavs();
}
</script>

<style scoped lang="scss">
.nav-header {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--text-accent);

  ul {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    justify-content: center;

    li {
      display: flex;
      padding: 0.5rem 1rem;
      margin-right: 0.5rem;
      border-radius: 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: var(--background-trans);
      }
    }
  }
}

.active {
  background-color: var(--background-trans);
}

:deep(.el-carousel__item) {
  height: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav {
  grid-template-columns: repeat(6, 1fr);
  background-color: var(--background-secondary);
}

@media (max-width: 992px) {
  .nav {
    grid-template-columns: repeat(3, 1fr);
  }
  :deep(.el-carousel__item) {
    height: 520px !important;
  }
}

@media (max-width: 768px) {
  .nav {
    grid-template-columns: repeat(2, 1fr);
  }
  :deep(.el-carousel__item) {
    height: 720px !important;
  }
}
</style>
