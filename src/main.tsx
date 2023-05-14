import * as React from "react";
import ReactDOM from "react-dom/client";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { GlobalProvider } from "./contexts/GlobalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <MainRoutes />
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
