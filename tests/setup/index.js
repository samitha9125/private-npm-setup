import fs from "fs";
import { execa } from "execa";

async function removeEnvPersonal() {
  if (fs.existsSync(".env.personal")) {
    await execa("rm", ["-rf", ".env.personal"]);
  }
}

export { removeEnvPersonal };
