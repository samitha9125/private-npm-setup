const axios = require("axios");
const COLORS = require("./constants/colors");
const { ERRORS } = require("./constants/messages");

async function manageToken(un, pat, reg) {
  try {
    const response = await axios({
      method: "PUT",
      url: `${reg}/-/user/org.couchdb.user:${un}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: {
        name: un,
        password: pat,
      },
    });
    if (response.data["ok"]?.length > 0) {
      return response.data;
    } else {
      console.log(COLORS.Red, ERRORS.GENERAL_ERROR);
      console.log(response.data);
      process.exit(1);
    }
  } catch (error) {
    if (error.response.status === 500) {
      console.log(COLORS.Red, ERRORS.NETWORK_ERROR);
    }
    const e = error.response;
    console.log(COLORS.Red, `API error: ${e.statusText}. Status: ${e.status}`);
    process.exit(1);
  }
}

module.exports = manageToken;
