<template>
  <ElContainer>
    <ElAside v-show="asideMenu.visible">
      <ElMenu :default-active="asideMenu.active" style="position: fixed" h-full w-75>
        <AsideChild :menus="asideMenu.data" />
      </ElMenu>
    </ElAside>
    <ElDrawer
      v-model="asideMenu.drawer"
      style="--el-drawer-padding-primary: 0"
      :with-header="false"
      size="300px"
      direction="ltr"
    >
      <ElMenu :default-active="asideMenu.active" style="position: fixed" h-full w-75>
        <AsideChild :menus="asideMenu.data" />
      </ElMenu>
    </ElDrawer>

    <div
      class="collapse top-50%"
      :class="{ 'transform-75': asideMenu.visible }"
      @click="collapseAside"
      h-20
      w-8
      fixed
      left-0
      flex="~ items-center justify-center"
      op-25
      cursor-pointer
    >
      <div h-6 w-6 flex="~ col items-center">
        <div class="collapse-up" h-3 w-1 rd-4 />
        <div class="collapse-down" h-3 w-1 rd-4 />
      </div>
    </div>

    <ElMain>
      <RouterView />
    </ElMain>
  </ElContainer>
</template>

<script setup lang="ts">
import AsideChild from './AsideChild.vue';
import { useGlobalStore, useNavMenuStore } from '@/pinia';

const { screenWidth } = storeToRefs(useGlobalStore());
const { topMenu, asideMenu } = storeToRefs(useNavMenuStore());

// 监听顶部菜单变化，重新请求侧栏菜单（存在优化空间，不存在侧栏子菜单的不需要请求）
watchEffect(() => {
  let parentId = topMenu.value.active;

  if (parentId) {
    request
      .get('/fan/sys/menu/listChildMenus/' + parentId)
      .then((res) => {
        asideMenu.value.data = res.data;
      })
      .catch(() => {});
  }
});

function collapseAside() {
  if (screenWidth.value > 992) {
    asideMenu.value.visible = !asideMenu.value.visible;
  } else {
    asideMenu.value.drawer = !asideMenu.value.drawer;
  }
}

onMounted(() => {
  const collapse = document.getElementsByClassName('collapse')[0] as HTMLElement;
  const collapseUp = document.getElementsByClassName('collapse-up')[0] as HTMLElement;
  const collapseDown = document.getElementsByClassName('collapse-down')[0] as HTMLElement;

  collapse.addEventListener('mouseover', () => {
    if (screenWidth.value > 992 && asideMenu.value.visible) {
      // Stretch inward
      collapseUp.style.transform = 'translateY(0.15rem) rotate(15deg) translateZ(0px)';
      collapseDown.style.transform = 'translateY(-0.15rem) rotate(-15deg) translateZ(0px)';
    } else {
      // Stretch outward
      collapseUp.style.transform = 'translateY(0.15rem) rotate(-15deg) translateZ(0px)';
      collapseDown.style.transform = 'translateY(-0.15rem) rotate(15deg) translateZ(0px)';
    }
  });

  // Reset to straight state
  collapse.addEventListener('mouseout', () => {
    collapseUp.style.transform = 'translateY(0.15rem) rotate(0deg) translateZ(0px)';
    collapseDown.style.transform = 'translateY(-0.15rem) rotate(0deg) translateZ(0px)';
  });
});
</script>

<style scoped lang="scss">
.collapse {
  transition: var(--main-transition);

  &:hover {
    opacity: 1;
  }
}

.transform-75 {
  transform: translateX(300px) translateY(0%) rotate(0deg) translateZ(0px);
}

.collapse-up {
  transform: translateY(0.15rem) rotate(0deg) translateZ(0px);
  background-color: var(--text-normal);
}

.collapse-down {
  transform: translateY(-0.15rem) rotate(0deg) translateZ(0px);
  background-color: var(--text-normal);
}

@media (max-width: 992px) {
  .el-aside {
    display: none;
  }
  .collapse {
    transform: translateX(0px) translateY(0%) rotate(0deg) translateZ(0px);
  }
}

.el-main {
  background-color: var(--background-secondary);
  min-height: calc(100vh - 5rem);
  padding: 1rem 3rem;
}
</style>
