import { IHttpClient } from './http-client';

export interface IPgnService {
  getStudyFromLichess(studyId: string): Promise<string>;
}

const getStudyFromLichess =
  (httpClient: IHttpClient) =>
  (studyId: string): Promise<string> => {
    return httpClient.get({
      url: `https://lichess.org/api/study/${studyId}.pgn`,
      responseType: 'string',
      requiresToken: false,
    });
  };

export const createPgnService = (httpClient: IHttpClient): IPgnService => ({
  getStudyFromLichess: getStudyFromLichess(httpClient),
});
