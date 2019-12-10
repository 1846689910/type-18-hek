import React from "react";
import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const App = () =>  <div>Hello</div>;
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Jest", () => {
  it("should work", () => {
    expect("a").toBe("a");
  });
});