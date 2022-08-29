import configuration from "../../configuration";
export const configurationReducer = (state = configuration, action) => {
  switch (action.type) {
    default:
      return configuration;
  }
};
