import { assign, createMachine } from 'xstate';

const DEFAULT_CONTEXT: Machines.StudyMachine.Context = {
  chapter: null as never,
  fen: '',
  studyColor: 'white',
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
  hints: [],
  comment: undefined,
};

export const createStudyMachine = (studyColor: Color) =>
  createMachine<
    Machines.StudyMachine.Context,
    Machines.StudyMachine.Event,
    Machines.StudyMachine.State
  >(
    {
      id: 'study',
      initial: 'configuring',
      context: {
        ...DEFAULT_CONTEXT,
        studyColor,
      },
      states: {
        configuring: {
          on: {
            CHAPTER_CHANGED: {
              actions: 'chapterChanged',
              target: 'playingLine',
            },
          },
        },
        playingLine: {
          always: { target: 'lineEnded', cond: 'isEndOfLine' },
          on: {
            MOVE_PLAYED: {
              actions: ['playUserMove'],
            },
            AI_PLAYED_MOVE: {
              actions: ['playAiMove'],
            },
            CHAPTER_CHANGED: {
              actions: ['chapterChanged'],
              target: 'playingLine',
            },
          },
        },
        lineEnded: {
          on: {
            BOARD_RESET: {
              actions: 'resetBoard',
              target: 'playingLine',
            },
            CHAPTER_CHANGED: {
              actions: 'chapterChanged',
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

            if (!context.chapter.isEndOfLine()) {
              delta = context.chapter.playAiMove();
            }

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
              comment: delta.comment,
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
              comment: delta.comment,
            };
          }
          return context;
        }),
        resetBoard: assign((context) => {
          context.chapter.reset();
          if (context.studyColor === 'black') {
            const delta = context.chapter.playAiMove();

            return {
              studyColor,
              chapter: context.chapter,
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
              comment: delta.comment,
            };
          }
          return {
            ...DEFAULT_CONTEXT,
            chapter: context.chapter,
          };
        }),
        chapterChanged: assign((context, event) => {
          if (event.type === 'CHAPTER_CHANGED') {
            if (context.studyColor === 'black') {
              event.data.chapter.reset();
              const delta = event.data.chapter.playAiMove();

              return {
                studyColor,
                chapter: event.data.chapter,
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
                comment: delta.comment,
              };
            } else {
              return {
                ...DEFAULT_CONTEXT,
                studyColor,
                chapter: event.data.chapter,
              };
            }
          }

          return context;
        }),
      },
    },
  );
