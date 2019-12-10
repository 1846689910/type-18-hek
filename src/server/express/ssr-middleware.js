import Path from "path";
import Fs from "fs";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { routes } from "../../client/js/settings/routes";
import { renderRoutes } from "react-router-config";
import { configureStore } from "../../client/js/settings/store";
import { initialState } from "../../client/js/settings/reducers";
import { StaticRouter } from "react-router-dom";
import { parse as parseHtml } from "node-html-parser";
import serialize from "serialize-javascript";

const getRenderedString = url => {
  const data = Fs.readFileSync(Path.resolve("dist/index.html"), "utf8");
  const App = () => renderRoutes(routes);
  const store = configureStore(initialState);
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  );
  const preloadedState = parseHtml(
    `<script>window.__PRELOADED_STATE__=${serialize(initialState)}</script>`,
    {
      script: true
    }
  );
  const dom = parseHtml(data, {
    script: true
  });
  dom.querySelector("#root").set_content(markup);
  dom.querySelector("body").appendChild(preloadedState);

  return dom.toString().replace(
    '<span id="body-after-root"></span>',
    `
    <noscript>
      <h4>JavaScript is Disabled</h4>
      <p>Sorry, this webpage requires JavaScript to function correctly.</p>
      <p>Please enable JavaScript in your browser and reload the page.</p>
    </noscript>
  `
  );
};

const middleware = (req, res) => {
  res.end(getRenderedString(req.url));
};
module.exports = {
  middleware,
  getRenderedString
};