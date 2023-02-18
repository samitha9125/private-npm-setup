import { existsSync, readFileSync, appendFileSync } from "fs";
import Const from "./constants/constants.js";
import { INFO } from "./constants/messages.js";

function validateGitIgnore(path) {
  const fullPath = `${path}/.gitignore`;
  if (!existsSync(fullPath)) {
    addLines(fullPath);
  } else {
    const gitignoreContent = readFileSync(fullPath, "utf8");
    const lines = gitignoreContent.split("\n");
    const isIncluded = lines.includes(Const.envFileName);
    if (!isIncluded) {
      addLines(fullPath);
    }
  }
}

function addLines(path) {
  appendFileSync(path, "\n", "utf8");
  appendFileSync(path, INFO.GIT_IGNORE_MSG, "utf8");
  appendFileSync(path, "\n", "utf8");
  appendFileSync(path, Const.envFileName, "utf8");
  appendFileSync(path, "\n", "utf8");
}

export default validateGitIgnore;
