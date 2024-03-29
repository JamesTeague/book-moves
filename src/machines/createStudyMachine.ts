import { createModel } from 'xstate/lib/model';
import { assign, createMachine } from 'xstate';

export const createCreateStudyMachine = (
  uploadService: Services.UploadService,
  pgnService: Services.PgnService,
) => {
  const createStudyModel = createModel(
    {
      title: '',
      description: '',
      pgn: undefined as string | undefined,
      studyLink: undefined as string | undefined,
      studyColor: 'white' as Color,
    },
    {
      events: {
        updateTitle: (title: string) => ({ title }),
        updateDescription: (description: string) => ({ description }),
        updatePgn: (pgn: string) => ({ pgn }),
        updateStudyLink: (studyLink: URL) => ({ studyLink }),
        updateStudyColor: (studyColor: Color) => ({ studyColor }),
      },
    },
  );

  const getPgnFromLichess = async (link: string) => {
    const prefix = 'https://';
    let url;
    if (link.startsWith(prefix)) {
      url = new URL(link);
    } else {
      url = new URL(prefix.concat(link));
    }

    const studyId = url.pathname.replace('/study/', '');

    return pgnService.getStudyFromLichess(studyId);
  };

  const createStudy = async (context: Machines.CreateStudyMachine.Context) => {
    if (context.pgn) {
      return uploadService.uploadStudy({
        title: context.title,
        description: context.description,
        pgn: context.pgn,
        color: context.studyColor,
        private: true,
      });
    } else if (context.studyLink) {
      return uploadService.uploadStudy({
        title: context.title,
        description: context.description,
        pgn: await getPgnFromLichess(context.studyLink),
        color: context.studyColor,
        private: true,
      });
    }

    throw Error('Missing PGN file or link to Lichess Study');
  };

  return createMachine<
    Machines.CreateStudyMachine.Context,
    Machines.CreateStudyMachine.Event,
    Machines.CreateStudyMachine.State
  >(
    {
      id: 'createStudy',
      initial: 'creating',
      context: createStudyModel.initialContext,
      states: {
        creating: {
          on: {
            STUDY_SUBMITTED: {
              target: 'submitting',
            },
            STUDY_UPDATED: {
              actions: 'updateStudy',
            },
          },
        },
        submitting: {
          invoke: {
            id: 'createStudy',
            src: (context) => createStudy(context),
            onDone: {
              target: 'complete',
            },
            onError: {
              target: 'creating',
            },
          },
        },
        complete: {
          type: 'final',
        },
      },
    },
    {
      actions: {
        updateStudy: assign((context, event) => {
          if (event.type === 'STUDY_UPDATED') {
            return {
              ...context,
              ...event.data,
            };
          }

          return context;
        }),
      },
    },
  );
};
