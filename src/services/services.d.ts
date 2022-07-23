declare namespace Services {
  interface UploadService {
    uploadStudy(study: Repositories.Data.NewStudy): void;
  }

  interface PgnService {
    getStudyFromLichess(studyId: string): Promise<string>;
  }

  namespace Http {
    interface RequestParameters<T> {
      url: string;
      requiresToken: boolean;
      responseType?: 'string' | 'json';
      payload?: T;
    }

    interface Client {
      get<T>(parameters: RequestParameters<T>): Promise<T>;
      get(parameters: RequestParameters<string>): Promise<string>;
      post<T>(parameters: RequestParameters<T>): Promise<T>;
    }
  }
}
