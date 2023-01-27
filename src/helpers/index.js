const os = require("os");
const path = require("path");

function getOSBasedNPMRCPath() {
  if (os.platform() === "win32") {
    return path.join(process.env.USERPROFILE.replace(/\/$/, ""), "/.npmrc");
  }
  return path.join(os.homedir().replace(/\/$/, ""), "/.npmrc");
}

module.exports = { getOSBasedNPMRCPath };
