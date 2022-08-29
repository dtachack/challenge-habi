import { saveInformationActionNames } from "../actions/save-information.actions";

export const saveInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case saveInformationActionNames.setFulfilledAction: {
      return { ...state, ...action.payload };
    }
    case saveInformationActionNames.setErrorUIAction: {
      return { ...state };
    }
    case saveInformationActionNames.setClearInformationAction: {
      return {};
    }
    default:
      return state;
  }
};
