const fs = require("fs");
const CONSTANTS = require("./constants/constants");
const COLORS = require("./constants/colors");
const { ERRORS, INFO } = require("./constants/messages");

function manageEnvFile() {
  if (!fs.existsSync(CONSTANTS.envFileName)) {
    console.log(
      COLORS.Yellow,
      `'${CONSTANTS.envFileName}' ${ERRORS.ENV_MISSING}`
    );
    fs.writeFileSync(
      CONSTANTS.envFileName,
      `${CONSTANTS.username}=\n${CONSTANTS.pToken}=\n${CONSTANTS.regUrl}=\n${CONSTANTS.scope}=\n`,
      "utf8"
    );
    console.log(COLORS.Yellow, INFO.ENV_INFO);
    process.exit(1);
  }
}

function validateFields() {
  const isWin = process.platform === "win32";
  const envContent = fs.readFileSync(CONSTANTS.envFileName, "utf8");
  const ls = envContent.split(isWin? "\r\n":"\n");
  const env = {};
  for (const l of ls) {
    const [key, val] = l.split("=");
    if (key) {
      const k = key
        .split("_")
        .map((p) => p[0])
        .join("");
      env[k] = val;
    }
  }
  if (!env.GU || !env.GPAT || !env.PRU) {
    console.log(COLORS.Red, ERRORS.ENV_EMPTY);
    process.exit(1);
  }
  return env;
}

module.exports = {
  manageEnvFile,
  validateFields,
};
