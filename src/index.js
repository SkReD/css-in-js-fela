import { render as renderReact } from "react-dom";
import React from "react";

import App from "./App/App";

renderReact(<App />, document.getElementById("app"));

module.hot.accept();
