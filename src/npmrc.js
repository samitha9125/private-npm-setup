import { existsSync, writeFileSync, readFileSync } from "fs";
import { NPM_USR_RC_CONTENT } from "./constants/messages.js";
import { getOSBasedNPMRCPath } from "./helpers/index.js";
import logger from "./helpers/logger.js";

function manageNPMRC(token, url, scope, remove = false) {
  const domain = url.replace(/^https?:\/\//, "");
  manageUserLevelNPMRC(token, scope, url, domain, remove);
}

function manageUserLevelNPMRC(token, scope, url, domain, remove) {
  const npmrcPath = getOSBasedNPMRCPath();
  if (!existsSync(npmrcPath)) {
    writeFileSync(npmrcPath, "", "utf8");
  }

  if (remove) {
    // Forcing just to remove the entry
    cleanNPMRC(npmrcPath, scope, domain);
    return null;
  }

  try {
    cleanNPMRC(npmrcPath, scope, domain);
    let content = NPM_USR_RC_CONTENT.replace("{{DOMAIN}}", domain);
    content = content.replace("{{SCOPE}}", scope);
    content = content.replace("{{URL}}", url);
    content = content.replace("{{TOKEN}}", token);

    let data = readFileSync(npmrcPath, "utf8");
    data = data.concat(`\n${content}`);
    data = data
      .split("\n")
      .filter((l) => l !== "")
      .join("\n");
    writeFileSync(npmrcPath, data, "utf8");
  } catch (err) {
    logger.error(`Error modifying ${npmrcPath}. Error: ${err.message}`);
    process.exit(1);
  }
}

async function cleanNPMRC(path, scope, domain) {
  const data = readFileSync(path, "utf8");

  // define the regex patterns
  const regexPat1 = new RegExp(`@${scope}:registry=.*`, "g");
  const regexPat2 = new RegExp(`//${domain}/:_authToken=.*`, "g");

  if (regexPat1.test(data) && regexPat2.test(data)) {
    const updatedData = data.replace(regexPat1, "").replace(regexPat2, "");
    writeFileSync(path, updatedData);
  }
}

export default manageNPMRC;
