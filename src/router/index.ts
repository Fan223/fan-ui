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

router.beforeEach(async (to) => {
  const { isRoute, topMenu, asideMenu } = storeToRefs(useNavMenuStore());

  if (!localStorage.getItem('token')) {
    await login();
  }

  if (!isRoute.value) {
    await request
      .get('/fan/admin/menu/listRouteMenus')
      .then((res) => {
        res.data.forEach((menu: Menu) => {
          bindRoute(menu);
        });
        isRoute.value = true;
      })
      .catch(async (error) => {
        if (401 === error.response.status) {
          await login();
          router.go(0);
        } else {
          ElMessage.error('Failed to initialize routes');
        }
      });

    if (isRoute.value) {
      return to.fullPath;
    }
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
            .get('/fan/admin/menu/getTopMenuId/' + id)
            .then((res) => {
              topMenu.value.active = res.data;
            })
            .catch(() => {
              ElMessage.error('Failed to retrieve aside menus');
            });
        }
      }
    });
  }
});

async function login() {
  let loginForm = reactive({
    username: 'common',
    password: 'common',
  });

  await request.post('/fan/login', loginForm).then((res: any) => {
    if (200 === res.code) {
      localStorage.setItem('token', res.data);
    }
  });
}

export default router;
