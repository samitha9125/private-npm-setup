# Private NPM Setup

Introducing a new npm package designed to simplify access to custom private repositories. The package offers a simple solution for setting up access, automatically creating a `.env.personal` file to securely store confidential information such as username and password.

# Security

Package will automatically add `.env.personal` to gitignore since it contains personal data. It is advised to use a Personal Access Token instead of storing your password if your private npm registry supports.

# Compatibility

Tested with Verdaccio v5 npm registries.
Any node project can utilize this package.

Supported Node Engines: `>=14.19 <15 || >=16.15 <17 || >=18`

# Usage

```
npx private-npm-repo
```

Only in the beginning, to successfully configure the connection with your registry, you may have to run the given command twice. The first time it will create a `.env.personal` file with required environment variables and prompt you to fill it in.

```
USERNAME= // Your username of the private npm registry.
PERSONAL_ACCESS_TOKEN= // Your personal access token of the private npm registry.
PRIVATE_REGISTRY_URL= // Your private npm registry URL.
SCOPE= // Scope of the package.
```
IMPORTANT: If you don't have a token, you may store your password in the .env.personal file but we do not recommend it.

The second time you run the command, you will successfully connect to your npm registry. Before running any commands that use the private npm registry, such as `yarn install` or `npm install`, make sure to run `npx private-npm-repo@latest` first.

## Example

```
npx private-npm-repo@latest && yarn install && npx pod-install
```

# For CI

For now, this package does not support project tokens. Thus, you may have to use your private access token in the CI if you can expose the token safely. Once it is exposed during the CI process, It may configured the setup and install the private npm packages. When the CI process is completed, it is safe to remove your token entry as a additional security measure. For that, you may execute the below code.

```
npx private-npm-setup --remove
```
