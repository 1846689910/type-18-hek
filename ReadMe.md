#**WebPack Project**
##**Install**
#####1 create project directory and install webpack
```
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```
#####2 install babel
Most of new features of ES6 or JSX of React cannot be understood
by most browser and also webpack. Thus, we need **loader** to
help webpack translate.

`babel-loader` is the Webpack loader responsible for taking in the
ES6 code and making it understandable by the browser of choice.
`babel preset env` for compiling ES6 code down to ES5 (please note that babel-preset-es2015 is now deprecated)
`babel preset react` for compiling JSX and other stuff down to Javascript
```
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react babel-plugin-transform-class-properties --save-dev
```
#####**Then, set up _.babelrc_ and _webpack.config.js_**
can also put the .babelrc object as field of option of babel-loader in webpack.config.js

optional(React)
```
npm i react react-dom prop-types html-webpack-plugin html-loader --save-dev
```
`html-webpack-plugin` and `html-loader` generate html page from html template
in `dist` directory as `index.html` and bundle will be included

#####3 webpack dev server

dev server will rebundle your project after modification and serve
the app on localhost:8080
```
npm i webpack-dev-server --save-dev
```
config `scripts` in `package.json`
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --mode development",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
```
currently, `npm test` is not valid to use,

`npm start` will launch the dev server

`npm run dev` will bundle the js in readable format

`npm run build` will bundle the js in minified format

**The `bundle.js` you get from build is downgraded to ES5 and could be
run in node.js when some ES6 features are not supported currently**

#####4 webpack config
in webpack4.x, the `entry point` will be default set to `./src/index.js`,
the `output file` will be default set to `./dist/main.js`
###### entry point config
entry point could be string for a single entry point or object{name: path} format
but the rule of thumb is **for each HTML document use exactly one entry point.**

single entry:
```
entry: `${__dirname}/aaaa/xxx.js`
```
multiple entry:
```
entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
}
```
###### output file config
output for single entry:
```
output: {
    path: `${__dirname}/public`,
    filename: "bundle.js"
}
```
output for multiple entry:
```
  entry: {
    app: './src/app.js',
    search: './src/search.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
```
finally, after `npm run build`, it will generate `./dist/app.js` and `./dist/search.js`

#####5 css style loader
```
npm i style-loader css-loader --save-dev
```
and set webpack.config.js
```
{
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
}
```
then you can import css file into entry file with
`import "./aaa/main.css"`

#####6 file loader
```
npm install file-loader --save-dev
```
in `webpack.config.js`
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: true  // true: emits a file and return URI, false: return public URI
            }
          }
        ]
      }
    ]
  }
}
```
set emitFile to true. after build, an image will be in ./dist,
then in js file, you can import file
```
import imgURI from './file.png'
......
<img src={imgURI} />
```
other useful loader config:
```
https://webpack.js.org/loaders/
```

#####7 mocha test
```
npm i mocha --save-dev
```
and set script of package.json
```
  "scripts": {
    "test": "./node_modules/mocha/bin/mocha",
    "mocha": "./node_modules/mocha/bin/mocha",
    "start": "webpack-dev-server --open --mode development",
    "dev": "webpack --mode development",
    "build": "webpack --mode production"
  },
```
build directory for test, like `test/mocha.test.js`
```
const assert = require('assert');
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.equal([1,2,3].indexOf(4), -1);
        });
    });
});
```
then you can run `npm run test` or `npm run mocha` to run all the test cases,
which will run files whose name including _test_

or you can `npm run test PATH` to run a specific folder or test file