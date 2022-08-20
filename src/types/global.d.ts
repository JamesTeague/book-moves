export declare global {
  type UUID = string;
  type Color = 'white' | 'black';

  interface Move {
    from: string;
    to: string;
  }

  namespace App {
    export interface Services {
      pgnService: Services.PgnService;
      uploadService: Services.UploadService;
    }

    export interface Repositories {
      studyRepository: Repositories.StudyRepository;
    }
  }

  namespace Domain {
    export interface Study {
      id: string;
      title: string;
      userId: string;
      createdAt: string;
      updatedAt: string;
      description: string | null;
      pgn: string;
      color: Color;
      private: boolean;
    }

    export interface User {
      uid: string;
      accessToken: string;
      email: string;
    }
  }

  namespace Service {
    export interface UploadServiceProps {
      studyRepo: Repositories.StudyRepository;
    }
  }
}
