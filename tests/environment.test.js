import test from "ava";
import { execa } from "execa";
import sinon from "sinon";
import fs from "fs";
import dotenv from "dotenv";

import { manageEnvFile, validateFields } from "../src/environment.js";
import { removeEnvPersonal } from "./setup/index.js";

let exitStub = sinon.stub(process, "exit");

test.beforeEach(() => {
  exitStub.restore();
});

test.serial(
  "manageEnvFile function test - When .env.personal is missing.",
  async (t) => {
    await removeEnvPersonal();
    exitStub = sinon.stub(process, "exit");
    manageEnvFile();
    t.pass(exitStub.calledOnceWith(0) && fs.existsSync(".env.personal"));
  }
);

test.serial("validateFields function test - Empty", async (t) => {
  // Setting the fresh .env.personal file.
  await removeEnvPersonal();
  await execa("yarn", ["start"]);

  // Without completing the file, executing the package again.
  exitStub = sinon.stub(process, "exit");
  validateFields();
  // Check that the command exited with code 1
  t.pass(exitStub.calledOnceWith(1));
});

test.serial("validateFields function test - Not Empty", async (t) => {
  // Setting the fresh .env.personal file.
  await removeEnvPersonal();
  await execa("yarn", ["start"]);

  // Adding new values after dotenv config.
  dotenv.config({ path: `${process.cwd()}/.env.personal` });
  process.env.USERNAME = "mock_username";
  process.env.PERSONAL_ACCESS_TOKEN = "mock_token";
  process.env.PRIVATE_REGISTRY_URL = "mock_url";
  process.env.SCOPE = "mock_scope";

  // Actual result
  const actual = validateFields();
  const expected = {
    U: "mock_username",
    PAT: "mock_token",
    PRU: "mock_url",
    S: "mock_scope",
  };
  t.deepEqual(actual, expected);
});
