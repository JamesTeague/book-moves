import { assign, createMachine } from 'xstate';
import { ChessChapter } from 'chess-moves';

const DEFAULT_CONTEXT: Machines.StudyMachine.Context = {
  chapter: null as never,
  fen: '',
  turnColor: 'white',
  isCheck: false,
  dests: new Map<string, string[]>(),
  lastMove: undefined,
  isGameOver: false,
  isStalemate: false,
  isCheckmate: false,
  isDraw: false,
  isThreefoldRepetition: false,
  isInsufficientMaterial: false,
};

export const createStudyMachine = (chapter: ChessChapter) =>
  createMachine<
    Machines.StudyMachine.Context,
    Machines.StudyMachine.Event,
    Machines.StudyMachine.State
  >(
    {
      id: 'study',
      initial: 'playingLine',
      context: {
        ...DEFAULT_CONTEXT,
        chapter,
      },
      states: {
        playingLine: {
          always: { target: 'lineEnded', cond: 'isEndOfLine' },
          on: {
            MOVE_PLAYED: {
              actions: ['playUserMove'],
            },
            AI_PLAYED_MOVE: {
              actions: ['playAiMove'],
            },
          },
        },
        lineEnded: {
          on: {
            BOARD_RESET: {
              actions: 'resetBoard',
              target: 'playingLine',
            },
          },
        },
      },
    },
    {
      guards: {
        isEndOfLine: (context) => context.chapter.isEndOfLine(),
      },
      actions: {
        playUserMove: assign((context, event) => {
          if (event.type === 'MOVE_PLAYED') {
            let delta = context.chapter.playUserMove(
              event.data.from as never,
              event.data.to as never,
            );

            if (context.fen === delta.fen) {
              return {
                ...context,
                hints: context.chapter.showHints(),
              };
            }

            delta = context.chapter.playAiMove();

            return {
              ...context,
              fen: delta.fen,
              turnColor: delta.turnColor,
              isCheck: delta.isCheck,
              lastMove: {
                from: delta.lastMove.from,
                to: delta.lastMove.to,
              },
              dests: delta.dests,
              isGameOver: delta.isGameOver,
              isStalemate: delta.isStalemate,
              isCheckmate: delta.isCheckmate,
              isDraw: delta.isDraw,
              isThreefoldRepetition: delta.isThreefoldRepetition,
              isInsufficientMaterial: delta.isInsufficientMaterial,
              hints: [],
            };
          }
          return context;
        }),
        playAiMove: assign((context, { type }) => {
          if (type === 'AI_PLAYED_MOVE') {
            const delta = context.chapter.playAiMove();

            return {
              ...context,
              fen: delta.fen,
              turnColor: delta.turnColor,
              isCheck: delta.isCheck,
              lastMove: {
                from: delta.lastMove.from,
                to: delta.lastMove.to,
              },
              dests: delta.dests,
              isGameOver: delta.isGameOver,
              isStalemate: delta.isStalemate,
              isCheckmate: delta.isCheckmate,
              isDraw: delta.isDraw,
              isThreefoldRepetition: delta.isThreefoldRepetition,
              isInsufficientMaterial: delta.isInsufficientMaterial,
              hints: [],
            };
          }
          return context;
        }),
        resetBoard: assign((_) => {
          chapter.reset();
          return {
            ...DEFAULT_CONTEXT,
            chapter,
          };
        }),
      },
    },
  );
