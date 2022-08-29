import App from "./pages/App";
import { MemoryRouter } from "react-router-dom";
import React from "react";
import { hydrate } from "react-dom";

hydrate(
    <MemoryRouter>
        <App />
    </MemoryRouter>,
    document.getElementById("root")
);

if (module.hot) {
    module.hot.accept();
}
