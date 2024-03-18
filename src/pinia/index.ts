import { Menu } from '@/router/menu';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    scrollPercent: 0,
    screenWidth: window.innerWidth,
  }),
});

export const useNavMenuStore = defineStore('navMenu', {
  state: () => ({
    isRoute: false,
    topMenu: {
      active: '',
      data: [] as Menu[],
      dialog: false,
    },
    asideMenu: {
      active: '',
      data: [] as Menu[],
      visible: true,
      drawer: false,
    },
  }),
});

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 4,
  }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
