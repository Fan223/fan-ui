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
const { asideMenu } = storeToRefs(useNavMenuStore());
asideMenu.value.data = [
  {
    id: '82004672405639168',
    parentId: '81977748383932416',
    position: 'aside',
    name: '系统管理',
    path: '',
    authority: 'system',
    component: '',
    type: 1,
    icon: 'i-line-md-cog-filled-loop',
    orderNum: 310,
    flag: 'Y',
    createTime: '2023-10-18 17:06:48',
    updateTime: '2023-10-18 17:06:48',
    children: [
      {
        id: '82260452971188224',
        parentId: '82004672405639168',
        position: 'aside',
        name: '用户管理',
        path: '/sys/user',
        authority: 'sys:user',
        component: '/website/sys/user',
        type: 2,
        icon: 'i-mdi-user-circle',
        orderNum: 311,
        flag: 'Y',
        createTime: '2023-10-19 10:03:11',
        updateTime: '2023-10-19 10:03:11',
        children: [],
      },
      {
        id: '82260604414922752',
        parentId: '82004672405639168',
        position: 'aside',
        name: '角色管理',
        path: '/sys/role',
        authority: 'sys:role',
        component: '/website/sys/role',
        type: 2,
        icon: 'i-line-md-person-filled',
        orderNum: 312,
        flag: 'Y',
        createTime: '2023-10-19 10:03:47',
        updateTime: '2023-10-19 10:03:47',
        children: [],
      },
      {
        id: '82260206157369344',
        parentId: '82004672405639168',
        position: 'aside',
        name: '菜单管理',
        path: '/sys/menu',
        authority: 'sys:menu',
        component: '/website/sys/menu',
        type: 2,
        icon: 'i-ic-round-grid-view',
        orderNum: 313,
        flag: 'Y',
        createTime: '2023-10-19 10:02:12',
        updateTime: '2023-10-19 10:02:12',
        children: [],
      },
    ],
  },
  {
    id: '82004975498629120',
    parentId: '81977748383932416',
    position: 'aside',
    name: '博客管理',
    path: '',
    authority: 'blog',
    component: '',
    type: 1,
    icon: 'i-ic-round-menu-book',
    orderNum: 320,
    flag: 'Y',
    createTime: '2023-10-18 17:08:00',
    updateTime: '2023-10-18 17:08:00',
    children: [
      {
        id: '82273155014004736',
        parentId: '82004975498629120',
        position: 'aside',
        name: '文章管理',
        path: '/blog/article',
        authority: 'blog:article',
        component: '/website/blog/article',
        type: 2,
        icon: 'i-mdi-bookshelf',
        orderNum: 321,
        flag: 'Y',
        createTime: '2023-10-19 10:53:39',
        updateTime: '2023-10-19 10:53:39',
        children: [],
      },
      {
        id: '82273270848098304',
        parentId: '82004975498629120',
        position: 'aside',
        name: '分类管理',
        path: '/blog/category',
        authority: 'blog:category',
        component: '/website/blog/category',
        type: 2,
        icon: 'i-mdi-category-plus',
        orderNum: 322,
        flag: 'Y',
        createTime: '2023-10-19 10:54:07',
        updateTime: '2023-10-19 10:54:07',
        children: [],
      },
      {
        id: '82273328603664384',
        parentId: '82004975498629120',
        position: 'aside',
        name: '标签管理',
        path: '/blog/tag',
        authority: 'blog:tag',
        component: '/website/blog/tag',
        type: 2,
        icon: 'i-mdi-tag-multiple',
        orderNum: 323,
        flag: 'Y',
        createTime: '2023-10-19 10:54:20',
        updateTime: '2023-10-19 10:54:20',
        children: [],
      },
    ],
  },
];

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
