declare namespace Services {
  interface UploadService {
    uploadStudy(study: Repositories.Data.NewStudy): Promise<Domain.Study>;
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

  interface AuthService {
    signInWithEmailAndPassword(
      email: string,
      password: string,
    ): Promise<Domain.User>;
    signInWithGoogle(): Promise<Domain.User>;
    logout(): Promise<void>;
    getCurrentUser(): Domain.User | null;
  }
}
