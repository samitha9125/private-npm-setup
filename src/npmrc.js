const fs = require("fs");
const COLORS = require("./constants/colors");

const { NPM_RC_CONTENT, NPM_USR_RC_CONTENT } = require("./constants/messages");
const { getOSBasedNPMRCPath } = require("./helpers/index.js");

function manageNPMRC(token, pvtUrl, scope) {
  // Project level npmrc file.
  if (fs.existsSync(".npmrc")) {
    fs.truncateSync(".npmrc", 0);
  }
  const domainLess = pvtUrl.replace(/^https?:\/\//, "");
  let content = NPM_RC_CONTENT.replace("{{TOKEN}}", token);
  content = content.replace("{{URL}}", pvtUrl);
  content = content.replace("{{DOMAIN}}", domainLess);
  content = content.replace("{{SCOPE}}", scope.toLowerCase());
  fs.writeFileSync(".npmrc", content, "utf8");

  // User level npmrc file.
  manageUserLevelNPMRC(token, domainLess);
}

function manageUserLevelNPMRC(token, domainLess) {
  const npmrcPath = getOSBasedNPMRCPath();
  if (!fs.existsSync(npmrcPath)) {
    // If the file does not exist, create a new npmrc file.
    fs.writeFileSync(npmrcPath, "", "utf8");
  }

  try {
    let newData;
    let content = NPM_USR_RC_CONTENT.replace("{{DOMAIN}}", domainLess);
    content = content.replace("{{TOKEN}}", token);

    const data = fs.readFileSync(npmrcPath, "utf8");
    const regex = new RegExp(`(//${domainLess}).*`, "g");
    if (data.match(regex)) {
      newData = data.replace(regex, content);
    } else {
      newData = data.concat(`\n${content}`);
    }
    newData = newData
      .split("\n")
      .filter((l) => l !== "")
      .join("\n");
    fs.writeFileSync(npmrcPath, newData, "utf8");
  } catch (err) {
    console.log(
      COLORS.Red,
      `Error modifying ${npmrcPath}. Error: ${err.message}`
    );
    process.exit(1);
  }
}

module.exports = manageNPMRC;
