import test from "ava";
import sinon from "sinon";
import fs from "fs";
import os from "os";
import { execa } from "execa";
import manageNPMRC from "../src/npmrc.js";

test.after(() => {
  sinon.restore();
});

test.serial("manageNPMRC - Missing npmrc in windows", async (t) => {
  sinon.stub(process, "platform").value("win32");
  process.env.USERPROFILE = `${process.cwd()}/tests/environment`;

  // Removing the file
  const filePath = `${process.cwd()}/tests/environment/.npmrc`;
  await execa("rm", ["-rf", filePath]);
  const token = "mocked-token";
  const url = "https://www.google.com";
  const scope = "sample";
  manageNPMRC(token, url, scope);
  t.pass(fs.existsSync(`${process.env.USERPROFILE}/.npmrc`));
});

test.serial("manageNPMRC - Exists npmrc in windows", async (t) => {
  sinon.stub(process, "platform").value("win32");
  process.env.USERPROFILE = `${process.cwd()}/tests/environment`;
  // Create the file.
  await execa("touch", [`${process.cwd()}/tests/environment/.npmrc`]);
  const token = "mocked-token";
  const url = "https://www.google.com";
  const scope = "sample";
  manageNPMRC(token, url, scope);
  t.pass(fs.existsSync(`${process.env.USERPROFILE}/.npmrc`));
});

test.serial("manageNPMRC - remove existing entry", async (t) => {
  process.env.USERPROFILE = `${process.cwd()}/tests/environment`;
  const token = "mocked-token";
  const url = "https://www.google.com";
  const domain = "www.google.com";
  const scope = "sample";

  // Create the file.
  const filePath = `${process.cwd()}/tests/environment/.npmrc`;
  await execa("touch", [filePath]);
  await execa("echo", [
    `@{{${scope}}}:registry={{${url}}}\n//{{${domain}}}/:_authToken={{${token}}} >> ${filePath}`,
  ]);
  manageNPMRC(token, url, scope, true);
  const stats = fs.statSync(filePath);
  t.pass(stats.size === 0);
});

test.serial("manageNPMRC - Missing npmrc in Linux based OS", async (t) => {
  sinon.stub(process, "platform").value("linux");
  sinon.stub(os, "homedir").value(`${process.cwd()}/tests/environment`);

  // Removing the file
  const filePath = `${process.cwd()}/tests/environment/.npmrc`;
  await execa("rm", ["-rf", filePath]);
  const token = "mocked-token";
  const url = "https://www.google.com";
  const scope = "sample";
  manageNPMRC(token, url, scope);
  t.pass(fs.existsSync(`${process.env.USERPROFILE}/.npmrc`));
});

test.serial("manageNPMRC - Exists npmrc in Linux based OS", async (t) => {
  sinon.stub(process, "platform").value("linux");
  sinon.stub(os, "homedir").value(`${process.cwd()}/tests/environment`);

  // Create the file.
  await execa("touch", [`${process.cwd()}/tests/environment/.npmrc`]);
  const token = "mocked-token";
  const url = "https://www.google.com";
  const scope = "sample";
  manageNPMRC(token, url, scope);
  t.pass(fs.existsSync(`${process.env.USERPROFILE}/.npmrc`));
});
