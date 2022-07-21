<template>
  <Chessboard :config="config" :arrows="hints" />
  <div>
    <Dropdown :chapters="props.study.getChapters()" :send="send" />
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
const { state, send } = useMachine(createStudyMachine(props.studyColor), {
  devTools: true,
});

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

const configureMachine = (chapter: ChessChapter) => {
  send('CHAPTER_CHANGED', { data: { chapter } });
};

const resetBoard = () => {
  send({ type: 'BOARD_RESET' });
};

const config = ref(DEFAULT_CONFIG);

const hints = ref<DrawShape[]>([]);

watch(state, ({ context }) => {
  if (state.value.matches('lineEnded')) {
    resetBoard();
  } else {
    if (context.hints) {
      hints.value = [...context.hints];
    }

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
