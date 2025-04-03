<template>
  <Icon :size="props.size" cursor-pointer>
    <Icon i-ic:round-contrast v-if="'os' === theme" @click="changeTheme('light')" />
    <Icon i-line-md:sunny-filled-loop v-if="'light' === theme" @click="changeTheme('dark')" />
    <Icon i-line-md:moon-filled-loop v-if="'dark' === theme" @click="changeTheme('os')" />
  </Icon>
</template>

<script setup lang="ts">
import { theme, changeTheme } from '@/assets/ts/theme';

const props = withDefaults(defineProps<{ size?: string }>(), {
  size: '2rem',
});
</script>

<style scoped lang="scss"></style>
