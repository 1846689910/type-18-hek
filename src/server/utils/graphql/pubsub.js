const { PubSub } = require("graphql-subscriptions");

const pubsub = new PubSub();

const pubServerTime = () =>
  pubsub.publish("serverTime", {
    serverTime: `${Date.now()}`,
  });

module.exports = {
  pubsub,
  pubServerTime,
};
