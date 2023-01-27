const COLORS = require("./constants/colors");
const version = require("../package.json").version;

function init() {
  console.log(COLORS.Green, "Starting the setup 🚀");
  console.log(COLORS.Green, `Running the setup: v${version}🔥\n\n`);
}

module.exports = { init };
