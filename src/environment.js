import { existsSync, writeFileSync, readFileSync } from "fs";
import dotenv from "dotenv";
import Const from "./constants/constants.js";
import { ERRORS, INFO } from "./constants/messages.js";
import logger from "./helpers/logger.js";

function manageEnvFile(path) {
  const fullPath = `${path}/${Const.envFileName}`;
  if (!existsSync(fullPath)) {
    logger.warn(`'${Const.envFileName}' ${ERRORS.ENV_MISSING}`);
    writeFileSync(fullPath, Const.fields, "utf8");
    logger.warn(INFO.ENV_INFO);
    process.exit(0);
  }
}

function validateFields(path) {
  const fullPath = `${path}/${Const.envFileName}`;
  dotenv.config({ path: fullPath });
  if (
    process.env.USERNAME &&
    process.env.PERSONAL_ACCESS_TOKEN &&
    process.env.PRIVATE_REGISTRY_URL &&
    process.env.SCOPE
  ) {
    return {
      U: process.env.USERNAME,
      PAT: process.env.PERSONAL_ACCESS_TOKEN,
      PRU: process.env.PRIVATE_REGISTRY_URL,
      S: process.env.SCOPE,
    };
  }
  logger.error(ERRORS.ENV_EMPTY);
  process.exit(1);
}

export { manageEnvFile, validateFields };
