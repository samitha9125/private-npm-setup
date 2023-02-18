import axios from "axios";
import { ERRORS } from "./constants/messages.js";
import logger from "./helpers/logger.js";

async function manageToken(un, pat, reg) {
  try {
    const response = await axios({
      method: "PUT",
      url: `${reg}/-/user/org.couchdb.user:${un}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        name: un,
        password: pat,
      },
    });
    if (response.data["ok"]?.length > 0) {
      return response.data;
    } else {
      logger.error(ERRORS.GENERAL_ERROR);
      logger.info(response.data);
      process.exit(1);
    }
  } catch (error) {
    if (error.response.status === 500) {
      logger.error(ERRORS.NETWORK_ERROR);
    }
    const e = error.response;
    logger.error(`API error: ${e.statusText}. Status: ${e.status}`);
    process.exit(1);
  }
}

export default manageToken;
