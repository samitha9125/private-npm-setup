import { existsSync, readFileSync, appendFileSync } from "fs";
import Const from "./constants/constants.js";
import { INFO } from "./constants/messages.js";

function validateGitIgnore() {
  if (!existsSync(".gitignore")) {
    addLines();
  } else {
    const gitignoreContent = readFileSync(".gitignore", "utf8");
    const lines = gitignoreContent.split("\n");
    const isIncluded = lines.includes(Const.envFileName);
    if (!isIncluded) {
      addLines();
    }
  }
}

function addLines() {
  appendFileSync(".gitignore", "\n", "utf8");
  appendFileSync(".gitignore", INFO.GIT_IGNORE_MSG, "utf8");
  appendFileSync(".gitignore", "\n", "utf8");
  appendFileSync(".gitignore", Const.envFileName, "utf8");
  appendFileSync(".gitignore", "\n", "utf8");
}

export default validateGitIgnore;
