const ERRORS = {
  ENV_MISSING: "file does not exist. Creating one now...",
  ENV_EMPTY:
    "Gitlab Username and/or Password and/or Private Repo URL are/is empty. Please check before proceed again.",
  NETWORK_ERROR: `Error: Something went wrong. This error can occur due to one of the followings.\n
     1. Invalid credentials. Please double check your username and personal access token stored in .env.personal file.\n
     2. Invalid private repo URL. Please double check your private repo URL stored in .env.personal file.\n
     3. Internet connection issue.\n`,
  GENERAL_ERROR: "Error: Something went wrong. Please try again.\n",
};

const INFO = {
  ENV_INFO: "Please complete the '.env.personal' file entries.",
  GIT_IGNORE_MSG:
    "# Ignoring the .env.personal because it contains confidential information.",
};

const NPM_RC_CONTENT = `@{{SCOPE}}:registry={{URL}}/
{{DOMAIN}}/:_authToken={{TOKEN}}
registry=https://registry.npmjs.org/
`;

const NPM_USR_RC_CONTENT = `@{{SCOPE}}:registry={{URL}}
//{{DOMAIN}}/:_authToken={{TOKEN}}`;

module.exports = {
  ERRORS,
  INFO,
  NPM_RC_CONTENT,
  NPM_USR_RC_CONTENT,
};
