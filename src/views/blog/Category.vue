<template>
  <div class="category-container">
    <!-- 分类项 -->
    <ul class="category" :style="{ height: expand ? 'auto' : '3rem' }">
      <li :class="{ 'category--active': props.selectId === '' }" @click="emit('handleCategoryChange', '')">
        <div w-18 text-center py-2>全部</div>
      </li>
      <li
        v-for="category in props.categories"
        :key="category.id"
        @click="emit('handleCategoryChange', category.id)"
        flex
      >
        <div
          :class="{ 'category--active': props.selectId === category.id }"
          style="border-top-left-radius: inherit; border-bottom-left-radius: inherit"
          p="l-4 r-2 y-2"
        >
          {{ category.name }}
        </div>
        <b style="color: var(--text-accent)" p="l-2 r-4 y-2">
          {{ category.count }}
        </b>
      </li>
    </ul>

    <!-- 伸展及搜索 -->
    <div flex="~ items-center justify-center">
      <Icon
        :class="[
          'hover-2',
          {
            'i-line-md-chevron-small-double-up': expand,
            'i-line-md-chevron-small-double-down': !expand,
          },
        ]"
        size="2.5rem"
        cursor-pointer
        @click="expand = !expand"
      />
      <Icon class="i-ic-baseline-search hover-2" size="2rem" @click="emit('handleDialogVisible')" cursor-pointer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Category } from '@/views/website/blog/category/category';

interface Props {
  categories: Category[];
  selectId?: string;
}

const props = withDefaults(defineProps<Props>(), {
  selectId: '',
});
const emit = defineEmits(['handleCategoryChange', 'handleDialogVisible']);

const expand = ref(false);
</script>

<style scoped lang="scss">
.category-container {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 5rem;
  background-color: var(--background-secondary);
  margin: 2rem;
  padding: 1rem;
  border-radius: 1rem;
}

.category {
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;

  li {
    background-color: var(--background-primary);
    margin: 0.5rem 0.5rem;
    border-radius: 0.5rem;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
  }

  &--active {
    background: var(--main-gradient);
    color: #ffffff;
    font-weight: bold;
  }
}

.hover-2 {
  &:hover {
    opacity: 0.5;
  }
}
</style>
