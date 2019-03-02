// const { exec } = require("child_process");
// const root = process.cwd();
// exec(
//   `${root}/node_modules/.bin/webpack --version`,
//   {
//     env: Object.assign({}, process.env, { USE_SERVER: "express" })
//   },
//   (err, stdout) => {
//     console.log(stdout);
//   }
// );
console.log(process.argv);
