const { default: logger, FgCyan, Bright } = require("./logger");
const setAppServer = () => {
  let APP_SERVER = process.argv.slice(2).find(x => {
    const lower = x.toLowerCase();
    return lower === "express"; // || lower === "koa" || lower === "hapi";
  });
  if (!APP_SERVER) APP_SERVER = "express";
  process.env.APP_SERVER = APP_SERVER;
  return APP_SERVER;
};
const setAppServerMode = () => {
  let APP_SERVER_MODE = process.argv.slice(2).find(x => x.toLowerCase() === "dev");
  if (!APP_SERVER_MODE) APP_SERVER_MODE = "prod";
  process.env.APP_SERVER_MODE = APP_SERVER_MODE;
  return APP_SERVER_MODE;
};
const startSetup = () => {
  const appServer = setAppServer();
  const appServerMode = setAppServerMode();
  logger(`  --  starting ${appServer.toUpperCase()} server in ${appServerMode.toUpperCase()} mode`, [
    FgCyan,
    Bright
  ]);
};
module.exports = {
  setAppServer,
  setAppServerMode,
  startSetup
};
