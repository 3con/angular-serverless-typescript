# angular-serverless-typescript

Presented this project in Angular Finland Meetup.

Slides: https://jussikinnula.github.io/serverless-typescript-20170601

## Setup

### Node Version Manager

Node Version Manager (nvm) enables to use multiple NodeJS versions locally.

```
curl -o- https://raw.githubusercontent.com/ creationix/nvm/v0.33.2/install.sh | bash
```

```
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
```

```
nvm install v6.10.3
nvm use v6.10.3
```

...or just `nvm use` in this project as there's `.nvmrc`.

### Serverless (optional)

You can install Serverless globally in order to use it in other projects (and create new Serverless applications).

More information is on Serverless Website: https://serverless.com/

`npm install -g serverless`

### AWS (optional)

In order to manage your AWS systems, you might want to install command line client:

```
brew install awscli
```

```
# aws
usage: aws [options] <command> <subcommand>
  [<subcommand> ...] [parameters]
To see help text, you can run:

  aws help
  aws <command> help
  aws <command> <subcommand> help
aws: error: too few arguments
```

### AWS configuration

#### Defaults

Defaults will be used if none defined in `awscli` and `serverless` -commands.

```
# cat ~/.aws/config
[default]
region=eu-west-1
output=json
```

#### IAM credentials

You need IAM credentials with `AdministratorAccess` role. You can use [AWS console](https://aws.amazon.com/) to manage IAM roles, as well as many other things.

```
# cat ~/.aws/credentials
[default]
aws_access_key_id=XXX
aws_secret_access_key=YYY
```

### Install dependencies

After you have all the tooling you need (and be sure to use exact NodeJS version), you can install rest of the project dependencies with `npm install`.

## Structure

### Root

- `.webpack/` = build directory for Serverless
- `node_modules/` = installed dependencies
- `package.json` = project configuration
- `serverless.yml` = Serverless configuration
- `src/` = source code
- `target/` = build directory for client and server
- `tsconfig.json` = TypeScript configuration
- `webpack/` = Webpack configuration files
- `webpack.config.ts` = Main Webpack configuration file

### Source

- `src/api/users.ts` = Users API endpoint
- `src/client.ts` = Angular application
- `src/index.html` = SPA template
- `src/polyfills.ts` = Polyfills for bundler
- `src/server.ts` = NodeJS & ExpressJS server app
- `src/styles.css` = Styles
- `src/user.model.ts` = User Model

### Webpack

- `webpack.config.ts` = builds client and server
- `webpack/webpack.client.ts`
  + The outcome will be in `dist/client.js`, `dist/client.js.map` and `dist/index.html`
- `webpack/webpack.server.ts`
  + The outcome will be in `dist/server.js`
- `webpack/webpack.serverless.ts`
  + The outcome will be in `.webpack/api/users/index.js`

## Tooling

### Client and Server

- `npm install` = install dependencies, and make build if everything was installed successfully
- `npm start` = run production server
- `npm run build` = build client and server
- `npm run build:client` = build client
- `npm run build:server` = build server
- `npm run clean` = cleanup
- `npm run dev` = run webpack-dev-server

### Serverless

- `npm run sls:clean` = cleanup
- `npm run sls:local users` = run 'users' function locally
- `npm run sls:deploy users` = deploy 'users' function to AWS
