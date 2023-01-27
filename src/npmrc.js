const fs = require("fs");
const COLORS = require("./constants/colors");

const { NPM_USR_RC_CONTENT } = require("./constants/messages");
const { getOSBasedNPMRCPath } = require("./helpers/index.js");

function manageNPMRC(token, url, scope) {
  const domain = url.replace(/^https?:\/\//, "");
  manageUserLevelNPMRC(token, scope, url, domain);
}

function manageUserLevelNPMRC(token, scope, url, domain) {
  const npmrcPath = getOSBasedNPMRCPath();
  if (!fs.existsSync(npmrcPath)) {
    fs.writeFileSync(npmrcPath, "", "utf8");
  }

  try {
    cleanNPMRC(npmrcPath, scope, domain);
    let content = NPM_USR_RC_CONTENT.replace("{{DOMAIN}}", domain);
    content = content.replace("{{SCOPE}}", scope);
    content = content.replace("{{URL}}", url);
    content = content.replace("{{TOKEN}}", token);

    let data = fs.readFileSync(npmrcPath, "utf8");
    data = data.concat(`\n${content}`);
    data = data
      .split("\n")
      .filter((l) => l !== "")
      .join("\n");
    fs.writeFileSync(npmrcPath, data, "utf8");
  } catch (err) {
    console.log(
      COLORS.Red,
      `Error modifying ${npmrcPath}. Error: ${err.message}`
    );
    process.exit(1);
  }
}

function cleanNPMRC(path, scope, domain) {
  const data = fs.readFileSync(path, "utf8");

  // define the regex patterns
  const regexPat1 = new RegExp(`@${scope}:registry=.*`, "g");
  const regexPat2 = new RegExp(`//${domain}/:_authToken=.*`, "g");

  if (regexPat1.test(data) && regexPat2.test(data)) {
    const updatedData = data.replace(regexPat1, "").replace(regexPat2, "");
    fs.writeFileSync(path, updatedData);
  }
}

module.exports = manageNPMRC;
