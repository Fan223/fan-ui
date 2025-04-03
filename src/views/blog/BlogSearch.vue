<template>
  <div>
    <ElDialog
      v-model="props.dialog.visible"
      width="60%"
      :show-close="false"
      :lock-scroll="false"
      @opened="handleOpened"
      @close="props.queryForm.title = ''"
    >
      <div class="search" flex="~ items-center" p-2 rd-2>
        <div class="i-ic-baseline-search" h-8 w-8 cursor-pointer @click="emit('pageArticles')" />
        <ElInput
          ref="inputRef"
          v-model="queryForm.title"
          placeholder="搜索博客"
          clearable
          @keyup.enter="emit('pageArticles')"
        />
      </div>
    </ElDialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['dialog', 'queryForm']);
const emit = defineEmits(['pageArticles']);

const inputRef = ref();
const handleOpened = () => {
  nextTick(() => {
    inputRef.value?.focus();
  });
};
</script>

<style scoped lang="scss">
:deep(.el-dialog) {
  border-radius: 1rem;

  .el-dialog__header {
    padding-bottom: 0px;
  }
}

.search {
  border: 1px solid var(--text-accent);
  color: var(--text-accent);
}

:deep(.el-input) {
  .el-input__wrapper {
    box-shadow: none;
    height: 2rem;
  }

  .el-input__inner {
    color: var(--text-normal);
    font-size: large;
  }
}

@media (max-width: 992px) {
  :deep(.el-dialog) {
    width: 75% !important;
  }
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }
}
</style>
