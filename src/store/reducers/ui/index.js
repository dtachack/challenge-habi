import { combineReducers } from "redux";

import { isLoadingSaveInformationReducer } from "./is-loading-save-information-reducer";

export const UISaveInformationRootReducer = combineReducers({
  loadingSaveInformation: isLoadingSaveInformationReducer,
});
