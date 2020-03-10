const { buildSchema } = require("graphql");
const shell = require("shelljs");
const Path = require("path");

const gqlDir = Path.resolve("src/server/utils/graphql/gql");

const gqls = shell
  .ls(gqlDir)
  .filter(x => x.endsWith(".gql") || x.endsWith(".graphql"))
  .map(x => Path.join(gqlDir, x))
  .reduce((p, v) => {
    p.push(shell.cat(v));
    return p;
  }, []);

module.exports = buildSchema(gqls.join("\n"));
