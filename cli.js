#!/usr/bin/env node

import { program } from "commander";
import ora from "ora";
import { readFileSync } from "fs";
import main from "./index.js";
import logger from "./src/helpers/logger.js";

const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const spinner = ora("Running...\n");
spinner.color = "green";

program
  .option(
    "-r, --remove",
    "Remove the entire entry from the user level .npmrc file",
    false
  )
  .action((options) => {
    logger.success(`Private NPM Setup v${pkg.version}🔥🚀`);
    if (options.remove) {
      logger.warn("Removing entry from the user level .npmrc only.");
    }
    spinner.start();
  })
  .version(pkg.version)
  .parse(process.argv);

main(program, spinner);
