const data = [
  `USERNAME=\n`,
  `PERSONAL_ACCESS_TOKEN=\n`,
  `PRIVATE_REGISTRY_URL=\n`,
  `SCOPE=\n`,
].join("");

const CONSTANTS = {
  fields: data,
  envFileName: ".env.personal",
  npmrcFileName: ".npmrc",
};

export default CONSTANTS;
