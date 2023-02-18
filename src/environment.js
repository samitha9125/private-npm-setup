import { existsSync, writeFileSync, readFileSync } from "fs";
import Const from "./constants/constants.js";
import { ERRORS, INFO } from "./constants/messages.js";
import logger from "./helpers/logger.js";

function manageEnvFile() {
  if (!existsSync(Const.envFileName)) {
    logger.warn(`'${Const.envFileName}' ${ERRORS.ENV_MISSING}`);
    writeFileSync(Const.envFileName, Const.fields, "utf8");
    logger.warn(INFO.ENV_INFO);
    process.exit(1);
  }
}

function validateFields() {
  const isWin = process.platform === "win32";
  const envContent = readFileSync(Const.envFileName, "utf8");
  const ls = envContent.split(isWin ? "\r\n" : "\n");
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
  if (!env.U || !env.PAT || !env.PRU) {
    logger.error(ERRORS.ENV_EMPTY);
    process.exit(1);
  }
  return env;
}

export { manageEnvFile, validateFields };
