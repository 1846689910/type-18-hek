"use strict";

const shell = require("shelljs");

process.env.FORCE_COLOR = true;

shell.exec("npm run build", {
  env: Object.assign(process.env, {
    PUBLIC_URL: "/", // after setting the `homepage`, the `publicUrl` is changed then the resource path is wrong.
  }),
});

shell.exec("node src/server hapi");
