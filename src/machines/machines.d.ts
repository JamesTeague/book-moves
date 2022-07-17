declare namespace Machines {
  namespace ChessMachine {
    type Context = {
      game: import('chess-moves').ChessGame;
      fen: string;
      turnColor: 'white' | 'black';
      isCheck: boolean;
      dests: Map<string, string[]>;
      lastMove?: {
        from: string;
        to: string;
      }; // TODO: Better typing
      isGameOver: boolean;
      isStalemate: boolean;
      isCheckmate: boolean;
      isDraw: boolean;
      isThreefoldRepetition: boolean;
      isInsufficientMaterial: boolean;
    };

    type Event =
      | {
          type: 'MOVE_PLAYED';
          data: {
            from: string;
            to: string;
          };
        }
      | {
          type: 'USER_PLAYED_MOVE';
          data: {
            from: string;
            to: string;
          };
        }
      | {
          type: 'AI_PLAYED_MOVE';
        }
      | {
          type: 'GAME_STARTED';
        };

    type State = {
      context: Context;
      value: 'playing' | 'ended';
    };
  }

  namespace StudyMachine {
    type Context = {
      chapter: import('chess-moves').ChessChapter;
      fen: string;
      turnColor: 'white' | 'black';
      isCheck: boolean;
      dests: Map<string, string[]>;
      lastMove?: {
        from: string;
        to: string;
      }; // TODO: Better typing
      isGameOver: boolean;
      isStalemate: boolean;
      isCheckmate: boolean;
      isDraw: boolean;
      isThreefoldRepetition: boolean;
      isInsufficientMaterial: boolean;
      hints?: import('chess-moves').DrawShape[];
    };

    type Event =
      | {
          type: 'MOVE_PLAYED';
          data: {
            from: string;
            to: string;
          };
        }
      | {
          type: 'AI_PLAYED_MOVE';
        }
      | { type: 'BOARD_RESET' };

    type State = {
      context: Context;
      value: 'playingLine' | 'lineEnded';
    };
  }
}
