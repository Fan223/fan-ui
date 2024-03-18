<template>
  <div v-for="i in 3" :class="'starry' + i" class="rd-50%" fixed left-0 top-0 color-white />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
@function createShadows($n) {
  $shadows: '#{random(100)}vw #{random(100)}vh #fff';

  @for $i from 2 through $n {
    $shadows: '#{$shadows}, #{random(100)}vw #{random(100)}vh #fff';
  }

  @return unquote($shadows);
}

$size: 1px;
$count: 450;
$duration: 15s;
$twinkle: 0;

.starry1 {
  height: $size;
  width: $size;
  box-shadow: createShadows($count);
  animation: moveUp $duration linear infinite;
  z-index: -995;

  &::after {
    content: '';
    width: inherit;
    height: inherit;
    position: fixed;
    left: 0;
    top: 100vh;
    border-radius: inherit;
    box-shadow: inherit;
  }
}

@keyframes moveUp {
  to {
    transform: translateY(-100vh);
  }
}

@for $i from 2 through 3 {
  $size: $size + 2px;
  $count: calc($count / 3);
  $duration: $duration + 15s;
  $twinkle: $twinkle + 5s;

  .starry#{$i} {
    height: $size;
    width: $size;
    box-shadow: createShadows($count);
    animation: moveUp $duration linear infinite, twinkle $twinkle infinite alternate;
    z-index: -995 + $i;

    &::after {
      content: '';
      height: inherit;
      width: inherit;
      position: fixed;
      left: 0;
      top: 100vh;
      border-radius: inherit;
      box-shadow: inherit;
    }
  }
}

@keyframes twinkle {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
