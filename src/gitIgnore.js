const fs = require("fs");
const CONSTANTS = require("./constants/constants");
const { INFO } = require("./constants/messages");

function validateGitIgnore() {
  if (!fs.existsSync(".gitignore")) {
    addLines();
  } else {
    const gitignoreContent = fs.readFileSync(".gitignore", "utf8");
    const lines = gitignoreContent.split("\n");
    const isIncluded = lines.includes(".env.personal");
    if (!isIncluded) {
      addLines();
    }
  }
}

function addLines() {
  fs.appendFileSync(".gitignore", "\n", "utf8");
  fs.appendFileSync(".gitignore", INFO.GIT_IGNORE_MSG, "utf8");
  fs.appendFileSync(".gitignore", "\n", "utf8");
  fs.appendFileSync(".gitignore", CONSTANTS.envFileName, "utf8");
  fs.appendFileSync(".gitignore", "\n", "utf8");
  fs.appendFileSync(".gitignore", CONSTANTS.npmrcFileName, "utf8");
  fs.appendFileSync(".gitignore", "\n", "utf8");
}

module.exports = validateGitIgnore;
