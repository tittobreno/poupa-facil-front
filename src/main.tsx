import * as React from "react";
import ReactDOM from "react-dom/client";
import MainRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { GlobalProvider } from "./contexts/GlobalContext";
import { UserProvider } from "./contexts/UserContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <UserProvider>
          <MainRoutes />
        </UserProvider>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
