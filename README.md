# **Type-18-ssr**

The `Type-18-ssr` is a self-defined front-end only project starter which is supported by `React`, `Redux`, `Webpack` and other libraries. The Project starter includes demos for `redux`, `react-redux`, `reselect`, `mobx` and other self-defined classes and components. It has already setup `HMR`, `code-spliting`, `babel-plugin-react-css-modules`. The project also supports tests via `mocha`, `jest` and integration test simulating user activity driven by `selenium` and `chromedriver`


## **Install**
### 1 create project directory and install webpack
```bash
mkdir my-starter
cd my-starter
npm init -y
npm install webpack webpack-cli --save-dev
```
### 2 install other dependencies
```bash
npm install
```

## **Start Server**
#### start project in development mode

development with `HMR` and `nodemon --inspect` enabled default

```bash
npm run express-dev
```
#### start project in production mode

```bash
npm run express
```

## **Build Project**
```bash
npm run build
```
Then will transpile resources to `lib` directory

run server
```bash
npm run prod
```
or use `node lib/server`

## **Test**
#### test with mocha
```bash
npm run mochas
npx mocha test/mochas/mocha.test.js
```
#### test with jest
```bash
npm run jests
npx jest test/jests/jest.test.js
```
#### test with mocha + chromedriver + selenium
```bash
npm run integration-tests
```
## **Transpile**
the project support transpile ES6 to ES5 via `@babel/core`
```bash
npm link
```
Then, after cli generated
use
```bash
transpile SRC.js TARGET.js
```
or use
```bash
transpile SRC.js
```
will generate a `SRC.transpiled.js` to the same path

well, the easiest way is still
```bash
npx babel SRC.js -o TARGET.js
npx babel srcDir -d targetDir
```

## **Develop**
- The entry file is `./src/client/js/index.jsx`
- The router and redux store, actions, reducers are defined in `./src/client/js/settings/`
- The entry file in server is `./src/server/index.js`
- The server and `server.config.js` is defined in `./src/server/`
