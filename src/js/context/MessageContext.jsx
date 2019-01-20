import React from "react";
const MessageContext = React.createContext({a: 123});
export default MessageContext;
export const MCProvider = MessageContext.Provider;
export const MCConsumer = MessageContext.Consumer;