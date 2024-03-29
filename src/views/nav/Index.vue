<template>
  <div v-for="nav in navs" :key="nav.id">
    <img :src="nav.icon" h-8 w-8 />
    {{ nav.name }}
  </div>

  <Footer />
</template>

<script setup lang="ts">
import { Nav } from '@/views/website/nav/nav';

const navs = ref([] as Nav[]);

function pageNavs() {
  request.get('/fan/nav/pageNavs').then((res) => {
    navs.value = res.data.records;
  });
}
pageNavs();
</script>

<style scoped lang="scss"></style>
