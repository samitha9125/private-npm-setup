#! /usr/bin/env node
const { manageEnvFile, validateFields } = require("./src/environment");
const manageToken = require("./src/networking");
const validateGitIgnore = require("./src/gitIgnore");
const manageNPMRC = require("./src/npmrc");
const { init } = require("./src/init");
const COLORS = require("./src/constants/colors");

async function main() {
  init();
  manageEnvFile();
  validateGitIgnore();
  const fields = validateFields();
  const PRU = fields.PRU.replace(/\/$/, "");
  const { token } = await manageToken(fields.GU, fields.GPAT, PRU);
  manageNPMRC(token, PRU, fields.S);
  console.log(COLORS.Green, "Setup successful! ✅");
}

main();
