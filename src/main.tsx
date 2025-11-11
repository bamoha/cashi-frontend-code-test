import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { setupWorker } from "msw/browser";
import App from "./App.tsx";
import "./index.css";
import { apiHandlers } from "./api.ts";
import "./i18n/config";

const worker = setupWorker(...apiHandlers);

const setupMocking = async () => worker.start();

setupMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
