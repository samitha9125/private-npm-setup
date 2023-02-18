import { platform, homedir } from "os";
import { join } from "path";

function getOSBasedNPMRCPath() {
  if (platform() === "win32") {
    return join(process.env.USERPROFILE.replace(/\/$/, ""), "/.npmrc");
  }
  return join(homedir().replace(/\/$/, ""), "/.npmrc");
}

export { getOSBasedNPMRCPath };
