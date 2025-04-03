<template>
  <div class="banner-container">
    <div :class="['banner', { 'banner-light': isLight }]" />
    <div style="background: var(--banner-cover)" h-75 mt-75 z--997 />
  </div>
</template>

<script setup lang="ts">
import { isLight } from '@/assets/ts/theme';
</script>

<style scoped lang="scss">
.banner-container {
  position: absolute;
  display: grid;
  width: 100%;
  z-index: -999;

  > * {
    grid-area: 1/1;
  }
}

.banner {
  background: var(--main-gradient);
  transition: var(--main-transition);
  height: 25rem;
  width: 85%;
  margin: 0 auto;
  filter: blur(72px);
  z-index: -998;
}

.banner-light {
  height: 37.5rem;
  width: 100%;
  filter: blur(0);
}
</style>
