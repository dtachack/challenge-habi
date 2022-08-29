export const setPendingUIAction = () => {
  return { type: saveInformationActionNames.setPendingUIAction };
};

export const setErrorUIAction = (e) => ({
  type: saveInformationActionNames.setErrorUIAction,
  error: e.message,
});

export const setFulfilledAction = (payload) => ({
  type: saveInformationActionNames.setFulfilledAction,
  payload,
});

export const setClearInformationAction = (payload) => ({
  type: saveInformationActionNames.setClearInformationAction,
  payload,
});

export const saveInformationActionNames = {
  setPendingUIAction: "save-information/pending",
  setErrorUIAction: "save-information/error",
  setFulfilledAction: "save-information/fulfilled",
  setClearInformationAction: "clear-information",
};
