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

## **Start Web Dev Server**
#### start project in development mode

development with `HMR` and `nodemon --inspect` enabled default

Mac OS:
```bash
npm run express-server-dev
```
Windows:
```bash
npm run win-express-server-dev
```
#### start project in production mode

Mac OS:
```bash
npm run express-server
```
Windows:
```bash
npm run win-express-server
```

## **Build Project**
```bash
npm run build
```

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

### **Develop**
the entry file is `index.jsx`. The router and redux store, actions, reducers are defined in `settings`
