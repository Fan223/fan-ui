<template>
  <nav>
    <ul list-none flex="~ wrap" m="0 l-4" p-0>
      <template v-for="menu in topMenu.data">
        <li v-if="menu.children && menu.children.length > 0" m-1 p="x-3 y-2" rd-2>
          <b> {{ menu.name }} </b>
          <div class="popup" absolute ml--3 pt-3 hidden>
            <div style="background-color: var(--background-primary)" p-2 rd-2>
              <template v-for="child in menu.children">
                <a v-if="4 === child.type" :href="child.path" flex="~ col" p="x-8 y-2" rd-2> {{ child.name }} </a>

                <RouterLink v-else :to="child.path">
                  <div class="router-link" p="x-8 y-2" rd-2>{{ child.name }}</div>
                </RouterLink>
              </template>
            </div>
          </div>
        </li>

        <RouterLink v-else :to="menu.path">
          <li :class="{ active: topMenu.active === menu.id }" m-1 p="x-3 y-2" rd-2>
            <b> {{ menu.name }} </b>
          </li>
        </RouterLink>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useNavMenuStore } from '@/pinia';

const { topMenu } = storeToRefs(useNavMenuStore());
topMenu.value.data = [
  {
    id: '81973921257693184',
    parentId: '',
    position: 'top',
    name: '个人博客',
    path: '/blog',
    authority: 'blog',
    component: '/blog',
    type: 2,
    icon: 'i-ic-round-menu-book',
    orderNum: 100,
    flag: 'Y',
    createTime: '2023-10-18 15:04:36',
    updateTime: '2023-10-18 15:04:36',
    children: [],
  },
  {
    id: '81977524441653248',
    parentId: '',
    position: 'top',
    name: '在线工具',
    path: '/tool',
    authority: 'tool',
    component: '/tool',
    type: 2,
    icon: 'i-mdi-tools',
    orderNum: 200,
    flag: 'Y',
    createTime: '2023-10-18 15:18:55',
    updateTime: '2023-10-18 15:18:55',
    children: [],
  },
  {
    id: '81977748383932416',
    parentId: '',
    position: 'top',
    name: '网站后台',
    path: '/website',
    authority: 'website',
    component: '/website',
    type: 2,
    icon: 'i-mdi-web',
    orderNum: 300,
    flag: 'Y',
    createTime: '2023-10-18 15:19:49',
    updateTime: '2023-10-18 15:19:49',
    children: [],
  },
  {
    id: '81979760127320064',
    parentId: '',
    position: 'top',
    name: '关于',
    path: '/link',
    authority: 'link',
    component: '',
    type: 1,
    icon: 'i-mdi-about',
    orderNum: 400,
    flag: 'Y',
    createTime: '2023-10-18 15:27:48',
    updateTime: '2023-10-18 15:27:48',
    children: [
      {
        id: '81980159001436160',
        parentId: '81979760127320064',
        position: 'top',
        name: 'GitHub 仓库',
        path: 'https://github.com/Fan223',
        authority: '',
        component: '',
        type: 4,
        icon: 'i-line-md-github',
        orderNum: 410,
        flag: 'Y',
        createTime: '2023-10-18 15:29:23',
        updateTime: '2023-10-18 15:29:23',
        children: [],
      },
      {
        id: '81985658707054592',
        parentId: '81979760127320064',
        position: 'top',
        name: 'Blog',
        path: 'https://blog.fan223.cn/',
        authority: '',
        component: '',
        type: 2,
        icon: 'i-ic-round-menu-book',
        orderNum: 420,
        flag: 'Y',
        createTime: '2023-10-18 15:51:15',
        updateTime: '2023-10-18 15:51:15',
        children: [],
      },
    ],
  },
];
</script>

<style scoped lang="scss">
nav ul li:hover,
li.active {
  background-color: var(--background-trans);

  .popup {
    display: block;
  }
}

.popup {
  a {
    color: var(--text-bright);

    &:hover {
      background-color: var(--background-trans);
    }
  }

  .router-link:hover {
    background-color: var(--background-trans);
  }
}
</style>
