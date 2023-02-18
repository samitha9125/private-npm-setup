#! /usr/bin/env node
import { manageEnvFile, validateFields } from "./src/environment.js";
import manageToken from "./src/networking.js";
import validateGitIgnore from "./src/gitIgnore.js";
import manageNPMRC from "./src/npmrc.js";

function remove(fields, PRU, spinner) {
  manageNPMRC(null, PRU, fields.S, true);
  spinner.succeed("Entry removal successful");
}

async function main(program, spinner) {
  const path = process.cwd();
  const options = program.opts();

  // Validating env.personal file fields.
  manageEnvFile(path);
  const fields = validateFields(path);
  const PRU = fields.PRU.replace(/\/$/, "");

  if (options.remove) {
    remove(fields, PRU, spinner);
    return;
  }

  validateGitIgnore(path);
  const { token } = await manageToken(fields.U, fields.PAT, PRU);
  manageNPMRC(token, PRU, fields.S, false);
  spinner.succeed("Setup successful");
}

export default main;
