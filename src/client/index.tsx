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
import { theme } from "./styles/theme";
import { loadableReady } from "@loadable/component";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { MediaQueryProvider } from "./js/components/MediaQueryContext";
import * as serviceWorker from "./js/serviceWorker";

const store = configureStore();
const isDev = process.env.NODE_ENV === "development";
const apolloLink = isDev
  ? "http://localhost:3000/graphql"
  : "https://micro-bus.vercel.app/_api/type-18-hek";

const start = (App: React.ComponentType) => {
  const root = document.querySelector("#root");
  const reactStart =
    "__PRELOADED_STATE__" in window && root.innerHTML ? hydrate : render;
  const cache = new InMemoryCache();
  const link = createHttpLink({
    uri: apolloLink,
  });
  const apolloClient = new ApolloClient({ cache, link });
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { routes: r } = require("./js/settings/routes");
    start(() => renderRoutes(r));
  });
}
// render(<Home />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
