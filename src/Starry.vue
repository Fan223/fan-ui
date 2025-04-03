<template>
  <div v-for="i in 2" :key="i" :class="['starry', `starry${i}`]" />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@use 'sass:math';
@use 'sass:string';

@function generateShadows($n) {
  $shadows: '#{math.random(100)}vw #{math.random(100)}vh #f1f3f9';

  @for $i from 2 through $n {
    $shadows: '#{$shadows}, #{math.random(100)}vw #{math.random(100)}vh #f1f3f9';
  }
  @return string.unquote($shadows);
}

.starry {
  position: fixed;
  border-radius: 50%;

  &::after {
    content: '';
    position: fixed;
    top: 100vh;
    height: inherit;
    width: inherit;
    border-radius: inherit;
    box-shadow: inherit;
  }
}

.starry1 {
  height: 1px;
  width: 1px;
  box-shadow: generateShadows(450);
  animation: moveUp 15s linear infinite;
  z-index: -995;
}

.starry2 {
  height: 2px;
  width: 2px;
  box-shadow: generateShadows(150);
  animation: moveUp 45s linear infinite, twinkle 30s infinite alternate;
  z-index: -994;
}

@keyframes moveUp {
  to {
    transform: translateY(-100vh);
  }
}

@keyframes twinkle {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.8;
  }
}
</style>
