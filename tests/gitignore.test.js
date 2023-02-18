import test from "ava";
import { execa } from "execa";
import fs from "fs";
import Const from "../src/constants/constants.js";
import { INFO } from "../src/constants/messages.js";
import validateGitIgnore from "../src/gitIgnore.js";
import { removeGitIgnore } from "./setup/index.js";

const testPath = `${process.cwd()}/tests/environment`;
const testGitIgnorePath = `${process.cwd()}/tests/environment/.gitignore`;

test.serial("validateGitIgnore - When file missing", async (t) => {
  await removeGitIgnore(testPath);
  validateGitIgnore(testPath);
  const content = fs.readFileSync(testGitIgnorePath);
  t.pass(
    content.includes(INFO.GIT_IGNORE_MSG) && content.includes(Const.envFileName)
  );
});

test.serial("validateGitIgnore - File exists but line missing", async (t) => {
  await removeGitIgnore(testPath);
  await execa("touch", [testGitIgnorePath]);
  validateGitIgnore(testPath);
  const content = fs.readFileSync(testGitIgnorePath);
  t.pass(
    content.includes(INFO.GIT_IGNORE_MSG) && content.includes(Const.envFileName)
  );
});

test.serial("validateGitIgnore - File and lines exist", async (t) => {
  await removeGitIgnore(testPath);
  await execa("touch", [testGitIgnorePath]);
  await execa("echo", [`"${INFO.GIT_IGNORE_MSG}" >> ${testGitIgnorePath}`]);
  await execa("echo", [`"${Const.envFileName}" >> ${testGitIgnorePath}`]);
  validateGitIgnore(testPath);
  t.pass();
});
