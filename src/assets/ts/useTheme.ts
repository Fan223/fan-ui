// Retrieve system theme
const media = matchMedia('(prefers-color-scheme: dark)');
function followOS() {
  document.documentElement.dataset.theme = media.matches ? 'dark' : 'light';
}

// Listen for theme changes
const theme = ref(localStorage.getItem('theme') || 'OS');
watchEffect(() => {
  localStorage.setItem('theme', theme.value);

  if ('OS' === theme.value) {
    followOS();
    media.addEventListener('change', followOS);
  } else {
    document.documentElement.dataset.theme = theme.value;
    media.removeEventListener('change', followOS);
  }
});

export default theme;
