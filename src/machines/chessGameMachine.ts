import { assign, createMachine } from 'xstate';
import { type ChessGame } from 'chess-moves';

export const createChessGameMachine = (game: ChessGame) =>
  createMachine<
    BookMoves.Machines.ChessMachine.Context,
    BookMoves.Machines.ChessMachine.Event,
    BookMoves.Machines.ChessMachine.State
  >(
    {
      id: 'chessGame',
      initial: 'playing',
      context: {
        game,
        fen: '',
        turnColor: 'white',
        isCheck: false,
        dests: game.getDests(),
        lastMove: undefined,
        isGameOver: false,
        isStalemate: false,
        isCheckmate: false,
        isDraw: false,
        isThreefoldRepetition: false,
        isInsufficientMaterial: false,
      },
      states: {
        startingPosition: {
          on: {
            MOVE_PLAYED: {
              actions: 'playUserMove',
              target: 'playing',
            },
            GAME_STARTED: 'playing',
          },
        },
        playing: {
          always: { target: 'ended', cond: 'isGameOver' },
          on: {
            MOVE_PLAYED: {
              actions: ['playUserMove'],
            },
            AI_PLAYED_MOVE: {
              actions: ['playAiMove'],
            },
          },
        },
        ended: {},
      },
    },
    {
      guards: {
        isGameOver: (context) => !context.game.getDests().size,
      },
      actions: {
        playUserMove: assign((context, event) => {
          if (event.type === 'MOVE_PLAYED') {
            context.game.playUserMove(
              event.data.from as never,
              event.data.to as never,
            );

            const delta = context.game.playAiMove();

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
            };
          }
          return context;
        }),
      },
    },
  );
