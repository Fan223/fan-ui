<template>
  <div :style="{ height: props.size, width: props.size }" cursor-pointer>
    <div class="i-ic-twotone-contrast" v-if="'OS' === theme" @click="theme = 'dark'" />
    <div
      v-if="'dark' === theme"
      class="i-line-md-sunny-filled-loop-to-moon-filled-loop-transition"
      @click="theme = 'light'"
    />
    <div
      v-if="'light' === theme"
      class="i-line-md-moon-filled-to-sunny-filled-loop-transition"
      @click="theme = 'dark'"
    />
  </div>
</template>

<script setup lang="ts">
import theme from '@/assets/ts/useTheme';

const props = defineProps(['size']);
</script>

<style scoped lang="scss">
div {
  height: inherit;
  width: inherit;
}
</style>
