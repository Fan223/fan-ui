<template>
  <Header />

  <div>
    <ElDrawer
      v-model="topMenu.dialog"
      style="--el-drawer-padding-primary: 0; transition: none"
      size="100%"
      :modal="false"
      :show-close="false"
      direction="ttb"
      :lock-scroll="false"
    >
      <template #header>
        <Header style="color: var(--text-bright)" />
      </template>

      <ElMenu :default-active="topMenu.active" style="width: 80%; margin: 0 auto">
        <HeaderChild :menus="topMenu.data" />
      </ElMenu>
    </ElDrawer>
  </div>

  <Login />
  <RouterView />
</template>

<script setup lang="ts">
import Header from './header/Header.vue';
import HeaderChild from './header/HeaderChild.vue';
import Login from '@/views/Login.vue';
import { useGlobalStore, useNavMenuStore } from '@/pinia';

const { scrollPercent, screenWidth } = storeToRefs(useGlobalStore());
function calcScrollPercent() {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  let windowHeight = window.innerHeight;
  let scrollHeight = document.documentElement.scrollHeight;

  let scrolled = Math.min((scrollTop / (scrollHeight - windowHeight)) * 100, 100);
  scrollPercent.value = Math.ceil(scrolled);
}
function handleScroll() {
  requestAnimationFrame(() => {
    calcScrollPercent();
  });
}

const { topMenu, asideMenu } = storeToRefs(useNavMenuStore());
function handleScreenResize() {
  screenWidth.value = window.innerWidth;

  if (screenWidth.value >= 768 && topMenu.value.dialog) {
    topMenu.value.dialog = false;
  }
  if (screenWidth.value >= 992 && asideMenu.value.drawer) {
    asideMenu.value.drawer = false;
  }
}

function listNavMenus() {
  request
    .get('/fan/admin/menu/listNavMenus')
    .then((res) => {
      topMenu.value.data = res.data;
    })
    .catch(() => {
      ElMessage.error('Failed to retrieve top navigation menus');
    });
}
listNavMenus();

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
  window.addEventListener('resize', handleScreenResize);
});
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  window.removeEventListener('resize', handleScroll);
  window.removeEventListener('resize', handleScreenResize);
});
</script>

<style scoped lang="scss"></style>
