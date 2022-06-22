<template>
  <Chessboard :config="config" />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useMachine } from '@xstate/vue';
import { Chessboard } from 'vue-chessground';
import 'vue-chessground/chessboard.css';
import { createChessGameMachine } from '../machines';
import { createChessGame } from 'chess-moves';

const chessGame = createChessGame();
const { state, send } = useMachine(createChessGameMachine(chessGame));

const movePlayed = (from: string, to: string) => {
  send({ type: 'MOVE_PLAYED', data: { from, to } });
};

const config = ref({
  fen: '',
  check: false,
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
    color: 'white',
    dests: chessGame.getDests(),
    events: {
      after: movePlayed,
    },
  },
});

watch(state, ({ context }) => {
  config.value = {
    fen: context.fen,
    check: context.isCheck,
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
      color: 'white',
      dests: context.dests as never,
      events: {
        after: movePlayed,
      },
    },
  };
});
</script>

<style scoped></style>
