import { combineReducers } from "redux";
import { configurationReducer } from "./store/reducers/configuration.reducer";
import { saveInformationReducer } from "./store/reducers/save-information.reducer";
import { UISaveInformationRootReducer } from "./store/reducers/ui/index";

export const appReducers = combineReducers({
  configuration: configurationReducer,
  information: saveInformationReducer,
  ui: UISaveInformationRootReducer,
});
