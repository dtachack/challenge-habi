import {
  setPendingUIAction,
  setErrorUIAction,
  setFulfilledAction,
} from "../store/actions/save-information.actions";

const ONE_SECOND = 1000;

export const fetchSaveInformation = (info) => async (dispatch) => {
  dispatch(setPendingUIAction());
  try {
    setTimeout(() => {
      dispatch(setFulfilledAction(info));
    }, ONE_SECOND);
  } catch (e) {
    dispatch(setErrorUIAction(e.message));
  }
};
