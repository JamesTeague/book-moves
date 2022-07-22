<template>
  <label
    for="chapter-select-label"
    class="block text-sm font-medium mb-2 dark:text-white"
    >Chapter Selection:</label
  >
  <select
    id="chapter-select-label"
    v-model="selected"
    class="py-3 px-4 pr-9 block border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
  >
    <option
      v-for="(chapter, index) in props.chapters"
      :key="index"
      :value="index"
    >
      {{ chapter.title }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ChessChapter } from 'chess-moves';
import { ref, watch } from 'vue';

const props = defineProps<{
  chapters: ChessChapter[];
  send: (
    event: 'CHAPTER_CHANGED',
    payload: { data: { chapter: ChessChapter } },
  ) => void;
}>();
const selected = ref(0);

watch(selected, () => {
  props.send('CHAPTER_CHANGED', {
    data: { chapter: props.chapters[selected.value] },
  });
});
</script>

<style scoped></style>
