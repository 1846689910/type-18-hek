# **WebPack Project**

The `webpack project` is a self-defined front-end only project starter which is supported by `React`, `Redux`, `Webpack` and other libraries. The Project starter includes demos for `redux`, `react-redux`, `reselect`, `mobx` and other self-defined classes and components. It has already setup `HMR`, `code-spliting`, `babel-plugin-react-css-modules`. The project also supports tests via `mocha`, `jest` and integration test simulating user activity driven by `selenium` and `chromedriver`


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

development with `HMR` enabled default
```bash
npm start
```
#### start project in production mode
```bash
npm run prod
```

## **Build Project**
```bash
npm run build
```

## **Test**
#### test with mocha
```bash
npm run mocha test/mocha.test.js
```
#### test with jest
```bash
npm run jest test/mocha.test.js
```
#### test with mocha
```bash
npm run mocha integrationTest
```

### **Develop**
the entry file is `index.jsx`. The router and redux store, actions, reducers are defined in `settings`
