export const selectConfiguration = (state) => {
  return state?.configuration;
};

export const selectInformation = (state) => {
  return state?.information;
};

export const selectInitialStep = (state) => {
  return state?.configuration[0];
};

export const selectStepConfiguration = (path) => (state) => {
  return state?.configuration.find(
    (x) => x?.path.toUpperCase() === path?.toUpperCase()
  );
};

export const selectNextStepConfiguration = (path) => (state) => {
  const currentStep = state?.configuration.findIndex(
    (x) => x?.path.toUpperCase() === path?.toUpperCase()
  );
  return currentStep + 1 <= state?.configuration.length
    ? state?.configuration[currentStep + 1]
    : null;
};

export const selectStepLength = (state) => {
  return state?.configuration?.length;
};

export const selectSaveInformationUIStatus = (state) => {
  return state?.ui?.loadingSaveInformation?.loading;
};
