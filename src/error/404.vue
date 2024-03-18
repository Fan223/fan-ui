<template>
  <div class="not-found" h-80vh flex="~ items-center justify-center" m="x-8 y-4" rd-4>
    <div class="i-line-md-emoji-frown-twotone" h-70 w-70 />
    <div text-center>
      <div style="text-shadow: 0 0 1rem #fefefe" font-size-28>404</div>
      <div>Looks like the page you are looking</div>
      <div>for is no longer here.</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.not-found {
  background-color: var(--background-secondary);
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .not-found {
    flex-direction: column;
  }
}
</style>
