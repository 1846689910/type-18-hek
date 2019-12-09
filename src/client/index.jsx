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
import * as serviceWorker from "./js/serviceWorker";

const store = configureStore();

const start = App => {
  const root = document.querySelector("#root");
  const reactStart =
    window.__PRELOADED_STATE__ && root.innerHTML ? hydrate : render;
  reactStart(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>,
    root
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
