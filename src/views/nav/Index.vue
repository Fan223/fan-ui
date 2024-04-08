<template>
  <ElCarousel height="auto" trigger="click" :autoplay="false" @change="handleCurrentChange" m="x-8 y-4">
    <ElCarouselItem v-for="item in Math.ceil(pagination.total / pagination.size)" :key="item">
      <div style="background: var(--main-gradient)" p-1 rd-4>
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

  <Footer />
</template>

<script setup lang="ts">
import { Nav } from '@/views/website/nav/nav';
import { stringify } from 'qs';

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
