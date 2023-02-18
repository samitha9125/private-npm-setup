import { platform, homedir } from "os";
import { join } from "path";

function getOSBasedNPMRCPath() {
  if (platform() === "win32") {
    return join(process.env.USERPROFILE.replace(/\/$/, ""), "/.npmrc");
  }
  return join(homedir().replace(/\/$/, ""), "/.npmrc");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { getOSBasedNPMRCPath, sleep };
