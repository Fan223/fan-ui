import { createRouter, createWebHistory } from 'vue-router';
import { useNavMenuStore } from '@/pinia';
import { Menu } from './menu';
import { stringify } from 'qs';

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
        { path: '/article/preview/:id', name: 'Preview', component: () => import('@/vditor/Preview.vue') },
      ],
    },
    {
      path: '/article/add',
      name: 'ArticleAdd',
      component: () => import('@/views/website/blog/article/ArticleAdd.vue'),
    },
    {
      path: '/article/update/:id',
      name: 'ArticleUpdate',
      component: () => import('@/views/website/blog/article/ArticleUpdate.vue'),
    },
  ],
});

router.beforeEach((to, _from, next) => {
  const { isRoute, topMenu, asideMenu } = storeToRefs(useNavMenuStore());

  if (!isRoute.value) {
    request
      .get('/fan/sys/menu/listMenus?' + stringify({ type: [1, 2, 4], flag: 'Y' }))
      .then((res) => {
        res.data.forEach((menu: Menu) => {
          bindRoute(menu);
        });
        isRoute.value = true;
        next(to.path);
      })
      .catch(() => {
        ElMessage.error('Error occurred while retrieving menus');
      });
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

        if (!topMenu.value.active) {
          request
            .get('/fan/sys/menu/getTopMenuId/' + id)
            .then((res) => {
              topMenu.value.active = res.data;
            })
            .catch(() => {
              ElMessage.error('Error occurred while retrieving menus');
            });
        }
      }
    });
    next();
  }
});

export default router;
