<template>
  <header
    :class="{ active: scrollPercent > 0 }"
    sticky
    left-0
    top-0
    flex="~ items-center justify-between"
    p="x-8 y-4"
    c-white
    z-999
  >
    <div flex="~ items-center">
      <Logo height="2.5" width="2" />
      <Nav id="nav" />
    </div>

    <div flex="~ items-center">
      <ThemeIcon size="24px" />

      <div
        v-show="scrollPercent > 0"
        class="back-to-top"
        onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
        flex
      >
        <div class="scrollball header-icon" flex="~ justify-center items-center">
          <b font-size-3> {{ scrollPercent }} </b>
        </div>
        <div
          class="i-ic-outline-rocket header-icon"
          style="transition: var(--main-transition)"
          absolute
          translate-y--2
          opacity-0
        />
      </div>

      <div v-if="!topMenu.dialog" class="i-line-md-menu-fold-left header-icon" @click="topMenu.dialog = true" hidden />
      <div v-if="topMenu.dialog" class="i-line-md-close-small header-icon" @click="topMenu.dialog = false" />

      <ElAvatar src="https://img.fan223.cn/wallpaper/avatar/avatar1.jpg" @click="loginDialog = true" ml-2>
        登录
      </ElAvatar>
    </div>
  </header>
</template>

<script setup lang="ts">
import Nav from './Nav.vue';
import ThemeIcon from './ThemeIcon.vue';
import { useGlobalStore, useNavMenuStore } from '@/pinia';

const { scrollPercent, loginDialog } = storeToRefs(useGlobalStore());
const { topMenu } = storeToRefs(useNavMenuStore());
</script>

<style scoped lang="scss">
header {
  transition: var(--main-transition);

  &.active {
    background-color: var(--background-backdrop);
    backdrop-filter: blur(0.25rem);
    color: var(--text-bright);
    padding: 0.5rem 2rem;
  }
}

.back-to-top {
  .scrollball {
    background-color: var(--text-bright);
    color: var(--text-invert);
    border-radius: 50%;
    transition: var(--main-transition);
  }

  &:hover {
    .scrollball {
      opacity: 0;
      transform: translateY(0.5rem);
    }
    .i-ic-outline-rocket {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.header-icon {
  height: 24px;
  width: 24px;
  margin-left: 0.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  #nav {
    display: none;
  }
  .i-line-md-menu-fold-left {
    display: block;
  }
}
</style>
