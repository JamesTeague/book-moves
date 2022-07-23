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
      id: UUID;
      email: string;
      passwordHash: string;
      lockedAt: string | null;
      failedLoginAttempts: number;
      accessToken: string | null;
      confirmationToken: string | null;
      isConfirmed: boolean;
    }
  }

  namespace Service {
    export interface UploadServiceProps {
      studyRepo: Repositories.StudyRepository;
    }
  }
}
