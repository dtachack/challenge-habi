import { saveInformationActionNames } from "../../actions/save-information.actions";
import { StateTypeAction } from "../../../shared/enums/state-type";

const initialFetching = { loading: StateTypeAction.Idle };

export const isLoadingSaveInformationReducer = (
  state = initialFetching,
  action
) => {
  switch (action.type) {
    case saveInformationActionNames.setPendingUIAction:
      return { ...state, loading: StateTypeAction.Pending };
    case saveInformationActionNames.setFulfilledAction:
      return { ...state, loading: StateTypeAction.Succeded };
    case saveInformationActionNames.setErrorUIAction:
      return { error: action.error, loading: StateTypeAction.Rejected };
    default:
      return state;
  }
};
