// TODO: https://graphql.org/code/#express-graphql-graphql-js-running-an-express-graphql-server-github-https-github-com-graphql-express-graphql-npm-https-www-npmjs-com-package-express-graphql
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Query {
    hello: String!
  }
`);

const rootValue = {
  hello: () => "Hello World"
};

const graphqlMiddleware = graphqlHTTP({
  schema,
  rootValue,
  graphiql: true
});

module.exports = {
  schema,
  rootValue,
  graphqlMiddleware
};
