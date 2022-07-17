import { createRecord, query } from 'thin-backend';

export const createStudyRepoThin = (): Repositories.StudyRepository => {
  return {
    createStudy,
    getStudies,
    getUserStudies,
    getStudyById,
  };
};

const createStudy = (study: Repositories.Data.NewStudy) =>
  createRecord('studies', study);

const getUserStudies = (userId: UUID) =>
  query('studies').where('userId', userId).fetch();

const getStudies = () => query('studies').fetch();

const getStudyById = (studyId: string) =>
  query('studies').where('id', studyId).fetchOne();
