<template>
  <template v-for="menu in props.menus" :key="menu.id">
    <!-- If there are submenus, display the submenus. -->
    <ElSubMenu v-if="menu.children && menu.children.length > 0" :index="menu.id">
      <template #title>
        <div :class="menu.icon" h-5 w-5 />
        <b ml-2> {{ menu.name }} </b>
      </template>

      <HeaderChild :menus="menu.children" />
    </ElSubMenu>

    <!-- If there are no submenus, display the menu item. -->
    <template v-else>
      <a v-if="'4' === menu.type" :href="menu.path">
        <ElMenuItem :index="menu.id" :class="{ active: topMenu.active === menu.id }">
          <div :class="menu.icon" h-5 w-5 />
          <b ml-2> {{ menu.name }} </b>
        </ElMenuItem>
      </a>

      <RouterLink v-else :to="menu.path">
        <ElMenuItem :index="menu.id" :class="{ active: topMenu.active === menu.id }">
          <div :class="menu.icon" h-5 w-5 />
          <b ml-2> {{ menu.name }} </b>
        </ElMenuItem>
      </RouterLink>
    </template>
  </template>
</template>

<script setup lang="ts">
import { useNavMenuStore } from '@/pinia';

const props = defineProps(['menus']);
const { topMenu } = storeToRefs(useNavMenuStore());
</script>

<style scoped lang="scss">
.active {
  background-color: var(--background-trans);
}

.el-menu-item,
:deep(.el-sub-menu__title) {
  margin-top: 0.25rem;
  border-radius: 0.75rem;
}
</style>
