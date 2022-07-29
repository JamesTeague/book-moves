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
        <div class="px-4 py-6 sm:px-0 grid grid-cols-2">
          <StudyBoard :study="chessStudy" :study-color="study.color" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { createChessStudy } from 'chess-moves';
import StudyBoard from '../../components/boards/StudyBoard/StudyBoard.vue';

import { inject } from 'vue';
import { useCurrentUser } from 'thin-backend-vue';

const props = defineProps<{ studyId: string }>();
const repositories = inject('repositories') as App.Repositories;
const user = useCurrentUser();

console.log('StudyPage.vue:::31', user.value);

const study = await repositories.studyRepository.getStudyById(props.studyId);
const chessStudy = createChessStudy(study.pgn);
</script>

<style scoped></style>
