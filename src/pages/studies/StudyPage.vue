<template>
  <div class="min-h-full">
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ study.title }}
        </h1>
      </div>
    </header>
    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <div class="px-4 py-6 sm:px-0">
          <!--          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96" />-->
          <StudyBoard :chapter="chapter" :study-color="study.color" />
        </div>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { createChessStudy } from 'chess-moves';
import StudyBoard from '../../components/boards/StudyBoard/StudyBoard.vue';
import { inject, ref } from 'vue';

const props = defineProps<{ studyId: string }>();
const repositories = inject('repositories') as App.Repositories;

const study = await repositories.studyRepository.getStudyById(props.studyId);
const chessStudy = createChessStudy(study.pgn);

const chapter = ref(chessStudy.selectChapter(0));

const onSelect = (index: number) => {
  chapter.value = chessStudy.selectChapter(index);
};
</script>

<style scoped></style>
