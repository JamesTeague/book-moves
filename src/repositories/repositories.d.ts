declare namespace Repositories {
  namespace Data {
    interface NewStudy {
      id?: UUID;
      title: string;
      userId?: UUID;
      createdAt?: string;
      updatedAt?: string;
      description?: string | null;
      pgn: string;
      color: string;
      private: boolean;
    }
  }

  interface StudyRepository {
    createStudy(study: Repositories.NewStudy): Promise<Domain.Study>;
    getUserStudies(userId: UUID): Promise<Domain.Study[]>;
    getStudies(): Promise<Domain.Study[]>;
    getStudyById(studyId: string): Promise<Domain.Study>;
  }
}
