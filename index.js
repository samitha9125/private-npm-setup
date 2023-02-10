#! /usr/bin/env node
const { manageEnvFile, validateFields } = require("./src/environment");
const manageToken = require("./src/networking");
const validateGitIgnore = require("./src/gitIgnore");
const manageNPMRC = require("./src/npmrc");
const { init } = require("./src/init");
const COLORS = require("./src/constants/colors");

async function main() {
  init();
  const removeEntry = process.argv[2];
  if(removeEntry && removeEntry.includes("removeEntry=true")) {
    console.log(COLORS.Yellow, "Removing entry from .npmrc");
    const fields = validateFields();
    const PRU = fields.PRU.replace(/\/$/, "");
    manageNPMRC(null, PRU, fields.S, true);
    console.log(COLORS.Green, "Token removal successful! ✅");
    return;
  }

  manageEnvFile();
  validateGitIgnore();
  const fields = validateFields();
  const PRU = fields.PRU.replace(/\/$/, "");
  const { token } = await manageToken(fields.GU, fields.GPAT, PRU);
  manageNPMRC(token, PRU, fields.S, false);
  console.log(COLORS.Green, "Setup successful! ✅");
}

main();
