# **Type-18-ssr**

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

#### start project in production mode

```bash
npm run start
```

```bash
npm run express
npm run koa
npm run hapi
```

## **Build Project**
```bash
npm run build
```

## **Develop**
- The entry file is `./src/client/js/index.jsx`
- The router and redux store, actions, reducers are defined in `./src/client/js/settings/`
- The entry file in server is `./src/server/index.js`
