import { createRouter, createWebHistory } from 'vue-router';
import { useNavMenuStore } from '@/pinia';
import { Menu } from './menu';

const router = createRouter({
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ? savedPosition : { left: 0, top: 0 };
  },
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/layout/Layout.vue'),
      redirect: '/blog',
      children: [
        { path: '/aside', name: 'Aside', component: () => import('@/layout/aside/Aside.vue') },
        { path: '/:pathMatch(.*)*', name: '404', component: () => import('@/error/404.vue') },
      ],
    },
  ],
});

const menus = [
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
    children: [
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
    ],
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
        type: 4,
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

router.beforeEach((to, _from, next) => {
  const { isRoute, topMenu, asideMenu } = storeToRefs(useNavMenuStore());

  if (!isRoute.value) {
    menus.forEach((menu: Menu) => {
      bindRoute(menu);
    });
    isRoute.value = true;
    next(to.path);
  } else {
    router.isReady().then(() => {
      let id = to.name as string;

      if ('top' === to.meta.position) {
        topMenu.value.active = id;
        asideMenu.value.active = '';
        topMenu.value.dialog = false;
      } else if ('aside' === to.meta.position) {
        asideMenu.value.active = id;
        asideMenu.value.drawer = false;
      }
    });
    next();
  }
});

export default router;
