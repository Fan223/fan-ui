<template>
  <div style="background-color: #1a1a1a" h-150 w-full absolute left-0 top-0 z--999>
    <div class="banner-screen w-85% left-50% translate-x--50%" h-100 absolute top-0 blur-72 z--999 />
    <div style="background: var(--banner-cover)" h-75 mt-75 />
  </div>
</template>

<script setup lang="ts">
import theme from '@/assets/ts/useTheme';

onMounted(() => {
  let bannerScreen = document.getElementsByClassName('banner-screen')[0] as HTMLElement;

  watchEffect(() => {
    if ('light' === theme.value || ('OS' === theme.value && matchMedia('(prefers-color-scheme: light)').matches)) {
      bannerScreen.classList.add('banner-screen-light');
    } else {
      bannerScreen.classList.remove('banner-screen-light');
    }
  });
});
</script>

<style scoped lang="scss">
.banner-screen {
  background: var(--main-gradient);
  transition: all 0.5s ease-in-out;
}

.banner-screen-light {
  height: 37.5rem;
  width: 100%;
  filter: blur(0);
}
</style>
