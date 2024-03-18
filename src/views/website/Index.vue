<template>
  <ul>
    <template v-for="menu in asideMenu.data">
      <li>
        <h1>{{ menu.name }}</h1>
      </li>

      <ul v-if="menu.children && menu.children.length > 0">
        <li v-for="child in menu.children" @click="$router.push(child.path)" cursor-pointer>
          <h4>{{ child.name }}</h4>
        </li>
      </ul>
    </template>
  </ul>
</template>

<script setup lang="ts">
import { useNavMenuStore } from '@/pinia';

const { asideMenu } = storeToRefs(useNavMenuStore());
</script>

<style scoped lang="scss"></style>
