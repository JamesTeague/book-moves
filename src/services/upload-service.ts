export const createUploadService = (
  props: Service.UploadServiceProps,
): Services.UploadService => {
  return {
    uploadStudy: uploadStudy(props.studyRepo),
  };
};

const uploadStudy =
  (repo: Repositories.StudyRepository) => (study: Repositories.Data.NewStudy) =>
    repo.createStudy(study);
