const { pubServerTime } = require("./graphql/pubsub");

const publishServerTime = () => {
  pubServerTime();
  setTimeout(publishServerTime, 1000);
};

module.exports = {
  publishServerTime
};