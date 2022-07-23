import { createRecord, query, Study } from 'thin-backend';

export const createStudyRepoThin = (): Repositories.StudyRepository => {
  return {
    createStudy,
    getStudies,
    getUserStudies,
    getStudyById,
  };
};

const createStudy = (study: Repositories.Data.NewStudy) =>
  createRecord('studies', study).then(toDomain);

const getUserStudies = (userId: UUID) =>
  query('studies').where('userId', userId).fetch().then(toDomainList);

const getStudies = () => query('studies').fetch().then(toDomainList);

const getStudyById = (studyId: string) =>
  query('studies').where('id', studyId).fetchOne().then(toDomain);

const toDomain = (study: Study) => study as Domain.Study;
const toDomainList = (studies: Study[]) => studies as Domain.Study[];
