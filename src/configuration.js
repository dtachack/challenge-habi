import configuration from "./configuration.json";
const config = configuration?.sort((a, b) => a?.number - b?.number);

export default config;
