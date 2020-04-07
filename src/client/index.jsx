import React from "react";
import { render, hydrate } from "react-dom";
import { Provider } from "react-redux";
import "./styles/index.css";
import { configureStore } from "./js/settings/store";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { routes } from "./js/settings/routes";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { theme } from "../client/styles/theme";
import { loadableReady } from "@loadable/component";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { split } from "apollo-link";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import { MediaQueryProvider } from "./js/components/MediaQueryContext";
import * as serviceWorker from "./js/serviceWorker";

const isDev = process.env.NODE_ENV === "development";

const useApolloClient = () => {
  const cache = new InMemoryCache();
  // Create a http link:
  const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql",
  });
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: "ws://localhost:3000/graphql",
    options: {
      reconnect: !isDev,
    },
  });
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink,
  );
  return new ApolloClient({
    cache,
    link,
  });
};

const store = configureStore();

const start = (App) => {
  const root = document.querySelector("#root");
  const reactStart =
    window.__PRELOADED_STATE__ && root.innerHTML ? hydrate : render;
  const apolloClient = useApolloClient();
  loadableReady(() =>
    reactStart(
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <CssBaseline />
              <MediaQueryProvider>
                <App />
              </MediaQueryProvider>
            </BrowserRouter>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>,
      root,
    ),
  );
};

start(() => renderRoutes(routes));

if (module.hot) {
  module.hot.accept("./js/settings/routes", () => {
    const { routes: r } = require("./js/settings/routes");
    start(() => renderRoutes(r));
  });
}
// render(<Home />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
