<template>
  <div text-center py-4>
    <p m="0 b-1">
      <a href="https://beian.miit.gov.cn/" target="_blank"> 湘ICP备2022002121号-1 </a>
    </p>
    <span> Copyright 2021-{{ currentYear }} Fan. All Rights Reserved. </span>
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<style scoped lang="scss"></style>
