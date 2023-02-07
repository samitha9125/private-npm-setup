# Private NPM Setup
Introducing a new npm package designed to simplify access to custom private repositories. The package offers a simple solution for setting up access, automatically creating a `.env.personal` file to securely store confidential information such as username and password.

# Security
Package will automatically add `.env.personal` to gitignore since it contains personal data. It is advised to use a Personal Access Token instead of storing your password if your private npm registry supports.

# Compatibility
Tested with Verdaccio v5 npm registries.
Any node project can utilize this package.

# Usage
 
 ```
npx private-npm-repo
```

Only in the beginning, to successfully configure the connection with your registry, you may have to run the given command twice. The first time it will create a `.env.personal` file with required environment variables and prompt you to fill it in.

The second time you run the command, you will successfully connect to your npm registry. Before running any commands that use the private npm registry, such as `yarn install` or `npm install`, make sure to run `npx private-npm-repo` first.

## Example

```
npx private-npm-repo && yarn install && npx pod-install
```
