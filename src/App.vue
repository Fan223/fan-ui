<template>
  <Banner />
  <Starry />

  <RouterView v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>

<script setup lang="ts">
import Banner from './Banner.vue';
import Starry from './Starry.vue';
</script>

<style scoped lang="scss"></style>
