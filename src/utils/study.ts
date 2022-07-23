import { createChessGame } from '../../../chess-moves';

export const transformToConfig =
  (movePlayed: (from: string, to: string) => void, studyColor: Color) =>
  (context?: Machines.StudyMachine.Context) => {
    if (context) {
      return {
        fen: context.fen,
        check: context.isCheck,
        orientation: context.studyColor,
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
          color: context.studyColor,
          dests: context.dests as never,
          events: {
            after: movePlayed,
          },
        },
      };
    }

    return {
      fen: '',
      check: false,
      orientation: studyColor,
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
        color: studyColor,
        dests: createChessGame().getDests(),
        events: {
          after: movePlayed,
        },
      },
    };
  };
