import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { ScrollToTop } from "./components/scrollToTop";
import "./index.css";
import App from "./App";


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <ScrollToTop />
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
