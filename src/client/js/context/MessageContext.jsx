import React from "react";
const MessageContext = React.createContext({ a: 123 });
export default MessageContext;
export const { Provider, Consumer } = MessageContext;
