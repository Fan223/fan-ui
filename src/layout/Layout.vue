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
    >
      <template #header>
        <Header style="color: var(--text-bright)" />
      </template>

      <ElMenu :default-active="topMenu.active" style="width: 80%; margin: 0 auto">
        <HeaderChild :menus="topMenu.data" />
      </ElMenu>
    </ElDrawer>
  </div>

  <RouterView />
</template>

<script setup lang="ts">
import Header from './header/Header.vue';
import HeaderChild from './header/HeaderChild.vue';
import { useNavMenuStore } from '@/pinia';

const { topMenu } = storeToRefs(useNavMenuStore());
</script>

<style scoped lang="scss"></style>
