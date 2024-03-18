import { Menu } from './menu';

export function bindRoute(menu: Menu) {
  let route = menuToRoute(menu);

  if (route) {
    let hasAside = checkAside(menu);
    router.addRoute(hasAside ? 'Aside' : 'Layout', route);
  }

  if (menu.children && menu.children.length > 0) {
    menu.children.forEach((child: Menu) => {
      bindRoute(child);
    });
  }
}

const modules = import.meta.glob('@/views/**/*.vue');
function menuToRoute(menu: Menu) {
  let path = '/src/views' + menu.component + '/Index.vue';

  return menu.component
    ? {
        name: menu.id,
        path: menu.path,
        component: modules[path],
        meta: {
          title: menu.name,
          position: menu.position,
        },
      }
    : null;
}

// Check if the menu is a sidebar menu and if the submenu exists in the sidebar menu
function checkAside(menu: Menu) {
  if ('aside' === menu.position) {
    return true;
  }

  if (menu.children && menu.children.length > 0) {
    for (let i = 0; i < menu.children.length; i++) {
      return checkAside(menu.children[i]);
    }
  }
}
