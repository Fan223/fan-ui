<template>
  <div
    :style="{ height: props.size, width: props.size, color: props.color }"
    h-full
    w-full
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  size?: string;
  color?: string;
}

const props = defineProps<Props>();
</script>

<style scoped lang="scss"></style>
