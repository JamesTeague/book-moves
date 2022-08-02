<template>
  <Chessboard :config="config" :arrows="hints" />
  <div class="ml-2 relative">
    <div class="absolute top-0">
      <blockquote class="relative border-l-4 pl-4 sm:pl-6 dark:border-gray-700">
        <p class="text-gray-800 dark:text-white">
          <em>
            {{ comment }}
          </em>
        </p>
      </blockquote>
    </div>
    <div class="absolute bottom-0">
      <div class="mb-2">
        <Dropdown :chapters="props.study.getChapters()" :send="send" />
      </div>
      <div class="flex items-center mb-2">
        <input
          v-model="showHints"
          type="checkbox"
          id="hs-basic-with-description-unchecked"
          class="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
          checked
        />
        <label
          for="hs-basic-with-description-unchecked"
          class="text-sm text-gray-500 ml-3 dark:text-gray-400"
          >Hint Arrows</label
        >
      </div>
      <div class="flex items-center mb-2">
        <input
          type="checkbox"
          id="hs-basic-with-description-checked"
          class="relative shrink-0 w-[3.25rem] h-7 bg-gray-100 checked:bg-none checked:bg-blue-600 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 border border-transparent ring-1 ring-transparent focus:border-blue-600 focus:ring-blue-600 ring-offset-white focus:outline-none appearance-none dark:bg-gray-700 dark:checked:bg-blue-600 dark:focus:ring-offset-gray-800 before:inline-block before:w-6 before:h-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:shadow before:rounded-full before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
          disabled
        />
        <label
          for="hs-basic-with-description-checked"
          class="text-sm text-gray-500 ml-3 dark:text-gray-400"
          >Slow Board Reset</label
        >
      </div>
      <label
        for="move-speed-label"
        class="block text-sm font-medium mb-2 dark:text-white"
        >Move Speed:</label
      >
      <select
        class="opacity-70 rounded-full pointer-events-none py-3 px-4 pr-9 block border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
        v-model="delay"
        id="move-speed-label"
        disabled
      >
        <option
          v-for="option in options"
          :value="option.value"
          :key="option.text"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMachine } from '@xstate/vue';
import { Chessboard } from 'vue-chessground';
import 'vue-chessground/chessboard.css';
import {
  ChessChapter,
  ChessStudy,
  createChessGame,
  DrawShape,
} from 'chess-moves';
import Dropdown from '../../dropdown/Dropdown.vue';
import { createStudyMachine } from '../../../machines';

const props = defineProps<{
  study: ChessStudy;
  studyColor: 'black' | 'white';
}>();

const chessGame = createChessGame();
const { state, send } = useMachine(createStudyMachine(props.studyColor));

const movePlayed = (from: string, to: string) => {
  send({ type: 'MOVE_PLAYED', data: { from, to } });
};

const DEFAULT_CONFIG = {
  fen: '',
  check: false,
  orientation: props.studyColor,
  turnColor: 'white',
  lastMove: [],
  highlight: {
    lastMove: true,
  },
  draggable: {
    showGhost: true,
  },
  movable: {
    free: false,
    color: props.studyColor,
    dests: chessGame.getDests(),
    events: {
      after: movePlayed,
    },
  },
};

const showHints = ref(true);
const slowReset = ref(false);
const delay = ref(0);
const comment = ref<string>();

const options = ref([
  { text: 'instant', value: 0 },
  { text: 'fast', value: 500 },
  { text: 'medium', value: 1500 },
  { text: 'slow', value: 5000 },
]);

const configureMachine = (chapter: ChessChapter) => {
  send('CHAPTER_CHANGED', { data: { chapter } });
};

const resetBoard = () => {
  send('BOARD_RESET');
};

const config = ref(DEFAULT_CONFIG);

const hints = ref<DrawShape[]>([]);

watch(state, ({ context }) => {
  if (state.value.matches('lineEnded')) {
    resetBoard();
  } else {
    hints.value = showHints.value ? [...context.hints] : [];
    comment.value = context.comment;

    config.value = {
      fen: context.fen,
      check: context.isCheck,
      orientation: props.studyColor,
      turnColor: context.turnColor,
      highlight: {
        lastMove: true,
      },
      lastMove: [],
      draggable: {
        showGhost: true,
      },
      movable: {
        free: false,
        color: props.studyColor,
        dests: context.dests as never,
        events: {
          after: movePlayed,
        },
      },
    };
  }
});

configureMachine(props.study.selectChapter(0)!);
</script>

<style scoped></style>
