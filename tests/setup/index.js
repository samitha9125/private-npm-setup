import fs from "fs";
import { execa } from "execa";

async function removeEnvPersonal(path) {
  if (fs.existsSync(`${path}/.env.personal`)) {
    await execa("rm", ["-rf", `${path}/.env.personal`]);
  }
}

async function removeGitIgnore(path) {
  if (fs.existsSync(`${path}/.gitignore`)) {
    await execa("rm", ["-rf", `${path}/.gitignore`]);
  }
}

export { removeEnvPersonal, removeGitIgnore };
