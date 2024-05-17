import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./SocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <React.StrictMode>
      <RouterProvider router={App} />
    </React.StrictMode>
  </ContextProvider>
);
