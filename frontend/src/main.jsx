import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import AppToaster from "@/components/common/AppToaster";
import ErrorBoundary from "@/components/common/ErrorBoundary";
import App from "./App";
import "./index.css";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      <AppToaster />
    </Provider>
  </StrictMode>,
);
