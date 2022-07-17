const getStudyFromLichess =
  (httpClient: Services.Http.Client) =>
  (studyId: string): Promise<string> => {
    return httpClient.get({
      url: `https://lichess.org/api/study/${studyId}.pgn`,
      responseType: 'string',
      requiresToken: false,
    });
  };

export const createPgnService = (
  httpClient: Services.Http.Client,
): Services.PgnService => ({
  getStudyFromLichess: getStudyFromLichess(httpClient),
});
