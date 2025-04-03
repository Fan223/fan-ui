// 跟随系统主题
const isLight = ref();
const media = matchMedia('(prefers-color-scheme: light)');
function followOs() {
  isLight.value = media.matches;
  document.documentElement.dataset.theme = media.matches ? 'light' : 'dark';
}

// 支持的主题类型
export type Theme = 'os' | 'light' | 'dark';
const storedTheme = localStorage.getItem('theme') as Theme;
const theme = ref<Theme>(['os', 'light', 'dark'].includes(storedTheme) ? storedTheme : 'os');

// 监听主题变化
watchEffect(() => {
  localStorage.setItem('theme', theme.value);

  if ('os' === theme.value) {
    followOs();
    media.addEventListener('change', followOs);
  } else {
    isLight.value = 'light' === theme.value;
    document.documentElement.dataset.theme = theme.value;
    media.removeEventListener('change', followOs);
  }
});

function changeTheme(val: Theme) {
  theme.value = val;
}

export { theme, isLight, changeTheme };
